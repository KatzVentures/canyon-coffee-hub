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
import { MetricCard } from "@/components/dashboard/MetricCard"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import {
  Target, Clock, UserPlus, DollarSign, ChevronRight, Plus,
  CheckCircle2, Circle, AlertTriangle,
} from "lucide-react"
import accountsDataRaw from "@/data/accounts.json"
import contactsData from "@/data/contacts.json"
import proposalsData from "@/data/proposals.json"
import ordersData from "@/data/orders.json"
import { employeeName } from "@/lib/lookups"
import { fmtCurrency, fmtDate, fmtDateFull } from "@/lib/formatters"

const pipelineStages = ["Prospect", "Sample Sent", "Tasting", "Proposal", "Won", "Lost"]
const accountTypes = ["cafe", "restaurant", "hotel", "office"]
const acquisitionSources = ["referral", "cold outreach", "walk-in", "trade show"]

export function Pipeline() {
  const [accounts, setAccounts] = useState(accountsDataRaw.map(a => ({ ...a })))
  const [selectedAccount, setSelectedAccount] = useState<typeof accounts[0] | null>(null)
  const [filterStage, setFilterStage] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [showNewAccount, setShowNewAccount] = useState(false)
  const [showHandoff, setShowHandoff] = useState<typeof accounts[0] | null>(null)

  // New account form
  const [newName, setNewName] = useState("")
  const [newType, setNewType] = useState("cafe")
  const [newContact, setNewContact] = useState("")
  const [newSource, setNewSource] = useState("referral")

  // Handoff checklist
  const [handoffProducts, setHandoffProducts] = useState(false)
  const [handoffRoute, setHandoffRoute] = useState(false)
  const [handoffRoast, setHandoffRoast] = useState(false)

  // Pipeline accounts (not Active, At Risk, Churned)
  const pipelineAccounts = accounts.filter(a =>
    ["Prospect", "Sample Sent", "Tasting", "Proposal", "Won", "Lost", "Onboarding"].includes(a.stage)
  )

  const activeAccounts = accounts.filter(a => a.stage === "Active")
  const atRiskAccounts = accounts.filter(a => a.stage === "At Risk")

  // Metrics
  const activeProposals = proposalsData.filter(p => p.status === "Under Review" || p.status === "Sent")
  const proposalValue = pipelineAccounts
    .filter(a => a.stage === "Proposal")
    .reduce((sum, a) => sum + a.monthly_volume_lbs * (a.average_order_value / (a.monthly_volume_lbs || 1)), 0)

  // Accounts with no order in >14 days (simulate with active accounts)
  const staleAccounts = activeAccounts.filter((_, i) => i % 5 === 0) // simulate
  const onboardingAccounts = accounts.filter(a => a.stage === "Won" || a.stage === "Onboarding")

  const monthlyRevenue = ordersData.reduce((sum, o) => sum + o.total_revenue, 0)
  const revenueTarget = 95000

  // Filter
  const filteredPipeline = pipelineAccounts.filter(a => {
    if (filterStage !== "all" && a.stage !== filterStage) return false
    if (filterType !== "all" && a.type !== filterType) return false
    return true
  })

  // Group by stage
  const stageGroups = pipelineStages.map(stage => ({
    stage,
    accounts: filteredPipeline.filter(a => a.stage === stage),
  })).filter(g => g.accounts.length > 0)

  const updateStage = (accountId: string, newStage: string) => {
    setAccounts(prev => prev.map(a =>
      a.id === accountId ? { ...a, stage: newStage } : a
    ))
    if (selectedAccount?.id === accountId) {
      setSelectedAccount(prev => prev ? { ...prev, stage: newStage } : null)
    }
    // If moved to Won, trigger handoff
    if (newStage === "Won") {
      const acct = accounts.find(a => a.id === accountId)
      if (acct) {
        setShowHandoff({ ...acct, stage: "Won" })
        setSelectedAccount(null)
      }
    }
  }

  const addAccount = () => {
    if (!newName.trim()) return
    const newAcct = {
      id: `acct-new-${Date.now()}`,
      account_name: newName,
      type: newType,
      address: "TBD",
      delivery_frequency: "weekly" as const,
      monthly_volume_lbs: 0,
      average_order_value: 0,
      payment_terms: "Net 30",
      acquisition_source: newSource,
      start_date: null,
      stage: "Prospect",
      sales_rep: "emp-003",
      route_id: null,
    }
    setAccounts(prev => [...prev, newAcct])
    setNewName("")
    setNewContact("")
    setShowNewAccount(false)
  }

  const completeHandoff = () => {
    if (showHandoff) {
      setAccounts(prev => prev.map(a =>
        a.id === showHandoff.id ? { ...a, stage: "Onboarding" } : a
      ))
    }
    setShowHandoff(null)
    setHandoffProducts(false)
    setHandoffRoute(false)
    setHandoffRoast(false)
  }

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Active Proposals"
          value={activeProposals.length.toString()}
          sub={`${fmtCurrency(proposalValue)} potential monthly`}
        />
        <MetricCard
          label="No Order in >14 Days"
          value={staleAccounts.length.toString()}
          sub="Accounts need follow-up"
          subColor={staleAccounts.length > 0 ? "text-amber-600" : "text-green-600"}
        />
        <MetricCard
          label="Onboarding This Week"
          value={onboardingAccounts.length.toString()}
          sub="Handoff to production"
        />
        <MetricCard
          label="Revenue MTD vs Target"
          value={fmtCurrency(monthlyRevenue)}
          sub={`Target: ${fmtCurrency(revenueTarget)}`}
          subColor={monthlyRevenue >= revenueTarget ? "text-green-600" : "text-amber-600"}
        />
      </div>

      {/* Handoff alert */}
      {onboardingAccounts.length > 0 && (
        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardContent className="py-3">
            <div className="flex items-center gap-2 text-sm">
              <UserPlus className="h-4 w-4 text-indigo-600" />
              <span className="font-medium text-indigo-800">
                {onboardingAccounts.length} account{onboardingAccounts.length > 1 ? "s" : ""} won — handoff pending
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Table — Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  Pipeline
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setShowNewAccount(true)}>
                    <Plus className="h-3 w-3 mr-1" />
                    New Account
                  </Button>
                  <Select value={filterStage} onValueChange={setFilterStage}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="All stages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All stages</SelectItem>
                      {pipelineStages.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      {accountTypes.map(t => (
                        <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {stageGroups.map(group => (
                <div key={group.stage} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusBadge status={group.stage} />
                    <span className="text-xs text-muted-foreground">
                      {group.accounts.length} account{group.accounts.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Est. Monthly</TableHead>
                        <TableHead>Rep</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.accounts.map(acct => (
                        <TableRow
                          key={acct.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedAccount(acct)}
                        >
                          <TableCell className="font-medium">{acct.account_name}</TableCell>
                          <TableCell className="capitalize">{acct.type}</TableCell>
                          <TableCell className="capitalize">{acct.acquisition_source}</TableCell>
                          <TableCell className="text-right tabular-nums">
                            {acct.monthly_volume_lbs > 0 ? `${acct.monthly_volume_lbs} lbs` : "—"}
                          </TableCell>
                          <TableCell>{employeeName(acct.sales_rep)}</TableCell>
                          <TableCell>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
              {stageGroups.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No accounts match the current filters.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Follow-up Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Follow-up Queue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {pipelineAccounts
                .filter(a => ["Sample Sent", "Tasting", "Proposal"].includes(a.stage))
                .slice(0, 5)
                .map(acct => {
                  const contact = contactsData.find(c => c.account_id === acct.id)
                  return (
                    <div
                      key={acct.id}
                      className="flex items-center justify-between py-2 border-b last:border-0 cursor-pointer hover:bg-muted/50 rounded px-1 -mx-1"
                      onClick={() => setSelectedAccount(acct)}
                    >
                      <div>
                        <p className="text-sm font-medium">{acct.account_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {contact ? contact.name : "No contact"} · {acct.stage}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )
                })}
            </CardContent>
          </Card>

          {/* Account Health Flags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Account Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {atRiskAccounts.map(acct => (
                <div key={acct.id} className="p-3 rounded-lg bg-amber-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-amber-800">{acct.account_name}</p>
                    <StatusBadge status="At Risk" />
                  </div>
                  <p className="text-xs text-amber-600 mt-1">
                    {acct.monthly_volume_lbs} lbs/month · Volume declining
                  </p>
                </div>
              ))}
              {accounts.filter(a => a.stage === "Churned").map(acct => (
                <div key={acct.id} className="p-3 rounded-lg bg-slate-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-700">{acct.account_name}</p>
                    <StatusBadge status="Churned" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Started {acct.start_date ? fmtDateFull(acct.start_date) : "—"}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Onboarding Status */}
          {onboardingAccounts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                  Onboarding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {onboardingAccounts.map(acct => (
                  <div
                    key={acct.id}
                    className="p-3 rounded-lg bg-indigo-50 cursor-pointer hover:bg-indigo-100 transition-colors"
                    onClick={() => {
                      setShowHandoff(acct)
                    }}
                  >
                    <p className="text-sm font-medium text-indigo-800">{acct.account_name}</p>
                    <p className="text-xs text-indigo-600 mt-1">
                      {acct.monthly_volume_lbs} lbs/month · Handoff pending
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Account Detail Sheet */}
      <Sheet open={!!selectedAccount} onOpenChange={() => setSelectedAccount(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedAccount && (() => {
            const contact = contactsData.find(c => c.account_id === selectedAccount.id)
            const proposal = proposalsData.find(p => p.account_id === selectedAccount.id)
            const stageIdx = pipelineStages.indexOf(selectedAccount.stage)
            const nextStage = stageIdx >= 0 && stageIdx < pipelineStages.length - 2
              ? pipelineStages[stageIdx + 1]
              : null

            return (
              <>
                <SheetHeader>
                  <SheetTitle>{selectedAccount.account_name}</SheetTitle>
                  <SheetDescription className="capitalize">{selectedAccount.type} · {selectedAccount.address}</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Stage</p>
                      <StatusBadge status={selectedAccount.stage} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sales Rep</p>
                      <p className="text-sm font-medium">{employeeName(selectedAccount.sales_rep)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Est. Monthly Volume</p>
                      <p className="text-sm font-medium">{selectedAccount.monthly_volume_lbs > 0 ? `${selectedAccount.monthly_volume_lbs} lbs` : "TBD"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Delivery Frequency</p>
                      <p className="text-sm font-medium capitalize">{selectedAccount.delivery_frequency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Payment Terms</p>
                      <p className="text-sm font-medium">{selectedAccount.payment_terms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Source</p>
                      <p className="text-sm font-medium capitalize">{selectedAccount.acquisition_source}</p>
                    </div>
                  </div>

                  {/* Contact */}
                  {contact && (
                    <div className="border-t pt-4">
                      <p className="text-xs text-muted-foreground mb-2">Primary Contact</p>
                      <div className="p-3 bg-muted rounded">
                        <p className="text-sm font-medium">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.role}</p>
                        <p className="text-xs text-muted-foreground">{contact.email} · {contact.phone}</p>
                      </div>
                    </div>
                  )}

                  {/* Proposal */}
                  {proposal && (
                    <div className="border-t pt-4">
                      <p className="text-xs text-muted-foreground mb-2">Proposal {proposal.proposal_number}</p>
                      <div className="p-3 bg-muted rounded space-y-1">
                        <p className="text-sm">{proposal.products_quoted}</p>
                        <p className="text-xs text-muted-foreground">Pricing: {proposal.pricing}</p>
                        <p className="text-xs text-muted-foreground">Delivery: {proposal.delivery_schedule}</p>
                        <div className="mt-1">
                          <StatusBadge status={proposal.status} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stage advancement */}
                  {nextStage && (
                    <div className="border-t pt-4">
                      <Button
                        className="w-full"
                        onClick={() => updateStage(selectedAccount.id, nextStage)}
                      >
                        Advance to {nextStage}
                      </Button>
                      {stageIdx > 0 && (
                        <Button
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => updateStage(selectedAccount.id, "Lost")}
                        >
                          Mark as Lost
                        </Button>
                      )}
                    </div>
                  )}

                  {selectedAccount.stage === "Proposal" && (
                    <div className="border-t pt-4">
                      <Button
                        className="w-full"
                        onClick={() => updateStage(selectedAccount.id, "Won")}
                      >
                        Mark as Won
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => updateStage(selectedAccount.id, "Lost")}
                      >
                        Mark as Lost
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )
          })()}
        </SheetContent>
      </Sheet>

      {/* New Account Dialog */}
      <Dialog open={showNewAccount} onOpenChange={setShowNewAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Account Name</Label>
              <Input
                placeholder="e.g., Blue Ridge Café"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={newType} onValueChange={setNewType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map(t => (
                    <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Primary Contact</Label>
              <Input
                placeholder="e.g., Sarah Kim, Owner"
                value={newContact}
                onChange={e => setNewContact(e.target.value)}
              />
            </div>
            <div>
              <Label>Acquisition Source</Label>
              <Select value={newSource} onValueChange={setNewSource}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {acquisitionSources.map(s => (
                    <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewAccount(false)}>Cancel</Button>
            <Button onClick={addAccount} disabled={!newName.trim()}>Create Prospect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Handoff Sheet (DF4) */}
      <Sheet open={!!showHandoff} onOpenChange={() => setShowHandoff(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {showHandoff && (
            <>
              <SheetHeader>
                <SheetTitle>Account Handoff</SheetTitle>
                <SheetDescription>
                  {showHandoff.account_name} — {showHandoff.monthly_volume_lbs} lbs/week, {showHandoff.delivery_frequency} delivery
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="p-3 bg-indigo-50 rounded">
                  <p className="text-sm font-medium text-indigo-800">
                    New Account Won — Onboarding Checklist
                  </p>
                  <p className="text-xs text-indigo-600 mt-1">
                    Complete all items before first delivery
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setHandoffProducts(!handoffProducts)}
                  >
                    {handoffProducts
                      ? <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      : <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    }
                    <div>
                      <p className="text-sm font-medium">Products confirmed</p>
                      <p className="text-xs text-muted-foreground">
                        House Blend 40 lbs + Colombia Single Origin 40 lbs
                      </p>
                    </div>
                  </button>

                  <button
                    className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setHandoffRoute(!handoffRoute)}
                  >
                    {handoffRoute
                      ? <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      : <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    }
                    <div>
                      <p className="text-sm font-medium">Delivery route assigned</p>
                      <p className="text-xs text-muted-foreground">
                        Thursday AM route (Carlos)
                      </p>
                    </div>
                  </button>

                  <button
                    className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setHandoffRoast(!handoffRoast)}
                  >
                    {handoffRoast
                      ? <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      : <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    }
                    <div>
                      <p className="text-sm font-medium">First roast scheduled</p>
                      <p className="text-xs text-muted-foreground">
                        Feb 13 — 2 days before first delivery
                      </p>
                    </div>
                  </button>
                </div>

                <div className="border-t pt-4">
                  <Button
                    className="w-full"
                    disabled={!handoffProducts || !handoffRoute || !handoffRoast}
                    onClick={completeHandoff}
                  >
                    Complete Onboarding
                  </Button>
                  {(!handoffProducts || !handoffRoute || !handoffRoast) && (
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Complete all checklist items to finish onboarding
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
