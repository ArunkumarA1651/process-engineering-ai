import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  CALCULATORS,
  FREQUENT_TOOL_IDS,
  QUICK_CALCULATORS,
  TOOLS,
} from '@/lib/engineering-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function QuickCalculators() {
  const quick = QUICK_CALCULATORS.map(
    (id) => CALCULATORS.find((c) => c.id === id)!,
  )

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Quick calculators</CardTitle>
        <Link
          href="/calculators"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {quick.map((calc) => {
            const Icon = calc.icon
            return (
              <Link
                key={calc.id}
                href="/calculators"
                className="flex flex-col items-start gap-2 rounded-lg border border-border bg-background/40 p-3 transition-colors hover:border-primary/50 hover:bg-secondary/50"
              >
                <span className="flex size-8 items-center justify-center rounded-md bg-primary/12 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {calc.name}
                </span>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function FrequentTools() {
  const tools = FREQUENT_TOOL_IDS.map((id) => TOOLS.find((t) => t.id === id)!)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Frequently used tools</CardTitle>
        <Link
          href="/tools"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link
              key={tool.id}
              href="/tools"
              className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3 transition-colors hover:border-primary/50 hover:bg-secondary/50"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                <Icon className="size-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {tool.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {tool.type}
                </p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
