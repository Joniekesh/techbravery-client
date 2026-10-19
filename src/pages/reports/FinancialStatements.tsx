import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Cell,
  Bar,
  BarChart,
} from "recharts";

const FinancialStatements = () => {
  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
    { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000 },
    { month: "Mar", revenue: 48000, expenses: 33000, profit: 15000 },
    { month: "Apr", revenue: 61000, expenses: 40000, profit: 21000 },
    { month: "May", revenue: 73000, expenses: 45000, profit: 28000 },
    { month: "Jun", revenue: 68000, expenses: 42000, profit: 26000 },
  ];

  const expenseBreakdown = [
    { name: "Development", value: 35, color: "#0088FE" },
    { name: "Marketing", value: 25, color: "#00C49F" },
    { name: "Operations", value: 20, color: "#FFBB28" },
    { name: "Infrastructure", value: 15, color: "#FF8042" },
    { name: "Other", value: 5, color: "#8884D8" },
  ];

  const balanceSheet = [
    {
      category: "Assets",
      items: [
        { name: "Cash and Cash Equivalents", amount: 145000, change: "+12%" },
        { name: "Accounts Receivable", amount: 67000, change: "+8%" },
        { name: "Equipment & Software", amount: 89000, change: "+15%" },
        { name: "Intellectual Property", amount: 250000, change: "+20%" },
      ],
    },
    {
      category: "Liabilities",
      items: [
        { name: "Accounts Payable", amount: 23000, change: "-5%" },
        { name: "Accrued Expenses", amount: 15000, change: "+3%" },
        { name: "Long-term Debt", amount: 45000, change: "-8%" },
      ],
    },
    {
      category: "Equity",
      items: [
        { name: "Retained Earnings", amount: 367000, change: "+25%" },
        { name: "Common Stock", amount: 101000, change: "0%" },
      ],
    },
  ];

  const downloadReport = () => {
    // Create a downloadable financial report
    const reportData = {
      reportDate: new Date().toISOString(),
      summary: {
        totalRevenue: revenueData.reduce((sum, item) => sum + item.revenue, 0),
        totalExpenses: revenueData.reduce(
          (sum, item) => sum + item.expenses,
          0,
        ),
        netProfit: revenueData.reduce((sum, item) => sum + item.profit, 0),
      },
      balanceSheet,
      revenueData,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `financial-statements-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Financial{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Statements
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive financial overview and performance metrics
              </p>
            </div>
            <Button onClick={downloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold">$347,000</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +18% from last period
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Profit</p>
                    <p className="text-2xl font-bold">$120,000</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +22% margin improvement
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Operating Expenses
                    </p>
                    <p className="text-2xl font-bold">$227,000</p>
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      -3% optimization
                    </p>
                  </div>
                  <PieChart className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trend Chart */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses Trend</CardTitle>
                <CardDescription>
                  Monthly performance over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0088FE"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#FF8042"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#00C49F"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>
                  Current period expense allocation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <RechartsPieChart
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {expenseBreakdown.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Balance Sheet */}
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet Summary</CardTitle>
              <CardDescription>
                Current financial position and year-over-year changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                {balanceSheet.map((section, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg mb-4">
                      {section.category}
                    </h3>
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${item.amount.toLocaleString()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              item.change.startsWith("+")
                                ? "default"
                                : item.change.startsWith("-")
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {item.change}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Ratios */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Profitability Ratios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Gross Profit Margin</span>
                    <span className="font-medium">65.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Profit Margin</span>
                    <span className="font-medium">34.6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI</span>
                    <span className="font-medium">28.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Liquidity Ratios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Current Ratio</span>
                    <span className="font-medium">3.2:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quick Ratio</span>
                    <span className="font-medium">2.8:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash Ratio</span>
                    <span className="font-medium">1.9:1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Revenue Growth</span>
                    <span className="font-medium text-green-600">+18.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit Growth</span>
                    <span className="font-medium text-green-600">+22.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Growth</span>
                    <span className="font-medium text-green-600">+15.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialStatements;
