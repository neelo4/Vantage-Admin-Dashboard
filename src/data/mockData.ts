export interface RevenuePoint {
  date: string
  revenue: number
  expenses: number
  newCustomers: number
}

export interface ProductPerformance {
  product: string
  revenue: number
  growth: number
}

export interface ChannelSplit {
  channel: string
  value: number
}

export interface AccountRecord {
  id: string
  company: string
  owner: string
  status: 'on-track' | 'at-risk' | 'blocked'
  mrr: number
  change: number
  industry: string
  lastTouch: string
}

export interface ActivityItem {
  id: string
  event: string
  actor: string
  timestamp: string
  type: 'deal' | 'support' | 'product' | 'finance'
}

export interface GoalProgress {
  id: string
  label: string
  progress: number
  target: number
}

export const revenueTrend: RevenuePoint[] = [
  { date: '2024-01-01', revenue: 82000, expenses: 54000, newCustomers: 48 },
  { date: '2024-02-01', revenue: 86000, expenses: 55200, newCustomers: 55 },
  { date: '2024-03-01', revenue: 90500, expenses: 57100, newCustomers: 61 },
  { date: '2024-04-01', revenue: 94800, expenses: 58800, newCustomers: 64 },
  { date: '2024-05-01', revenue: 99000, expenses: 60300, newCustomers: 69 },
  { date: '2024-06-01', revenue: 104200, expenses: 61900, newCustomers: 73 },
  { date: '2024-07-01', revenue: 108400, expenses: 63100, newCustomers: 78 },
  { date: '2024-08-01', revenue: 112800, expenses: 64200, newCustomers: 82 },
  { date: '2024-09-01', revenue: 118300, expenses: 65400, newCustomers: 89 },
  { date: '2024-10-01', revenue: 123600, expenses: 66600, newCustomers: 92 },
  { date: '2024-11-01', revenue: 128900, expenses: 67800, newCustomers: 98 },
  { date: '2024-12-01', revenue: 134400, expenses: 69300, newCustomers: 105 },
]

export const productPerformance: ProductPerformance[] = [
  { product: 'Insights Pro', revenue: 348000, growth: 18 },
  { product: 'Ops Automation', revenue: 286000, growth: 12 },
  { product: 'Workflow AI', revenue: 244000, growth: 27 },
  { product: 'CX Monitor', revenue: 214000, growth: 9 },
  { product: 'Data Cloud', revenue: 198000, growth: 14 },
]

export const channelSplit: ChannelSplit[] = [
  { channel: 'Direct', value: 38 },
  { channel: 'Organic', value: 26 },
  { channel: 'Paid', value: 18 },
  { channel: 'Referral', value: 11 },
  { channel: 'Partners', value: 7 },
]

export const accountPipeline: AccountRecord[] = [
  {
    id: 'AC-2201',
    company: 'Northwind Retail',
    owner: 'Amelia Chen',
    status: 'on-track',
    mrr: 12400,
    change: 8.4,
    industry: 'Retail',
    lastTouch: '2025-01-03T14:30:00Z',
  },
  {
    id: 'AC-2202',
    company: 'Pulse Analytics',
    owner: 'Kevin',
    status: 'at-risk',
    mrr: 8800,
    change: -3.6,
    industry: 'Healthcare',
    lastTouch: '2025-01-05T09:15:00Z',
  },
  {
    id: 'AC-2203',
    company: 'Stratus Finance',
    owner: 'Sofia Martinez',
    status: 'on-track',
    mrr: 16200,
    change: 11.2,
    industry: 'Fintech',
    lastTouch: '2025-01-04T18:40:00Z',
  },
  {
    id: 'AC-2204',
    company: 'Evergreen Energy',
    owner: 'Kevin',
    status: 'blocked',
    mrr: 7200,
    change: -6.9,
    industry: 'Energy',
    lastTouch: '2024-12-28T21:05:00Z',
  },
  {
    id: 'AC-2205',
    company: 'Brightline Media',
    owner: 'Amelia Chen',
    status: 'on-track',
    mrr: 9100,
    change: 4.1,
    industry: 'Media',
    lastTouch: '2025-01-06T11:10:00Z',
  },
  {
    id: 'AC-2206',
    company: 'Atlas Manufacturing',
    owner: 'Sofia Martinez',
    status: 'at-risk',
    mrr: 10200,
    change: -1.7,
    industry: 'Manufacturing',
    lastTouch: '2024-12-31T16:22:00Z',
  },
  {
    id: 'AC-2207',
    company: 'Lumen Logistics',
    owner: 'Kevin',
    status: 'on-track',
    mrr: 7800,
    change: 6.2,
    industry: 'Logistics',
    lastTouch: '2025-01-02T08:45:00Z',
  },
  {
    id: 'AC-2208',
    company: 'Bluewater Gov',
    owner: 'Amelia Chen',
    status: 'blocked',
    mrr: 5400,
    change: -8.1,
    industry: 'Public Sector',
    lastTouch: '2024-12-26T19:55:00Z',
  },
]

export const activityFeed: ActivityItem[] = [
  {
    id: 'EV-981',
    event: 'Closed $88k Enterprise Renewal',
    actor: 'Amelia Chen',
    timestamp: '2025-01-06T15:32:00Z',
    type: 'deal',
  },
  {
    id: 'EV-982',
    event: 'Launched automated anomaly alerts',
    actor: 'Product Team',
    timestamp: '2025-01-05T12:05:00Z',
    type: 'product',
  },
  {
    id: 'EV-983',
    event: 'Resolved 43 escalation tickets in <4h SLA',
    actor: 'Support Guild',
    timestamp: '2025-01-05T09:12:00Z',
    type: 'support',
  },
  {
    id: 'EV-984',
    event: 'Secured strategic partner pilot in EMEA',
    actor: 'Kevin',
    timestamp: '2025-01-04T20:16:00Z',
    type: 'deal',
  },
  {
    id: 'EV-985',
    event: 'Updated ARR forecast with scenario planning',
    actor: 'FP&A Team',
    timestamp: '2025-01-04T14:44:00Z',
    type: 'finance',
  },
]

export const goalsProgress: GoalProgress[] = [
  { id: 'goal-1', label: 'Quarterly ARR Target', progress: 68, target: 100 },
  { id: 'goal-2', label: 'Customer Health Coverage', progress: 54, target: 80 },
  { id: 'goal-3', label: 'Automation Rollout', progress: 41, target: 70 },
]
