import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { BrowserProvider, Contract, isAddress, parseUnits } from "ethers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  Loader2,
  Lock,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import SEOHead from "@/components/SEOHead";
import Loader from "@/components/loader/Loader";
import { makeRequest } from "@/utils/makeRequest";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { Invoice } from "@/types/invoice";
import { queryClient } from "@/services/queryClient";
import { useProfile } from "@/services";
import { useAppSelector } from "@/redux/hooks";
import { useInvoice } from "@/services/invoice";
import { Currency } from "@/types/currency";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

const getEthereumProvider = (): EthereumProvider | undefined => {
  const provider = window.ethereum as unknown;

  if (
    !provider ||
    typeof provider !== "object" ||
    !("request" in provider) ||
    typeof provider.request !== "function"
  ) {
    return undefined;
  }

  return provider as EthereumProvider;
};

type PaymentMethod = "card" | "bank" | "crypto";
type FiatCurrency = "NGN" | "USD" | "GBP" | "EUR";
type CryptoNetwork = "ethereum" | "polygon" | "bsc";

type BillingForm = {
  fullName: string;
  email: string;
  street: string;
  city: string;
  zip: string;
  country: string;
};

// declare global {
//   interface Window {
//     ethereum?: {
//       request: (args: {
//         method: string;
//         params?: unknown[];
//       }) => Promise<unknown>;
//     };
//   }
// }

/**
 * Configure these using verified company payment details.
 * Prefer loading these settings from an authenticated backend endpoint.
 *
 * Do not replace these empty values with invented account details.
 */
const BANK_ACCOUNTS: Record<
  FiatCurrency,
  {
    bankName: string;
    accountName: string;
    accountNumber: string;
    swiftCode?: string;
    iban?: string;
    instructions: string;
  }
> = {
  NGN: {
    bankName: "",
    accountName: "",
    accountNumber: "",
    instructions:
      "Transfer the exact NGN amount using the payment reference provided. " +
      "Use your bank's official transfer channel and retain your receipt.",
  },
  USD: {
    bankName: "",
    accountName: "",
    accountNumber: "",
    swiftCode: "",
    instructions:
      "Confirm that your bank supports the specified USD transfer route. " +
      "Check intermediary bank charges before sending funds.",
  },
  GBP: {
    bankName: "",
    accountName: "",
    accountNumber: "",
    instructions:
      "Confirm the applicable GBP transfer details and any intermediary " +
      "charges with your bank before sending funds.",
  },
  EUR: {
    bankName: "",
    accountName: "",
    accountNumber: "",
    iban: "",
    swiftCode: "",
    instructions:
      "Confirm the EUR transfer route, applicable fees, and beneficiary " +
      "details before sending funds.",
  },
};

/**
 * The contract addresses must correspond to verified USDT contracts.
 * Ethereum, Polygon, and BNB Smart Chain use different contract addresses.
 */
const USDT_NETWORKS: Record<
  CryptoNetwork,
  {
    label: string;
    chainId: number;
    envContract: string | undefined;
    explorer: string;
    currencySymbol: string;
  }
> = {
  ethereum: {
    label: "Ethereum Mainnet",
    chainId: 1,
    envContract: import.meta.env.VITE_USDT_ETHEREUM_CONTRACT,
    explorer: "https://etherscan.io",
    currencySymbol: "ETH",
  },
  polygon: {
    label: "Polygon",
    chainId: 137,
    envContract: import.meta.env.VITE_USDT_POLYGON_CONTRACT,
    explorer: "https://polygonscan.com",
    currencySymbol: "POL",
  },
  bsc: {
    label: "BNB Smart Chain",
    chainId: 56,
    envContract: import.meta.env.VITE_USDT_BSC_CONTRACT,
    explorer: "https://bscscan.com",
    currencySymbol: "BNB",
  },
};

const USDT_ABI = [
  "function transfer(address to, uint256 value) returns (bool)",
  "function decimals() view returns (uint8)",
];

const EMPTY_BILLING_FORM: BillingForm = {
  fullName: "",
  email: "",
  street: "",
  city: "",
  zip: "",
  country: "",
};

const FIAT_CURRENCIES: {
  value: FiatCurrency;
  label: string;
}[] = [
  { value: "NGN", label: "NGN — Nigerian Naira" },
  { value: "USD", label: "USD — US Dollar" },
  { value: "GBP", label: "GBP — British Pound" },
  { value: "EUR", label: "EUR — Euro" },
];

const formatMoney = (
  amount: number | string | null | undefined,
  currency: string,
) => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) return "—";

  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  } catch {
    return `${currency} ${numericAmount.toLocaleString()}`;
  }
};

interface Props {
  id: string;
}

const InvoicePayment = ({ id }: Props) => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? "";

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [currencyType, setCurrencyType] = useState<FiatCurrency>("NGN");
  const [network, setNetwork] = useState<CryptoNetwork>("ethereum");

  const [processing, setProcessing] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [billingForm, setBillingForm] =
    useState<BillingForm>(EMPTY_BILLING_FORM);
  const [selectedBillingId, setSelectedBillingId] = useState<string | null>(
    null,
  );
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [transferReference, setTransferReference] = useState("");
  const [bankTransferSubmitted, setBankTransferSubmitted] = useState(false);

  const { data: profile } = useProfile(userId);
  const {
    data: singleInvoice,
    isLoading,
    isError,
    error,
  } = useInvoice(id, userId);
  console.log("INVOICE", singleInvoice);

  type PaymentInvoice = Omit<Invoice, "amount" | "currency" | "dueDate"> & {
    id?: string;
    invoiceNo?: string;
    amount?: string | number | null;
    currencyId?: string;
    currency?: Currency | null;
    dueDate?: string | null;
    status?: string;
    paidAt?: string | null;
    onboardingId?: string | null;
    projectId?: string | null;
    amountsByCurrency?: Partial<Record<FiatCurrency, number>>;
    milestonePhase?: {
      title?: string;
      dueDate?: string | null;
      estimatedCost?: number | string | null;
      actualCost?: number | string | null;
    } | null;
    project?: {
      quote?: {
        projectName?: string;
      } | null;
    } | null;
    onboarding?: {
      id?: string;
      reference?: string;
      status?: string;
    } | null;
  };

  const invoice = singleInvoice as PaymentInvoice | undefined;

  const billingAddresses = profile?.billingAddresses ?? [];

  const invoiceCurrency =
    typeof invoice?.currency === "string"
      ? invoice.currency
      : (invoice?.currency?.iso ?? "USD");

  const invoiceSymbol =
    typeof invoice?.currency === "object" && invoice.currency
      ? (invoice.currency.symbol ?? invoiceCurrency)
      : invoiceCurrency;

  const invoiceAmount = Number(
    invoice?.milestonePhase?.actualCost ??
      invoice?.milestonePhase?.estimatedCost ??
      invoice?.amount ??
      0,
  );

  const invoiceStatus = invoice?.status?.toUpperCase() ?? "";

  const isInvoicePaid = invoiceStatus === "PAID" || Boolean(invoice?.paidAt);

  const canPayInvoice = invoiceStatus === "PENDING" && !isInvoicePaid;

  const bankAmount =
    currencyType === invoiceCurrency
      ? invoiceAmount
      : invoice?.amountsByCurrency?.[currencyType];

  const selectedBankAccount = BANK_ACCOUNTS[currencyType];

  const selectedNetwork = USDT_NETWORKS[network];

  const usdtWalletAddress = (
    import.meta.env.VITE_USDT_WALLET_ADDRESS ?? ""
  ).trim();

  const usdtContractAddress = (selectedNetwork.envContract ?? "").trim();

  const bankDetailsConfigured = Boolean(
    selectedBankAccount.bankName &&
    selectedBankAccount.accountName &&
    selectedBankAccount.accountNumber,
  );

  const cryptoConfigured = Boolean(
    usdtWalletAddress &&
    isAddress(usdtWalletAddress) &&
    usdtContractAddress &&
    isAddress(usdtContractAddress),
  );

  const isCurrencyAvailable = (currency: FiatCurrency) =>
    currency === invoiceCurrency ||
    Number.isFinite(invoice?.amountsByCurrency?.[currency]);

  const createBillingAddressMutation = useMutation({
    mutationFn: async (data: BillingForm) => {
      const response = await makeRequest.post("/billing-address", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Billing address added successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setSelectedBillingId(data.id);
      setShowBillingForm(false);
      setBillingForm(EMPTY_BILLING_FORM);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const createPaymentIntentMutation = useMutation({
    mutationFn: async (payload: {
      invoiceId: string;
      method: "card";
      billingAddressId: string;
      currency: string;
    }) => {
      /**
       * Implement this endpoint on your server and connect it to your
       * chosen gateway, such as Paystack, Flutterwave, or Stripe.
       * Never collect or store raw card details on your own server.
       */
      const response = await makeRequest.post("/payments/intent", payload);
      return response.data;
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const submitBankTransferMutation = useMutation({
    mutationFn: async (payload: {
      invoiceId: string;
      currency: FiatCurrency;
      reference: string;
    }) => {
      /**
       * This endpoint should create a pending payment record,
       * not mark the invoice as paid.
       */
      const response = await makeRequest.post(
        "/payments/bank-transfer/submit",
        payload,
      );
      return response.data;
    },
    onSuccess: () => {
      setBankTransferSubmitted(true);
      toast.success("Transfer details submitted for payment verification.");
      queryClient.invalidateQueries({
        queryKey: ["invoice", id],
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const submitCryptoPaymentMutation = useMutation({
    mutationFn: async (payload: {
      invoiceId: string;
      transactionHash: string;
      walletAddress: string;
      network: CryptoNetwork;
      currency: "USDT";
    }) => {
      /**
       * The server must verify the transaction receipt, token contract,
       * recipient, amount, network, confirmations, and invoice status.
       */
      const response = await makeRequest.post(
        "/payments/crypto/submit",
        payload,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Transaction submitted. Awaiting payment verification.");
      queryClient.invalidateQueries({
        queryKey: ["invoice", id],
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  useEffect(() => {
    if (billingAddresses.length && !selectedBillingId) {
      setSelectedBillingId(billingAddresses[0].id);
    }
  }, [billingAddresses, selectedBillingId]);

  const handleBillingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id: field, value } = event.target;

    setBillingForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (
      invoiceCurrency &&
      FIAT_CURRENCIES.some((currency) => currency.value === invoiceCurrency)
    ) {
      setCurrencyType(invoiceCurrency as FiatCurrency);
    }
  }, [invoiceCurrency]);

  const handleCreateBilling = () => {
    const hasEmptyField = Object.values(billingForm).some(
      (value) => !value.trim(),
    );

    if (hasEmptyField) {
      toast.error("Please complete all billing address fields.");
      return;
    }

    createBillingAddressMutation.mutate(billingForm);
  };

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied to clipboard.`);
    } catch {
      toast.error("Unable to copy. Please copy the text manually.");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error(
        "No compatible wallet found. Install MetaMask or use a compatible wallet browser.",
      );
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (!accounts?.length) {
        toast.error("No wallet account was selected.");
        return;
      }

      setWalletAddress(accounts[0]);
      toast.success("Wallet connected.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const switchNetwork = async () => {
    if (!window.ethereum) {
      toast.error("Please connect a compatible wallet first.");
      return false;
    }

    try {
      const chainIdHex = "0x" + selectedNetwork.chainId.toString(16);

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });

      return true;
    } catch (error) {
      toast.error(
        "Unable to switch networks. Please select the required network in your wallet.",
      );
      return false;
    }
  };

  const handleCryptoPayment = async () => {
    if (!id) {
      toast.error("Invoice ID is missing.");
      return;
    }

    if (!canPayInvoice) {
      toast.error("This invoice is not eligible for payment.");
      return;
    }

    if (!cryptoConfigured) {
      toast.error(
        "USDT payment configuration is incomplete. Please contact support.",
      );
      return;
    }

    if (!walletAddress) {
      toast.error("Connect your wallet before proceeding.");
      return;
    }

    if (!Number.isFinite(invoiceAmount) || invoiceAmount <= 0) {
      toast.error("The invoice amount is invalid.");
      return;
    }

    if (invoiceCurrency !== "USD") {
      toast.error(
        "The invoice must have a verified USD-denominated amount before USDT payment can proceed.",
      );
      return;
    }

    setProcessing(true);

    try {
      const switched = await switchNetwork();
      if (!switched) return;

      const provider = new BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      if (signerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new Error(
          "Your selected wallet account changed. Reconnect your wallet.",
        );
      }

      const token = new Contract(usdtContractAddress, USDT_ABI, signer);

      const decimals = Number(await token.decimals());

      if (!Number.isInteger(decimals) || decimals < 0 || decimals > 36) {
        throw new Error("The token returned invalid decimal precision.");
      }

      const amount = parseUnits(invoiceAmount.toFixed(2), decimals);

      /**
       * The user must approve this transaction in their wallet.
       * Gas fees are paid separately in the network's native token.
       */
      const transaction = await token.transfer(usdtWalletAddress, amount);

      setTransactionHash(transaction.hash);

      toast.success(
        "Transaction broadcast. Waiting for blockchain confirmation.",
      );

      await transaction.wait(1);

      submitCryptoPaymentMutation.mutate({
        invoiceId: id,
        transactionHash: transaction.hash,
        walletAddress: signerAddress,
        network,
        currency: "USDT",
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setProcessing(false);
    }
  };

  const handleBankTransferSubmit = () => {
    if (!id) {
      toast.error("Invoice ID is missing.");
      return;
    }

    if (!canPayInvoice) {
      toast.error("This invoice is not eligible for payment.");
      return;
    }

    if (!bankDetailsConfigured) {
      toast.error("Company bank details have not been configured.");
      return;
    }

    if (!Number.isFinite(bankAmount) || Number(bankAmount) <= 0) {
      toast.error(
        `A verified ${currencyType} payment amount is not available for this invoice.`,
      );
      return;
    }

    if (!transferReference.trim()) {
      toast.error("Enter your bank transfer reference or transaction ID.");
      return;
    }

    submitBankTransferMutation.mutate({
      invoiceId: id,
      currency: currencyType,
      reference: transferReference.trim(),
    });
  };

  const handlePayment = async (event: FormEvent) => {
    event.preventDefault();

    if (paymentMethod === "bank") {
      handleBankTransferSubmit();
      return;
    }

    if (!canPayInvoice) {
      toast.error("This invoice is not eligible for payment.");
      return;
    }

    if (paymentMethod === "crypto") {
      await handleCryptoPayment();
      return;
    }

    if (!id) {
      toast.error("Invoice ID is missing.");
      return;
    }

    if (!selectedBillingId) {
      toast.error("Select a billing address to continue.");
      return;
    }

    try {
      const result = await createPaymentIntentMutation.mutateAsync({
        invoiceId: id,
        method: "card",
        billingAddressId: selectedBillingId,
        currency: currencyType,
      });

      /**
       * Redirect to the gateway's hosted checkout or open its
       * official SDK using the response returned by your backend.
       */
      if (result?.checkoutUrl) {
        window.location.assign(result.checkoutUrl);
      } else if (result?.authorizationUrl) {
        window.location.assign(result.authorizationUrl);
      } else {
        toast.error(
          "Payment session created, but no checkout URL was returned.",
        );
      }
    } catch {
      // The mutation displays the server error.
    }
  };

  const rawDueDate = invoice?.dueDate ?? invoice?.milestonePhase?.dueDate;

  const dueDate = rawDueDate ? new Date(rawDueDate) : null;

  const formattedDueDate =
    dueDate && !Number.isNaN(dueDate.getTime())
      ? dueDate.toLocaleDateString()
      : "Not specified";

  const paymentInProgress =
    processing ||
    createPaymentIntentMutation.isPending ||
    submitBankTransferMutation.isPending ||
    submitCryptoPaymentMutation.isPending;

  if (isLoading) return <Loader type="bounce" />;

  if (isError || !invoice) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Unable to load invoice</CardTitle>
            <CardDescription>
              The invoice could not be retrieved. Check the invoice reference
              and try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-destructive">
              {error ? getErrorMessage(error) : "Invoice not found."}
            </p>
            <Button asChild className="w-full">
              <Link to="/client-dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isInvoicePaid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Invoice Already Paid</CardTitle>
            <CardDescription>
              Invoice {invoice.invoiceNo ?? invoice.id} has been paid.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Amount paid</p>
              <p className="text-2xl font-bold">
                {formatMoney(invoiceAmount, invoiceCurrency)}
              </p>

              {invoice.paidAt && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Paid on {new Date(invoice.paidAt).toLocaleDateString()}
                </p>
              )}
            </div>

            <Button asChild className="w-full">
              <Link to="/investor-dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!canPayInvoice) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Invoice Not Available for Payment</CardTitle>
            <CardDescription>
              This invoice is not currently eligible for payment.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Current invoice status: {invoiceStatus || "Unknown"}. Please
              contact support if you believe this is an error.
            </p>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <SEOHead
        title={`Pay Invoice ${invoice.invoiceNo ?? invoice.id ?? id} | TechBravery`}
        description="Complete your invoice payment securely."
      />

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/client-dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>

            <h1 className="mb-2 text-3xl font-bold lg:text-4xl">
              Payment{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Checkout
              </span>
            </h1>

            <p className="text-muted-foreground">
              Choose your payment method and follow the instructions to settle
              your invoice.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-3">
            <form
              onSubmit={handlePayment}
              className="min-w-0 space-y-6 pb-24 lg:col-span-2 lg:pb-0"
            >
              {/* Payment method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Choose how you would like to pay.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => {
                      setPaymentMethod(value as PaymentMethod);
                      setBankTransferSubmitted(false);
                    }}
                    className="grid gap-3 sm:grid-cols-3"
                  >
                    <Label
                      htmlFor="method-card"
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="card" id="method-card" />
                      <CreditCard className="h-5 w-5 shrink-0" />
                      <span className="font-medium">Credit / Debit Card</span>
                    </Label>

                    <Label
                      htmlFor="method-bank"
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                        paymentMethod === "bank"
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="bank" id="method-bank" />
                      <Building2 className="h-5 w-5 shrink-0" />
                      <span className="font-medium">Bank Transfer</span>
                    </Label>

                    <Label
                      htmlFor="method-crypto"
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                        paymentMethod === "crypto"
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="crypto" id="method-crypto" />
                      <Wallet className="h-5 w-5 shrink-0" />
                      <span className="font-medium">Cryptocurrency</span>
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Card payment */}
              {paymentMethod === "card" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Payment</CardTitle>
                      <CardDescription>
                        Continue to the secure checkout provided by your
                        configured payment gateway.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3 rounded-lg border p-4">
                        <Lock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <p className="font-medium">Secure hosted checkout</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Your card details should be entered on your payment
                            provider's secure checkout, not stored by
                            TechBravery.
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Select a billing address below and continue to the
                        payment provider to enter your card information.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Currency</CardTitle>
                      <CardDescription>
                        Select the currency supported by your payment gateway.
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <RadioGroup
                        value={currencyType}
                        onValueChange={(value) =>
                          setCurrencyType(value as FiatCurrency)
                        }
                        className="grid gap-3 sm:grid-cols-2"
                      >
                        {FIAT_CURRENCIES.map((currency) => (
                          <Label
                            key={currency.value}
                            htmlFor={`card-${currency.value}`}
                            className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:border-primary/50"
                          >
                            <RadioGroupItem
                              id={`card-${currency.value}`}
                              value={currency.value}
                              disabled={!isCurrencyAvailable(currency.value)}
                            />
                            {currency.label}
                          </Label>
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Bank transfer */}
              {paymentMethod === "bank" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Bank Transfer</CardTitle>
                      <CardDescription>
                        Select your transfer currency to view the relevant
                        beneficiary details.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                      <RadioGroup
                        value={currencyType}
                        onValueChange={(value) => {
                          setCurrencyType(value as FiatCurrency);
                          setBankTransferSubmitted(false);
                        }}
                        className="grid gap-3 sm:grid-cols-2"
                      >
                        {FIAT_CURRENCIES.map((currency) => (
                          <Label
                            key={currency.value}
                            htmlFor={`bank-${currency.value}`}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                              currencyType === currency.value
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem
                              id={`bank-${currency.value}`}
                              value={currency.value}
                              disabled={!isCurrencyAvailable(currency.value)}
                            />
                            <span className="font-medium">
                              {currency.label}
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>

                      <Separator />

                      {bankDetailsConfigured ? (
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Beneficiary bank
                            </p>
                            <p className="font-semibold">
                              {selectedBankAccount.bankName}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Account name
                            </p>
                            <div className="flex items-center justify-between gap-2">
                              <p className="break-words font-medium">
                                {selectedBankAccount.accountName}
                              </p>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleCopy(
                                    selectedBankAccount.accountName,
                                    "Account name",
                                  )
                                }
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Account number
                            </p>
                            <div className="flex items-center justify-between gap-2">
                              <p className="break-all font-semibold tracking-wide">
                                {selectedBankAccount.accountNumber}
                              </p>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleCopy(
                                    selectedBankAccount.accountNumber,
                                    "Account number",
                                  )
                                }
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {selectedBankAccount.iban && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                IBAN
                              </p>
                              <p className="break-all font-medium">
                                {selectedBankAccount.iban}
                              </p>
                            </div>
                          )}

                          {selectedBankAccount.swiftCode && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                SWIFT / BIC
                              </p>
                              <p className="font-medium">
                                {selectedBankAccount.swiftCode}
                              </p>
                            </div>
                          )}

                          <div className="rounded-xl border bg-muted/40 p-4">
                            <p className="text-sm text-muted-foreground">
                              Amount to transfer
                            </p>
                            <p className="mt-1 text-2xl font-bold">
                              {Number.isFinite(bankAmount)
                                ? formatMoney(bankAmount, currencyType)
                                : "Amount unavailable"}
                            </p>
                            <p className="mt-2 text-xs text-muted-foreground">
                              Only transfer when the amount is supplied by your
                              trusted pricing backend. Check bank fees
                              separately.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="transferReference">
                              Bank transaction reference
                            </Label>
                            <Input
                              id="transferReference"
                              value={transferReference}
                              onChange={(event) =>
                                setTransferReference(event.target.value)
                              }
                              placeholder="Enter your transfer reference"
                              autoComplete="off"
                            />
                          </div>

                          <Button
                            type="button"
                            className="w-full"
                            onClick={handleBankTransferSubmit}
                            disabled={
                              !canPayInvoice ||
                              paymentInProgress ||
                              bankTransferSubmitted ||
                              !Number.isFinite(bankAmount) ||
                              Number(bankAmount) <= 0
                            }
                          >
                            {submitBankTransferMutation.isPending
                              ? "Submitting reference..."
                              : bankTransferSubmitted
                                ? "Reference Submitted"
                                : "Submit Transfer Reference"}
                          </Button>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed p-5">
                          <Building2 className="mb-3 h-7 w-7 text-muted-foreground" />
                          <p className="font-semibold">
                            Bank details not configured
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            The company has not configured its {currencyType}{" "}
                            beneficiary account yet. Contact support before
                            sending money.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Important Transfer Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                        <p className="font-semibold">
                          Before making your transfer
                        </p>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                          <li>
                            Verify the beneficiary name and account number in
                            your banking application.
                          </li>
                          <li>
                            Transfer only the amount shown for the selected
                            currency, once confirmed.
                          </li>
                          <li>
                            Use the correct transfer currency and account
                            details. Never assume an exchange rate or substitute
                            another currency.
                          </li>
                          <li>
                            Keep your receipt and transaction reference for
                            reconciliation.
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-lg border p-4">
                        <p className="font-semibold">
                          After making your transfer
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Submit your bank reference above. Your payment remains
                          pending until the finance team verifies receipt of the
                          funds. Do not make a duplicate transfer just because
                          verification takes time.
                        </p>
                      </div>

                      {bankTransferSubmitted && (
                        <div className="flex items-start gap-3 rounded-lg border border-primary/30 p-4">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <p className="text-sm">
                            Your reference has been submitted. This is not
                            confirmation that the funds have been received or
                            that the invoice has been paid.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Cryptocurrency */}
              {paymentMethod === "crypto" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Pay with USDT</CardTitle>
                      <CardDescription>
                        Connect your wallet to send USDT or use the receiving
                        address below from a compatible wallet application.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="network">USDT Network</Label>
                        <RadioGroup
                          id="network"
                          value={network}
                          onValueChange={(value) => {
                            setNetwork(value as CryptoNetwork);
                            setTransactionHash("");
                          }}
                          className="grid gap-3"
                        >
                          {(
                            Object.entries(USDT_NETWORKS) as [
                              CryptoNetwork,
                              (typeof USDT_NETWORKS)[CryptoNetwork],
                            ][]
                          ).map(([key, value]) => (
                            <Label
                              key={key}
                              htmlFor={`network-${key}`}
                              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                                network === key
                                  ? "border-primary bg-primary/5"
                                  : "hover:border-primary/50"
                              }`}
                            >
                              <RadioGroupItem
                                value={key}
                                id={`network-${key}`}
                              />
                              <div>
                                <p className="font-medium">{value.label}</p>
                                <p className="text-xs text-muted-foreground">
                                  Gas fees paid in {value.currencySymbol}
                                </p>
                              </div>
                            </Label>
                          ))}
                        </RadioGroup>
                      </div>

                      <div className="rounded-lg border bg-muted/40 p-4">
                        <p className="text-sm text-muted-foreground">
                          USDT payment amount
                        </p>
                        <p className="mt-1 text-2xl font-bold">
                          {invoiceCurrency === "USD" && invoiceAmount > 0
                            ? `${invoiceAmount.toLocaleString()} USDT`
                            : "Amount unavailable"}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          This amount is available only for a USD invoice.
                          Confirm the applicable amount and network before
                          signing a transaction.
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={connectWallet}
                        disabled={processing}
                      >
                        <Wallet className="mr-2 h-4 w-4" />
                        {walletAddress
                          ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                          : "Connect Wallet"}
                      </Button>

                      {walletAddress && (
                        <div className="rounded-lg border p-3">
                          <p className="text-xs text-muted-foreground">
                            Connected wallet
                          </p>
                          <p className="mt-1 break-all font-mono text-sm">
                            {walletAddress}
                          </p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={() =>
                              handleCopy(walletAddress, "Wallet address")
                            }
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy wallet address
                          </Button>
                        </div>
                      )}

                      <Separator />

                      <div className="space-y-2">
                        <Label>Company USDT receiving address</Label>

                        {usdtWalletAddress && isAddress(usdtWalletAddress) ? (
                          <div className="rounded-lg border p-3">
                            <p className="break-all font-mono text-sm">
                              {usdtWalletAddress}
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              className="mt-3 w-full"
                              onClick={() =>
                                handleCopy(usdtWalletAddress, "USDT address")
                              }
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Copy USDT Address
                            </Button>
                          </div>
                        ) : (
                          <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                            The company USDT receiving address has not been
                            configured. Do not send funds until it is available.
                          </p>
                        )}
                      </div>

                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                        <p className="font-semibold">Before sending USDT</p>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                          <li>
                            Confirm the receiving address and selected network
                            carefully.
                          </li>
                          <li>
                            The sending network must match the configured
                            receiving network and token contract.
                          </li>
                          <li>
                            Keep enough native currency in your wallet for
                            network gas fees.
                          </li>
                          <li>
                            Blockchain transactions are generally irreversible.
                            Test addresses and network configuration before
                            production use.
                          </li>
                          <li>
                            Never share your seed phrase or private keys with
                            anyone.
                          </li>
                        </ul>
                      </div>

                      <Button
                        type="button"
                        className="w-full"
                        onClick={handleCryptoPayment}
                        disabled={
                          !canPayInvoice ||
                          paymentInProgress ||
                          !walletAddress ||
                          !cryptoConfigured ||
                          invoiceCurrency !== "USD" ||
                          invoiceAmount <= 0
                        }
                      >
                        {processing || submitCryptoPaymentMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Wallet className="mr-2 h-4 w-4" />
                            Connect & Pay with USDT
                          </>
                        )}
                      </Button>

                      {transactionHash && (
                        <div className="space-y-2 rounded-lg border p-4">
                          <p className="font-semibold">Transaction submitted</p>
                          <p className="break-all font-mono text-xs text-muted-foreground">
                            {transactionHash}
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() =>
                              window.open(
                                `${selectedNetwork.explorer}/tx/${transactionHash}`,
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }
                          >
                            View Blockchain Transaction
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                          <p className="text-sm text-muted-foreground">
                            Keep the transaction hash. Your invoice should
                            remain pending until your backend verifies the
                            transaction.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>After Sending USDT</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
                        <li>
                          Wait for the transaction to be included in the
                          selected blockchain.
                        </li>
                        <li>
                          Save the transaction hash and check its status using
                          the correct block explorer.
                        </li>
                        <li>
                          Allow the backend to verify the recipient, token
                          contract, amount, network, and required confirmations.
                        </li>
                        <li>
                          The invoice should be marked paid only after
                          successful server-side verification.
                        </li>
                      </ol>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Billing address */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                  <CardDescription>
                    Select a saved billing address or add a new one.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {billingAddresses.length > 0 && (
                    <RadioGroup
                      value={selectedBillingId ?? ""}
                      onValueChange={setSelectedBillingId}
                      className="space-y-3"
                    >
                      {billingAddresses.map((address: any) => (
                        <Label
                          key={address.id}
                          htmlFor={`billing-${address.id}`}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${
                            selectedBillingId === address.id
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem
                            value={address.id}
                            id={`billing-${address.id}`}
                            className="mt-1"
                          />
                          <div className="min-w-0 space-y-1">
                            <p className="font-medium">{address.fullName}</p>
                            <p className="break-words text-sm text-muted-foreground">
                              {address.street}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {address.city}, {address.country}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {address.zip}
                            </p>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowBillingForm((value) => !value)}
                  >
                    {showBillingForm ? "Cancel" : "Add New Billing Address"}
                  </Button>

                  {showBillingForm && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={billingForm.fullName}
                          onChange={handleBillingChange}
                          autoComplete="name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={billingForm.email}
                          onChange={handleBillingChange}
                          autoComplete="email"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={billingForm.street}
                          onChange={handleBillingChange}
                          autoComplete="street-address"
                          required
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={billingForm.city}
                            onChange={handleBillingChange}
                            autoComplete="address-level2"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP / Postal Code</Label>
                          <Input
                            id="zip"
                            value={billingForm.zip}
                            onChange={handleBillingChange}
                            autoComplete="postal-code"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={billingForm.country}
                          onChange={handleBillingChange}
                          autoComplete="country-name"
                          required
                        />
                      </div>

                      <Button
                        type="button"
                        className="w-full"
                        onClick={handleCreateBilling}
                        disabled={createBillingAddressMutation.isPending}
                      >
                        {createBillingAddressMutation.isPending
                          ? "Saving..."
                          : "Save Billing Address"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Responsive fixed action bar */}
              {paymentMethod === "card" && (
                <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-4 backdrop-blur lg:static lg:border-0 lg:bg-transparent lg:p-0">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={
                      !canPayInvoice ||
                      paymentInProgress ||
                      !selectedBillingId ||
                      !Number.isFinite(invoiceAmount) ||
                      invoiceAmount <= 0
                    }
                  >
                    {paymentInProgress ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing Checkout...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Continue to Secure Checkout
                      </>
                    )}
                  </Button>
                </div>
              )}

              <p className="text-center text-xs text-muted-foreground">
                Never share your password, private keys, or wallet recovery
                phrase. Payment confirmation is based on verified payment
                records, not the client interface.
              </p>
            </form>

            {/* Invoice summary */}
            <div className="min-w-0">
              <Card className="lg:sticky lg:top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    Review your invoice before proceeding.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice</p>
                    <p className="break-words font-semibold">
                      {invoice.invoiceNo ?? invoice.id ?? id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Project</p>
                    <p className="break-words font-medium">
                      {invoice.project?.quote?.projectName ?? "Project invoice"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Milestone</p>
                    <p className="break-words font-medium">
                      {invoice.milestonePhase?.title ?? "Invoice payment"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{formattedDueDate}</p>
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">
                      {invoice.milestonePhase?.title ?? "Invoice amount"}
                    </span>
                    <span className="shrink-0 font-medium">
                      {formatMoney(invoiceAmount, invoiceCurrency)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">Total Due</span>
                    <span className="text-xl font-bold text-primary">
                      {formatMoney(invoiceAmount, invoiceCurrency)}
                    </span>
                  </div>

                  {paymentMethod === "bank" && (
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground">
                        Selected transfer currency
                      </p>
                      <p className="font-semibold">{currencyType}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {Number.isFinite(bankAmount)
                          ? formatMoney(bankAmount, currencyType)
                          : "Converted amount not available"}
                      </p>
                    </div>
                  )}

                  {paymentMethod === "crypto" && (
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground">
                        Payment network
                      </p>
                      <p className="font-semibold">{selectedNetwork.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {invoiceCurrency === "USD"
                          ? `${invoiceAmount.toLocaleString()} USDT, excluding network fees`
                          : "A verified USD invoice amount is required"}
                      </p>
                    </div>
                  )}

                  <div className="flex items-start gap-3 rounded-lg border border-green-600/20 bg-green-600/5 p-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <p className="text-xs text-muted-foreground">
                      Your payment is recorded as complete only after the
                      payment provider, finance team, or blockchain verification
                      process confirms receipt.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoicePayment;
