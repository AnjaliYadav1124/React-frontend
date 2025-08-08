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
  const containerRef = useRef(null);
  const isResizingList = useRef(false);
  const isResizingDoc = useRef(false);

  // ✅ Mocked list of invoices
  const invoices = [
    {
      id: "1",
      company: "Avantor Performance Pvt Ltd",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Jan 8, 2025",
      status: "Processing",
    },
    {
      id: "2",
      company: "Ford Civil Contracting Pty Ltd.",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Dec 30, 2025",
      status: "Manual Review",
    },
    {
      id: "3",
      company: "SAI Life Sciences Limited",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Dec 4, 2024",
      status: "Approved",
    },
    {
      id: "4",
      company: "Denisco Chemicals Private Limited",
      poNumber: "PO-1048",
      jobNumber: "Job-001",
      date: "Dec 7, 2025",
      status: "Processing",
      warning: true,
    },
    {
    id: "5",
    company: "Zhejiang chemical import and export co., ltd.",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Dec 30, 2023",
    status: "Flagged",
  },
  {
    id: "6",
    company: "Mexichem UK Limited",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Feb 2, 2024",
    status: "Processing",
  },
  {
    id: "7",
    company: "Denisco Chemicals Private Limited Performance Pvt Ltd",
    poNumber: "PO-1048",
    jobNumber: "Job-001",
    date: "Dec 7, 2025",
    status: "Processing",
    warning: true,
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
              <InvoiceTabs />
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div
                style={{ width: listWidth }}
                className="border-r border-border overflow-y-auto bg-white"
              >
                <InvoiceList
                  invoices={invoices} // ✅ FIXED: passing prop
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
            <InvoiceDetails invoice={selectedInvoice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
