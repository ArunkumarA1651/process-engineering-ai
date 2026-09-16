'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Hexagon, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/engineering-data'
import { Button } from '@/components/ui/button'

function Brand({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Hexagon className="size-5" strokeWidth={2.25} />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-tight text-foreground">
          Process Engineering AI
        </p>
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Oil &amp; Gas Design
        </p>
      </div>
    </div>
  )
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
            )}
          >
            <Icon
              className={cn('size-4.5', active ? 'text-primary' : '')}
              strokeWidth={2}
            />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Brand className="px-1 pt-1" />
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto rounded-lg border border-border bg-background/40 p-3">
        <p className="text-xs font-medium text-foreground">Prototype build</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          UI preview only. Calculations and AI responses are placeholders and
          not yet connected to backend services.
        </p>
      </div>
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-svh bg-background lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-svh border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarBody />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-sidebar-border bg-sidebar/95 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <Button
          variant="outline"
          size="icon"
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-5" />
        </Button>
      </header>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] border-r border-sidebar-border bg-sidebar shadow-xl">
            <div className="flex justify-end p-3">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <SidebarBody onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <main className="min-w-0">{children}</main>
    </div>
  )
}
