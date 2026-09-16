import Link from 'next/link'
import { MessageSquare, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { StatCards } from '@/components/dashboard/stat-cards'
import {
  RecentCalculations,
  RecentQuestions,
} from '@/components/dashboard/activity'
import {
  FrequentTools,
  QuickCalculators,
} from '@/components/dashboard/quick-tools'

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Dashboard"
        description="Your process engineering workspace for oil & gas design — calculators, standards, and AI assistance in one place."
        actions={
          <Link href="/chat" className={buttonVariants({ size: 'lg' })}>
            <MessageSquare className="size-4" />
            Ask the AI Engineer
          </Link>
        }
      />

      <div className="mt-6 space-y-6">
        <StatCards />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <RecentCalculations />
            <RecentQuestions />
          </div>
          <div className="space-y-6">
            <AiCallout />
            <QuickCalculators />
            <FrequentTools />
          </div>
        </div>
      </div>
    </div>
  )
}

function AiCallout() {
  return (
    <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/15 to-transparent p-5">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/20 text-primary">
        <Sparkles className="size-5" />
      </span>
      <h3 className="mt-3 font-semibold tracking-tight text-foreground">
        AI Process Engineer
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Ask about sizing, standards, and design basis. Get structured
        engineering answers with references.
      </p>
      <Link
        href="/chat"
        className={buttonVariants({ size: 'lg', className: 'mt-4 w-full' })}
      >
        Start a conversation
      </Link>
    </div>
  )
}
