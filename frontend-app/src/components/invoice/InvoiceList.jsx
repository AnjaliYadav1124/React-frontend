import { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import { Badge } from "@/components/ui/badge.jsx";

const getStatusClass = (status) => {
  switch (status) {
    case "Processing":
      return "bg-blue-100 text-blue-700";
    case "Manual Review":
      return "bg-yellow-100 text-yellow-700";
    case "Approved":
      return "bg-emerald-100 text-emerald-700";
    case "AI Approved":
      return "bg-green-100 text-green-700";
    case "Flagged":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const InvoiceList = ({ invoices, onSelectInvoice, selectedInvoiceId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoices.filter((invoice) => {
    const term = searchTerm.toLowerCase();
    return (
      invoice.company.toLowerCase().includes(term) ||
      invoice.poNumber.toLowerCase().includes(term) ||
      invoice.jobNumber.toLowerCase().includes(term) ||
      invoice.status.toLowerCase().includes(term) ||
      invoice.date.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Search */}
      <div className="px-4 pt-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search..."
            className="pl-10 pr-3 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Invoice Cards */}
      <div className="flex-1 overflow-y-auto pb-6 space-y-2 pr-2 scrollbar-hide">
        {filteredInvoices.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center pt-4">
            No results found.
          </div>
        ) : (
          filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              onClick={() => onSelectInvoice(invoice)}
              className={`flex flex-col cursor-pointer transition-colors ${
                selectedInvoiceId === invoice.id
                  ? "border-l-4 border-blue-600 bg-blue-50 pl-3 pr-4 py-3 rounded-r-lg"
                  : "pl-4 pr-4 py-3 border border-border rounded-lg hover:bg-muted/50"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-1">
                  <Badge
                    variant="secondary"
                    className={`text-xs px-2 py-1 ${getStatusClass(invoice.status)}`}
                  >
                    {invoice.status}
                  </Badge>
                  {invoice.warning && (
                    <AlertTriangle className="text-yellow-600 w-4 h-4 ml-1" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{invoice.date}</span>
              </div>

              <h3 className="font-medium text-sm text-foreground mb-1">
                {invoice.company}
              </h3>

              <div className="text-xs text-muted-foreground space-x-4">
                <span>📋 {invoice.poNumber}</span>
                <span>💼 {invoice.jobNumber}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
