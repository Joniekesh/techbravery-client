import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Eye, UserCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ContactSupportDialog } from "@/components/ContactSupportDialog";

const AdminInvestmentsPage = () => {
  const investments = [
    {
      id: "001",
      investor: "Africa Ventures",
      platform: "ExAfrik P2P Exchange",
      amount: "$250,000",
      status: "active",
      date: "2024-01-10",
    },
    {
      id: "002",
      investor: "TechFund Capital",
      platform: "ExAfrik SaaS Suite",
      amount: "$500,000",
      status: "pending",
      date: "2024-01-12",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "PENDING":
      case "SUBMITTED":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "ACCEPTED":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300";
      case "ON_HOLD":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "PAID":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "EXPIRED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "DECLINED":
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="mt-20 ml-4 mr-4 mb-4 flex-1 flex-col">
      <h1 className="text-4xl font-bold my-6">
        <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Investments
        </span>
      </h1>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Investment Management
        </CardTitle>
        <CardDescription>Track and manage platform investments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investor</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Investment Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell className="font-medium">
                  {investment.investor}
                </TableCell>
                <TableCell>{investment.platform}</TableCell>
                <TableCell className="font-medium">
                  {investment.amount}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(investment.status)}>
                    {investment.status}
                  </Badge>
                </TableCell>
                <TableCell>{investment.date}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      title="View Dashboard"
                    >
                      <Link to="/admin-dashboard/investor/111">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <ContactSupportDialog
                      trigger={
                        <Button
                          size="sm"
                          variant="outline"
                          title="Contact Investor"
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminInvestmentsPage;
