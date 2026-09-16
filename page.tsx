import { PageHeader } from '@/components/page-header'
import { ToolCard } from '@/components/tool-card'
import { Badge } from '@/components/ui/badge'
import { TOOLS } from '@/lib/engineering-data'

export const metadata = {
  title: 'Tools · Process Engineering AI',
}

export default function ToolsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Engineering Tools"
        description="Simulation, analysis, and review workflows that support day-to-day process engineering deliverables."
        actions={<Badge variant="outline">{TOOLS.length} tools</Badge>}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
