import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  FileText,
  Send,
  Edit,
  CheckCircle2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { makeRequest } from "@/utils/makeRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IQuote,
  QuoteBudgetRange,
  QuoteComplexity,
  QuoteStatus,
  QuoteTimeline,
} from "@/types/quote";
import Loader from "@/components/loader/Loader";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProjectFeatures } from "@/redux/actions/quoteActions";
import { formatCurrency } from "@/utils/formatCurrency";
import { percent } from "framer-motion";

const QuoteDetails = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState("");

  const [phasePercents, setPhasePercents] = useState([40, 30, 30]);

  // Helper to update specific phase percent
  const updatePhasePercent = (index: number, value: number) => {
    const newPercents = [...phasePercents];
    newPercents[index] = value;
    setPhasePercents(newPercents);
  };

  const getPhaseAmount = (percent: number) => {
    if (!estimatedCost) return 0;
    return (estimatedCost * percent) / 100;
  };

  const quote = useAppSelector((state) => state.quote);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const projectFeature = quote?.projectFeature;

  useEffect(() => {
    dispatch(fetchProjectFeatures());
  }, [dispatch]);

  const fetchQuote = async () => {
    const res = await makeRequest.get(`/quote/find/${id}`);
    return res.data;
  };

  const approveQuoteMutation = useMutation({
    mutationFn: async () => {
      const res = await makeRequest.put(`/quote/${id}/approve`, {
        percents: phasePercents,
      });
      return res.data;
    },

    // Runs BEFORE the mutation; for optimistic UI
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["quote", id] });

      const previousQuote = queryClient.getQueryData<IQuote>(["quote", id]);

      queryClient.setQueryData<IQuote>(["quote", id], (old) =>
        old ? { ...old, status: QuoteStatus.ACCEPTED } : old,
      );

      return { previousQuote };
    },

    onError: (_err, _vars, context) => {
      // Rollback in case of error
      if (context?.previousQuote) {
        queryClient.setQueryData(["quote", id], context.previousQuote);
      }
      toast.error(getErrorMessage(_err));
      console.log(_err);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quote", id] });
      queryClient.invalidateQueries({ queryKey: ["project-all"] });
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast.success("Quote approved successfully.");
    },
  });

  const { data, isLoading, isError } = useQuery<IQuote>({
    queryKey: ["quote", id],
    queryFn: fetchQuote,
    enabled: !!id,
  });

  const [estimatedCost, setEstimatedCost] = useState(data?.estimatedCost);

  useEffect(() => {
    if (data?.estimatedCost !== undefined) {
      setEstimatedCost(data.estimatedCost);
    }
  }, [data]);

  const rejectMutation = useMutation({
    mutationFn: async () => {
      const res = await makeRequest.put(`/quote/${id}/reject`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quote", id] });
      queryClient.invalidateQueries({ queryKey: ["project-all"] });
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast.success("Quote successfully rejected.");
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });

  const isTerminal =
    data?.status === QuoteStatus.ACCEPTED ||
    data?.status === QuoteStatus.DECLINED ||
    data?.status === QuoteStatus.EXPIRED;

  console.log(data);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
      case "SUBMITTED":
        return "bg-yellow-100 text-yellow-800";
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "EXPIRED":
        return "bg-gray-100 text-gray-700";
      case "DECLINED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBudgetRange = (budGetRange: string) => {
    switch (budGetRange) {
      case QuoteBudgetRange.FIVE_TO_15K:
        return <span>$5k-15k</span>;
      case QuoteBudgetRange.FITEEN_TO_30K:
        return <span>$15k-30k</span>;
      case QuoteBudgetRange.THIRTY_TO_50K:
        return <span>$30k-50k</span>;
      case QuoteBudgetRange.FIFTYK_PLUS:
        return <span>$50k+</span>;
      default:
        return <span>$5-15k</span>;
    }
  };

  const getTimeline = (timeline: string) => {
    switch (timeline) {
      case QuoteTimeline.ASAP:
        return <span>ASAP (Rush) </span>;
      case QuoteTimeline.TWO_TO_THREE_MONTHS:
        return <span>2-3 months</span>;
      case QuoteTimeline.THREE_TO_SIX_MONTHS:
        return <span>3-6 months</span>;
      case QuoteTimeline.SIX_PLUS_MONTHS:
        return <span>6+ months</span>;
      default:
        return <span>6+ months</span>;
    }
  };

  const handleApprove = () => {
    if (!id) return;
    approveQuoteMutation.mutate();
  };

  const handleReject = () => {
    if (!id) return;
    rejectMutation.mutate();
    // toast.success("Quote has been rejected and client will be notified.");
  };

  const handleSendEstimate = () => {
    // Check that percents add up to 100
    const total = phasePercents.reduce((a, b) => a + b, 0);
    if (total !== 100) {
      toast.error("Milestone percentages must add up to 100%");
      return;
    }

    // Now you can send both estimatedCost and phasePercents to your backend
    // api
    //   .approveQuote(quoteId, phasePercents)
    //   .then(() => {
    //     toast.success(`Estimate of $${estimatedCost} sent to client.`);
    //     setIsEditing(false);
    //   })
    //   .catch((err) => {
    //     toast.error(`Failed to send estimate: ${err.message}`);
    //   });
  };

  if (isLoading) return <Loader type="bounce" />;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:items-center sm:flex-row gap-4 mb-6">
            <Button variant="outline" size="sm" asChild className="w-fit">
              <Link to="/admin-dashboard/quotes">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Link>
            </Button>
            <div>
              <Badge variant="outline" className="text-sm">
                <div className="flex items-center gap-1">
                  <span>Quote ID:</span>
                  <span className="text-teal-700 font-bold">
                    {data?.quoteCode}
                  </span>
                </div>
              </Badge>
              <Badge className={`w-fit ${getStatusColor(data?.status)}`}>
                <span className="lowercase">{data?.status}</span>
              </Badge>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-between w-full sm:flex-row sm:justify-between">
            <div className="mt-4">
              <h1 className="text-4xl font-bold mb-4">
                Quote{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Details
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {data?.projectType?.label}{" "}
                {data?.company && <span>for {data?.company}</span>}
              </p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto justify-between sm:justify-start">
              {data?.status === QuoteStatus.SUBMITTED && (
                <Button
                  variant="outline"
                  disabled={
                    data?.status !== QuoteStatus.SUBMITTED ||
                    rejectMutation.isPending
                  }
                  className="text-red-600 border-red-200 hover:bg-transparent disabled:cursor-not-allowed"
                  onClick={handleReject}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  {rejectMutation.isPending ? "Rejecting" : "Reject"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Contact Person
                      </Label>
                      <p className="text-lg font-semibold">{data?.fullName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Company
                      </Label>
                      <p className="text-lg font-semibold">{data?.company}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Email
                      </Label>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {data?.email}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Phone
                      </Label>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {data?.phone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Project Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Project Type
                    </Label>
                    <p className="text-lg font-semibold mb-4">
                      {data?.projectType?.label}
                    </p>
                  </div>
                  <div className="mb-4">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Detailed Description
                    </Label>
                    <div className="mt-2 p-4 bg-secondary/20 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                        {data?.description}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/20 border-dashed">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Core Foundation *</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Included by default
                  </Badge>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {projectFeature?.coreFeatures?.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">
                    These foundational components are included in every project
                    to ensure security, scalability, and production readiness.
                  </p>
                </CardContent>
              </Card>
              {/* Requirements & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Advanced Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {data?.features?.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm">{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Prefered Tech Stacks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {data?.techStacks?.map((stack, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="mr-2 mb-2"
                        >
                          {stack.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Project Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Client Budget
                    </Label>
                    <p className="text-lg font-semibold">
                      {getBudgetRange(data?.budgetRange?.label || "")}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Estimated Cost
                    </Label>
                    <p className="text-lg font-semibold">
                      ${formatCurrency(data?.estimatedCost)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Expected Timeline
                    </Label>
                    <p className="text-lg font-semibold">
                      {getTimeline(data?.timeline)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Priority
                    </Label>
                    <Badge
                      className={
                        data?.complexity === QuoteComplexity.HIGH
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      <span className="lowercase">{data?.complexity}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="bg-amber-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="flex justify-between items-center">
                      <span className="">Submitted</span>
                      <span className="font-medium">
                        {new Date(data?.createdAt).toDateString()!}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between items-center">
                      <span className="">Last Contact</span>
                      <span className="font-medium">
                        {new Date(data?.updatedAt).toDateString()!}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estimate */}
              <Card>
                <CardHeader>
                  <CardTitle>Send Estimate</CardTitle>
                  <CardDescription>
                    Provide discounted cost and phase percntages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="estimate">Estimate Amount (USD)</Label>
                    <Input
                      id="estimate"
                      value={estimatedCost ?? ""}
                      onChange={(e) => setEstimatedCost(Number(e.target.value))}
                      placeholder="Enter amount"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any additional notes or conditions..."
                      rows={3}
                    />
                  </div>

                  {/* Milestone Percent Inputs */}
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {["Phase 1", "Phase 2", "Phase 3"].map((label, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between gap-4">
                          <Label htmlFor={`phase-${idx}`}>{label} (%)</Label>
                          <div className="flex items-center gap-2">
                            <span>Amount:</span>
                            <span className="font-semibold">
                              ${getPhaseAmount(phasePercents[idx]).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <Input
                          id={`phase-${idx}`}
                          type="number"
                          value={phasePercents[idx]}
                          onChange={(e) =>
                            updatePhasePercent(idx, Number(e.target.value))
                          }
                          min={0}
                          max={100}
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    className="bg-green-600 hover:bg-green-700 w-full mt-4 cursor-pointer"
                    onClick={handleApprove}
                    disabled={isTerminal || approveQuoteMutation.isPending}
                  >
                    {approveQuoteMutation.isPending ? (
                      "Approving..."
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {data.status === QuoteStatus.ACCEPTED
                          ? "Approved"
                          : "Approve Quote"}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteDetails;
