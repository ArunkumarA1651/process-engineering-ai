'use client'

import {
  Calculator,
  FileSpreadsheet,
  FileText,
  Hexagon,
  ImageIcon,
  Info,
  Lightbulb,
  Loader2,
  Paperclip,
  ScrollText,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AttachmentKind, ChatAttachment, ChatMessage } from '@/lib/chat'

const KIND_ICON: Record<AttachmentKind, typeof FileText> = {
  pdf: FileText,
  excel: FileSpreadsheet,
  image: ImageIcon,
  file: Paperclip,
}

export function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-4 sm:p-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  )
}

function AttachmentList({ attachments }: { attachments: ChatAttachment[] }) {
  return (
    <ul className="mb-2 flex flex-wrap justify-end gap-1.5">
      {attachments.map((attachment) => {
        const Icon = KIND_ICON[attachment.kind]
        return (
          <li
            key={attachment.id}
            className="flex items-center gap-1.5 rounded-md bg-primary-foreground/15 px-2 py-1 text-[11px]"
          >
            <Icon className="size-3.5" />
            <span className="max-w-32 truncate">{attachment.name}</span>
          </li>
        )
      })}
    </ul>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg',
          isUser ? 'bg-secondary text-foreground' : 'bg-primary/15 text-primary',
        )}
      >
        {isUser ? <User className="size-4" /> : <Hexagon className="size-4" strokeWidth={2.25} />}
      </span>

      <div className={cn('min-w-0', isUser ? 'max-w-[85%]' : 'w-full max-w-[92%]')}>
        {isUser ? (
          <div className="rounded-xl bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground">
            {message.attachments && message.attachments.length > 0 && (
              <AttachmentList attachments={message.attachments} />
            )}
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        ) : message.pending ? (
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Analyzing request…
          </div>
        ) : (
          <AssistantMessage message={message} />
        )}
      </div>
    </div>
  )
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  const response = message.response

  if (!response) {
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm leading-relaxed text-card-foreground">
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* AI explanation — natural-language guidance */}
      <section className="rounded-xl border border-border bg-card px-4 py-3">
        <SectionLabel icon={Lightbulb} tone="muted">
          AI Explanation
        </SectionLabel>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-card-foreground">
          {response.explanation}
        </p>
      </section>

      {/* Calculation — visually and structurally separated from the narrative */}
      <section className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-3">
        <SectionLabel icon={Calculator} tone="primary">
          Calculation
        </SectionLabel>
        <p className="mt-2 text-sm leading-relaxed text-card-foreground">
          {response.calculationNote}
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Assumptions */}
        <section className="rounded-xl border border-border bg-card px-4 py-3">
          <SectionLabel icon={Info} tone="muted">
            Assumptions
          </SectionLabel>
          <ul className="mt-2 space-y-1.5">
            {response.assumptions.map((item, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Applicable standards */}
        <section className="rounded-xl border border-border bg-card px-4 py-3">
          <SectionLabel icon={ScrollText} tone="muted">
            Applicable Standards
          </SectionLabel>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {response.standards.map((code) => (
              <span
                key={code}
                className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-foreground"
              >
                {code}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionLabel({
  icon: Icon,
  tone,
  children,
}: {
  icon: typeof Info
  tone: 'primary' | 'muted'
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide',
        tone === 'primary' ? 'text-primary' : 'text-muted-foreground',
      )}
    >
      <Icon className="size-3.5" />
      {children}
    </span>
  )
}
