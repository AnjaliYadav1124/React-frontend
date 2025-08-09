import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { Header } from "../components/Header.jsx";
import { InvoiceList } from "../components/invoice/InvoiceList.jsx";
import { InvoiceDocument } from "../components/invoice/InvoiceDocument.jsx";
import { InvoiceDetails } from "../components/invoice/InvoiceDetails.jsx";
import { InvoiceTabs } from "../components/invoice/InvoiceTabs.jsx";
import { invoices } from "../components/invoice/InvoiceData.jsx";

const Index = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [listWidth, setListWidth] = useState(300);
  const [docWidth, setDocWidth] = useState(460);
  const [detailsTab, setDetailsTab] = useState("Summary"); // For InvoiceDetails tabs
  const [invoiceTab, setInvoiceTab] = useState("All"); // For invoice filter tabs

  const containerRef = useRef(null);
  const isResizingList = useRef(false);
  const isResizingDoc = useRef(false);

  useEffect(() => {
    if (invoices.length > 0) {
      setSelectedInvoice(invoices[0]);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      if (isResizingList.current) {
        const newWidth =
          e.clientX - containerRef.current.getBoundingClientRect().left;
        if (newWidth >= 200 && newWidth <= 400) {
          setListWidth(newWidth);
        }
      }

      if (isResizingDoc.current) {
        const left = containerRef.current.getBoundingClientRect().left;
        const newDocStart = listWidth + 5;
        const newDocWidth = e.clientX - left - newDocStart;
        if (newDocWidth >= 300 && newDocWidth <= 700) {
          setDocWidth(newDocWidth);
        }
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
          {/* Left Section: Tabs + List + Document */}
          <div
            className="flex flex-col bg-white border-r border-border overflow-hidden"
            style={{ width: listWidth + docWidth + 10 }}
          >
            {/* Tabs */}
            <div className="border-b border-border bg-white">
              <InvoiceTabs activeTab={invoiceTab} onTabChange={setInvoiceTab}  invoices={invoices} />
            </div>

            {/* Invoice List & Document */}
            <div className="flex flex-1 overflow-hidden">
              {/* List */}
              <div
                style={{ width: listWidth }}
                className="border-r border-border overflow-y-auto bg-white"
              >
                <InvoiceList
                  invoices={invoices} // ✅ Pass all invoices
                  activeTab={invoiceTab} // ✅ Let InvoiceList handle filtering
                  selectedInvoiceId={selectedInvoice?.id}
                  onSelectInvoice={(inv) => setSelectedInvoice(inv)}
                />
              </div>

              {/* Resizer between List & Document */}
              <div
                onMouseDown={() => (isResizingList.current = true)}
                className="w-1 cursor-col-resize bg-border"
              />

              {/* Document */}
              <div style={{ width: docWidth }} className="overflow-y-auto">
                <InvoiceDocument invoice={selectedInvoice} />
              </div>
            </div>
          </div>

          {/* Resizer between Document & Details */}
          <div
            onMouseDown={() => (isResizingDoc.current = true)}
            className="w-1 cursor-col-resize bg-border"
          />

          {/* Invoice Details */}
          <div className="flex-1 overflow-y-auto">
            <InvoiceDetails
              invoice={selectedInvoice}
              onNext={() => {}}
              onPrev={() => {}}
              activeTab={detailsTab}
              onTabChange={setDetailsTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;