import { Lock } from "lucide-react"

export function DeferredBadge({ label = "Coming in Full Build" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
      <Lock className="h-3 w-3" />
      {label}
    </span>
  )
}
