import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import {
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Users,
  Package,
} from "lucide-react"
import accountsData from "@/data/accounts.json"
import ordersData from "@/data/orders.json"
import invoicesData from "@/data/invoices.json"
import csIssuesData from "@/data/cs_issues.json"
import qualityInvestigationsData from "@/data/quality_investigations.json"
import batchesData from "@/data/roast_batches.json"
import { fmtCurrency } from "@/lib/formatters"

export function Dashboard() {
  const navigate = useNavigate()

  // Revenue MTD — sum of all orders in Feb 2025
  const revenueMTD = ordersData
    .filter((o) => o.order_date.startsWith("2025-02"))
    .reduce((sum, o) => sum + o.total_revenue, 0)
  const revenueTarget = 95000

  // Active accounts
  const activeAccounts = accountsData.filter((a) => a.stage === "Active").length
  const newThisMonth = accountsData.filter(
    (a) => a.start_date && a.start_date.startsWith("2024-0")
  ).length
  void newThisMonth

  // Pounds shipped this week (orders with status Delivered)
  const poundsShipped = ordersData
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.total_weight_lbs, 0)

  // Cash position (simplified — revenue from paid invoices minus outstanding)
  const paidInvoices = invoicesData
    .filter((i) => i.payment_status === "Paid")
    .reduce((sum, i) => sum + i.amount, 0)
  void paidInvoices
  const cashPosition = 48500 // realistic static value for prototype

  // Open quality issues
  const openQualityIssues = qualityInvestigationsData.filter(
    (qi) => qi.status !== "Closed"
  ).length

  // Account health
  const atRiskAccounts = accountsData.filter((a) => a.stage === "At Risk")
  const churnedAccounts = accountsData.filter((a) => a.stage === "Churned")
  const pipelineAccounts = accountsData.filter(
    (a) => !["Active", "At Risk", "Churned"].includes(a.stage)
  )

  // Production status
  const scheduledBatches = batchesData.filter((b) => b.status === "Scheduled").length
  const restingBatches = batchesData.filter((b) => b.status === "Resting").length
  const flaggedBatches = batchesData.filter((b) => b.status === "Flagged").length

  // Alerts
  const openIssues = csIssuesData.filter(
    (i) => !["Closed", "Resolved"].includes(i.status)
  )
  const escalatedIssues = csIssuesData.filter(
    (i) => i.status === "Escalated to Ben"
  )
  const overdueInvoices = invoicesData.filter(
    (i) => i.payment_status === "Overdue"
  )

  const alerts = [
    ...(escalatedIssues.length > 0
      ? [
          {
            type: "error" as const,
            message: `Quality complaint escalated — ${escalatedIssues[0].description.slice(0, 60)}...`,
            detail: `${escalatedIssues[0].issue_number} · Escalated to Ben`,
            link: "/production",
          },
        ]
      : []),
    ...(atRiskAccounts.length > 0
      ? [
          {
            type: "warning" as const,
            message: `${atRiskAccounts[0].account_name} flagged as at-risk — ordering volume declining`,
            detail: `${atRiskAccounts[0].monthly_volume_lbs} lbs/month · Last order declining`,
            link: "/pipeline",
          },
        ]
      : []),
    ...(overdueInvoices.length > 0
      ? [
          {
            type: "warning" as const,
            message: `${overdueInvoices.length} overdue invoices totaling ${fmtCurrency(overdueInvoices.reduce((s, i) => s + i.amount, 0))}`,
            detail: `Oldest: ${overdueInvoices[0].days_outstanding} days outstanding`,
            link: "/finance",
          },
        ]
      : []),
  ].slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Good morning, Rachel</h2>
        <p className="text-sm text-muted-foreground">
          Snapshot as of Wednesday, Feb 5, 2025
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          label="Revenue MTD"
          value={fmtCurrency(revenueMTD)}
          sub={`Target: ${fmtCurrency(revenueTarget)}`}
          progress={(revenueMTD / revenueTarget) * 100}
          progressColor="bg-primary"
          onClick={() => navigate("/finance")}
        />
        <MetricCard
          label="Active Accounts"
          value={activeAccounts.toString()}
          sub={`${pipelineAccounts.length} in pipeline`}
          delta="+2"
          deltaType="increase"
          onClick={() => navigate("/pipeline")}
        />
        <MetricCard
          label="Pounds Shipped"
          value={poundsShipped.toLocaleString()}
          sub="This week"
          footnote="vs. 850 last week"
          delta="+12%"
          deltaType="increase"
        />
        <MetricCard
          label="Cash Position"
          value={fmtCurrency(cashPosition)}
          sub={`AR >30d: ${fmtCurrency(invoicesData.filter((i) => i.days_outstanding > 30).reduce((s, i) => s + i.amount, 0))}`}
          onClick={() => navigate("/finance")}
        />
        <MetricCard
          label="Open Quality Issues"
          value={openQualityIssues.toString()}
          sub={openQualityIssues > 0 ? "Investigation in progress" : "All clear"}
          subColor={openQualityIssues > 0 ? "text-amber-600" : "text-green-600"}
          onClick={() => navigate("/production")}
        />
      </div>

      {/* Middle sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Health */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Account Health
              </CardTitle>
              <button
                onClick={() => navigate("/pipeline")}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">Active accounts</span>
              </div>
              <span className="text-sm font-medium">{activeAccounts}</span>
            </div>
            {atRiskAccounts.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-sm">{a.account_name}</span>
                </div>
                <StatusBadge status="At Risk" />
              </div>
            ))}
            {churnedAccounts.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="text-sm text-muted-foreground">
                    {a.account_name}
                  </span>
                </div>
                <StatusBadge status="Churned" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Production Status */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                Production Status
              </CardTitle>
              <button
                onClick={() => navigate("/production-rollup")}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                Roll-up <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Batches scheduled today</span>
              <Badge variant="secondary">{scheduledBatches}</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Batches resting</span>
              <Badge variant="secondary">{restingBatches}</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Batches flagged for investigation</span>
              <Badge
                className={
                  flaggedBatches > 0
                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                    : ""
                }
                variant={flaggedBatches === 0 ? "secondary" : undefined}
              >
                {flaggedBatches}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Open CS issues</span>
              <Badge
                className={
                  openIssues.length > 3
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    : ""
                }
                variant={openIssues.length <= 3 ? "secondary" : undefined}
              >
                {openIssues.length}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Top Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((alert, i) => (
              <div
                key={i}
                onClick={() => navigate(alert.link)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  alert.type === "error"
                    ? "bg-red-50 hover:bg-red-100"
                    : "bg-amber-50 hover:bg-amber-100"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    alert.type === "error"
                      ? "text-red-800"
                      : "text-amber-800"
                  }`}
                >
                  {alert.message}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    alert.type === "error"
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}
                >
                  {alert.detail}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
