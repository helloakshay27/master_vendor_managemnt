import React, { useState, useEffect, useCallback } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { Calendar, Filter } from 'lucide-react';
import { SortableChartItem } from '@/components/SortableChartItem';
import { VendorAnalyticsFilterDialog } from '@/components/vendor-analytics/VendorAnalyticsFilterDialog';
import { VendorSectionSelector } from '@/components/vendor-analytics/VendorSectionSelector';
import '../styles/mor.css';
// Updated: All card headers now use plain styling without background colors
import {
  VendorStatCard,
  DepartmentPreQualificationChart,
  DepartmentWiseDistributionChart,
  YearWiseRegistrationChart,
  QuarterWiseRegistrationChart,
  MonthWiseRegistrationChart,
  PendingApprovalsByLevelChart,
  VendorDataTable,
  TopBottomVendorsChart,
} from '@/components/vendor-analytics';

// Mock data - Replace with actual API calls
const MOCK_VENDOR_STATS = {
  approvedVendors: 4987,
  pqVendors: 99,
  nonPqVendors: 4888,
  onboardingInProcess: 155,
  invitedVendors: 73,
  detailsSubmitted: 31,
  verificationPending: 16,
  resubmissionRequests: 35,
};

const MOCK_DEPT_PREQAL_DATA = [
  { department: 'Accounts', pqApproved: 31, nonPqApproved: 1087 },
  { department: 'Admin', pqApproved: 0, nonPqApproved: 0 },
  { department: 'ARCHITECTURE', pqApproved: 0, nonPqApproved: 0 },
  { department: 'Aviation', pqApproved: 27, nonPqApproved: 0 },
  { department: 'Billing', pqApproved: 39, nonPqApproved: 706 },
  { department: 'CLIENT FITOUT', pqApproved: 11, nonPqApproved: 0 },
  { department: 'Contracts', pqApproved: 27, nonPqApproved: 0 },
  { department: 'CORPORATE COMMUNICATION', pqApproved: 0, nonPqApproved: 85 },
  { department: 'Electrical', pqApproved: 0, nonPqApproved: 0 },
  { department: 'FACILITY MANAGEMENT', pqApproved: 11, nonPqApproved: 807 },
  { department: 'Finance', pqApproved: 0, nonPqApproved: 104 },
];

const MOCK_DEPT_DISTRIBUTION_DATA = [
  { name: 'Accounts', value: 1118 },
  { name: 'Admin', value: 20 },
  { name: 'ARCHITECTURE', value: 559 },
  { name: 'Aviation', value: 7 },
  { name: 'Billing', value: 1135 },
  { name: 'Business - Concepts and Des...', value: 121 },
  { name: 'CLIENT FITOUT', value: 18 },
  { name: 'Construction', value: 3 },
];

const MOCK_YEAR_WISE_DATA = [
  { year: '2024', pqApproved: 500, nonPqApproved: 3500 },
  { year: '2025', pqApproved: 200, nonPqApproved: 1000 },
  { year: '2026', pqApproved: 50, nonPqApproved: 100 },
];

const MOCK_QUARTER_WISE_DATA = [
  { quarter: 'Q1', pqApproved: 100, nonPqApproved: 400 },
  { quarter: 'Q2', pqApproved: 80, nonPqApproved: 350 },
  { quarter: 'Q3', pqApproved: 90, nonPqApproved: 300 },
  { quarter: 'Q4', pqApproved: 200, nonPqApproved: 4000 },
];

const MOCK_MONTH_WISE_DATA = [
  { month: 'January', pqApproved: 50, nonPqApproved: 200 },
  { month: 'February', pqApproved: 40, nonPqApproved: 180 },
  { month: 'March', pqApproved: 45, nonPqApproved: 190 },
  { month: 'April', pqApproved: 60, nonPqApproved: 210 },
  { month: 'May', pqApproved: 55, nonPqApproved: 205 },
  { month: 'June', pqApproved: 50, nonPqApproved: 195 },
  { month: 'July', pqApproved: 65, nonPqApproved: 220 },
  { month: 'August', pqApproved: 70, nonPqApproved: 230 },
  { month: 'September', pqApproved: 80, nonPqApproved: 240 },
  { month: 'October', pqApproved: 75, nonPqApproved: 235 },
  { month: 'November', pqApproved: 90, nonPqApproved: 250 },
  { month: 'December', pqApproved: 850, nonPqApproved: 3800 },
];

const MOCK_PENDING_APPROVALS_DATA = [
  { level: 'Direct Tax', count: 4 },
  { level: 'Direct tax', count: 2 },
  { level: 'Indirect Tax', count: 4 },
  { level: 'L1', count: 10 },
  { level: 'L2', count: 2 },
  { level: 'PM', count: 1 },
];

const MOCK_TOP_VENDORS_DATA = [
  { name: 'FABRICASTO PRIVATE LIMIT...', avgTat: 2 },
  { name: 'M/S POKARNA ENGINEERE...', avgTat: 2 },
  { name: 'Om Sai Enterprises', avgTat: 2 },
  { name: 'Envirotech', avgTat: 3 },
  { name: 'THE SHINE REFLECTO', avgTat: 3 },
  { name: 'RAMJI VITHAL JAGTAP', avgTat: 4 },
  { name: 'TOR.AI LIMITED', avgTat: 5 },
  { name: 'RSB INFOTECH', avgTat: 8 },
  { name: 'R. A. CONTRACTOR\'S', avgTat: 8 },
  { name: 'Snehal Fiber Products', avgTat: 9 },
  { name: 'Royal Stone Solution', avgTat: 10 },
  { name: 'DECKO FLOOR PRIVATE LIM...', avgTat: 18 },
  { name: 'R S Consultants', avgTat: 20 },
  { name: 'BALAJI MANAGEMENT SOL...', avgTat: 29 },
];

const MOCK_BOTTOM_VENDORS_DATA = [
  { name: 'Urban Solutions', avgTat: 49 },
  { name: 'PRACHI ENTERPRISES', avgTat: 37 },
  { name: 'BALAJI MANAGEMENT SOL...', avgTat: 29 },
  { name: 'R S Consultants', avgTat: 20 },
  { name: 'DECKO FLOOR PRIVATE LIM...', avgTat: 18 },
  { name: 'Royal Stone Solution', avgTat: 10 },
  { name: 'Snehal Fiber Products', avgTat: 9 },
  { name: 'R. A. CONTRACTOR\'S', avgTat: 8 },
  { name: 'RSB INFOTECH', avgTat: 8 },
  { name: 'TOR.AI LIMITED', avgTat: 5 },
  { name: 'RAMJI VITHAL JAGTAP', avgTat: 4 },
  { name: 'KELLEY MATERIAL HANDLI...', avgTat: 4 },
  { name: 'THE SHINE REFLECTO', avgTat: 3 },
  { name: 'Avighna Associates', avgTat: 3 },
];

const MOCK_SUPPLIER_PERFORMANCE_COLUMNS = [
  { key: 'department', label: 'Department Name' },
  { key: 'approvedVendors', label: 'Approved Vendors' },
  { key: 'avgTat', label: 'Avg TAT (Dept)' },
  { key: 'invitedToApproved', label: 'Invited to Approved Vendors' },
];

const MOCK_SUPPLIER_PERFORMANCE_DATA = [
  { department: '', approvedVendors: '', avgTat: '369.00', invitedToApproved: '' },
  { department: 'Accounts', approvedVendors: '', avgTat: '1.50', invitedToApproved: '' },
  { department: 'Admin', approvedVendors: '', avgTat: '0.67', invitedToApproved: '' },
  { department: 'Billing', approvedVendors: '', avgTat: '29.91', invitedToApproved: '' },
  { department: 'Contracts', approvedVendors: '', avgTat: '9.25', invitedToApproved: '' },
  { department: 'FACILITY MANAGEMENT', approvedVendors: '', avgTat: '8.27', invitedToApproved: '' },
  { department: 'Finance', approvedVendors: '', avgTat: '0.00', invitedToApproved: '' },
  { department: 'IBMS', approvedVendors: '', avgTat: '20.00', invitedToApproved: '' },
  { department: 'Legal and Liaison', approvedVendors: '', avgTat: '1.00', invitedToApproved: '' },
  { department: 'Liaisoning (Mumbai)', approvedVendors: '', avgTat: '11.50', invitedToApproved: '' },
  { department: 'Purchase P1', approvedVendors: '', avgTat: '17.50', invitedToApproved: '' },
  { department: 'Purchase P2', approvedVendors: '', avgTat: '0.75', invitedToApproved: '' },
  { department: 'Spazio', approvedVendors: '', avgTat: '0.00', invitedToApproved: '' },
  { department: 'Accounts', approvedVendors: '825', avgTat: '0.00', invitedToApproved: '0' },
  { department: 'Aviation', approvedVendors: '3', avgTat: '0.00', invitedToApproved: '0' },
];

const MOCK_APPROVED_VENDORS_COLUMNS = [
  { key: 'organization', label: 'Organization Name' },
  { key: 'department', label: 'Department Name' },
  { key: 'status', label: 'Status' },
  { key: 'vendorTat', label: 'Vendor TAT' },
  { key: 'internalTat', label: 'Internal TAT' },
  { key: 'cumulativeTat', label: 'Cumulative TAT' },
  { key: 'approvalDate', label: 'Approval Date' },
  { key: 'vendorCode', label: 'Vendor Code' },
  { key: 'category', label: 'Category' },
  { key: 'contactPerson', label: 'Contact Person' },
  { key: 'contactEmail', label: 'Contact Email' },
  { key: 'approvedVendors', label: 'Approved Vendors' },
];

const MOCK_APPROVED_VENDORS_DATA = [
  {
    organization: 'RONAK ENTERPRISES',
    department: 'FACILITY MANAGEMENT',
    status: 'approved',
    vendorTat: 238,
    internalTat: 39,
    cumulativeTat: 277,
    approvalDate: '15/01/2025',
    vendorCode: 'APVEN001',
    category: 'Facility Services',
    contactPerson: 'Ronak Shah',
    contactEmail: 'ronak@enterprises.com',
    approvedVendors: 1,
  },
  {
    organization: 'S A ENTERPRISES',
    department: 'Purchase P1',
    status: 'approved',
    vendorTat: 217,
    internalTat: 6,
    cumulativeTat: 223,
    approvalDate: '20/01/2025',
    vendorCode: 'APVEN002',
    category: 'Trading & Supplies',
    contactPerson: 'S.A. Patil',
    contactEmail: 'sa@enterprises.com',
    approvedVendors: 1,
  },
  {
    organization: 'TECHNO SOLUTIONS INDIA PVT LTD',
    department: 'IT Services',
    status: 'approved',
    vendorTat: 145,
    internalTat: 12,
    cumulativeTat: 157,
    approvalDate: '25/01/2025',
    vendorCode: 'APVEN003',
    category: 'IT & Software',
    contactPerson: 'Rajesh Kumar',
    contactEmail: 'rajesh@technosolutions.com',
    approvedVendors: 1,
  },
  {
    organization: 'GLOBAL CONSTRUCTION SERVICES',
    department: 'Construction',
    status: 'approved',
    vendorTat: 189,
    internalTat: 22,
    cumulativeTat: 211,
    approvalDate: '01/02/2025',
    vendorCode: 'APVEN004',
    category: 'Construction',
    contactPerson: 'Anil Deshmukh',
    contactEmail: 'anil@globalconstruction.com',
    approvedVendors: 1,
  },
  {
    organization: 'MODERN ELECTRICAL WORKS',
    department: 'Electrical',
    status: 'approved',
    vendorTat: 167,
    internalTat: 18,
    cumulativeTat: 185,
    approvalDate: '05/02/2025',
    vendorCode: 'APVEN005',
    category: 'Electrical Services',
    contactPerson: 'Suresh Electricals',
    contactEmail: 'suresh@modernelectrical.com',
    approvedVendors: 1,
  },
  {
    organization: 'PRIME LOGISTICS & TRANSPORT',
    department: 'Purchase P2',
    status: 'approved',
    vendorTat: 134,
    internalTat: 9,
    cumulativeTat: 143,
    approvalDate: '10/02/2025',
    vendorCode: 'APVEN006',
    category: 'Transportation',
    contactPerson: 'Vijay Transport',
    contactEmail: 'vijay@primelogistics.com',
    approvedVendors: 1,
  },
  {
    organization: 'ADVANCED MECHANICAL SYSTEMS',
    department: 'IBMS',
    status: 'approved',
    vendorTat: 201,
    internalTat: 25,
    cumulativeTat: 226,
    approvalDate: '15/02/2025',
    vendorCode: 'APVEN007',
    category: 'Mechanical Services',
    contactPerson: 'Prakash Mech',
    contactEmail: 'prakash@advancedmech.com',
    approvedVendors: 1,
  },
  {
    organization: 'Total',
    isTotal: true,
    department: '',
    status: '',
    vendorTat: '',
    internalTat: '',
    cumulativeTat: '',
    approvalDate: '',
    vendorCode: '',
    category: '',
    contactPerson: '',
    contactEmail: '',
    approvedVendors: 4987,
  },
];

const MOCK_PQ_VENDORS_DATA = [
  { organization: 'Kpmg Assurance And Consulting Services LLP', department: 'Accounts', status: 'approved', vendorCode: 'VEN001', registrationDate: '15/01/2024', category: 'Professional Services', contactPerson: 'Rajesh Kumar', email: 'rajesh@kpmg.com', pqApprovedVendors: 1 },
  { organization: 'CHAITANYA SOIL SCIENCES PRIVATE LIMITED', department: 'ARCHITECTURE', status: 'approved', vendorCode: 'VEN002', registrationDate: '20/02/2024', category: 'Construction', contactPerson: 'Amit Sharma', email: 'amit@chaitanya.com', pqApprovedVendors: 1 },
  { organization: 'SQUARE ONE MEDIA SOLUTIONS PVT LTD', department: 'Architecture-1', status: 'approved', vendorCode: 'VEN003', registrationDate: '10/03/2024', category: 'Media', contactPerson: 'Priya Singh', email: 'priya@squareone.com', pqApprovedVendors: 1 },
  { organization: 'ADARSH SANITATION', department: 'Billing', status: 'approved', vendorCode: 'VEN004', registrationDate: '05/04/2024', category: 'Facility Management', contactPerson: 'Suresh Patil', email: 'suresh@adarsh.com', pqApprovedVendors: 1 },
  { organization: 'ADITYA CRANE SERVICE', department: 'Billing', status: 'approved', vendorCode: 'VEN005', registrationDate: '12/05/2024', category: 'Equipment Rental', contactPerson: 'Vijay Desai', email: 'vijay@aditya.com', pqApprovedVendors: 1 },
  { organization: 'ALKOM SYNERGY PRIVATE LIMITED', department: 'Billing', status: 'approved', vendorCode: 'VEN006', registrationDate: '18/06/2024', category: 'IT Services', contactPerson: 'Neha Reddy', email: 'neha@alkom.com', pqApprovedVendors: 1 },
  { organization: 'B2B LABYRINTH SOLUTIONS PRIVATE LIMITED', department: 'Billing', status: 'approved', vendorCode: 'VEN007', registrationDate: '22/07/2024', category: 'Consulting', contactPerson: 'Arun Mehta', email: 'arun@b2b.com', pqApprovedVendors: 1 },
  { organization: 'BHOLERNATH CRANE SERVICE', department: 'Billing', status: 'approved', vendorCode: 'VEN008', registrationDate: '30/08/2024', category: 'Equipment Rental', contactPerson: 'Ramesh Gupta', email: 'ramesh@bholer.com', pqApprovedVendors: 1 },
  { organization: 'Crystal Water Age', department: 'Billing', status: 'approved', vendorCode: 'VEN009', registrationDate: '15/09/2024', category: 'Water Treatment', contactPerson: 'Kavita Joshi', email: 'kavita@crystal.com', pqApprovedVendors: 1 },
  { organization: 'ELEMECH LABS PRIVATE LIMITED', department: 'Billing', status: 'approved', vendorCode: 'VEN010', registrationDate: '25/10/2024', category: 'Testing Services', contactPerson: 'Deepak Verma', email: 'deepak@elemech.com', pqApprovedVendors: 1 },
  { organization: 'Total', isTotal: true, department: '', status: '', vendorCode: '', registrationDate: '', category: '', contactPerson: '', email: '', pqApprovedVendors: 99 },
];

const MOCK_NON_PQ_VENDORS_DATA = [
  { organization: 'Bhave Nikhil Madhukar', department: 'Accounts', status: 'approved', vendorCode: 'NPQV001', registrationDate: '12/01/2025', category: 'Individual Contractor', contactPerson: 'Nikhil Bhave', phone: '+91 9876543210', nonPqApprovedVendors: 1 },
  { organization: 'Kiran Shankar Gaikwad', department: 'Accounts', status: 'approved', vendorCode: 'NPQV002', registrationDate: '18/01/2025', category: 'Individual Contractor', contactPerson: 'Kiran Gaikwad', phone: '+91 9876543211', nonPqApprovedVendors: 1 },
  { organization: 'VIBHUTI MISHRA', department: 'Accounts', status: 'approved', vendorCode: 'NPQV003', registrationDate: '25/01/2025', category: 'Individual Contractor', contactPerson: 'Vibhuti Mishra', phone: '+91 9876543212', nonPqApprovedVendors: 1 },
  { organization: '46 BANYAN TREE CO-OPERATIVE HOUSING SOCIETY LIMITED', department: 'Accounts', status: 'approved', vendorCode: 'NPQV004', registrationDate: '02/02/2025', category: 'Society', contactPerson: 'Secretary', phone: '+91 9876543213', nonPqApprovedVendors: 1 },
  { organization: 'A K Transport Co.', department: 'Accounts', status: 'approved', vendorCode: 'NPQV005', registrationDate: '10/02/2025', category: 'Transportation', contactPerson: 'A.K. Patil', phone: '+91 9876543214', nonPqApprovedVendors: 1 },
  { organization: 'A N J K & CO LLP', department: 'Accounts', status: 'approved', vendorCode: 'NPQV006', registrationDate: '15/02/2025', category: 'Financial Services', contactPerson: 'Anjali Kumar', phone: '+91 9876543215', nonPqApprovedVendors: 1 },
  { organization: 'A P D B And Associates', department: 'Accounts', status: 'approved', vendorCode: 'NPQV007', registrationDate: '20/02/2025', category: 'Consulting', contactPerson: 'A.P. Das', phone: '+91 9876543216', nonPqApprovedVendors: 1 },
  { organization: 'A P TALWAR & ASSOCIATES', department: 'Accounts', status: 'approved', vendorCode: 'NPQV008', registrationDate: '25/02/2025', category: 'Legal Services', contactPerson: 'A.P. Talwar', phone: '+91 9876543217', nonPqApprovedVendors: 1 },
  { organization: 'A.D.TAWADE', department: 'Accounts', status: 'approved', vendorCode: 'NPQV009', registrationDate: '28/02/2025', category: 'Individual Contractor', contactPerson: 'A.D. Tawade', phone: '+91 9876543218', nonPqApprovedVendors: 1 },
  { organization: 'AABAD HARSHAD PONDA', department: 'Accounts', status: 'approved', vendorCode: 'NPQV010', registrationDate: '05/03/2025', category: 'Individual Contractor', contactPerson: 'Aabad Ponda', phone: '+91 9876543219', nonPqApprovedVendors: 1 },
  { organization: 'Total', isTotal: true, department: '', status: '', vendorCode: '', registrationDate: '', category: '', contactPerson: '', phone: '', nonPqApprovedVendors: 4888 },
];

const MOCK_INVITED_VENDORS_DATA = [
  { organization: 'BLUE LADDER HOME SERVICES', department: 'RENOVATION & WORK', status: 'invited', invitationDate: '10/01/2026', invitedBy: 'Admin', category: 'Home Services', email: 'contact@blueladder.com', responseStatus: 'Pending', invitedVendors: 3 },
  { organization: 'SLUM REHABILITATION AUTHORITY', department: 'Accounts', status: 'invited', invitationDate: '15/01/2026', invitedBy: 'Manager', category: 'Government Agency', email: 'info@sra.gov.in', responseStatus: 'Pending', invitedVendors: 2 },
  { organization: 'HOSHEDAR PHEROZE TAMBOLI', department: 'Accounts', status: 'invited', invitationDate: '20/01/2026', invitedBy: 'Admin', category: 'Individual Contractor', email: 'hoshedar@gmail.com', responseStatus: 'Viewed', invitedVendors: 1 },
  { organization: 'ICICI INVESTMENT MANAGEMENT COMPANY LIMITED', department: 'Accounts', status: 'invited', invitationDate: '25/01/2026', invitedBy: 'Manager', category: 'Financial Services', email: 'vendor@icici.com', responseStatus: 'Pending', invitedVendors: 1 },
  { organization: 'KANIKA ENTERPRISES', department: 'Accounts', status: 'invited', invitationDate: '01/02/2026', invitedBy: 'Admin', category: 'Trading', email: 'kanika@enterprises.com', responseStatus: 'Viewed', invitedVendors: 1 },
  { organization: 'M P STATE ELECTRONICS DEVELOPMENT CORPORATION LTD', department: 'Accounts', status: 'invited', invitationDate: '05/02/2026', invitedBy: 'Manager', category: 'Electronics', email: 'mp@sedc.gov.in', responseStatus: 'Pending', invitedVendors: 1 },
  { organization: 'MANPROJECT BESPOKE LLP', department: 'Accounts', status: 'invited', invitationDate: '10/02/2026', invitedBy: 'Admin', category: 'Project Management', email: 'info@manproject.com', responseStatus: 'Viewed', invitedVendors: 1 },
  { organization: 'Milind Sathe', department: 'Accounts', status: 'invited', invitationDate: '15/02/2026', invitedBy: 'Manager', category: 'Individual Contractor', email: 'milind.sathe@gmail.com', responseStatus: 'Pending', invitedVendors: 1 },
  { organization: 'Total', isTotal: true, department: '', status: '', invitationDate: '', invitedBy: '', category: '', email: '', responseStatus: '', invitedVendors: 73 },
];

const MOCK_VERIFICATION_PENDING_DATA = [
  { organization: 'MANISH WATER PUMP SERVICE', status: 'Approved', department: 'Contracts', overallTatDays: 11, approvalLevel: 'Direct Tax', submittedDate: '01/02/2026', assignedTo: 'Tax Officer', priority: 'High', documentsRequired: 'PAN, GST, Tax Returns', lastFollowUp: '15/02/2026', expectedCompletion: '25/02/2026', verificationPending: 1 },
  { organization: 'MANISH WATER PUMP SERVICE', status: 'Approved', department: 'Contracts', overallTatDays: 11, approvalLevel: 'Financial', submittedDate: '01/02/2026', assignedTo: 'Finance Head', priority: 'High', documentsRequired: 'Bank Statement, Audit Report', lastFollowUp: '15/02/2026', expectedCompletion: '25/02/2026', verificationPending: 1 },
  { organization: 'MANISH WATER PUMP SERVICE', status: 'Approved', department: 'Contracts', overallTatDays: 11, approvalLevel: 'HOD', submittedDate: '01/02/2026', assignedTo: 'Department Head', priority: 'Medium', documentsRequired: 'Registration Certificate', lastFollowUp: '16/02/2026', expectedCompletion: '28/02/2026', verificationPending: 1 },
  { organization: 'MANISH WATER PUMP SERVICE', status: 'Approved', department: 'Contracts', overallTatDays: 11, approvalLevel: 'Indirect Tax', submittedDate: '01/02/2026', assignedTo: 'Tax Officer', priority: 'High', documentsRequired: 'GST Compliance Certificate', lastFollowUp: '15/02/2026', expectedCompletion: '25/02/2026', verificationPending: 1 },
  { organization: 'MANISH WATER PUMP SERVICE', status: 'Approved', department: 'Contracts', overallTatDays: 11, approvalLevel: 'Level 1', submittedDate: '01/02/2026', assignedTo: 'L1 Approver', priority: 'Medium', documentsRequired: 'Company Profile, References', lastFollowUp: '16/02/2026', expectedCompletion: '28/02/2026', verificationPending: 1 },
  { organization: 'MANISH WATER PUMP SERVICE', status: 'Approved', department: 'Contracts', overallTatDays: 11, approvalLevel: 'Procurement', submittedDate: '01/02/2026', assignedTo: 'Procurement Officer', priority: 'Low', documentsRequired: 'Product Catalog, Pricing', lastFollowUp: '17/02/2026', expectedCompletion: '01/03/2026', verificationPending: 1 },
  { organization: 'SNEHA SURESH MANDHARE', status: 'Approved', department: 'Legal and Liaison', overallTatDays: 3, approvalLevel: 'Direct Tax', submittedDate: '10/02/2026', assignedTo: 'Tax Officer', priority: 'High', documentsRequired: 'PAN Card, Form 16', lastFollowUp: '18/02/2026', expectedCompletion: '22/02/2026', verificationPending: 1 },
  { organization: 'SNEHA SURESH MANDHARE', status: 'Approved', department: 'Legal and Liaison', overallTatDays: 3, approvalLevel: 'Financial', submittedDate: '10/02/2026', assignedTo: 'Finance Head', priority: 'Medium', documentsRequired: 'Bank Details, Cancelled Cheque', lastFollowUp: '18/02/2026', expectedCompletion: '23/02/2026', verificationPending: 1 },
  { organization: 'Total', isTotal: true, status: '', department: '', overallTatDays: 126, approvalLevel: '', submittedDate: '', assignedTo: '', priority: '', documentsRequired: '', lastFollowUp: '', expectedCompletion: '', verificationPending: 16 },
];

const MOCK_DETAILS_SUBMITTED_DATA = [
  { organization: 'Innovate Advisors Private Limited', department: 'Accounts', status: 'Details submitted by vendor', submissionDate: '05/02/2026', completionPercentage: '85%', documentsUploaded: '12/15', lastUpdated: '10/02/2026', reviewStatus: 'Under Review', vendorsDetailsSubmitted: 1 },
  { organization: 'TRUST INVESTMENT ADVISORS PRIVATE LIMITED', department: 'Accounts', status: 'Details submitted by vendor', submissionDate: '06/02/2026', completionPercentage: '90%', documentsUploaded: '14/15', lastUpdated: '11/02/2026', reviewStatus: 'Under Review', vendorsDetailsSubmitted: 1 },
  { organization: 'NORTAN FACILITY MANAGEMENT', department: 'Admin', status: 'Details submitted by vendor', submissionDate: '07/02/2026', completionPercentage: '78%', documentsUploaded: '10/15', lastUpdated: '12/02/2026', reviewStatus: 'Pending', vendorsDetailsSubmitted: 1 },
  { organization: 'CENTRAL WARE HOUSING CORP.LTD.', department: 'Billing', status: 'Details submitted by vendor', submissionDate: '08/02/2026', completionPercentage: '92%', documentsUploaded: '13/15', lastUpdated: '13/02/2026', reviewStatus: 'Under Review', vendorsDetailsSubmitted: 1 },
  { organization: 'D. J. REFRIGERATION', department: 'Billing', status: 'Details submitted by vendor', submissionDate: '09/02/2026', completionPercentage: '88%', documentsUploaded: '11/15', lastUpdated: '14/02/2026', reviewStatus: 'Under Review', vendorsDetailsSubmitted: 1 },
  { organization: 'Lockated', department: 'Billing', status: 'Details submitted by vendor', submissionDate: '10/02/2026', completionPercentage: '95%', documentsUploaded: '14/15', lastUpdated: '15/02/2026', reviewStatus: 'Approved', vendorsDetailsSubmitted: 1 },
  { organization: 'TREEKON DESIGN STUDIO', department: 'Billing', status: 'Details submitted by vendor', submissionDate: '11/02/2026', completionPercentage: '82%', documentsUploaded: '12/15', lastUpdated: '16/02/2026', reviewStatus: 'Under Review', vendorsDetailsSubmitted: 1 },
  { organization: 'VIVA ENTERPRISES', department: 'Billing', status: 'Details submitted by vendor', submissionDate: '12/02/2026', completionPercentage: '87%', documentsUploaded: '13/15', lastUpdated: '17/02/2026', reviewStatus: 'Under Review', vendorsDetailsSubmitted: 1 },
  { organization: 'YASH SAFETY FIRST', department: 'Billing', status: 'Details submitted by vendor', submissionDate: '13/02/2026', completionPercentage: '91%', documentsUploaded: '14/15', lastUpdated: '18/02/2026', reviewStatus: 'Under Review', vendorsDetailsSubmitted: 1 },
  { organization: 'SAHARA FURNITURES', department: 'Contracts', status: 'Details submitted by vendor', submissionDate: '14/02/2026', completionPercentage: '89%', documentsUploaded: '13/15', lastUpdated: '19/02/2026', reviewStatus: 'Under Review', vendorsDetailsSubmitted: 1 },
  { organization: 'Total', isTotal: true, department: '', status: '', submissionDate: '', completionPercentage: '', documentsUploaded: '', lastUpdated: '', reviewStatus: '', vendorsDetailsSubmitted: 31 },
];

const MOCK_ONBOARDING_IN_PROCESS_DATA = [
  { organization: 'CA Nikhil Mutha', department: 'Accounts', status: 'Verification pending', startDate: '01/01/2026', currentStage: 'Document Verification', daysInProcess: 45, assignedTo: 'Verification Team', progressPercentage: '65%', suppliersInProcess: 1 },
  { organization: 'FOURTH DIMENSION ARCHITECTS PVT LTD', department: 'Accounts', status: 'Verification pending', startDate: '05/01/2026', currentStage: 'Tax Verification', daysInProcess: 41, assignedTo: 'Tax Team', progressPercentage: '70%', suppliersInProcess: 1 },
  { organization: 'HOSHEDAR PHEROZE TAMBOLI', department: 'Accounts', status: 'Invited', startDate: '10/01/2026', currentStage: 'Invitation Sent', daysInProcess: 36, assignedTo: 'Onboarding Team', progressPercentage: '20%', suppliersInProcess: 1 },
  { organization: 'ICICI INVESTMENT MANAGEMENT COMPANY LIMITED', department: 'Accounts', status: 'Invited', startDate: '15/01/2026', currentStage: 'Awaiting Response', daysInProcess: 31, assignedTo: 'Onboarding Team', progressPercentage: '15%', suppliersInProcess: 1 },
  { organization: 'Innovate Advisors Private Limited', department: 'Accounts', status: 'Details submitted by vendor', startDate: '20/01/2026', currentStage: 'Document Review', daysInProcess: 26, assignedTo: 'Review Team', progressPercentage: '80%', suppliersInProcess: 1 },
  { organization: 'KANIKA ENTERPRISES', department: 'Accounts', status: 'Invited', startDate: '25/01/2026', currentStage: 'Invitation Sent', daysInProcess: 21, assignedTo: 'Onboarding Team', progressPercentage: '10%', suppliersInProcess: 1 },
  { organization: 'M P STATE ELECTRONICS DEVELOPMENT CORPORATION LTD', department: 'Accounts', status: 'Invited', startDate: '01/02/2026', currentStage: 'Awaiting Response', daysInProcess: 14, assignedTo: 'Onboarding Team', progressPercentage: '25%', suppliersInProcess: 1 },
  { organization: 'MANPROJECT BESPOKE LLP', department: 'Accounts', status: 'Invited', startDate: '05/02/2026', currentStage: 'Invitation Sent', daysInProcess: 10, assignedTo: 'Onboarding Team', progressPercentage: '18%', suppliersInProcess: 1 },
  { organization: 'Total', isTotal: true, department: '', status: '', startDate: '', currentStage: '', daysInProcess: '', assignedTo: '', progressPercentage: '', suppliersInProcess: 155 },
];

const MOCK_RESUBMISSION_REQUESTS_DATA = [
  { organization: 'Abhijit Borase', department: 'Accounts', status: 'Approved', requestDate: '01/01/2026', reason: 'Document Update', requestedBy: 'Compliance Team', resubmittedOn: '10/01/2026', currentStatus: 'Completed', requestForResubmissionVendors: 0 },
  { organization: 'Bhave Nikhil Madhukar', department: 'Finance', status: 'Approved', requestDate: '05/01/2026', reason: 'Tax Certificate Renewal', requestedBy: 'Tax Department', resubmittedOn: '15/01/2026', currentStatus: 'Completed', requestForResubmissionVendors: 0 },
  { organization: 'Kiran Shankar Gaikwad', department: 'Accounts', status: 'Approved', requestDate: '10/01/2026', reason: 'Bank Details Change', requestedBy: 'Finance Team', resubmittedOn: '20/01/2026', currentStatus: 'Completed', requestForResubmissionVendors: 0 },
  { organization: 'MANISH WATER PUMP SERVICE', department: 'Contracts', status: 'Approved', requestDate: '15/01/2026', reason: 'GST Update', requestedBy: 'Compliance Team', resubmittedOn: '25/01/2026', currentStatus: 'Completed', requestForResubmissionVendors: 0 },
  { organization: 'SNEHA SURESH MANDHARE', department: 'Legal', status: 'Approved', requestDate: '20/01/2026', reason: 'PAN Card Update', requestedBy: 'Legal Team', resubmittedOn: '30/01/2026', currentStatus: 'Completed', requestForResubmissionVendors: 0 },
  { organization: 'VIBHUTI MISHRA', department: 'Admin', status: 'Approved', requestDate: '25/01/2026', reason: 'Address Proof', requestedBy: 'Admin Team', resubmittedOn: '05/02/2026', currentStatus: 'Completed', requestForResubmissionVendors: 0 },
  { organization: 'VISHWAJIT L DUGANE', department: 'Purchase', status: 'Approved', requestDate: '01/02/2026', reason: 'Quality Certificate', requestedBy: 'Purchase Team', resubmittedOn: '10/02/2026', currentStatus: 'Completed', requestForResubmissionVendors: 0 },
  { organization: 'VISHWAJIT LAXMAN DUGANE', department: 'Contracts', status: 'Approved', requestDate: '05/02/2026', reason: 'Insurance Update', requestedBy: 'Contract Team', resubmittedOn: '15/02/2026', currentStatus: 'Completed', requestForResubmissionVendors: 0 },
  { organization: 'VISHWAJIT LAXMAN DUGANE', department: 'Billing', status: 'Rejected', requestDate: '10/02/2026', reason: 'Invalid Documents', requestedBy: 'Billing Team', resubmittedOn: 'N/A', currentStatus: 'Rejected', requestForResubmissionVendors: 0 },
  { organization: 'Total', isTotal: true, department: '', status: '', requestDate: '', reason: '', requestedBy: '', resubmittedOn: '', currentStatus: '', requestForResubmissionVendors: 35 },
];

function VendorManagementDashboard() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState([
    'departmentPreQual',
    'departmentDistribution',
    'yearWise',
    'quarterWise',
    'monthWise',
    'pendingApprovals',
    'topBottomVendors',
    'supplierPerformance',
    'approvedVendors',
    'pqVendors',
    'nonPqVendors',
    'invitedVendors',
    'verificationPending',
    'detailsSubmitted',
    'onboardingInProcess',
    'resubmissionRequests',
  ]);
  const [chartOrder, setChartOrder] = useState([
    'departmentPreQual',
    'departmentDistribution',
    'yearWise',
    'quarterWise',
    'monthWise',
    'pendingApprovals',
    'topBottomVendors',
    'supplierPerformance',
    'approvedVendors',
    'pqVendorsTable',
    'nonPqVendorsTable',
    'invitedVendorsTable',
    'verificationPendingTable',
    'detailsSubmittedTable',
    'onboardingInProcessTable',
    'resubmissionRequestsTable',
  ]);

  // Get default date range (last year to today)
  const getDefaultDateRange = () => {
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return {
      startDate: formatDate(lastYear),
      endDate: formatDate(today),
    };
  };

  const [dateRange, setDateRange] = useState(getDefaultDateRange());

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end for chart reordering
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setChartOrder((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over?.id.toString() || '');
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Handle analytics filter apply
  const handleAnalyticsFilterApply = (filters) => {
    setDateRange(filters);
    // TODO: Fetch data with new date range
    console.log('Fetching vendor data with date range:', filters);
  };

  // Handle section selection change
  const handleSelectionChange = (selectedSections) => {
    setVisibleSections(selectedSections);
  };

  // Mock download handlers - Replace with actual API calls
  const handleDownloadDepartmentPreQual = () => {
    console.log('Downloading Department Pre-Qualification data...');
  };

  const handleDownloadDepartmentDistribution = () => {
    console.log('Downloading Department Distribution data...');
  };

  const handleDownloadYearWise = () => {
    console.log('Downloading Year-Wise data...');
  };

  const handleDownloadQuarterWise = () => {
    console.log('Downloading Quarter-Wise data...');
  };

  const handleDownloadMonthWise = () => {
    console.log('Downloading Month-Wise data...');
  };

  const handleDownloadPendingApprovals = () => {
    console.log('Downloading Pending Approvals data...');
  };

  const handleDownloadTopBottomVendors = () => {
    console.log('Downloading Top/Bottom Vendors data...');
  };

  const handleDownloadSupplierPerformance = () => {
    console.log('Downloading Supplier Performance data...');
  };

  const handleDownloadApprovedVendors = () => {
    console.log('Downloading Approved Vendors data...');
  };

  const handleDownloadPqVendors = () => {
    console.log('Downloading PQ Vendors data...');
  };

  const handleDownloadNonPqVendors = () => {
    console.log('Downloading Non-PQ Vendors data...');
  };

  const handleDownloadInvitedVendors = () => {
    console.log('Downloading Invited Vendors data...');
  };

  const handleDownloadVerificationPending = () => {
    console.log('Downloading Verification Pending data...');
  };

  const handleDownloadDetailsSubmitted = () => {
    console.log('Downloading Details Submitted data...');
  };

  const handleDownloadOnboardingInProcess = () => {
    console.log('Downloading Onboarding In Process data...');
  };

  const handleDownloadResubmissionRequests = () => {
    console.log('Downloading Resubmission Requests data...');
  };

  return (
    <div className="site-content">
      <div className="website-content">
        <div className="module-data-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* Header Section */}
                <div className="bg-white border-b mb-4">
                  <div className="px-0 py-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                      <div>
                        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1A1A1A' }}>Vendor Management (PQ) Dashboard</h1>
                        <p className="text-gray-600 mb-0">Overview of vendor statistics and analytics</p>
                      </div>
                      
                      {/* Filter and Selector */}
                      <div className="d-flex align-items-center gap-3">
                        <button
                          onClick={() => setIsFilterOpen(true)}
                          className="btn d-flex align-items-center gap-2"
                          style={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #ddd', 
                            color: '#333',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        >
                          <Calendar style={{ width: '16px', height: '16px' }} />
                          <span style={{ fontWeight: 500 }}>
                            {dateRange.startDate} - {dateRange.endDate}
                          </span>
                          <Filter style={{ width: '16px', height: '16px' }} />
                        </button>

                        <VendorSectionSelector onSelectionChange={handleSelectionChange} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="row g-3 mb-4">
                  {visibleSections.includes('approvedVendors') && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard title="Approved Vendors" value={MOCK_VENDOR_STATS.approvedVendors} />
                    </div>
                  )}
                  {visibleSections.includes('pqVendors') && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard title="PQ Vendors" value={MOCK_VENDOR_STATS.pqVendors} />
                    </div>
                  )}
                  {visibleSections.includes('nonPqVendors') && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard title="Non-PQ Vendors" value={MOCK_VENDOR_STATS.nonPqVendors} />
                    </div>
                  )}
                  {visibleSections.includes('onboardingInProcess') && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard title="Onboarding In Process" value={MOCK_VENDOR_STATS.onboardingInProcess} />
                    </div>
                  )}
                  {visibleSections.includes('invitedVendors') && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard title="Invited Vendors" value={MOCK_VENDOR_STATS.invitedVendors} />
                    </div>
                  )}
                  {visibleSections.includes('detailsSubmitted') && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard title="Details Submitted" value={MOCK_VENDOR_STATS.detailsSubmitted} />
                    </div>
                  )}
                  {visibleSections.includes('verificationPending') && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard title="Verification Pending" value={MOCK_VENDOR_STATS.verificationPending} />
                    </div>
                  )}
                  {visibleSections.includes('resubmissionRequests') && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard title="Request for Resubmission" value={MOCK_VENDOR_STATS.resubmissionRequests} />
                    </div>
                  )}
                </div>

                {/* Charts and Tables with Drag and Drop */}
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={chartOrder} strategy={rectSortingStrategy}>
                    <div className="row">
                      {/* 2-Column Grid for Charts */}
                      <div className="col-12">
                        <div className="row g-4">
                          {chartOrder.map((chartId) => {
                            // Department Distribution and Year-Wise in first row
                            if (chartId === 'departmentDistribution' && visibleSections.includes('departmentDistribution')) {
                              return (
                                <div key={chartId} className="col-12 col-lg-6">
                                  <SortableChartItem id={chartId}>
                                    <DepartmentWiseDistributionChart
                                      data={MOCK_DEPT_DISTRIBUTION_DATA}
                                      onDownload={handleDownloadDepartmentDistribution}
                                    />
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            if (chartId === 'yearWise' && visibleSections.includes('yearWise')) {
                              return (
                                <div key={chartId} className="col-12 col-lg-6">
                                  <SortableChartItem id={chartId}>
                                    <YearWiseRegistrationChart
                                      data={MOCK_YEAR_WISE_DATA}
                                      onDownload={handleDownloadYearWise}
                                    />
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            // Quarter-Wise and Month-Wise in second row
                            if (chartId === 'quarterWise' && visibleSections.includes('quarterWise')) {
                              return (
                                <div key={chartId} className="col-12 col-lg-6">
                                  <SortableChartItem id={chartId}>
                                    <QuarterWiseRegistrationChart
                                      data={MOCK_QUARTER_WISE_DATA}
                                      onDownload={handleDownloadQuarterWise}
                                    />
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            if (chartId === 'monthWise' && visibleSections.includes('monthWise')) {
                              return (
                                <div key={chartId} className="col-12 col-lg-6">
                                  <SortableChartItem id={chartId}>
                                    <MonthWiseRegistrationChart
                                      data={MOCK_MONTH_WISE_DATA}
                                      onDownload={handleDownloadMonthWise}
                                    />
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            // Pending Approvals and Supplier Performance in third row
                            if (chartId === 'pendingApprovals' && visibleSections.includes('pendingApprovals')) {
                              return (
                                <div key={chartId} className="col-12 col-lg-6">
                                  <SortableChartItem id={chartId}>
                                    <PendingApprovalsByLevelChart
                                      data={MOCK_PENDING_APPROVALS_DATA}
                                      onDownload={handleDownloadPendingApprovals}
                                    />
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            if (chartId === 'supplierPerformance' && visibleSections.includes('supplierPerformance')) {
                              return (
                                <div key={chartId} className="col-12 col-lg-6">
                                  <SortableChartItem id={chartId}>
                                    <VendorDataTable

                                      title="Department-Wise Supplier Performance"
                                      data={MOCK_SUPPLIER_PERFORMANCE_DATA}
                                      columns={MOCK_SUPPLIER_PERFORMANCE_COLUMNS}
                                      onDownload={handleDownloadSupplierPerformance}
                                    />
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            return null;
                          })}
                        </div>

                        {/* Full-width charts below */}
                        {chartOrder.map((chartId) => {
                          if (chartId === 'departmentPreQual' && visibleSections.includes('departmentPreQual')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <DepartmentPreQualificationChart
                                    data={MOCK_DEPT_PREQAL_DATA}
                                    onDownload={handleDownloadDepartmentPreQual}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === 'topBottomVendors' && visibleSections.includes('topBottomVendors')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <TopBottomVendorsChart
                                    topData={MOCK_TOP_VENDORS_DATA}
                                    bottomData={MOCK_BOTTOM_VENDORS_DATA}
                                    onDownload={handleDownloadTopBottomVendors}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === 'approvedVendors' && visibleSections.includes('approvedVendors')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Approved Vendors"
                                    data={MOCK_APPROVED_VENDORS_DATA}
                                    columns={MOCK_APPROVED_VENDORS_COLUMNS}
                                    onDownload={handleDownloadApprovedVendors}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === 'pqVendorsTable' && visibleSections.includes('pqVendors')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="PQ Vendors"
                                    data={MOCK_PQ_VENDORS_DATA}
                                    columns={[
                                      { key: 'organization', label: 'Organization Name' },
                                      { key: 'department', label: 'Department Name' },
                                      { key: 'status', label: 'Status' },
                                      { key: 'vendorCode', label: 'Vendor Code' },
                                      { key: 'registrationDate', label: 'Registration Date' },
                                      { key: 'category', label: 'Category' },
                                      { key: 'contactPerson', label: 'Contact Person' },
                                      { key: 'email', label: 'Email' },
                                      { key: 'pqApprovedVendors', label: 'PQ Approved Vendors' },
                                    ]}
                                    onDownload={handleDownloadPqVendors}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === 'nonPqVendorsTable' && visibleSections.includes('nonPqVendors')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Non PQ Vendors"
                                    data={MOCK_NON_PQ_VENDORS_DATA}
                                    columns={[
                                      { key: 'organization', label: 'Organization Name' },
                                      { key: 'department', label: 'Department Name' },
                                      { key: 'status', label: 'Status' },
                                      { key: 'vendorCode', label: 'Vendor Code' },
                                      { key: 'registrationDate', label: 'Registration Date' },
                                      { key: 'category', label: 'Category' },
                                      { key: 'contactPerson', label: 'Contact Person' },
                                      { key: 'phone', label: 'Phone' },
                                      { key: 'nonPqApprovedVendors', label: 'Non PQ Approved Vendors' },
                                    ]}
                                    onDownload={handleDownloadNonPqVendors}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === 'invitedVendorsTable' && visibleSections.includes('invitedVendors')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Invited Vendors"
                                    data={MOCK_INVITED_VENDORS_DATA}
                                    columns={[
                                      { key: 'organization', label: 'Organization Name' },
                                      { key: 'department', label: 'Department Name' },
                                      { key: 'status', label: 'Status' },
                                      { key: 'invitationDate', label: 'Invitation Date' },
                                      { key: 'invitedBy', label: 'Invited By' },
                                      { key: 'category', label: 'Category' },
                                      { key: 'email', label: 'Email' },
                                      { key: 'responseStatus', label: 'Response Status' },
                                      { key: 'invitedVendors', label: 'Invited Vendors' },
                                    ]}
                                    onDownload={handleDownloadInvitedVendors}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === 'verificationPendingTable' && visibleSections.includes('verificationPending')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Verification Pending Vendors"
                                    data={MOCK_VERIFICATION_PENDING_DATA}
                                    columns={[
                                      { key: 'organization', label: 'Organization Name' },
                                      { key: 'status', label: 'Status' },
                                      { key: 'department', label: 'Department Name' },
                                      { key: 'overallTatDays', label: 'Overall TAT Days' },
                                      { key: 'approvalLevel', label: 'Approval Level' },
                                      { key: 'submittedDate', label: 'Submitted Date' },
                                      { key: 'assignedTo', label: 'Assigned To' },
                                      { key: 'priority', label: 'Priority' },
                                      { key: 'documentsRequired', label: 'Documents Required' },
                                      { key: 'lastFollowUp', label: 'Last Follow Up' },
                                      { key: 'expectedCompletion', label: 'Expected Completion' },
                                      { key: 'verificationPending', label: 'Verification Pending' },
                                    ]}
                                    onDownload={handleDownloadVerificationPending}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === 'detailsSubmittedTable' && visibleSections.includes('detailsSubmitted')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Details Submitted Vendors"
                                    data={MOCK_DETAILS_SUBMITTED_DATA}
                                    columns={[
                                      { key: 'organization', label: 'Organization Name' },
                                      { key: 'department', label: 'Department Name' },
                                      { key: 'status', label: 'Status' },
                                      { key: 'submissionDate', label: 'Submission Date' },
                                      { key: 'completionPercentage', label: 'Completion %' },
                                      { key: 'documentsUploaded', label: 'Documents Uploaded' },
                                      { key: 'lastUpdated', label: 'Last Updated' },
                                      { key: 'reviewStatus', label: 'Review Status' },
                                      { key: 'vendorsDetailsSubmitted', label: 'Vendors Details Submitted' },
                                    ]}
                                    onDownload={handleDownloadDetailsSubmitted}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === 'onboardingInProcessTable' && visibleSections.includes('onboardingInProcess')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Onboarding In Process"
                                    data={MOCK_ONBOARDING_IN_PROCESS_DATA}
                                    columns={[
                                      { key: 'organization', label: 'Organization Name' },
                                      { key: 'department', label: 'Department Name' },
                                      { key: 'status', label: 'Status' },
                                      { key: 'startDate', label: 'Start Date' },
                                      { key: 'currentStage', label: 'Current Stage' },
                                      { key: 'daysInProcess', label: 'Days In Process' },
                                      { key: 'assignedTo', label: 'Assigned To' },
                                      { key: 'progressPercentage', label: 'Progress %' },
                                      { key: 'suppliersInProcess', label: 'Suppliers In Process' },
                                    ]}
                                    onDownload={handleDownloadOnboardingInProcess}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === 'resubmissionRequestsTable' && visibleSections.includes('resubmissionRequests')) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Request for Resubmission Vendors"
                                    data={MOCK_RESUBMISSION_REQUESTS_DATA}
                                    columns={[
                                      { key: 'organization', label: 'Organization Name' },
                                      { key: 'department', label: 'Department Name' },
                                      { key: 'status', label: 'Status' },
                                      { key: 'requestDate', label: 'Request Date' },
                                      { key: 'reason', label: 'Reason' },
                                      { key: 'requestedBy', label: 'Requested By' },
                                      { key: 'resubmittedOn', label: 'Resubmitted On' },
                                      { key: 'currentStatus', label: 'Current Status' },
                                      { key: 'requestForResubmissionVendors', label: 'Request_for_Resubmission_Vendors' },
                                    ]}
                                    onDownload={handleDownloadResubmissionRequests}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </div>
                  </SortableContext>
                </DndContext>

                {/* Analytics Filter Dialog */}
                <VendorAnalyticsFilterDialog
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                  onApplyFilters={handleAnalyticsFilterApply}
                  currentStartDate={dateRange.startDate}
                  currentEndDate={dateRange.endDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorManagementDashboard;
