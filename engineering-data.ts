import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Beaker,
  BookOpen,
  Boxes,
  Container,
  Droplets,
  Flame,
  FileSearch,
  Gauge,
  GitCompareArrows,
  LayoutDashboard,
  MessageSquare,
  Rows3,
  Ruler,
  Settings2,
  ShieldAlert,
  SlidersHorizontal,
  TrendingDown,
  Waves,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'AI Engineer', href: '/chat', icon: MessageSquare },
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Calculators', href: '/calculators', icon: Gauge },
  { label: 'Standards', href: '/standards', icon: BookOpen },
  { label: 'Tools', href: '/tools', icon: Settings2 },
]

export type Calculator = {
  id: string
  name: string
  description: string
  category: string
  icon: LucideIcon
  inputs: string
}

export const CALCULATORS: Calculator[] = [
  {
    id: 'line-sizing',
    name: 'Line Sizing',
    description:
      'Size process piping for target velocity and erosional limits per API RP 14E.',
    category: 'Hydraulics',
    icon: Ruler,
    inputs: 'Flow rate, density, viscosity, allowable velocity',
  },
  {
    id: 'pressure-drop',
    name: 'Pressure Drop',
    description:
      'Frictional and static pressure loss across a line using Darcy–Weisbach.',
    category: 'Hydraulics',
    icon: Waves,
    inputs: 'Length, ID, roughness, flow, fluid properties',
  },
  {
    id: 'pump-head',
    name: 'Pump Head',
    description:
      'Total dynamic head from static, friction, and pressure components.',
    category: 'Rotating',
    icon: Activity,
    inputs: 'Suction/discharge pressures, elevation, losses',
  },
  {
    id: 'npsh',
    name: 'NPSH',
    description:
      'Available net positive suction head versus required to avoid cavitation.',
    category: 'Rotating',
    icon: Droplets,
    inputs: 'Vapor pressure, suction head, losses, temperature',
  },
  {
    id: 'control-valve',
    name: 'Control Valve Sizing',
    description:
      'Required Cv for liquid, gas, or two-phase service with choked-flow checks.',
    category: 'Instruments',
    icon: SlidersHorizontal,
    inputs: 'Flow, ΔP, SG, inlet pressure, temperature',
  },
  {
    id: 'psv',
    name: 'PSV Sizing',
    description:
      'Relief orifice area for gas, liquid, and fire cases per API 520.',
    category: 'Relief',
    icon: ShieldAlert,
    inputs: 'Relief load, set pressure, backpressure, fluid',
  },
  {
    id: 'separator',
    name: 'Separator Sizing',
    description:
      'Two/three-phase separator dimensions using Souders–Brown and retention time.',
    category: 'Equipment',
    icon: Container,
    inputs: 'Gas/liquid rates, densities, K-value, residence time',
  },
  {
    id: 'vessel',
    name: 'Vessel Sizing',
    description:
      'Process vessel geometry, holdup volumes, and level setpoints.',
    category: 'Equipment',
    icon: Boxes,
    inputs: 'Volumes, L/D ratio, orientation, holdup',
  },
  {
    id: 'flare',
    name: 'Flare Calculations',
    description:
      'Flare tip sizing, radiation, and dispersion screening per API 521.',
    category: 'Relief',
    icon: Flame,
    inputs: 'Relief load, Mach number, radiation limit, wind',
  },
]

export type Standard = {
  code: string
  title: string
  org: string
  description: string
  tags: string[]
}

export const STANDARDS: Standard[] = [
  {
    code: 'API 14C',
    title: 'Surface Safety Systems',
    org: 'API',
    description:
      'Analysis, design, installation, and testing of surface safety systems on offshore production platforms.',
    tags: ['Safety', 'Offshore', 'SAFE chart'],
  },
  {
    code: 'API 14E',
    title: 'Design of Offshore Piping Systems',
    org: 'API',
    description:
      'Recommended practice for offshore production platform piping, including erosional velocity limits.',
    tags: ['Piping', 'Erosional velocity'],
  },
  {
    code: 'API 520',
    title: 'Sizing & Selection of Relief Devices',
    org: 'API',
    description:
      'Sizing, selection, and installation of pressure-relieving devices for refineries.',
    tags: ['Relief', 'PSV sizing'],
  },
  {
    code: 'API 521',
    title: 'Pressure-Relieving & Depressuring Systems',
    org: 'API',
    description:
      'Disposal system design, relief load determination, and flare/depressuring guidance.',
    tags: ['Flare', 'Depressuring'],
  },
  {
    code: 'API 526',
    title: 'Flanged Steel Pressure-Relief Valves',
    org: 'API',
    description:
      'Standard orifice designations (D through T), materials, and dimensions for PRVs.',
    tags: ['Relief', 'Orifice areas'],
  },
  {
    code: 'API 12J',
    title: 'Oil & Gas Separators',
    org: 'API',
    description:
      'Specification for the design and fabrication of oil-and-gas separators.',
    tags: ['Separation', 'Equipment'],
  },
  {
    code: 'NORSOK P-002',
    title: 'Process System Design',
    org: 'NORSOK',
    description:
      'Requirements for process system design on the Norwegian continental shelf.',
    tags: ['Process', 'Norway'],
  },
  {
    code: 'NORSOK M-506',
    title: 'CO₂ Corrosion Rate Model',
    org: 'NORSOK',
    description:
      'Prediction model for CO₂ corrosion rates in carbon steel piping and equipment.',
    tags: ['Corrosion', 'Materials'],
  },
  {
    code: 'Shell DEP',
    title: 'Design & Engineering Practice',
    org: 'Shell',
    description:
      'Shell company standards for process, mechanical, and piping engineering deliverables.',
    tags: ['Company standard', 'Process'],
  },
]

export type Tool = {
  id: string
  name: string
  description: string
  type: string
  icon: LucideIcon
}

export const TOOLS: Tool[] = [
  {
    id: 'hysys',
    name: 'Aspen HYSYS',
    description:
      'Steady-state and dynamic process simulation for material and energy balances.',
    type: 'Simulation',
    icon: Beaker,
  },
  {
    id: 'intercorr',
    name: 'InterCorr',
    description:
      'Corrosion prediction and materials selection for wet CO₂/H₂S service.',
    type: 'Corrosion',
    icon: ShieldAlert,
  },
  {
    id: 'flarenet',
    name: 'FlareNet',
    description:
      'Flare and relief network hydraulics, backpressure, and mach-number checks.',
    type: 'Relief',
    icon: Flame,
  },
  {
    id: 'pid-review',
    name: 'PFD / P&ID Review',
    description:
      'Structured markup and checklist workflow for process flow and P&I diagrams.',
    type: 'Review',
    icon: GitCompareArrows,
  },
  {
    id: 'hydraulics',
    name: 'Hydraulic Calculations',
    description:
      'Line hydraulics, pressure profiles, and network balancing for liquid and gas.',
    type: 'Analysis',
    icon: Waves,
  },
  {
    id: 'equipment-sizing',
    name: 'Equipment Sizing',
    description:
      'Datasheet-driven sizing for vessels, exchangers, pumps, and separators.',
    type: 'Sizing',
    icon: Rows3,
  },
  {
    id: 'vendor-review',
    name: 'Vendor Document Review',
    description:
      'Track and comment on vendor datasheets, drawings, and deviation requests.',
    type: 'Review',
    icon: FileSearch,
  },
]

export type RecentCalc = {
  id: string
  name: string
  detail: string
  time: string
  status: 'complete' | 'draft' | 'review'
}

export const RECENT_CALCULATIONS: RecentCalc[] = [
  {
    id: 'c1',
    name: 'Line Sizing — 12" Gas Export',
    detail: 'v = 17.2 m/s · ρv² = 4,120 · within API 14E limit',
    time: '12 min ago',
    status: 'complete',
  },
  {
    id: 'c2',
    name: 'PSV Sizing — V-2201 Fire Case',
    detail: 'Required area 3.61 in² · API 526 orifice "K"',
    time: '1 hr ago',
    status: 'review',
  },
  {
    id: 'c3',
    name: 'Separator Sizing — Test Sep.',
    detail: 'D = 2.1 m · L/D 3.5 · 3 min liquid retention',
    time: '3 hr ago',
    status: 'complete',
  },
  {
    id: 'c4',
    name: 'Pump Head — P-1101 A/B',
    detail: 'TDH 142 m · NPSHa 6.8 m · margin 2.1 m',
    time: 'Yesterday',
    status: 'draft',
  },
]

export type RecentQuestion = {
  id: string
  question: string
  time: string
}

export const RECENT_QUESTIONS: RecentQuestion[] = [
  {
    id: 'q1',
    question: 'What erosional velocity limit applies to a wet gas line per API 14E?',
    time: '20 min ago',
  },
  {
    id: 'q2',
    question: 'Explain the fire case relief load basis in API 521.',
    time: '2 hr ago',
  },
  {
    id: 'q3',
    question: 'How do I select the K-value for a vertical two-phase separator?',
    time: 'Yesterday',
  },
  {
    id: 'q4',
    question: 'Which SAFE chart devices are required for a production separator?',
    time: '2 days ago',
  },
]

export const EXAMPLE_PROMPTS: string[] = [
  'Calculate pressure drop for this line',
  'Explain API 14E requirements',
  'Check separator sizing',
  'Review this P&ID requirement',
  'Size a PSV for a blocked outlet case',
  'Estimate CO₂ corrosion rate with NORSOK M-506',
]

export const QUICK_CALCULATORS = [
  'line-sizing',
  'pressure-drop',
  'psv',
  'separator',
  'pump-head',
  'flare',
] as const

export const FREQUENT_TOOL_IDS = ['hysys', 'flarenet', 'hydraulics', 'pid-review'] as const

export type PromptCategory = {
  id: string
  label: string
  icon: LucideIcon
  prompts: string[]
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: 'line-sizing',
    label: 'Line sizing',
    icon: Ruler,
    prompts: [
      'Recommend a line size for this flow to stay within API 14E erosional velocity limits.',
      'Compare 8" vs 10" for a two-phase line and explain the velocity trade-offs.',
    ],
  },
  {
    id: 'hydraulics',
    label: 'Hydraulic calculation',
    icon: Waves,
    prompts: [
      'Walk me through a hydraulic calculation for this liquid line, including method and inputs needed.',
      'What data do you need to build a pressure profile along this pipeline?',
    ],
  },
  {
    id: 'pressure-drop',
    label: 'Pressure drop',
    icon: TrendingDown,
    prompts: [
      'Explain how to calculate pressure drop for this line using Darcy–Weisbach.',
      'How do fittings and elevation change affect total pressure drop here?',
    ],
  },
  {
    id: 'pump-npsh',
    label: 'Pump sizing & NPSH',
    icon: Droplets,
    prompts: [
      'Help me size this pump: what head and NPSH margin should I target?',
      'Explain how to verify NPSH available exceeds required to avoid cavitation.',
    ],
  },
  {
    id: 'control-valve',
    label: 'Control valve sizing',
    icon: SlidersHorizontal,
    prompts: [
      'Explain how to size a control valve Cv for this liquid service.',
      'When should I check for choked or flashing flow in valve sizing?',
    ],
  },
  {
    id: 'psv-bdv',
    label: 'PSV / BDV sizing',
    icon: ShieldAlert,
    prompts: [
      'Size a PSV for a blocked outlet case and identify the governing scenario per API 520.',
      'Explain the depressuring (BDV) basis and fire case load per API 521.',
    ],
  },
  {
    id: 'separator',
    label: 'Separator sizing',
    icon: Container,
    prompts: [
      'Check separator sizing using Souders–Brown and required liquid retention time.',
      'How do I select the K-value for a vertical two-phase separator?',
    ],
  },
  {
    id: 'equipment',
    label: 'Equipment sizing',
    icon: Boxes,
    prompts: [
      'Help me size this vessel: L/D ratio, holdup volumes, and level setpoints.',
      'What inputs are required to size a shell-and-tube exchanger duty?',
    ],
  },
  {
    id: 'pid-review',
    label: 'P&ID review',
    icon: GitCompareArrows,
    prompts: [
      'Review this P&ID requirement and flag missing safeguards per API 14C.',
      'What SAFE chart devices are expected on a production separator?',
    ],
  },
  {
    id: 'standards',
    label: 'API / ASME / NORSOK',
    icon: BookOpen,
    prompts: [
      'Explain the key API 14E requirements for offshore piping design.',
      'Summarize ASME B31.3 vs NORSOK P-002 expectations for this system.',
    ],
  },
]

export type ProjectContext = {
  projectName: string
  fluidService: string
  designPressure: string
  designTemperature: string
  operatingPressure: string
  operatingTemperature: string
  flowRate: string
  standards: string
}

export const EMPTY_PROJECT_CONTEXT: ProjectContext = {
  projectName: '',
  fluidService: '',
  designPressure: '',
  designTemperature: '',
  operatingPressure: '',
  operatingTemperature: '',
  flowRate: '',
  standards: '',
}

export type ProjectContextField = {
  key: keyof ProjectContext
  label: string
  placeholder: string
}

export const PROJECT_CONTEXT_FIELDS: ProjectContextField[] = [
  { key: 'projectName', label: 'Project name', placeholder: 'e.g. Platform B Debottleneck' },
  { key: 'fluidService', label: 'Fluid / service', placeholder: 'e.g. Wet gas, crude, produced water' },
  { key: 'designPressure', label: 'Design pressure', placeholder: 'e.g. 150 barg' },
  { key: 'designTemperature', label: 'Design temperature', placeholder: 'e.g. 120 °C' },
  { key: 'operatingPressure', label: 'Operating pressure', placeholder: 'e.g. 95 barg' },
  { key: 'operatingTemperature', label: 'Operating temperature', placeholder: 'e.g. 65 °C' },
  { key: 'flowRate', label: 'Flow rate', placeholder: 'e.g. 45,000 kg/h' },
  { key: 'standards', label: 'Applicable standards', placeholder: 'e.g. API 14E, ASME B31.3, NORSOK P-002' },
]
