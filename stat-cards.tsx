import { BookOpen, Gauge, MessageSquare, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'

const STATS = [
  {
    label: 'Calculations run',
    value: '128',
    hint: 'this month',
    icon: Gauge,
  },
  {
    label: 'AI questions',
    value: '64',
    hint: 'this month',
    icon: MessageSquare,
  },
  {
    label: 'Standards referenced',
    value: '9',
    hint: 'API · NORSOK · Shell',
    icon: BookOpen,
  },
  {
    label: 'Open reviews',
    value: '5',
    hint: 'P&ID & vendor docs',
    icon: TrendingUp,
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="gap-0 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </span>
              <Icon className="size-4 text-primary" />
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
          </Card>
        )
      })}
    </div>
  )
}
