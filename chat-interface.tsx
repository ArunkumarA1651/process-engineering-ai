'use client'

import { useEffect, useRef, useState } from 'react'
import { Info } from 'lucide-react'
import { EMPTY_PROJECT_CONTEXT, type ProjectContext } from '@/lib/engineering-data'
import {
  buildPlaceholderResponse,
  createId,
  type ChatAttachment,
  type ChatMessage,
} from '@/lib/chat'
import { MessageList } from '@/components/chat/message-list'
import { ChatComposer } from '@/components/chat/chat-composer'
import { SuggestedPrompts } from '@/components/chat/suggested-prompts'
import { ProjectContextPanel } from '@/components/chat/project-context-panel'

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [attachments, setAttachments] = useState<ChatAttachment[]>([])
  const [context, setContext] = useState<ProjectContext>(EMPTY_PROJECT_CONTEXT)
  const [isResponding, setIsResponding] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const contextRef = useRef(context)
  contextRef.current = context

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if ((!trimmed && attachments.length === 0) || isResponding) return

    const sentAttachments = attachments
    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: trimmed || 'Please review the attached document(s).',
      attachments: sentAttachments.length > 0 ? sentAttachments : undefined,
    }
    const pendingMessage: ChatMessage = {
      id: createId(),
      role: 'assistant',
      content: '',
      pending: true,
    }

    setMessages((prev) => [...prev, userMessage, pendingMessage])
    setInput('')
    setAttachments([])
    setIsResponding(true)

    // Simulated latency so the loading state is visible. Swap for a real fetch.
    timeoutRef.current = setTimeout(() => {
      const response = buildPlaceholderResponse(
        userMessage.content,
        contextRef.current,
        sentAttachments,
      )
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingMessage.id ? { ...m, pending: false, response } : m,
        ),
      )
      setIsResponding(false)
    }, 900)
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100svh-4rem)] lg:flex-row lg:gap-6">
      {/* Chat column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div
          ref={scrollRef}
          className="min-h-[46svh] flex-1 overflow-y-auto rounded-xl border border-border bg-card/40 lg:min-h-0"
        >
          {isEmpty ? (
            <SuggestedPrompts onPick={sendMessage} />
          ) : (
            <MessageList messages={messages} />
          )}
        </div>

        <div className="mt-3">
          <ChatComposer
            input={input}
            onInputChange={setInput}
            attachments={attachments}
            onAttachmentsChange={setAttachments}
            onSend={() => sendMessage(input)}
            isResponding={isResponding}
          />
          <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
            <Info className="size-3 shrink-0" />
            Prototype: responses are placeholders, not engineering advice. No
            calculations are performed — verify all results against governing
            standards.
          </p>
        </div>
      </div>

      {/* Project Context — right column on desktop, collapsible above on mobile */}
      <aside className="order-first w-full shrink-0 lg:order-none lg:w-80 lg:overflow-y-auto">
        <ProjectContextPanel context={context} onChange={setContext} />
      </aside>
    </div>
  )
}
