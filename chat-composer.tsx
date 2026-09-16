'use client'

import { useRef } from 'react'
import {
  CornerDownLeft,
  FileSpreadsheet,
  FileText,
  ImageIcon,
  Loader2,
  Paperclip,
  Plus,
  SendHorizontal,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  createId,
  detectAttachmentKind,
  formatFileSize,
  type AttachmentKind,
  type ChatAttachment,
} from '@/lib/chat'

const ACCEPTED =
  '.pdf,.xls,.xlsx,.xlsm,.csv,image/*,application/pdf'

const KIND_ICON: Record<AttachmentKind, typeof FileText> = {
  pdf: FileText,
  excel: FileSpreadsheet,
  image: ImageIcon,
  file: Paperclip,
}

export function ChatComposer({
  input,
  onInputChange,
  attachments,
  onAttachmentsChange,
  onSend,
  isResponding,
}: {
  input: string
  onInputChange: (value: string) => void
  attachments: ChatAttachment[]
  onAttachmentsChange: (attachments: ChatAttachment[]) => void
  onSend: () => void
  isResponding: boolean
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    const next: ChatAttachment[] = Array.from(fileList).map((file) => ({
      id: createId(),
      name: file.name,
      size: file.size,
      kind: detectAttachmentKind(file.name, file.type),
    }))
    onAttachmentsChange([...attachments, ...next])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeAttachment(id: string) {
    onAttachmentsChange(attachments.filter((a) => a.id !== id))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Respect IME composition (CJK) — do not submit mid-composition.
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const canSend = (input.trim() !== '' || attachments.length > 0) && !isResponding

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSend()
      }}
      className="rounded-xl border border-border bg-card p-2 focus-within:border-primary/50"
    >
      {attachments.length > 0 && (
        <ul className="flex flex-wrap gap-2 p-1.5">
          {attachments.map((attachment) => {
            const Icon = KIND_ICON[attachment.kind]
            return (
              <li
                key={attachment.id}
                className="flex items-center gap-2 rounded-lg border border-border bg-background/60 py-1.5 pl-2 pr-1.5 text-xs"
              >
                <Icon className="size-4 shrink-0 text-primary" />
                <span className="max-w-40 truncate text-foreground">{attachment.name}</span>
                <span className="text-muted-foreground">{formatFileSize(attachment.size)}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(attachment.id)}
                  aria-label={`Remove ${attachment.name}`}
                  className="flex size-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask about sizing, pressure drop, standards, relief loads…"
        aria-label="Message the AI Process Engineer"
        className="max-h-40 min-h-10 w-full resize-none bg-transparent px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />

      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPTED}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Attach document</span>
            <span className="sm:hidden">Attach</span>
          </Button>
          <span className="hidden items-center gap-1.5 text-[11px] text-muted-foreground md:flex">
            <CornerDownLeft className="size-3" />
            Enter to send · Shift + Enter for a new line
          </span>
        </div>
        <Button type="submit" size="sm" disabled={!canSend}>
          {isResponding ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <SendHorizontal className="size-4" />
          )}
          Send
        </Button>
      </div>
    </form>
  )
}
