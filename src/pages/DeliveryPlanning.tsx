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
import { Truck, MapPin, AlertTriangle } from "lucide-react"
import deliveriesData from "@/data/deliveries.json"
import routesData from "@/data/routes.json"
import { employeeName } from "@/lib/lookups"

export function DeliveryPlanning() {
  const todayDeliveries = deliveriesData.filter(
    (d) => d.delivery_date === "2025-02-04"
  )
  const yesterdayExceptions = deliveriesData.filter(
    (d) => d.delivery_date === "2025-02-03" && d.status === "Exception"
  )

  const totalStopsToday = todayDeliveries.reduce(
    (sum, d) => sum + d.stop_count,
    0
  )
  const totalWeightToday = todayDeliveries.reduce(
    (sum, d) => sum + d.total_weight,
    0
  )
  const notStagedCount = todayDeliveries.filter(
    (d) => d.status === "Planned"
  ).length

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Stops Today"
          value={totalStopsToday.toString()}
          sub={`${todayDeliveries.length} routes active`}
        />
        <MetricCard
          label="Total Weight Going Out"
          value={`${totalWeightToday} lbs`}
          sub="Across all routes"
        />
        <MetricCard
          label="Orders Not Yet Staged"
          value={notStagedCount.toString()}
          sub={notStagedCount > 0 ? "Needs attention" : "All staged"}
          subColor={notStagedCount > 0 ? "text-amber-600" : "text-green-600"}
        />
        <MetricCard
          label="Failed Deliveries Yesterday"
          value={yesterdayExceptions.length.toString()}
          sub={
            yesterdayExceptions.length > 0
              ? "Needs retry today"
              : "None"
          }
          subColor={
            yesterdayExceptions.length > 0
              ? "text-red-600"
              : "text-green-600"
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Delivery Manifest */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  Today's Delivery Manifest
                </CardTitle>
                <DeferredBadge label="Route Optimization — Full Build" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead className="text-right">Stops</TableHead>
                    <TableHead className="text-right">Weight</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayDeliveries.map((del) => {
                    const route = routesData.find(
                      (r) => r.id === del.route_id
                    )
                    return (
                      <TableRow key={del.id}>
                        <TableCell className="font-medium">
                          {route?.route_name ?? del.route_id}
                        </TableCell>
                        <TableCell>{employeeName(del.driver)}</TableCell>
                        <TableCell className="text-right">
                          {del.stop_count}
                        </TableCell>
                        <TableCell className="text-right">
                          {del.total_weight} lbs
                        </TableCell>
                        <TableCell>{del.departure_time}</TableCell>
                        <TableCell>
                          <StatusBadge status={del.status} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Driver Assignments */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Driver Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {routesData.map((route) => {
                const delivery = todayDeliveries.find(
                  (d) => d.route_id === route.id
                )
                return (
                  <div
                    key={route.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{route.route_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {employeeName(route.driver)} · {route.days_of_week}
                      </p>
                    </div>
                    {delivery ? (
                      <StatusBadge status={delivery.status} />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Not scheduled today
                      </span>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Yesterday's Exceptions */}
          {yesterdayExceptions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Yesterday's Exceptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {yesterdayExceptions.map((del) => {
                  const route = routesData.find(
                    (r) => r.id === del.route_id
                  )
                  return (
                    <div
                      key={del.id}
                      className="p-3 rounded-lg bg-amber-50"
                    >
                      <p className="text-sm font-medium text-amber-800">
                        {route?.route_name}
                      </p>
                      <p className="text-xs text-amber-600 mt-1">
                        {del.delivery_notes}
                      </p>
                      <p className="text-xs text-amber-600">
                        Driver: {employeeName(del.driver)}
                      </p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}

          {/* Deferred Features */}
          <Card>
            <CardContent className="pt-6 space-y-2">
              <DeferredBadge label="Route map with optimized sequence" />
              <br />
              <DeferredBadge label="Rush order additions" />
              <br />
              <DeferredBadge label="Delivery change requests" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
