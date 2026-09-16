import Link from 'next/link'
import { ChevronRight, Clock } from 'lucide-react'
import {
  RECENT_CALCULATIONS,
  RECENT_QUESTIONS,
  type RecentCalc,
} from '@/lib/engineering-data'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const STATUS_VARIANT: Record<
  RecentCalc['status'],
  { label: string; variant: 'success' | 'warning' | 'secondary' }
> = {
  complete: { label: 'Complete', variant: 'success' },
  review: { label: 'In review', variant: 'warning' },
  draft: { label: 'Draft', variant: 'secondary' },
}

export function RecentCalculations() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent calculations</CardTitle>
        <Link
          href="/calculators"
          className="text-xs font-medium text-primary hover:underline"
        >
          New calculation
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {RECENT_CALCULATIONS.map((calc) => {
          const status = STATUS_VARIANT[calc.status]
          return (
            <div
              key={calc.id}
              className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {calc.name}
                </p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {calc.detail}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="size-3" />
                  {calc.time}
                </p>
              </div>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export function RecentQuestions() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent AI questions</CardTitle>
        <Link
          href="/chat"
          className="text-xs font-medium text-primary hover:underline"
        >
          Ask AI
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {RECENT_QUESTIONS.map((q) => (
          <Link
            key={q.id}
            href="/chat"
            className="group flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="text-sm text-foreground group-hover:text-primary">
                {q.question}
              </p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="size-3" />
                {q.time}
              </p>
            </div>
            <ChevronRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
