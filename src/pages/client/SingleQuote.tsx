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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { formatCurrency } from "@/utils/formatCurrency";
import { fetchProjectFeatures } from "@/redux/actions/quoteActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const SingleQuote = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [estimateAmount, setEstimateAmount] = useState("22000");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const quote = useAppSelector((state) => state.quote);
  const projectFeature = quote?.projectFeature;

  useEffect(() => {
    dispatch(fetchProjectFeatures());
  }, [dispatch]);

  const fetchQuote = async () => {
    const res = await makeRequest.get(`/quote/find/${id}`);
    return res.data;
  };

  const fetchMileStoneTemplates = async () => {
    const res = await makeRequest.get("/milestone-template");
    return res.data;
  };

  const {
    data: templates = [],
    isLoading: isLoadingTemplates,
    isError: isErrorTemplates,
  } = useQuery({
    queryKey: ["all-milestone-template"],
    queryFn: fetchMileStoneTemplates,
  });

  console.log("TEMPLATES", templates);

  const approveQuoteMutation = useMutation({
    mutationFn: async () => {
      const res = await makeRequest.put(`/quote/${id}/approve`);
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
      toast.success("Quote approved successfully.");
    },
  });

  const { data, isLoading, isError } = useQuery<IQuote>({
    queryKey: ["quote", id],
    queryFn: fetchQuote,
    enabled: !!id,
  });

  console.log("QUOTE DATA", data);

  const isTerminal =
    data?.status === QuoteStatus.ACCEPTED ||
    data?.status === QuoteStatus.DECLINED ||
    data?.status === QuoteStatus.EXPIRED;

  const currentProjectMilestone = templates?.find(
    (template: any) => template.key === data?.projectType?.value,
  );

  const groupedPhases = {
    PHASE_ONE: currentProjectMilestone?.phases?.slice(0, 3) || [],
    PHASE_TWO: currentProjectMilestone?.phases?.slice(3, 6) || [],
    PHASE_THREE: currentProjectMilestone?.phases?.slice(6) || [],
  };

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
    toast.success("Quote has been rejected and client will be notified.");
  };

  const handleSendEstimate = () => {
    toast.success(`Estimate of $${estimateAmount} sent to client.`);
    setIsEditing(false);
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
              <Link to="/client-dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
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
                {data?.projectType?.label} for {data?.company}
              </p>
              {data?.status === QuoteStatus.ACCEPTED && (
                <div className="mt-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800">
                        Project Pending Activation
                      </p>
                      <p className="text-sm text-yellow-700 mt-1">
                        This engagement will officially commence upon
                        confirmation of the Initial Milestone payment. The
                        project timeline and delivery schedule will begin from
                        the date payment is received.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {data?.status === QuoteStatus.DRAFT ||
              (data?.status === QuoteStatus.SUBMITTED && (
                <Link to={`/client-dashboard/quote/${id}/edit`}>
                  <Button className="bg-gradient-to-r from-primary to-primary-glow">
                    Edit Quote
                  </Button>
                </Link>
              ))}

            {/* <div className="flex gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <Button
                variant="outline"
                disabled={data?.status !== QuoteStatus.SUBMITTED}
                className="text-red-600 border-red-200 hover:bg-transparent disabled:cursor-not-allowed"
                onClick={handleReject}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>

              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleApprove}
                disabled={isTerminal || approveQuoteMutation.isPending}
              >
                {approveQuoteMutation.isPending ? (
                  "Approving..."
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </>
                )}
              </Button>
            </div> */}
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
              <Card className="bg-amber-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Project Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Client Budget</Label>
                    <p className="text-lg font-semibold">
                      {data?.budgetRange?.label}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Estimated Cost
                    </Label>
                    <p className="text-lg font-semibold">
                      ${formatCurrency(data?.estimatedCost)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Expected Timeline
                    </Label>
                    <p className="text-lg font-semibold">
                      {getTimeline(data?.timeline)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">Priority</Label>
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

              {/* Estimate */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Send Estimate</CardTitle>
                  <CardDescription>
                    Provide a detailed project estimate
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="w-full"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Create Estimate
                    </Button>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="estimate">Estimate Amount (USD)</Label>
                        <Input
                          id="estimate"
                          value={estimateAmount}
                          onChange={(e) => setEstimateAmount(e.target.value)}
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
                      <div className="flex gap-2">
                        <Button onClick={handleSendEstimate} className="flex-1">
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card> */}

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Submitted</span>
                      <span className="font-medium">
                        {new Date(data?.createdAt).toDateString()!}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Last Contact
                      </span>

                      <span className="font-medium">
                        {new Date(data?.updatedAt).toDateString()!}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-3 border-t pt-3">
                    Delivery timelines are calculated from the date the Initial
                    Milestone payment is confirmed.
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card>
                <CardContent className="space-y-6">
                  <div className="text-sm text-muted-foreground bg-secondary/30 mt-3 p-3 rounded-md">
                    The project is structured into three commercial phases. Work
                    will commence upon confirmation of the Initial (40%)
                    milestone payment.
                  </div>

                  {/* ================= PHASE 1 ================= */}
                  <div className="relative border rounded-xl p-5 bg-card border-blue-200 dark:border-blue-900">
                    <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-blue-500 dark:bg-blue-400" />

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          Phase 1 — Project Initiation
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Activation Milestone (40%)
                        </p>
                      </div>

                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        Initial Payment Required
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {groupedPhases.PHASE_ONE.map((phase, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-secondary/40 dark:bg-secondary/20 p-3 rounded-lg"
                        >
                          <span className="text-sm text-foreground">
                            {phase.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Included
                          </Badge>
                        </div>
                      ))}
                    </div>

                    {data?.status === QuoteStatus.ACCEPTED && (
                      <Button
                        className="w-full mt-5 bg-gradient-to-r from-primary to-primary-glow"
                        onClick={() =>
                          navigate(`/client-dashboard/invoices/111/pay`)
                        }
                      >
                        Make Initial Payment (40%)
                      </Button>
                    )}
                  </div>

                  {/* ================= PHASE 2 ================= */}
                  <div className="relative border rounded-xl p-5 bg-card border-yellow-200 dark:border-yellow-900">
                    <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-yellow-500 dark:bg-yellow-400" />

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          Phase 2 — Core Development
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Secondary Milestone (30%)
                        </p>
                      </div>

                      <Badge variant="outline">Scheduled</Badge>
                    </div>

                    <div className="space-y-2">
                      {groupedPhases.PHASE_TWO.map((phase, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-secondary/40 dark:bg-secondary/20 p-3 rounded-lg"
                        >
                          <span className="text-sm text-foreground">
                            {phase.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Upcoming
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ================= PHASE 3 ================= */}
                  <div className="relative border rounded-xl p-5 bg-card border-green-200 dark:border-green-900">
                    <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-green-500 dark:bg-green-400" />

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          Phase 3 — Finalization & Deployment
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Final Milestone (30%)
                        </p>
                      </div>

                      <Badge variant="outline">Scheduled</Badge>
                    </div>

                    <div className="space-y-2">
                      {groupedPhases.PHASE_THREE.map((phase, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-secondary/40 dark:bg-secondary/20 p-3 rounded-lg"
                        >
                          <span className="text-sm text-foreground">
                            {phase.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Upcoming
                          </Badge>
                        </div>
                      ))}
                    </div>
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

export default SingleQuote;
