import InvoicePayment from "@/components/shared/InvoicePayment";
import { useParams } from "react-router-dom";

const InvestorInvoicePage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <InvoicePayment id={id} />
    </div>
  );
};

export default InvestorInvoicePage;
