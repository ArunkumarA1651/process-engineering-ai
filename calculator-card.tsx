import { ArrowRight } from 'lucide-react'
import type { Calculator } from '@/lib/engineering-data'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export function CalculatorCard({ calculator }: { calculator: Calculator }) {
  const Icon = calculator.icon
  return (
    <Card className="group gap-0 p-5 transition-colors hover:border-primary/50 hover:bg-card/80">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
          <Icon className="size-5" strokeWidth={2} />
        </span>
        <Badge variant="outline">{calculator.category}</Badge>
      </div>
      <h3 className="mt-4 font-semibold tracking-tight text-foreground">
        {calculator.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {calculator.description}
      </p>
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Inputs
        </p>
        <p className="mt-1 text-xs text-foreground/80">{calculator.inputs}</p>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
        Open calculator
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Card>
  )
}
