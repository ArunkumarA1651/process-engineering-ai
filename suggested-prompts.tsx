'use client'

import { useState } from 'react'
import { Hexagon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PROMPT_CATEGORIES } from '@/lib/engineering-data'

export function SuggestedPrompts({ onPick }: { onPick: (prompt: string) => void }) {
  const [activeId, setActiveId] = useState(PROMPT_CATEGORIES[0].id)
  const active = PROMPT_CATEGORIES.find((c) => c.id === activeId) ?? PROMPT_CATEGORIES[0]

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-8 text-center sm:py-12">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <Hexagon className="size-7" strokeWidth={2.25} />
      </span>
      <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        AI Process Engineer
      </h2>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        Ask about hydraulics, equipment sizing, relief systems, and design
        standards. Pick a topic to see suggested prompts, or type your own.
      </p>

      <div className="mt-6 flex w-full flex-wrap justify-center gap-2">
        {PROMPT_CATEGORIES.map((category) => {
          const Icon = category.icon
          const isActive = category.id === activeId
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(category.id)}
              aria-pressed={isActive}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                isActive
                  ? 'border-primary/50 bg-primary/15 text-primary'
                  : 'border-border bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              <Icon className="size-3.5" strokeWidth={2} />
              {category.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4 grid w-full gap-2.5 sm:grid-cols-2">
        {active.prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPick(prompt)}
            className="rounded-lg border border-border bg-card px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-secondary/50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
