import { Card, CardContent } from "@/components/ui/card"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"

interface MetricCardProps {
  label: string
  value: string
  sub?: string
  subColor?: string
  footnote?: string
  delta?: string
  deltaType?: "increase" | "decrease" | "neutral"
  onClick?: () => void
  progress?: number
  progressColor?: string
}

export function MetricCard({
  label, value, sub, subColor, footnote, delta, deltaType, onClick, progress, progressColor,
}: MetricCardProps) {
  const deltaColors = {
    increase: "text-emerald-700 bg-emerald-100",
    decrease: "text-rose-700 bg-rose-100",
    neutral: "text-slate-700 bg-slate-100",
  }

  const DeltaIcon = deltaType === "increase" ? TrendingUp : deltaType === "decrease" ? TrendingDown : Minus

  return (
    <Card
      className={onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}
      onClick={onClick}
    >
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">{label}</p>
            <p className="text-2xl font-semibold mt-1 tabular-nums">{value}</p>
          </div>
          {delta && deltaType && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${deltaColors[deltaType]}`}>
              <DeltaIcon className="h-3 w-3" />
              {delta}
            </span>
          )}
        </div>
        {sub && <p className={`text-xs mt-1.5 ${subColor ?? "text-muted-foreground"}`}>{sub}</p>}
        {footnote && <p className="text-xs text-muted-foreground mt-0.5">{footnote}</p>}
        {progress !== undefined && (
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${progressColor ?? "bg-primary"}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
