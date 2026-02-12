import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import {
  Flame, Leaf, Package, AlertTriangle, Truck, ChevronRight,
} from "lucide-react"
import batchesDataRaw from "@/data/roast_batches.json"
import greenCoffeeDataRaw from "@/data/green_coffee_inventory.json"
import packagingData from "@/data/packaging_inventory.json"
import ordersData from "@/data/orders.json"
import csIssuesData from "@/data/cs_issues.json"
import qualityInvestigationsData from "@/data/quality_investigations.json"
import deliveriesData from "@/data/deliveries.json"
import importersData from "@/data/importers.json"
import { productName, employeeName } from "@/lib/lookups"
import { fmtDate, fmtPct, fmtWeight } from "@/lib/formatters"

const batchStatuses = ["Scheduled", "Roasting", "Resting", "QC Check", "Approved", "Bagged", "Flagged"]

export function Production() {
  const [batches, setBatches] = useState(batchesDataRaw.map(b => ({ ...b })))
  const [greenCoffee, setGreenCoffee] = useState(greenCoffeeDataRaw.map(g => ({ ...g })))
  const [selectedBatch, setSelectedBatch] = useState<typeof batches[0] | null>(null)
  const [selectedOrigin, setSelectedOrigin] = useState<typeof greenCoffee[0] | null>(null)
  const [filterProduct, setFilterProduct] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Metrics
  const todayBatches = batches.filter(b => b.roast_date === "2025-02-05" || b.status === "Scheduled")
  const poundsToRoast = todayBatches.reduce((sum, b) => sum + b.input_weight, 0)
  const lowStockOrigins = greenCoffee.filter(g => g.status === "Low Stock" || g.bags_on_hand <= 3).length
  const restingBatches = batches.filter(b => b.status === "Resting" || b.status === "QC Check" || b.status === "Approved")
  const openQI = qualityInvestigationsData.filter(q => q.status !== "Closed").length
  const deliveriesToday = deliveriesData.filter(d => d.delivery_date === "2025-02-04").length

  // Filtered batches
  const filteredBatches = batches.filter(b => {
    if (filterProduct !== "all" && b.product_id !== filterProduct) return false
    if (filterStatus !== "all" && b.status !== filterStatus) return false
    return true
  })

  const uniqueProducts = [...new Set(batches.map(b => b.product_id))]

  // Quality flags
  const escalatedIssues = csIssuesData.filter(i => i.status === "Escalated to Ben" || (i.category === "quality" && i.status !== "Closed"))

  const updateBatchStatus = (batchId: string, newStatus: string) => {
    setBatches(prev => prev.map(b =>
      b.id === batchId
        ? { ...b, status: newStatus, qc_pass: newStatus === "Approved" ? true : newStatus === "Flagged" ? false : b.qc_pass }
        : b
    ))
    if (selectedBatch?.id === batchId) {
      setSelectedBatch(prev => prev ? { ...prev, status: newStatus } : null)
    }
  }

  const reorderOrigin = (originId: string) => {
    setGreenCoffee(prev => prev.map(g =>
      g.id === originId ? { ...g, status: "On Order" } : g
    ))
    setSelectedOrigin(null)
  }

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard label="Pounds to Roast Today" value={fmtWeight(poundsToRoast)} sub={`${todayBatches.length} batches scheduled`} />
        <MetricCard
          label="Origins Below 2-Week Supply"
          value={lowStockOrigins.toString()}
          sub={lowStockOrigins > 0 ? "Reorder needed" : "All stocked"}
          subColor={lowStockOrigins > 0 ? "text-amber-600" : "text-green-600"}
        />
        <MetricCard label="Batches Ready for Bagging" value={restingBatches.length.toString()} sub="Resting, QC, or approved" />
        <MetricCard
          label="Open Quality Investigations"
          value={openQI.toString()}
          subColor={openQI > 0 ? "text-amber-600" : "text-green-600"}
          sub={openQI > 0 ? "Investigation in progress" : "All clear"}
        />
        <MetricCard label="Delivery Stops Today" value={deliveriesToday.toString()} sub="Routes active" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roast Schedule — Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="h-4 w-4 text-muted-foreground" />
                  Today's Roast Schedule
                </CardTitle>
                <div className="flex gap-2">
                  <Select value={filterProduct} onValueChange={setFilterProduct}>
                    <SelectTrigger className="w-[160px] h-8 text-xs">
                      <SelectValue placeholder="All products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All products</SelectItem>
                      {uniqueProducts.map(p => (
                        <SelectItem key={p} value={p}>{productName(p)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      {batchStatuses.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Roaster</TableHead>
                    <TableHead className="text-right">Input (lbs)</TableHead>
                    <TableHead className="text-right">Output (lbs)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBatches.map(batch => (
                    <TableRow
                      key={batch.id}
                      className={`cursor-pointer hover:bg-muted/50 ${batch.status === "Flagged" ? "bg-red-50/50" : ""}`}
                      onClick={() => setSelectedBatch(batch)}
                    >
                      <TableCell className="font-medium">{batch.batch_number}</TableCell>
                      <TableCell>{productName(batch.product_id)}</TableCell>
                      <TableCell>{employeeName(batch.roaster)}</TableCell>
                      <TableCell className="text-right tabular-nums">{batch.input_weight}</TableCell>
                      <TableCell className="text-right tabular-nums">{batch.output_weight ?? "—"}</TableCell>
                      <TableCell>
                        <Select
                          value={batch.status}
                          onValueChange={(val) => {
                            updateBatchStatus(batch.id, val)
                          }}
                        >
                          <SelectTrigger className="h-7 w-[120px] text-xs p-1" onClick={(e) => e.stopPropagation()}>
                            <StatusBadge status={batch.status} />
                          </SelectTrigger>
                          <SelectContent>
                            {batchStatuses.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quality Flags */}
          {escalatedIssues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Quality Flags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {escalatedIssues.map(issue => (
                  <div key={issue.id} className="p-3 rounded-lg bg-red-50 cursor-pointer hover:bg-red-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-red-800">{issue.issue_number}: {issue.description.slice(0, 80)}</p>
                      <StatusBadge status={issue.status} />
                    </div>
                    <p className="text-xs text-red-600 mt-1">
                      Reported {fmtDate(issue.reported_date)} · {issue.category}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Green Coffee Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Leaf className="h-4 w-4 text-muted-foreground" />
                Green Coffee Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {greenCoffee.map(origin => (
                <div
                  key={origin.id}
                  className="flex items-center justify-between py-2 border-b last:border-0 cursor-pointer hover:bg-muted/50 rounded px-1 -mx-1"
                  onClick={() => setSelectedOrigin(origin)}
                >
                  <div>
                    <p className="text-sm font-medium">{origin.origin_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {origin.bags_on_hand} bags · Lot {origin.lot_number}
                    </p>
                  </div>
                  <StatusBadge status={origin.status} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Packaging Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                Packaging Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {packagingData.map(pkg => (
                <div key={pkg.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium capitalize">{pkg.item} ({pkg.size})</p>
                    <p className="text-xs text-muted-foreground">
                      {pkg.quantity_on_hand.toLocaleString()} on hand · Reorder at {pkg.reorder_point.toLocaleString()}
                    </p>
                  </div>
                  <StatusBadge status={pkg.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Batch Detail Sheet */}
      <Sheet open={!!selectedBatch} onOpenChange={() => setSelectedBatch(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedBatch && (
            <>
              <SheetHeader>
                <SheetTitle>Batch {selectedBatch.batch_number}</SheetTitle>
                <SheetDescription>{productName(selectedBatch.product_id)}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <StatusBadge status={selectedBatch.status} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Roast Date</p>
                    <p className="text-sm font-medium">{fmtDate(selectedBatch.roast_date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Roaster</p>
                    <p className="text-sm font-medium">{employeeName(selectedBatch.roaster)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Green Coffee Lot</p>
                    <p className="text-sm font-medium">{selectedBatch.green_coffee_lot}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Input Weight</p>
                    <p className="text-sm font-medium">{selectedBatch.input_weight} lbs</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Output Weight</p>
                    <p className="text-sm font-medium">{selectedBatch.output_weight ? `${selectedBatch.output_weight} lbs` : "—"}</p>
                  </div>
                  {selectedBatch.waste_shrinkage !== null && (
                    <div>
                      <p className="text-xs text-muted-foreground">Shrinkage</p>
                      <p className={`text-sm font-medium ${(selectedBatch.waste_shrinkage ?? 0) > 18 ? "text-red-600" : ""}`}>
                        {fmtPct(selectedBatch.waste_shrinkage ?? 0)}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Roast Profile</p>
                    <p className="text-sm font-medium">{selectedBatch.roast_profile_used}</p>
                  </div>
                </div>

                {selectedBatch.temperature_curve_notes && (
                  <div>
                    <p className="text-xs text-muted-foreground">Temperature Notes</p>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">{selectedBatch.temperature_curve_notes}</p>
                  </div>
                )}

                {selectedBatch.rest_start && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Rest Start</p>
                      <p className="text-sm font-medium">{fmtDate(selectedBatch.rest_start)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rest End</p>
                      <p className="text-sm font-medium">{selectedBatch.rest_end ? fmtDate(selectedBatch.rest_end) : "—"}</p>
                    </div>
                  </div>
                )}

                {/* QC Actions for resting batches */}
                {(selectedBatch.status === "Resting" || selectedBatch.status === "QC Check") && (
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-sm font-medium">QC Check</p>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => updateBatchStatus(selectedBatch.id, "Approved")}
                      >
                        Approve Batch
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => updateBatchStatus(selectedBatch.id, "Flagged")}
                      >
                        Flag for Investigation
                      </Button>
                    </div>
                  </div>
                )}

                {/* Status update for scheduled batches */}
                {selectedBatch.status === "Scheduled" && (
                  <div className="border-t pt-4">
                    <Button
                      className="w-full"
                      onClick={() => updateBatchStatus(selectedBatch.id, "Roasting")}
                    >
                      Start Roasting
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Origin Detail Sheet */}
      <Sheet open={!!selectedOrigin} onOpenChange={() => setSelectedOrigin(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedOrigin && (() => {
            const importer = importersData.find(i => i.id === selectedOrigin.importer)
            const weeklyBurn = 90 // approximate
            const weeksSupply = selectedOrigin.bags_on_hand > 0
              ? ((selectedOrigin.bags_on_hand * 132) / weeklyBurn).toFixed(1)
              : "0"
            return (
              <>
                <SheetHeader>
                  <SheetTitle>{selectedOrigin.origin_name}</SheetTitle>
                  <SheetDescription>{selectedOrigin.country} · Lot {selectedOrigin.lot_number}</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Bags on Hand</p>
                      <p className="text-2xl font-semibold">{selectedOrigin.bags_on_hand}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <StatusBadge status={selectedOrigin.status} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Weeks of Supply</p>
                      <p className={`text-sm font-medium ${Number(weeksSupply) < 3 ? "text-red-600" : "text-green-600"}`}>
                        {weeksSupply} weeks
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cost per lb</p>
                      <p className="text-sm font-medium">${selectedOrigin.cost_per_lb.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cupping Score</p>
                      <p className="text-sm font-medium">{selectedOrigin.cupping_score}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Organic</p>
                      <p className="text-sm font-medium">{selectedOrigin.organic_certified ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Arrival Date</p>
                      <p className="text-sm font-medium">{fmtDate(selectedOrigin.arrival_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Importer</p>
                      <p className="text-sm font-medium">{importer?.name ?? "Unknown"}</p>
                    </div>
                  </div>

                  {importer && (
                    <div className="p-3 bg-muted rounded">
                      <p className="text-xs text-muted-foreground">Lead Time</p>
                      <p className="text-sm font-medium">{importer.lead_time_weeks} weeks</p>
                    </div>
                  )}

                  {(selectedOrigin.status === "Low Stock" || selectedOrigin.bags_on_hand <= 3) && selectedOrigin.status !== "On Order" && (
                    <div className="border-t pt-4 space-y-2">
                      <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded">
                        At current rate, depleted in {weeksSupply} weeks. Reorder now to avoid stockout.
                      </p>
                      <Button className="w-full" onClick={() => reorderOrigin(selectedOrigin.id)}>
                        Reorder from {importer?.name ?? "supplier"}
                      </Button>
                    </div>
                  )}

                  {selectedOrigin.status === "On Order" && (
                    <div className="p-3 bg-blue-50 rounded">
                      <p className="text-sm text-blue-800 font-medium">Order placed — ETA {importer?.lead_time_weeks ?? 4} weeks</p>
                    </div>
                  )}
                </div>
              </>
            )
          })()}
        </SheetContent>
      </Sheet>
    </div>
  )
}
