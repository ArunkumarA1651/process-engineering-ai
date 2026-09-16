import type { ProjectContext } from '@/lib/engineering-data'

export type ChatRole = 'user' | 'assistant'

export type AttachmentKind = 'pdf' | 'excel' | 'image' | 'file'

export type ChatAttachment = {
  id: string
  name: string
  size: number
  kind: AttachmentKind
}

/**
 * Structured assistant response. Keeping calculations in their own field —
 * separate from the natural-language explanation — is deliberate: the UI must
 * never blend an AI narrative with a numeric result.
 */
export type AssistantResponse = {
  explanation: string
  assumptions: string[]
  standards: string[]
  /** Prototype never returns a computed number; this states why. */
  calculationNote: string
}

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  pending?: boolean
  attachments?: ChatAttachment[]
  response?: AssistantResponse
}

export function createId() {
  return Math.random().toString(36).slice(2, 10)
}

const EXCEL_EXTENSIONS = ['xls', 'xlsx', 'csv', 'xlsm']

export function detectAttachmentKind(fileName: string, mime: string): AttachmentKind {
  const ext = fileName.split('.').pop()?.toLowerCase() ?? ''
  if (mime.startsWith('image/')) return 'image'
  if (ext === 'pdf' || mime === 'application/pdf') return 'pdf'
  if (EXCEL_EXTENSIONS.includes(ext) || mime.includes('spreadsheet') || mime.includes('excel')) {
    return 'excel'
  }
  return 'file'
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function hasAnyContext(context: ProjectContext): boolean {
  return Object.values(context).some((v) => v.trim() !== '')
}

/**
 * Placeholder response builder.
 *
 * TODO(backend): Replace with a real AI route (e.g. POST /api/chat using the
 * AI SDK). The message state, streaming indicator, structured sections, and
 * project-context/attachment payloads already match a typical chat contract,
 * so only this function needs to change to go live.
 *
 * By design this NEVER fabricates a numeric answer: without a connected
 * calculation engine and validated inputs, claiming an accurate result would
 * be misleading. It returns the method, required inputs, assumptions, and
 * governing standards instead.
 */
export function buildPlaceholderResponse(
  prompt: string,
  context: ProjectContext,
  attachments: ChatAttachment[],
): AssistantResponse {
  const standards = context.standards.trim()
    ? context.standards
        .split(/[,;]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : ['API 14E', 'API 520 / 521', 'ASME B31.3', 'NORSOK P-002']

  const assumptions: string[] = [
    'Prototype mode: no calculation engine or AI model is connected, so no numeric result is produced.',
    'Steady-state, single design case unless a transient or multiple cases are specified.',
    'Fluid properties assumed from the stated service; confirm against a validated PVT/simulation source.',
  ]

  if (hasAnyContext(context)) {
    const provided = PROVIDED_CONTEXT_SUMMARY(context)
    if (provided) assumptions.push(`Using project context you provided: ${provided}.`)
  } else {
    assumptions.push(
      'No project context entered — add project data in the Project Context panel to tighten assumptions.',
    )
  }

  if (attachments.length > 0) {
    assumptions.push(
      `${attachments.length} document(s) attached for review, but document parsing is not enabled in this prototype.`,
    )
  }

  return {
    explanation: [
      `Here is how a connected Process Engineer AI would approach: "${prompt.trim()}".`,
      '',
      'It would establish the design basis, state the governing method, identify the required inputs, then perform the calculation step-by-step with units and margins — citing the applicable code clauses.',
    ].join('\n'),
    assumptions,
    standards,
    calculationNote:
      'No calculation performed. A verified result requires the complete input set and an explicit calculation method, plus a connected calculation engine. Once connected, the computed value, units, and margins will appear here — clearly separated from the explanation above.',
  }
}

function PROVIDED_CONTEXT_SUMMARY(context: ProjectContext): string {
  const parts: string[] = []
  if (context.fluidService.trim()) parts.push(`service ${context.fluidService.trim()}`)
  if (context.designPressure.trim()) parts.push(`design P ${context.designPressure.trim()}`)
  if (context.designTemperature.trim()) parts.push(`design T ${context.designTemperature.trim()}`)
  if (context.flowRate.trim()) parts.push(`flow ${context.flowRate.trim()}`)
  return parts.join(', ')
}
