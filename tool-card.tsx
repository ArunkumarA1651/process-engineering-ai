import type { Tool } from '@/lib/engineering-data'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon
  return (
    <Card className="gap-0 p-5 transition-colors hover:border-primary/50 hover:bg-card/80">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="size-5" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold tracking-tight text-foreground">
              {tool.name}
            </h3>
          </div>
          <Badge variant="secondary" className="mt-1">
            {tool.type}
          </Badge>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {tool.description}
      </p>
    </Card>
  )
}
