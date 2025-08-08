import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Archive as ArchiveIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { XeroDestination } from "./XeroDestination";

export const InvoiceDetails = ({ invoice, onNext, onPrev }) => {
  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-muted-foreground rounded" />
          </div>
          <p className="text-sm">Select an invoice to view details</p>
        </div>
      </div>
    );
  }

  const statusStyles = {
    "Manual Review": "bg-yellow-50 text-yellow-800 border-yellow-100",
    "Processing": "bg-blue-50 text-blue-800 border-blue-100",
    "Approved": "bg-emerald-50 text-emerald-800 border-emerald-100",
    "AI Approved": "bg-green-50 text-green-800 border-green-100",
    "Flagged": "bg-red-50 text-red-800 border-red-100",
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-border">
      {/* Header */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-6 pt-6 pb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              INV #{invoice.invoiceNumber || "5460930"}
            </h2>
            {invoice.status && (
              <span
                className={`text-xs px-2 py-1 rounded-full border font-medium ${statusStyles[invoice.status] ||
                  "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
              >
                {invoice.status}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={onPrev} variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button onClick={onNext} variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 px-6 text-sm overflow-x-auto">
          {[
            "Summary",
            "Invoice Specifics",
            "PO",
            "Quotes",
            "Jobs",
            "Emails",
            "Price Trend",
          ].map((tab, idx) => (
            <button
              key={tab}
              className={`py-3 transition-colors font-medium border-b-2 ${idx === 0
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-sm">
        <div>
          <Label>Document Type *</Label>
          <Select defaultValue="invoice">
            <SelectTrigger className="mt-1 h-9 text-sm">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="quote">Quote</SelectItem>
              <SelectItem value="receipt">Receipt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Supplier *</Label>
          <Input defaultValue={invoice?.supplier} className="h-9" />
        </div>

        <div>
          <Label>Invoice / Ref # *</Label>
          <Input defaultValue={invoice?.invoiceNumber} className="h-9" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Date *</Label>
            <div className="relative">
              <Input defaultValue="2025-06-20" className="pr-8 h-9" />
              <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div>
            <Label>Due Date *</Label>
            <div className="relative">
              <Input defaultValue="2025-06-20" className="pr-8 h-9" />
              <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Total Amount *</Label>
            <Input defaultValue="$1,337.36" className="h-9" />
          </div>
          <div>
            <Label>Currency</Label>
            <Select defaultValue="AUD">
              <SelectTrigger className="mt-1 h-9 text-sm">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AUD">AUD</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Tax Rate</Label>
          <Select defaultValue="GST on Expenses 10%">
            <SelectTrigger className="mt-1 h-9 text-sm">
              <SelectValue placeholder="Select tax" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GST on Expenses 10%">
                GST on Expenses 10%
              </SelectItem>
              <SelectItem value="GST Free">GST Free</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Subtotal</Label>
            <Input defaultValue="1,215.78" className="h-9" />
          </div>
          <div>
            <Label>Tax</Label>
            <Input defaultValue="121.78" className="h-9" />
          </div>
        </div>

        <div>
          <Label className="font-semibold text-base">Total</Label>
          <Input defaultValue="1,337.36 AUD" className="h-10 font-semibold text-lg" />
        </div>

        <div className="space-y-4 text-sm">
          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <Input placeholder="Type tag & hit ↵ to add" className="h-9" />
            <div className="flex flex-wrap gap-2 mt-2 text-xs">
              {["Defaulter", "Paid", "Defaulter", "Paid"].map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-muted border border-border rounded-full"
                >
                  {tag} ✕
                </span>
              ))}
            </div>
          </div>

          {/* Destinations Header */}
          <div className="border rounded-md bg-white p-4">
            <XeroDestination />
           
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-border px-6 py-4 flex justify-between">
        <Button
          variant="ghost"
          className="text-red-600 hover:bg-red-50 text-sm flex items-center gap-2"
        >
          <ArchiveIcon className="w-4 h-4" />
          Archive
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sm">
            Mark as Paid
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
            Verify & Publish
          </Button>
        </div>
      </div>
    </div>
  );
};
