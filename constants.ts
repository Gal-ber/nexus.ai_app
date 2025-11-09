import { User, KpiData, RegionalQuota, DataSource, DataSourceStatus, MappingObject, Customer, ReconciliationTableData, Deal, DealStage } from './types.ts';

export const USERS: User[] = [
  { id: 1, name: 'Gal Bergson', email: 'galb@nexusai.io', role: 'Administrator', avatarUrl: 'https://i.pravatar.cc/40?u=galb@nexusai.io' },
  { id: 2, name: 'Dana Cohen', email: 'danac@nexusai.io', role: 'Sales Manager', avatarUrl: 'https://i.pravatar.cc/40?u=danac@nexusai.io', salesTarget: 750000 },
  { id: 3, name: 'Amir Levi', email: 'amirl@nexusai.io', role: 'CS Manager', avatarUrl: 'https://i.pravatar.cc/40?u=amirl@nexusai.io' },
  { id: 4, name: 'Yael Mizrahi', email: 'yaelm@nexusai.io', role: 'Sales Rep', avatarUrl: 'https://i.pravatar.cc/40?u=yaelm@nexusai.io', salesTarget: 350000 },
  { id: 5, name: 'Eran Katz', email: 'erank@nexusai.io', role: 'Sales Rep', avatarUrl: 'https://i.pravatar.cc/40?u=erank@nexusai.io', salesTarget: 300000 },
  { id: 6, name: 'Shir Goldstein', email: 'shirg@nexusai.io', role: 'CSM', avatarUrl: 'https://i.pravatar.cc/40?u=shirg@nexusai.io' },
  { id: 7, name: 'Emily Brown', email: 'emilyb@nexusai.io', role: 'CS Manager', avatarUrl: 'https://i.pravatar.cc/40?u=emilyb@nexusai.io' },
  { id: 8, name: 'Hannah Martinez', email: 'hannahm@nexusai.io', role: 'Marketing', avatarUrl: 'https://i.pravatar.cc/40?u=hannahm@nexusai.io' },
  { id: 9, name: 'Ian Hernandez', email: 'ianh@nexusai.io', role: 'Finance', avatarUrl: 'https://i.pravatar.cc/40?u=ianh@nexusai.io' },
  { id: 10, name: 'David Chen', email: 'davidc@nexusai.io', role: 'Sales Rep', avatarUrl: 'https://i.pravatar.cc/40?u=davidc@nexusai.io', salesTarget: 320000 },
];

export const STRATEGY_KPIS: KpiData[] = [
  { title: 'Total ARR', value: '$2.4M', change: '+15%', changeType: 'increase', description: 'Annual Recurring Revenue from all active subscriptions.' },
  { title: 'New ARR (Quarter)', value: '$320K', change: '+8%', changeType: 'increase', description: 'New Annual Recurring Revenue added this quarter.' },
  { title: 'Customer Churn Rate', value: '1.8%', change: '-0.2%', changeType: 'decrease', description: 'Percentage of customers who churned this quarter.' },
  { title: 'Net Revenue Retention', value: '105%', change: '+2%', changeType: 'increase', description: 'Revenue from existing customers, including upsells and accounting for churn.' },
];

export const REGIONAL_QUOTAS: RegionalQuota[] = [
    { region: 'North America', quota: 500000, actual: 450000 },
    { region: 'EMEA', quota: 350000, actual: 365000 },
    { region: 'APAC', quota: 200000, actual: 180000 },
    { region: 'LATAM', quota: 150000, actual: 100000 },
];

export const DATA_SOURCES: DataSource[] = [
    { id: 'sf', name: 'Salesforce', logoUrl: 'https://picsum.photos/seed/sf/40/40', status: DataSourceStatus.CONNECTED, lastSynced: '2 hours ago' },
    { id: 'ns', name: 'NetSuite', logoUrl: 'https://picsum.photos/seed/ns/40/40', status: DataSourceStatus.CONNECTED, lastSynced: '3 hours ago' },
    { id: 'hubspot', name: 'HubSpot', logoUrl: 'https://picsum.photos/seed/hs/40/40', status: DataSourceStatus.SYNCING, lastSynced: '5 minutes ago' },
    { id: 'sheets', name: 'Google Sheets', logoUrl: 'https://picsum.photos/seed/gs/40/40', status: DataSourceStatus.ERROR, lastSynced: '1 day ago' },
];

export const SALESFORCE_SCHEMA: MappingObject[] = [
    { id: 'sf_account', name: 'Account', fields: [{id: 'sf_account_name', name: 'Name'}, {id: 'sf_account_industry', name: 'Industry'}] },
    { id: 'sf_opportunity', name: 'Opportunity', fields: [{id: 'sf_opp_amount', name: 'Amount'}, {id: 'sf_opp_closedate', name: 'Close Date'}] },
];
export const NETSUITE_SCHEMA: MappingObject[] = [
    { id: 'ns_customer', name: 'Customer', fields: [{id: 'ns_customer_name', name: 'Company Name'}, {id: 'ns_customer_vertical', name: 'Vertical'}] },
    { id: 'ns_invoice', name: 'Invoice', fields: [{id: 'ns_invoice_total', name: 'Total'}, {id: 'ns_invoice_date', name: 'Date'}] },
];
export const UNIFIED_SCHEMA: MappingObject[] = [
    { id: 'unified_company', name: 'Company', fields: [{id: 'unified_company_name', name: 'Name'}, {id: 'unified_company_industry', name: 'Industry'}] },
    { id: 'unified_deal', name: 'Deal', fields: [{id: 'unified_deal_value', name: 'Value'}, {id: 'unified_deal_closed_at', name: 'Closed At'}] },
];
export const MAPPINGS = [
    { from: 'sf_account_name', to: 'unified_company_name' },
    { from: 'sf_account_industry', to: 'unified_company_industry' },
    { from: 'sf_opp_amount', to: 'unified_deal_value' },
    { from: 'sf_opp_closedate', to: 'unified_deal_closed_at' },
    { from: 'unified_company_name', to: 'ns_customer_name' },
    { from: 'unified_company_industry', to: 'ns_customer_vertical' },
    { from: 'unified_deal_value', to: 'ns_invoice_total' },
    { from: 'unified_deal_closed_at', to: 'ns_invoice_date' },
];

export const RECONCILIATION_CHART_DATA = [
    { name: 'Jan', sales_forecast: 15000, actual_revenue: 14500 },
    { name: 'Feb', sales_forecast: 18000, actual_revenue: 17800 },
    { name: 'Mar', sales_forecast: 22000, actual_revenue: 21000 },
    { name: 'Apr', sales_forecast: 20000, actual_revenue: 20500 },
    { name: 'May', sales_forecast: 25000, actual_revenue: 23000 },
    { name: 'Jun', sales_forecast: 23000, actual_revenue: 24000 },
    { name: 'Jul', sales_forecast: 28000, actual_revenue: 26000 },
];

export const RECONCILIATION_TABLE_DATA: ReconciliationTableData[] = [
    { id: 'D001', dealName: 'Alpha Corp Deal', salesAmount: 5000, invoiceId: 'INV001', invoiceAmount: 5000, status: 'Matched' },
    { id: 'D002', dealName: 'Beta Inc Deal', salesAmount: 7500, invoiceId: 'INV002', invoiceAmount: 7000, status: 'Mismatch' },
    { id: 'D003', dealName: 'Gamma LLC Deal', salesAmount: 3000, invoiceId: null, invoiceAmount: null, status: 'Pending' },
    { id: 'D004', dealName: 'Delta Co Deal', salesAmount: 5450, invoiceId: 'INV004', invoiceAmount: 5450, status: 'Matched' },
];

export const MARKETING_KPIS: KpiData[] = [
  { title: 'MQLs', value: '1,204', change: '+20%', changeType: 'increase', description: 'Marketing Qualified Leads this month.' },
  { title: 'Conversion Rate', value: '4.5%', change: '+0.5%', changeType: 'increase', description: 'Lead to customer conversion rate.' },
  { title: 'Cost Per Acquisition', value: '$250', change: '-$25', changeType: 'decrease', description: 'Average cost to acquire a new customer.' },
  { title: 'Website Traffic', value: '25.2K', change: '+8%', changeType: 'increase', description: 'Total unique visitors to the website.' },
];

export const LEAD_FUNNEL_DATA = [
    { name: 'Visitors', value: 25200 },
    { name: 'Leads', value: 3800 },
    { name: 'MQLs', value: 1204 },
    { name: 'SQLs', value: 450 },
    { name: 'Customers', value: 84 },
];

export const CUSTOMERS: Customer[] = [
    {
        id: 101,
        name: 'Innovate Corp',
        industry: 'Technology',
        logoUrl: 'https://logo.clearbit.com/innovate.com',
        arr: 120000,
        tcv: 360000,
        since: '2022-01-15',
        renewalDate: '2025-01-15',
        region: 'North America',
        products: ['Core Platform', 'Analytics Suite'],
        healthScore: 85,
        salesOwnerId: 4,
        csOwnerId: 6,
        parentCompany: 'Tech Conglomerate Inc.',
        employeeCount: 5000,
        strategicValue: 'High',
        recentActivity: [
            { id: 'act1', type: 'QBR', summary: 'Q3 Business Review', date: '2024-07-20' },
            { id: 'act2', type: 'Email', summary: 'Follow-up on new feature', date: '2024-07-22' },
        ],
        supportTickets: [
            { id: 'tkt1', subject: 'API integration issue', status: 'Closed', lastUpdate: '2024-07-15' }
        ]
    },
    {
        id: 102,
        name: 'Global Solutions',
        industry: 'Logistics',
        logoUrl: 'https://logo.clearbit.com/globalsolutions.com',
        arr: 75000,
        tcv: 150000,
        since: '2023-05-20',
        renewalDate: '2025-05-20',
        region: 'EMEA',
        products: ['Core Platform'],
        healthScore: 65,
        salesOwnerId: 5,
        csOwnerId: 7,
        employeeCount: 1200,
        strategicValue: 'Medium',
        recentActivity: [
            { id: 'act3', type: 'Call', summary: 'Check-in call', date: '2024-07-18' },
        ],
        supportTickets: [
            { id: 'tkt2', subject: 'Report generation delay', status: 'In Progress', lastUpdate: '2024-07-24' },
            { id: 'tkt3', subject: 'Login problem', status: 'Open', lastUpdate: '2024-07-25' },
        ]
    },
     {
        id: 103,
        name: 'Quantum Industries',
        industry: 'Manufacturing',
        logoUrl: 'https://logo.clearbit.com/quantum.com',
        arr: 250000,
        tcv: 750000,
        since: '2021-11-01',
        renewalDate: '2024-11-01',
        region: 'North America',
        products: ['Core Platform', 'Analytics Suite', 'Pro Services'],
        healthScore: 95,
        salesOwnerId: 4,
        csOwnerId: 7,
        employeeCount: 10000,
        strategicValue: 'High',
        recentActivity: [],
        supportTickets: []
    },
     {
        id: 104,
        name: 'Pioneer Ventures',
        industry: 'Finance',
        logoUrl: 'https://logo.clearbit.com/pioneer.com',
        arr: 45000,
        tcv: 90000,
        since: '2023-08-10',
        renewalDate: '2025-08-10',
        region: 'APAC',
        products: ['Core Platform'],
        healthScore: 45,
        salesOwnerId: 5,
        csOwnerId: 6,
        employeeCount: 500,
        strategicValue: 'Medium',
        recentActivity: [
             { id: 'act4', type: 'Meeting', summary: 'Discussed renewal options', date: '2024-07-10' },
        ],
        supportTickets: [
            { id: 'tkt4', subject: 'Billing question', status: 'Closed', lastUpdate: '2024-06-30' },
        ]
    },
    {
        id: 105, name: 'Data Dynamics', industry: 'IT Services', logoUrl: 'https://logo.clearbit.com/datadynamics.com',
        arr: 180000, tcv: 540000, since: '2022-03-12', renewalDate: '2025-03-12', region: 'North America', products: ['Core Platform', 'Analytics Suite'],
        healthScore: 90, salesOwnerId: 10, csOwnerId: 6, parentCompany: 'Solutions Group', employeeCount: 3000, strategicValue: 'High',
        recentActivity: [], supportTickets: []
    },
    {
        id: 106, name: 'EcoPower', industry: 'Energy', logoUrl: 'https://logo.clearbit.com/ecopower.com',
        arr: 95000, tcv: 285000, since: '2023-02-28', renewalDate: '2026-02-28', region: 'EMEA', products: ['Core Platform', 'Pro Services'],
        healthScore: 78, salesOwnerId: 5, csOwnerId: 7, employeeCount: 800, strategicValue: 'Medium',
        recentActivity: [], supportTickets: []
    },
    {
        id: 107, name: 'HealthFirst Medical', industry: 'Healthcare', logoUrl: 'https://logo.clearbit.com/healthfirst.com',
        arr: 210000, tcv: 630000, since: '2021-09-15', renewalDate: '2024-09-15', region: 'North America', products: ['Core Platform', 'Analytics Suite', 'Pro Services'],
        healthScore: 88, salesOwnerId: 4, csOwnerId: 6, employeeCount: 15000, strategicValue: 'High',
        recentActivity: [], supportTickets: []
    },
    {
        id: 108, name: 'RetailRight', industry: 'Retail', logoUrl: 'https://logo.clearbit.com/retailright.com',
        arr: 60000, tcv: 120000, since: '2023-11-05', renewalDate: '2025-11-05', region: 'APAC', products: ['Core Platform'],
        healthScore: 55, salesOwnerId: 10, csOwnerId: 7, employeeCount: 2000, strategicValue: 'Low',
        recentActivity: [], supportTickets: []
    },
    {
        id: 109, name: 'LATAM Logistics', industry: 'Logistics', logoUrl: 'https://logo.clearbit.com/latamlogistics.com',
        arr: 85000, tcv: 255000, since: '2022-07-21', renewalDate: '2025-07-21', region: 'LATAM', products: ['Core Platform'],
        healthScore: 72, salesOwnerId: 5, csOwnerId: 6, employeeCount: 950, strategicValue: 'Medium',
        recentActivity: [], supportTickets: []
    },
    {
        id: 110, name: 'BuildBetter Construction', industry: 'Construction', logoUrl: 'https://logo.clearbit.com/buildbetter.com',
        arr: 110000, tcv: 330000, since: '2022-06-01', renewalDate: '2025-06-01', region: 'North America', products: ['Core Platform', 'Pro Services'],
        healthScore: 82, salesOwnerId: 10, csOwnerId: 7, employeeCount: 1800, strategicValue: 'Medium',
        recentActivity: [], supportTickets: []
    },
];

export const COMMISSION_RATE = 0.10; // 10%

export const DEAL_VALUE_FUNNEL_DATA = [
    { name: 'Pipeline', value: 2500000, fill: '#8884d8' },
    { name: 'Best Case', value: 1800000, fill: '#83a6ed' },
    { name: 'Commit', value: 1200000, fill: '#8dd1e1' },
    { name: 'Closed Won', value: 750000, fill: '#82ca9d' },
];

export const FINANCE_FORECAST_DATA = [
    { name: 'Jan', forecast: 580000, actual: 610000 },
    { name: 'Feb', forecast: 620000, actual: 630000 },
    { name: 'Mar', forecast: 650000, actual: 640000 },
    { name: 'Apr', forecast: 680000, actual: 700000 },
    { name: 'May', forecast: 710000, actual: 690000 },
    { name: 'Jun', forecast: 750000, actual: null }, // Future month
];

export const DEALS: Deal[] = [
    // Closed deals for commission calculation
    { id: 'D001', name: 'Innovate Corp Expansion', customerId: 101, salesOwnerId: 4, value: 50000, stage: DealStage.CLOSED_WON, closeDate: '2024-05-15' },
    { id: 'D002', name: 'Quantum Industries Upgrade', customerId: 103, salesOwnerId: 4, value: 75000, stage: DealStage.CLOSED_WON, closeDate: '2024-06-20' },
    { id: 'D003', name: 'Global Solutions Initial', customerId: 102, salesOwnerId: 5, value: 75000, stage: DealStage.CLOSED_WON, closeDate: '2024-05-20' },
    { id: 'D004', name: 'LATAM Logistics Deal', customerId: 109, salesOwnerId: 5, value: 40000, stage: DealStage.CLOSED_WON, closeDate: '2024-06-10' },
    { id: 'D005', name: 'Data Dynamics Project', customerId: 105, salesOwnerId: 10, value: 90000, stage: DealStage.CLOSED_WON, closeDate: '2024-04-30' },
    { id: 'D006', name: 'BuildBetter Construction Services', customerId: 110, salesOwnerId: 10, value: 60000, stage: DealStage.CLOSED_WON, closeDate: '2024-06-01' },
     // Open deals for funnel
    { id: 'D007', name: 'HealthFirst Medical Expansion', customerId: 107, salesOwnerId: 4, value: 120000, stage: DealStage.PROPOSAL, closeDate: '2024-08-15' },
    { id: 'D008', name: 'EcoPower Renewal', customerId: 106, salesOwnerId: 5, value: 95000, stage: DealStage.NEGOTIATION, closeDate: '2024-07-30' },
    { id: 'D009', name: 'Pioneer Ventures Upsell', customerId: 104, salesOwnerId: 5, value: 25000, stage: DealStage.QUALIFICATION, closeDate: '2024-09-01' },
    { id: 'D010', name: 'RetailRight Initial', customerId: 108, salesOwnerId: 10, value: 60000, stage: DealStage.PROSPECTING, closeDate: '2024-09-15' },
];
