import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/MetricCard"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts"
import chartData from "@/data/chart_data.json"
import batchesData from "@/data/roast_batches.json"
import csIssuesData from "@/data/cs_issues.json"
import greenCoffeeData from "@/data/green_coffee_inventory.json"

export function ProductionRollUp() {
  // Metrics
  const thisWeekBatches = batchesData.filter((b) =>
    b.roast_date.startsWith("2025-02")
  )
  const poundsRoasted = thisWeekBatches
    .filter((b) => b.output_weight !== null)
    .reduce((sum, b) => sum + (b.output_weight ?? 0), 0)
  const poundsPlanned = 560

  const completedBatches = batchesData.filter(
    (b) => b.input_weight && b.output_weight
  )
  const avgWaste =
    completedBatches.length > 0
      ? completedBatches.reduce((sum, b) => sum + (b.waste_shrinkage ?? 0), 0) /
        completedBatches.length
      : 0

  const qualityComplaints = csIssuesData.filter(
    (i) => i.category === "quality" && i.reported_date.startsWith("2025-0")
  ).length

  const lowStockOrigins = greenCoffeeData.filter(
    (g) => g.status === "Low Stock" || g.bags_on_hand <= 3
  ).length

  // On-time delivery % (prototype static)
  const onTimeDelivery = 94.2

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          label="Pounds Roasted This Week"
          value={poundsRoasted.toLocaleString()}
          sub={`Plan: ${poundsPlanned} lbs`}
          progress={(poundsRoasted / poundsPlanned) * 100}
          progressColor={
            poundsRoasted >= poundsPlanned * 0.9
              ? "bg-green-500"
              : "bg-amber-500"
          }
        />
        <MetricCard
          label="Waste Rate"
          value={`${avgWaste.toFixed(1)}%`}
          sub="Target: <18%"
          subColor={avgWaste > 18 ? "text-red-600" : "text-green-600"}
        />
        <MetricCard
          label="Quality Complaints"
          value={qualityComplaints.toString()}
          sub="This month"
          subColor={
            qualityComplaints > 2 ? "text-amber-600" : "text-green-600"
          }
        />
        <MetricCard
          label="Origins Below 2-Week Supply"
          value={lowStockOrigins.toString()}
          sub={lowStockOrigins > 0 ? "Reorder needed" : "All stocked"}
          subColor={lowStockOrigins > 0 ? "text-amber-600" : "text-green-600"}
        />
        <MetricCard
          label="On-Time Delivery %"
          value={`${onTimeDelivery}%`}
          sub="Target: >95%"
          subColor={onTimeDelivery >= 95 ? "text-green-600" : "text-amber-600"}
          progress={onTimeDelivery}
          progressColor={
            onTimeDelivery >= 95 ? "bg-green-500" : "bg-amber-500"
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Throughput */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Production Throughput (lbs/week)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData.weekly_throughput}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="actual"
                  name="Actual"
                  fill="hsl(20, 55%, 28%)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="planned"
                  name="Planned"
                  fill="hsl(35, 40%, 55%)"
                  radius={[4, 4, 0, 0]}
                  opacity={0.5}
                />
                <Line
                  dataKey="moving_avg"
                  name="4-Week Avg"
                  stroke="hsl(155, 35%, 40%)"
                  strokeWidth={2}
                  dot={false}
                  type="monotone"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Waste / Shrinkage Rate (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData.weekly_waste_rate}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={[14, 20]}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip formatter={(v: unknown) => `${v}%`} />
                <ReferenceLine
                  y={18}
                  stroke="hsl(10, 65%, 40%)"
                  strokeDasharray="4 4"
                  label={{
                    value: "18% Target",
                    position: "right",
                    fontSize: 11,
                    fill: "hsl(10, 65%, 40%)",
                  }}
                />
                <Line
                  dataKey="rate"
                  name="Waste Rate"
                  stroke="hsl(20, 55%, 28%)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(20, 55%, 28%)" }}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Complaint Frequency */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Quality Complaints per 1,000 lbs Shipped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData.quality_complaints_per_1000}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="rate"
                  name="Complaints/1000 lbs"
                  fill="hsl(10, 65%, 40%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inventory Runway */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Green Coffee Inventory Runway
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {chartData.inventory_runway.map((item) => (
              <div key={item.origin} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.origin}</span>
                  <span
                    className={`font-medium ${
                      item.weeks_supply === 0
                        ? "text-red-600"
                        : item.weeks_supply < 3
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  >
                    {item.weeks_supply === 0
                      ? "Depleted"
                      : `${item.weeks_supply} weeks`}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.weeks_supply === 0
                        ? "bg-red-500"
                        : item.weeks_supply < 3
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min((item.weeks_supply / 16) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
