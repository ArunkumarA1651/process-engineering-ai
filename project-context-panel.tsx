'use client'

import { useState } from 'react'
import { ChevronDown, ClipboardList, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  EMPTY_PROJECT_CONTEXT,
  PROJECT_CONTEXT_FIELDS,
  type ProjectContext,
} from '@/lib/engineering-data'

export function countFilledContext(context: ProjectContext): number {
  return Object.values(context).filter((v) => v.trim() !== '').length
}

export function ProjectContextPanel({
  context,
  onChange,
}: {
  context: ProjectContext
  onChange: (context: ProjectContext) => void
}) {
  // Collapsed by default on mobile; forced open on lg via CSS.
  const [open, setOpen] = useState(false)
  const filled = countFilledContext(context)

  function updateField(key: keyof ProjectContext, value: string) {
    onChange({ ...context, [key]: value })
  }

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <ClipboardList className="size-4" />
          </span>
          <div className="leading-tight">
            <h2 className="text-sm font-semibold text-foreground">Project Context</h2>
            <p className="text-[11px] text-muted-foreground">
              {filled > 0 ? `${filled} field${filled > 1 ? 's' : ''} set` : 'Optional design basis'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {filled > 0 && (
            <button
              type="button"
              onClick={() => onChange({ ...EMPTY_PROJECT_CONTEXT })}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle project context"
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
          >
            <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
          </button>
        </div>
      </div>

      <div className={cn('space-y-3 p-4', open ? 'block' : 'hidden', 'lg:block')}>
        {PROJECT_CONTEXT_FIELDS.map((field) => (
          <div key={field.key} className="space-y-1">
            <label
              htmlFor={`ctx-${field.key}`}
              className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
            >
              {field.label}
            </label>
            <input
              id={`ctx-${field.key}`}
              type="text"
              value={context[field.key]}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/50"
            />
          </div>
        ))}
        <p className="pt-1 text-[11px] leading-relaxed text-muted-foreground">
          Context is attached to your questions to sharpen assumptions. It is not
          validated or stored server-side in this prototype.
        </p>
      </div>
    </section>
  )
}
