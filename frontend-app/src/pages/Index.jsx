import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { Header } from "../components/Header.jsx";
import { InvoiceList } from "../components/invoice/InvoiceList.jsx";
import { InvoiceDocument } from "../components/invoice/InvoiceDocument.jsx";
import { InvoiceDetails } from "../components/invoice/InvoiceDetails.jsx";
import { InvoiceTabs } from "../components/invoice/InvoiceTabs.jsx";

const Index = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [listWidth, setListWidth] = useState(300);
  const [docWidth, setDocWidth] = useState(460);
  const [activeTab, setActiveTab] = useState("Summary"); // ✅ NEW
  const containerRef = useRef(null);
  const isResizingList = useRef(false);
  const isResizingDoc = useRef(false);

  const invoices = [
    {
  id: "1",
  invoiceNumber: "5460930",
  company: "Avantor Performance Pvt Ltd",
  poNumber: "PO-1048",
  jobNumber: "Job-001",
  date: "Jan 8, 2025",
  status: "Manual Review",
  products: [
    {
      code: "3004005125",
      name: "Cement Bags for Construction and Renovation Projects",
      price: "$32.15",
    },
    {
      code: "3004005126",
      name: "High-Strength Steel Bars for Enhanced Durability",
      price: "$88.00",
    },
    {
      code: "3002000055",
      name: "Reinforced Concrete Blend for Lasting Structures",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Ultra-Strong Concrete Mix for Resilient Foundations",
      price: "$1,775.00",
    },
    {
      code: "3002000055",
      name: "Premium Concrete Blend for Long-Lasting Builds",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Robust Concrete Solution for Structural Excellence",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Durable Concrete Mix for Reliable Construction",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Versatile Concrete Formula for All Building Needs",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Modular Scaffolding Solutions for Secure Work Environments",
      price: "$2,475.00",
    },
  ],
   pos: [
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Mar 24, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jun 10, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jan 23, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1943465",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Partial Match",
    },
  ],
   quotes: [ // ✅ NEW
    {
      quoteNumber: "1902390",
      amount: "$12,340",
      vendor: "Mexichem UK Limited Pvt Ltd.",
      date: "Aug 14, 2025",
    },
    {
      quoteNumber: "1902391",
      amount: "$12,340",
      vendor: "Ford Civil Contracting Pty Ltd.",
      date: "Aug 14, 2025",
    },
  ],
  jobs: [
  {
    jobNumber: "1902390",
    description: "Ensuring structural integrity is crucial in every construction project.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "Steel plays a vital role in maintaining the strength of construction structures.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "The use of steel enhances the durability of construction jobs significantly.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
],
emails: [
  {
    subject: "Invoice Details for Project Alpha-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
  },
  {
    subject: "Invoice Summary for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "This is a placeholder summary for Delta-2023. Kindly review.",
  },
  {
    subject: "Billing Information for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "Please see attached billing documents for final submission.",
  },
],
},
    {
      id: "2",
      invoiceNumber: "5460931",
      company: "Ford Civil Contracting Pty Ltd.",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Dec 30, 2025",
      status: "Manual Review",
      products: [
        { code: "3002000067", name: "Ultra-Strong Concrete", price: "$1,775.00" },
      ],
      products: [
    {
      code: "3004005125",
      name: "Cement Bags for Construction and Renovation Projects",
      price: "$32.15",
    },
    {
      code: "3004005126",
      name: "High-Strength Steel Bars for Enhanced Durability",
      price: "$88.00",
    },
    {
      code: "3002000055",
      name: "Reinforced Concrete Blend for Lasting Structures",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Ultra-Strong Concrete Mix for Resilient Foundations",
      price: "$1,775.00",
    },
    {
      code: "3002000055",
      name: "Premium Concrete Blend for Long-Lasting Builds",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Robust Concrete Solution for Structural Excellence",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Durable Concrete Mix for Reliable Construction",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Versatile Concrete Formula for All Building Needs",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Modular Scaffolding Solutions for Secure Work Environments",
      price: "$2,475.00",
    },
  ],
   pos: [
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Mar 24, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jun 10, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jan 23, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1943465",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Partial Match",
    },
  ],
   quotes: [ // ✅ NEW
    {
      quoteNumber: "1902390",
      amount: "$12,340",
      vendor: "Mexichem UK Limited Pvt Ltd.",
      date: "Aug 14, 2025",
    },
    {
      quoteNumber: "1902391",
      amount: "$12,340",
      vendor: "Ford Civil Contracting Pty Ltd.",
      date: "Aug 14, 2025",
    },
  ],
  jobs: [
  {
    jobNumber: "1902390",
    description: "Ensuring structural integrity is crucial in every construction project.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "Steel plays a vital role in maintaining the strength of construction structures.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "The use of steel enhances the durability of construction jobs significantly.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
],
emails: [
  {
    subject: "Invoice Details for Project Alpha-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
  },
  {
    subject: "Invoice Summary for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "This is a placeholder summary for Delta-2023. Kindly review.",
  },
  {
    subject: "Billing Information for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "Please see attached billing documents for final submission.",
  },
],
    },
    {
      id: "3",
      invoiceNumber: "5460932",
      company: "SAI Life Sciences Limited",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Dec 4, 2024",
      status: "Approved",
      products: [
    {
      code: "3004005125",
      name: "Cement Bags for Construction and Renovation Projects",
      price: "$32.15",
    },
    {
      code: "3004005126",
      name: "High-Strength Steel Bars for Enhanced Durability",
      price: "$88.00",
    },
    {
      code: "3002000055",
      name: "Reinforced Concrete Blend for Lasting Structures",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Ultra-Strong Concrete Mix for Resilient Foundations",
      price: "$1,775.00",
    },
    {
      code: "3002000055",
      name: "Premium Concrete Blend for Long-Lasting Builds",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Robust Concrete Solution for Structural Excellence",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Durable Concrete Mix for Reliable Construction",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Versatile Concrete Formula for All Building Needs",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Modular Scaffolding Solutions for Secure Work Environments",
      price: "$2,475.00",
    },
  ],
   pos: [
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Mar 24, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jun 10, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jan 23, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1943465",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Partial Match",
    },
  ],
   quotes: [ // ✅ NEW
    {
      quoteNumber: "1902390",
      amount: "$12,340",
      vendor: "Mexichem UK Limited Pvt Ltd.",
      date: "Aug 14, 2025",
    },
    {
      quoteNumber: "1902391",
      amount: "$12,340",
      vendor: "Ford Civil Contracting Pty Ltd.",
      date: "Aug 14, 2025",
    },
  ],
  jobs: [
  {
    jobNumber: "1902390",
    description: "Ensuring structural integrity is crucial in every construction project.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "Steel plays a vital role in maintaining the strength of construction structures.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "The use of steel enhances the durability of construction jobs significantly.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
],
emails: [
  {
    subject: "Invoice Details for Project Alpha-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
  },
  {
    subject: "Invoice Summary for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "This is a placeholder summary for Delta-2023. Kindly review.",
  },
  {
    subject: "Billing Information for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "Please see attached billing documents for final submission.",
  },
],
    },
    {
      id: "4",
      invoiceNumber: "5460933",
      company: "Denisco Chemicals Private Limited",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Dec 7, 2025",
      status: "Processing",
      warning: true,
      products: [
    {
      code: "3004005125",
      name: "Cement Bags for Construction and Renovation Projects",
      price: "$32.15",
    },
    {
      code: "3004005126",
      name: "High-Strength Steel Bars for Enhanced Durability",
      price: "$88.00",
    },
    {
      code: "3002000055",
      name: "Reinforced Concrete Blend for Lasting Structures",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Ultra-Strong Concrete Mix for Resilient Foundations",
      price: "$1,775.00",
    },
    {
      code: "3002000055",
      name: "Premium Concrete Blend for Long-Lasting Builds",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Robust Concrete Solution for Structural Excellence",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Durable Concrete Mix for Reliable Construction",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Versatile Concrete Formula for All Building Needs",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Modular Scaffolding Solutions for Secure Work Environments",
      price: "$2,475.00",
    },
  ],
   pos: [
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Mar 24, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jun 10, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jan 23, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1943465",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Partial Match",
    },
  ],
   quotes: [ // ✅ NEW
    {
      quoteNumber: "1902390",
      amount: "$12,340",
      vendor: "Mexichem UK Limited Pvt Ltd.",
      date: "Aug 14, 2025",
    },
    {
      quoteNumber: "1902391",
      amount: "$12,340",
      vendor: "Ford Civil Contracting Pty Ltd.",
      date: "Aug 14, 2025",
    },
  ],
  jobs: [
  {
    jobNumber: "1902390",
    description: "Ensuring structural integrity is crucial in every construction project.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "Steel plays a vital role in maintaining the strength of construction structures.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "The use of steel enhances the durability of construction jobs significantly.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
],
emails: [
  {
    subject: "Invoice Details for Project Alpha-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
  },
  {
    subject: "Invoice Summary for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "This is a placeholder summary for Delta-2023. Kindly review.",
  },
  {
    subject: "Billing Information for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "Please see attached billing documents for final submission.",
  },
],
    },
    {
      id: "5",
      invoiceNumber: "5460934",
      company: "Zhejiang chemical import and export co., ltd.",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Dec 30, 2023",
      status: "Flagged",
      products: [
    {
      code: "3004005125",
      name: "Cement Bags for Construction and Renovation Projects",
      price: "$32.15",
    },
    {
      code: "3004005126",
      name: "High-Strength Steel Bars for Enhanced Durability",
      price: "$88.00",
    },
    {
      code: "3002000055",
      name: "Reinforced Concrete Blend for Lasting Structures",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Ultra-Strong Concrete Mix for Resilient Foundations",
      price: "$1,775.00",
    },
    {
      code: "3002000055",
      name: "Premium Concrete Blend for Long-Lasting Builds",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Robust Concrete Solution for Structural Excellence",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Durable Concrete Mix for Reliable Construction",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Versatile Concrete Formula for All Building Needs",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Modular Scaffolding Solutions for Secure Work Environments",
      price: "$2,475.00",
    },
  ],
   pos: [
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Mar 24, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jun 10, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jan 23, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1943465",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Partial Match",
    },
  ],
   quotes: [ // ✅ NEW
    {
      quoteNumber: "1902390",
      amount: "$12,340",
      vendor: "Mexichem UK Limited Pvt Ltd.",
      date: "Aug 14, 2025",
    },
    {
      quoteNumber: "1902391",
      amount: "$12,340",
      vendor: "Ford Civil Contracting Pty Ltd.",
      date: "Aug 14, 2025",
    },
  ],
  jobs: [
  {
    jobNumber: "1902390",
    description: "Ensuring structural integrity is crucial in every construction project.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "Steel plays a vital role in maintaining the strength of construction structures.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "The use of steel enhances the durability of construction jobs significantly.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
],
emails: [
  {
    subject: "Invoice Details for Project Alpha-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
  },
  {
    subject: "Invoice Summary for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "This is a placeholder summary for Delta-2023. Kindly review.",
  },
  {
    subject: "Billing Information for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "Please see attached billing documents for final submission.",
  },
],
    },
    {
      id: "6",
      invoiceNumber: "5460935",
      company: "Mexichem UK Limited",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Feb 2, 2024",
      status: "Processing",
      products: [
    {
      code: "3004005125",
      name: "Cement Bags for Construction and Renovation Projects",
      price: "$32.15",
    },
    {
      code: "3004005126",
      name: "High-Strength Steel Bars for Enhanced Durability",
      price: "$88.00",
    },
    {
      code: "3002000055",
      name: "Reinforced Concrete Blend for Lasting Structures",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Ultra-Strong Concrete Mix for Resilient Foundations",
      price: "$1,775.00",
    },
    {
      code: "3002000055",
      name: "Premium Concrete Blend for Long-Lasting Builds",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Robust Concrete Solution for Structural Excellence",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Durable Concrete Mix for Reliable Construction",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Versatile Concrete Formula for All Building Needs",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Modular Scaffolding Solutions for Secure Work Environments",
      price: "$2,475.00",
    },
  ],
   pos: [
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Mar 24, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jun 10, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jan 23, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1943465",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Partial Match",
    },
  ],
   quotes: [ // ✅ NEW
    {
      quoteNumber: "1902390",
      amount: "$12,340",
      vendor: "Mexichem UK Limited Pvt Ltd.",
      date: "Aug 14, 2025",
    },
    {
      quoteNumber: "1902391",
      amount: "$12,340",
      vendor: "Ford Civil Contracting Pty Ltd.",
      date: "Aug 14, 2025",
    },
  ],
  jobs: [
  {
    jobNumber: "1902390",
    description: "Ensuring structural integrity is crucial in every construction project.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "Steel plays a vital role in maintaining the strength of construction structures.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "The use of steel enhances the durability of construction jobs significantly.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
],
emails: [
  {
    subject: "Invoice Details for Project Alpha-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
  },
  {
    subject: "Invoice Summary for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "This is a placeholder summary for Delta-2023. Kindly review.",
  },
  {
    subject: "Billing Information for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "Please see attached billing documents for final submission.",
  },
],
    },
    {
      id: "7",
      invoiceNumber: "5460936",
      company: "Denisco Chemicals Private Limited Performance Pvt Ltd",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Dec 7, 2025",
      status: "Processing",
      warning: true,
      products: [
    {
      code: "3004005125",
      name: "Cement Bags for Construction and Renovation Projects",
      price: "$32.15",
    },
    {
      code: "3004005126",
      name: "High-Strength Steel Bars for Enhanced Durability",
      price: "$88.00",
    },
    {
      code: "3002000055",
      name: "Reinforced Concrete Blend for Lasting Structures",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Ultra-Strong Concrete Mix for Resilient Foundations",
      price: "$1,775.00",
    },
    {
      code: "3002000055",
      name: "Premium Concrete Blend for Long-Lasting Builds",
      price: "$2,475.00",
    },
    {
      code: "3002000067",
      name: "Robust Concrete Solution for Structural Excellence",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Durable Concrete Mix for Reliable Construction",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Versatile Concrete Formula for All Building Needs",
      price: "$2,475.00",
    },
    {
      code: "3002000055",
      name: "Modular Scaffolding Solutions for Secure Work Environments",
      price: "$2,475.00",
    },
  ],
   pos: [
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Mar 24, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jun 10, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1902390",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Jan 23, 2025",
      match: "Full Match",
    },
    {
      poNumber: "1943465",
      description: "Multi Pkg of machine raw material",
      deliveryDate: "Aug 14, 2025",
      poDate: "Aug 14, 2025",
      match: "Partial Match",
    },
  ],
   quotes: [ // ✅ NEW
    {
      quoteNumber: "1902390",
      amount: "$12,340",
      vendor: "Mexichem UK Limited Pvt Ltd.",
      date: "Aug 14, 2025",
    },
    {
      quoteNumber: "1902391",
      amount: "$12,340",
      vendor: "Ford Civil Contracting Pty Ltd.",
      date: "Aug 14, 2025",
    },
  ],
  jobs: [
  {
    jobNumber: "1902390",
    description: "Ensuring structural integrity is crucial in every construction project.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "Steel plays a vital role in maintaining the strength of construction structures.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
  {
    jobNumber: "1902390",
    description: "The use of steel enhances the durability of construction jobs significantly.",
    date: "Aug 14, 2025",
    status: "In-Progress",
  },
],
emails: [
  {
    subject: "Invoice Details for Project Alpha-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: `Good Afternoon Deepak,

Your insurance policies are approaching renewal beginning in mid August.
Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.

Also attached is a proposal form from CGU in relation to your Professional Indemnity insurance which also needs to be filled out and returned.
Please let me know if you have any questions.

Thank you.`,
  },
  {
    subject: "Invoice Summary for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "This is a placeholder summary for Delta-2023. Kindly review.",
  },
  {
    subject: "Billing Information for Project Delta-2023",
    date: "Jan 8, 2022",
    time: "11:11 AM",
    from: "smerigan@psccgib.com.au",
    to: "deepaksingh@gradianproject.com",
    body: "Please see attached billing documents for final submission.",
  },
],
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingList.current) {
        const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left;
        if (newWidth >= 200 && newWidth <= 400) setListWidth(newWidth);
      }

      if (isResizingDoc.current) {
        const left = containerRef.current.getBoundingClientRect().left;
        const newDocStart = listWidth + 5;
        const newDocWidth = e.clientX - left - newDocStart;
        if (newDocWidth >= 300 && newDocWidth <= 700) setDocWidth(newDocWidth);
      }
    };

    const stopResizing = () => {
      isResizingList.current = false;
      isResizingDoc.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [listWidth]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden" ref={containerRef}>
          <div
            className="flex flex-col bg-white border-r border-border overflow-hidden"
            style={{ width: listWidth + docWidth + 10 }}
          >
            <div className="border-b border-border px-6 pt-4 pb-2 bg-white">
              <InvoiceTabs activeTab={activeTab} onTabChange={setActiveTab} /> {/* ✅ */}
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div
                style={{ width: listWidth }}
                className="border-r border-border overflow-y-auto bg-white"
              >
                <InvoiceList
                  invoices={invoices}
                  selectedInvoiceId={selectedInvoice?.id}
                  onSelectInvoice={(inv) => setSelectedInvoice(inv)}
                />
              </div>

              <div
                onMouseDown={() => (isResizingList.current = true)}
                className="w-1 cursor-col-resize bg-border"
              />

              <div style={{ width: docWidth }} className="overflow-y-auto">
                <InvoiceDocument invoice={selectedInvoice} />
              </div>
            </div>
          </div>

          <div
            onMouseDown={() => (isResizingDoc.current = true)}
            className="w-1 cursor-col-resize bg-border"
          />

          <div className="flex-1 overflow-y-auto">
            <InvoiceDetails
              invoice={selectedInvoice}
              onNext={() => {}}
              onPrev={() => {}}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
