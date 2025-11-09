export enum Page {
  STRATEGY = 'Strategy',
  MARKETING = 'Marketing',
  SALES = 'Sales',
  CUSTOMER_SUCCESS = 'Customer Success',
  FINANCE = 'Finance',
  DATA_SOURCES = 'Data Sources',
  MAPPING_STUDIO = 'Mapping Studio',
  RECONCILIATION = 'Reconciliation',
  USER_MANAGEMENT = 'User Management',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  salesTarget?: number;
}

export enum DataSourceStatus {
  CONNECTED = 'Connected',
  SYNCING = 'Syncing',
  ERROR = 'Error',
}

export interface DataSource {
  id: string;
  name: string;
  logoUrl: string;
  status: DataSourceStatus;
  lastSynced: string;
}

export interface Field {
    id: string;
    name: string;
}
  
export interface MappingObject {
    id: string;
    name: string;
    fields: Field[];
}

export interface KpiData {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
}

export interface Activity {
  id: string;
  type: 'Email' | 'Call' | 'Meeting' | 'QBR';
  summary: string;
  date: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Closed';
  lastUpdate: string;
}

export interface Customer {
  id: number;
  name: string;
  industry: string;
  logoUrl: string;
  arr: number;
  tcv: number;
  since: string;
  renewalDate: string;
  region: string;
  products: string[];
  healthScore: number;
  salesOwnerId: number;
  csOwnerId: number;
  parentCompany?: string;
  employeeCount: number;
  strategicValue: 'High' | 'Medium' | 'Low';
  recentActivity: Activity[];
  supportTickets: SupportTicket[];
}

export interface ReconciliationTableData {
    id: string;
    dealName: string;
    salesAmount: number;
    invoiceId: string | null;
    invoiceAmount: number | null;
    status: 'Matched' | 'Mismatch' | 'Pending';
}

export interface RegionalQuota {
    region: string;
    quota: number;
    actual: number;
}

export enum DealStage {
  PIPELINE = 'Pipeline',
  BEST_CASE = 'Best Case',
  COMMIT = 'Commit',
  CLOSED_WON = 'Closed Won',
  PROPOSAL = 'Proposal',
  NEGOTIATION = 'Negotiation',
  QUALIFICATION = 'Qualification',
  PROSPECTING = 'Prospecting',
}

export interface Deal {
  id: string;
  name: string;
  customerId: number;
  salesOwnerId: number;
  value: number;
  stage: DealStage;
  closeDate: string;
}
