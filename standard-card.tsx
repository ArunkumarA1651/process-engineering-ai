import { BookOpen } from 'lucide-react'
import type { Standard } from '@/lib/engineering-data'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export function StandardCard({ standard }: { standard: Standard }) {
  return (
    <Card className="gap-0 p-5 transition-colors hover:border-primary/50 hover:bg-card/80">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
            <BookOpen className="size-5" strokeWidth={2} />
          </span>
          <div>
            <p className="font-mono text-base font-semibold tracking-tight text-foreground">
              {standard.code}
            </p>
            <p className="text-xs text-muted-foreground">{standard.title}</p>
          </div>
        </div>
        <Badge variant="secondary">{standard.org}</Badge>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {standard.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {standard.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
