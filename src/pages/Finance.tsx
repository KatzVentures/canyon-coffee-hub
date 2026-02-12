import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { DeferredBadge } from "@/components/dashboard/DeferredBadge"
import { DollarSign, TrendingUp } from "lucide-react"
import invoicesData from "@/data/invoices.json"
import ordersData from "@/data/orders.json"
import { accountName } from "@/lib/lookups"
import { fmtCurrency, fmtDateFull } from "@/lib/formatters"

export function Finance() {
  const cashOnHand = 48500
  const arOver30 = invoicesData
    .filter((i) => i.days_outstanding > 30 && i.payment_status !== "Paid")
    .reduce((sum, i) => sum + i.amount, 0)

  // AP due this week (prototype static)
  const apDueThisWeek = 12400

  const revenueMTD = ordersData
    .filter((o) => o.order_date.startsWith("2025-02"))
    .reduce((sum, o) => sum + o.total_revenue, 0)

  // Prior month revenue (prototype static)
  const revenuePriorMonth = 88200

  // Outstanding invoices sorted by days overdue
  const outstandingInvoices = invoicesData
    .filter((i) => i.payment_status !== "Paid")
    .sort((a, b) => b.days_outstanding - a.days_outstanding)

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Cash on Hand"
          value={fmtCurrency(cashOnHand)}
          sub="Operating account"
        />
        <MetricCard
          label="AR >30 Days"
          value={fmtCurrency(arOver30)}
          sub={`${invoicesData.filter((i) => i.days_outstanding > 30 && i.payment_status !== "Paid").length} invoices`}
          subColor={arOver30 > 5000 ? "text-red-600" : "text-green-600"}
        />
        <MetricCard
          label="AP Due This Week"
          value={fmtCurrency(apDueThisWeek)}
          sub="Green coffee + supplies"
        />
        <MetricCard
          label="Revenue MTD"
          value={fmtCurrency(revenueMTD)}
          sub={`Prior month: ${fmtCurrency(revenuePriorMonth)}`}
          delta={
            revenueMTD > revenuePriorMonth * 0.3 ? "On track" : "Behind"
          }
          deltaType={
            revenueMTD > revenuePriorMonth * 0.3 ? "increase" : "decrease"
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AR Aging Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  Accounts Receivable Aging
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Issued</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead className="text-right">Days Out</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outstandingInvoices.map((inv) => (
                    <TableRow
                      key={inv.id}
                      className={
                        inv.payment_status === "Overdue"
                          ? "bg-red-50/50"
                          : ""
                      }
                    >
                      <TableCell className="font-medium">
                        {inv.invoice_number}
                      </TableCell>
                      <TableCell>{accountName(inv.account_id)}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {fmtCurrency(inv.amount)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {fmtDateFull(inv.issued_date)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {fmtDateFull(inv.due_date)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {inv.days_outstanding}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={inv.payment_status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Comparison + Deferred */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                Revenue Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>February MTD</span>
                  <span className="font-medium tabular-nums">
                    {fmtCurrency(revenueMTD)}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.min((revenueMTD / 95000) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Target: $95,000
                </p>
              </div>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">January total</span>
                  <span className="tabular-nums">
                    {fmtCurrency(revenuePriorMonth)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Feb last year
                  </span>
                  <span className="tabular-nums">{fmtCurrency(72400)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deferred Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-muted-foreground">
                Financial Intelligence Suite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <DeferredBadge label="Cash position forecasting" />
              <br />
              <DeferredBadge label="AP management" />
              <br />
              <DeferredBadge label="Account profitability analysis" />
              <br />
              <DeferredBadge label="Cost accounting" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
