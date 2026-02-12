import { Badge } from "@/components/ui/badge"

const statusColors: Record<string, string> = {
  // Batch statuses
  "Scheduled": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Roasting": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Resting": "bg-purple-100 text-purple-800 hover:bg-purple-100",
  "QC Check": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  "Approved": "bg-green-100 text-green-800 hover:bg-green-100",
  "Bagged": "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  "Flagged": "bg-red-100 text-red-800 hover:bg-red-100",

  // Account stages
  "Active": "bg-green-100 text-green-800 hover:bg-green-100",
  "At Risk": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Churned": "bg-slate-100 text-slate-600 hover:bg-slate-100",
  "Prospect": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Sample Sent": "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
  "Tasting": "bg-violet-100 text-violet-800 hover:bg-violet-100",
  "Proposal": "bg-purple-100 text-purple-800 hover:bg-purple-100",
  "Won": "bg-green-100 text-green-800 hover:bg-green-100",
  "Lost": "bg-slate-100 text-slate-600 hover:bg-slate-100",
  "Onboarding": "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
  "Under Review": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",

  // CS Issue statuses
  "Reported": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Investigating": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Escalated to Ben": "bg-red-100 text-red-800 hover:bg-red-100",
  "Resolved": "bg-green-100 text-green-800 hover:bg-green-100",
  "Closed": "bg-slate-100 text-slate-600 hover:bg-slate-100",

  // Invoice statuses
  "Paid": "bg-green-100 text-green-800 hover:bg-green-100",
  "Overdue": "bg-red-100 text-red-800 hover:bg-red-100",
  "Outstanding": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Sent": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Draft": "bg-slate-100 text-slate-600 hover:bg-slate-100",

  // Delivery statuses
  "Planned": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Loaded": "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
  "In Transit": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Completed": "bg-green-100 text-green-800 hover:bg-green-100",
  "Exception": "bg-red-100 text-red-800 hover:bg-red-100",
  "Delivered": "bg-green-100 text-green-800 hover:bg-green-100",

  // Inventory statuses
  "In Stock": "bg-green-100 text-green-800 hover:bg-green-100",
  "Low Stock": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Out of Stock": "bg-red-100 text-red-800 hover:bg-red-100",
  "On Order": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "In Storage": "bg-green-100 text-green-800 hover:bg-green-100",
  "Depleted": "bg-red-100 text-red-800 hover:bg-red-100",

  // Quality investigation
  "Batch Identified": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Root Cause Found": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Corrective Action Taken": "bg-green-100 text-green-800 hover:bg-green-100",
  "Opened": "bg-amber-100 text-amber-800 hover:bg-amber-100",

  // Order statuses
  "Received": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Scheduled for Roasting": "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
  "Roasted": "bg-amber-100 text-amber-800 hover:bg-amber-100",

  // Proposal statuses
  "Accepted": "bg-green-100 text-green-800 hover:bg-green-100",
  "Rejected": "bg-red-100 text-red-800 hover:bg-red-100",
  "Revised": "bg-amber-100 text-amber-800 hover:bg-amber-100",
}

const defaultColor = "bg-slate-100 text-slate-700 hover:bg-slate-100"

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className={statusColors[status] ?? defaultColor}>
      {status}
    </Badge>
  )
}
