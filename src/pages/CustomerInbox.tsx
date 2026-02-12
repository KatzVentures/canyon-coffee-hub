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
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import {
  Inbox, AlertTriangle, Truck, FileText, ChevronRight, Plus,
} from "lucide-react"
import csIssuesDataRaw from "@/data/cs_issues.json"
import qualityInvestigationsDataRaw from "@/data/quality_investigations.json"
import deliveriesData from "@/data/deliveries.json"
import invoicesData from "@/data/invoices.json"
import batchesData from "@/data/roast_batches.json"
import accountsData from "@/data/accounts.json"
import { accountName, employeeName, productName, routeName } from "@/lib/lookups"
import { fmtCurrency, fmtDate } from "@/lib/formatters"

const issueStatuses = ["Reported", "Investigating", "Escalated to Ben", "Resolved", "Closed"]
const issueCategories = ["order status", "delivery", "quality", "invoice", "general"]

interface CsIssue {
  id: string
  issue_number: string
  account_id: string
  category: string
  description: string
  reported_by: string
  reported_date: string
  assigned_to: string
  resolution_notes: string | null
  resolution_date: string | null
  status: string
  order_id: string | null
  delivery_id: string | null
  batch_id: string | null
}

interface QualityInvestigation {
  id: string
  investigation_number: string
  linked_cs_issue: string
  linked_batches: string[]
  symptom_description: string
  root_cause: string | null
  corrective_action: string | null
  investigation_hours: number
  status: string
}

export function CustomerInbox() {
  const [issues, setIssues] = useState<CsIssue[]>(csIssuesDataRaw.map(i => ({ ...i })) as CsIssue[])
  const [investigations, setInvestigations] = useState<QualityInvestigation[]>(qualityInvestigationsDataRaw.map(q => ({ ...q })) as QualityInvestigation[])
  const [selectedIssue, setSelectedIssue] = useState<CsIssue | null>(null)
  const [selectedInvestigation, setSelectedInvestigation] = useState<QualityInvestigation | null>(null)
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showNewIssue, setShowNewIssue] = useState(false)

  // New issue form
  const [newAccount, setNewAccount] = useState("")
  const [newCategory, setNewCategory] = useState("general")
  const [newDescription, setNewDescription] = useState("")
  const [newReportedBy, setNewReportedBy] = useState("")

  // Investigation form state
  const [rootCause, setRootCause] = useState("")
  const [correctiveAction, setCorrectiveAction] = useState("")

  // Metrics
  const openIssues = issues.filter(i => i.status !== "Closed" && i.status !== "Resolved")
  const newIssues = issues.filter(i => i.status === "Reported")
  const oldestOpen = openIssues.length > 0
    ? openIssues.reduce((oldest, i) => (i.reported_date < oldest.reported_date ? i : oldest))
    : null
  const deliveriesToday = deliveriesData.filter(d => d.delivery_date === "2025-02-05" || d.delivery_date === "2025-02-04")
  const overdueInvoices = invoicesData.filter(i => i.payment_status === "Overdue")

  // Filter
  const filteredIssues = issues.filter(i => {
    if (filterCategory !== "all" && i.category !== filterCategory) return false
    if (filterStatus !== "all" && i.status !== filterStatus) return false
    return true
  })

  // Quality escalations
  const escalatedIssues = issues.filter(i =>
    i.status === "Escalated to Ben" || (i.category === "quality" && i.status !== "Closed" && i.status !== "Resolved")
  )

  const updateIssueStatus = (issueId: string, newStatus: string) => {
    setIssues(prev => prev.map(i =>
      i.id === issueId
        ? {
            ...i,
            status: newStatus,
            resolution_date: (newStatus === "Resolved" || newStatus === "Closed") ? "2025-02-05" : i.resolution_date,
          }
        : i
    ))
    if (selectedIssue?.id === issueId) {
      setSelectedIssue(prev => prev ? {
        ...prev,
        status: newStatus,
        resolution_date: (newStatus === "Resolved" || newStatus === "Closed") ? "2025-02-05" : prev.resolution_date,
      } : null)
    }
  }

  const addIssue = () => {
    if (!newDescription.trim() || !newAccount) return
    const count = issues.length + 1
    const newIssueObj = {
      id: `issue-new-${Date.now()}`,
      issue_number: `CS-2025-${String(46 + count).padStart(3, "0")}`,
      account_id: newAccount,
      category: newCategory,
      description: newDescription,
      reported_by: newReportedBy || "Unknown",
      reported_date: "2025-02-05",
      assigned_to: "emp-005",
      resolution_notes: null,
      resolution_date: null,
      status: "Reported",
      order_id: null,
      delivery_id: null,
      batch_id: null,
    }
    setIssues(prev => [...prev, newIssueObj])
    setNewAccount("")
    setNewCategory("general")
    setNewDescription("")
    setNewReportedBy("")
    setShowNewIssue(false)
  }

  const updateInvestigation = (invId: string, updates: Partial<typeof investigations[0]>) => {
    setInvestigations(prev => prev.map(q =>
      q.id === invId ? { ...q, ...updates } : q
    ))
    if (selectedInvestigation?.id === invId) {
      setSelectedInvestigation(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  const closeInvestigation = (invId: string) => {
    updateInvestigation(invId, {
      root_cause: rootCause,
      corrective_action: correctiveAction,
      status: "Closed",
    })
    // Also resolve the linked CS issue
    const inv = investigations.find(q => q.id === invId)
    if (inv) {
      updateIssueStatus(inv.linked_cs_issue, "Resolved")
    }
    setSelectedInvestigation(null)
    setRootCause("")
    setCorrectiveAction("")
  }

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="New to Process"
          value={newIssues.length.toString()}
          sub="Orders & inquiries"
        />
        <MetricCard
          label="Open Unanswered"
          value={openIssues.length.toString()}
          sub={oldestOpen ? `Oldest: ${fmtDate(oldestOpen.reported_date)}` : "All clear"}
          subColor={openIssues.length > 3 ? "text-amber-600" : "text-green-600"}
        />
        <MetricCard
          label="Deliveries Today"
          value={deliveriesToday.length.toString()}
          sub="Routes active"
        />
        <MetricCard
          label="Overdue Invoices"
          value={overdueInvoices.length.toString()}
          sub={overdueInvoices.length > 0 ? `${fmtCurrency(overdueInvoices.reduce((s, i) => s + i.amount, 0))} total` : "All current"}
          subColor={overdueInvoices.length > 0 ? "text-red-600" : "text-green-600"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries Table — Main */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-muted-foreground" />
                  Open Inquiries
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setShowNewIssue(true)}>
                    <Plus className="h-3 w-3 mr-1" />
                    New Issue
                  </Button>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {issueCategories.map(c => (
                        <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      {issueStatuses.map(s => (
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
                    <TableHead>Issue</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Assigned</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.map(issue => (
                    <TableRow
                      key={issue.id}
                      className={`cursor-pointer hover:bg-muted/50 ${
                        issue.status === "Escalated to Ben" ? "bg-red-50/50" : ""
                      }`}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <TableCell className="font-medium">{issue.issue_number}</TableCell>
                      <TableCell>{accountName(issue.account_id)}</TableCell>
                      <TableCell className="capitalize">{issue.category}</TableCell>
                      <TableCell>{fmtDate(issue.reported_date)}</TableCell>
                      <TableCell>{employeeName(issue.assigned_to)}</TableCell>
                      <TableCell>
                        <StatusBadge status={issue.status} />
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredIssues.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No issues match the current filters.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quality Escalations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Quality Escalations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {escalatedIssues.length === 0 && (
                <p className="text-xs text-muted-foreground">No quality escalations</p>
              )}
              {escalatedIssues.map(issue => {
                const inv = investigations.find(q => q.linked_cs_issue === issue.id)
                return (
                  <div
                    key={issue.id}
                    className="p-3 rounded-lg bg-red-50 cursor-pointer hover:bg-red-100 transition-colors"
                    onClick={() => {
                      if (inv) {
                        setSelectedInvestigation(inv)
                        setRootCause(inv.root_cause ?? "")
                        setCorrectiveAction(inv.corrective_action ?? "")
                      } else {
                        setSelectedIssue(issue)
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-red-800">{issue.issue_number}</p>
                      <StatusBadge status={inv?.status ?? issue.status} />
                    </div>
                    <p className="text-xs text-red-600 mt-1">
                      {issue.description.slice(0, 60)}...
                    </p>
                    {inv && (
                      <p className="text-xs text-red-500 mt-1">
                        Investigation: {inv.investigation_number}
                      </p>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Today's Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                Today's Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {deliveriesToday.map(del => (
                <div key={del.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{routeName(del.route_id)}</p>
                    <p className="text-xs text-muted-foreground">
                      {del.stop_count} stops · {del.total_weight} lbs
                    </p>
                  </div>
                  <StatusBadge status={del.status} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Invoice Follow-ups */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Invoice Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {overdueInvoices.length === 0 && (
                <p className="text-xs text-muted-foreground">No overdue invoices</p>
              )}
              {overdueInvoices.map(inv => (
                <div key={inv.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{accountName(inv.account_id)}</p>
                    <p className="text-xs text-muted-foreground">
                      {inv.invoice_number} · {fmtCurrency(inv.amount)} · {inv.days_outstanding} days
                    </p>
                  </div>
                  <StatusBadge status="Overdue" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Issue Detail Sheet (DF5) */}
      <Sheet open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedIssue && (() => {
            const currentIdx = issueStatuses.indexOf(selectedIssue.status)
            return (
              <>
                <SheetHeader>
                  <SheetTitle>{selectedIssue.issue_number}</SheetTitle>
                  <SheetDescription>{accountName(selectedIssue.account_id)}</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <StatusBadge status={selectedIssue.status} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="text-sm font-medium capitalize">{selectedIssue.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Reported By</p>
                      <p className="text-sm font-medium">{selectedIssue.reported_by}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Reported Date</p>
                      <p className="text-sm font-medium">{fmtDate(selectedIssue.reported_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Assigned To</p>
                      <p className="text-sm font-medium">{employeeName(selectedIssue.assigned_to)}</p>
                    </div>
                    {selectedIssue.resolution_date && (
                      <div>
                        <p className="text-xs text-muted-foreground">Resolved Date</p>
                        <p className="text-sm font-medium">{fmtDate(selectedIssue.resolution_date)}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Description</p>
                    <p className="text-sm mt-1 p-3 bg-muted rounded">{selectedIssue.description}</p>
                  </div>

                  {selectedIssue.resolution_notes && (
                    <div>
                      <p className="text-xs text-muted-foreground">Resolution Notes</p>
                      <p className="text-sm mt-1 p-3 bg-green-50 rounded text-green-800">{selectedIssue.resolution_notes}</p>
                    </div>
                  )}

                  {/* Status progression */}
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground mb-3">Issue Lifecycle</p>
                    <div className="flex items-center gap-1">
                      {issueStatuses.map((status, idx) => (
                        <div key={status} className="flex items-center gap-1">
                          <button
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              idx <= currentIdx
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            } ${idx > currentIdx + 1 ? "opacity-50" : "cursor-pointer"}`}
                            onClick={() => {
                              if (idx <= currentIdx + 1) {
                                updateIssueStatus(selectedIssue.id, status)
                              }
                            }}
                            disabled={idx > currentIdx + 1}
                          >
                            {status}
                          </button>
                          {idx < issueStatuses.length - 1 && (
                            <span className="text-muted-foreground text-xs">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  {selectedIssue.status !== "Closed" && selectedIssue.status !== "Resolved" && (
                    <div className="border-t pt-4 space-y-2">
                      {selectedIssue.category === "quality" && selectedIssue.status !== "Escalated to Ben" && (
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => updateIssueStatus(selectedIssue.id, "Escalated to Ben")}
                        >
                          Escalate to Ben
                        </Button>
                      )}
                      {currentIdx < issueStatuses.length - 1 && (
                        <Button
                          className="w-full"
                          onClick={() => {
                            const next = issueStatuses[currentIdx + 1]
                            updateIssueStatus(selectedIssue.id, next)
                          }}
                        >
                          Move to {issueStatuses[Math.min(currentIdx + 1, issueStatuses.length - 1)]}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </>
            )
          })()}
        </SheetContent>
      </Sheet>

      {/* Quality Investigation Sheet (DF3) */}
      <Sheet open={!!selectedInvestigation} onOpenChange={() => setSelectedInvestigation(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedInvestigation && (() => {
            const linkedIssue = issues.find(i => i.id === selectedInvestigation.linked_cs_issue)
            const linkedBatch = batchesData.find(b => selectedInvestigation.linked_batches.includes(b.id))
            return (
              <>
                <SheetHeader>
                  <SheetTitle>Investigation {selectedInvestigation.investigation_number}</SheetTitle>
                  <SheetDescription>
                    {linkedIssue ? `Linked to ${linkedIssue.issue_number} — ${accountName(linkedIssue.account_id)}` : "Quality Investigation"}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <StatusBadge status={selectedInvestigation.status} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Hours Logged</p>
                      <p className="text-sm font-medium">{selectedInvestigation.investigation_hours}h</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Symptom</p>
                    <p className="text-sm mt-1 p-3 bg-muted rounded">{selectedInvestigation.symptom_description}</p>
                  </div>

                  {/* Linked Batch */}
                  {linkedBatch && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Identified Batch</p>
                      <div className="p-3 bg-blue-50 rounded space-y-1">
                        <p className="text-sm font-medium text-blue-800">
                          {linkedBatch.batch_number} — {productName(linkedBatch.product_id)}
                        </p>
                        <p className="text-xs text-blue-600">
                          Roasted {fmtDate(linkedBatch.roast_date)} · {linkedBatch.input_weight} lbs in / {linkedBatch.output_weight ?? "—"} lbs out
                        </p>
                        <p className="text-xs text-blue-600">
                          Profile: {linkedBatch.roast_profile_used}
                        </p>
                        {linkedBatch.temperature_curve_notes && (
                          <p className="text-xs text-blue-600">
                            Notes: {linkedBatch.temperature_curve_notes}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Existing root cause / corrective action */}
                  {selectedInvestigation.root_cause && selectedInvestigation.status === "Closed" && (
                    <>
                      <div>
                        <p className="text-xs text-muted-foreground">Root Cause</p>
                        <p className="text-sm mt-1 p-3 bg-amber-50 rounded text-amber-800">{selectedInvestigation.root_cause}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Corrective Action</p>
                        <p className="text-sm mt-1 p-3 bg-green-50 rounded text-green-800">{selectedInvestigation.corrective_action}</p>
                      </div>
                    </>
                  )}

                  {/* Investigation form (for open investigations) */}
                  {selectedInvestigation.status !== "Closed" && (
                    <div className="border-t pt-4 space-y-3">
                      <p className="text-sm font-medium">Complete Investigation</p>
                      <div>
                        <Label className="text-xs">Root Cause</Label>
                        <Input
                          placeholder="e.g., Roast temperature 8°F above profile"
                          value={rootCause}
                          onChange={e => setRootCause(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Corrective Action</Label>
                        <Input
                          placeholder="e.g., Recalibrate thermocouple, pull remaining inventory"
                          value={correctiveAction}
                          onChange={e => setCorrectiveAction(e.target.value)}
                        />
                      </div>
                      <Button
                        className="w-full"
                        disabled={!rootCause.trim() || !correctiveAction.trim()}
                        onClick={() => closeInvestigation(selectedInvestigation.id)}
                      >
                        Close Investigation & Resolve Issue
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )
          })()}
        </SheetContent>
      </Sheet>

      {/* New Issue Dialog (DIP4) */}
      <Dialog open={showNewIssue} onOpenChange={setShowNewIssue}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New CS Issue</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Account</Label>
              <Select value={newAccount} onValueChange={setNewAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accountsData
                    .filter(a => a.stage === "Active" || a.stage === "At Risk")
                    .map(a => (
                      <SelectItem key={a.id} value={a.id}>{a.account_name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {issueCategories.map(c => (
                    <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                placeholder="e.g., Mountain Lodge says Monday delivery not received"
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
              />
            </div>
            <div>
              <Label>Reported By</Label>
              <Input
                placeholder="e.g., Jake Rivera"
                value={newReportedBy}
                onChange={e => setNewReportedBy(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewIssue(false)}>Cancel</Button>
            <Button onClick={addIssue} disabled={!newDescription.trim() || !newAccount}>Create Issue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
