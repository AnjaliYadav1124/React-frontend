import { useState } from "react";
import { Calendar } from "lucide-react";
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

export const Summary = ({ invoice }) => {
  const [tags, setTags] = useState(["Defaulter", "Paid"]);
  const [inputTag, setInputTag] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputTag.trim()) {
      e.preventDefault();
      if (!tags.includes(inputTag.trim())) {
        setTags([...tags, inputTag.trim()]);
      }
      setInputTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
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

      <div className="mt-4">
        <Label>Supplier *</Label>
        <Input defaultValue={invoice?.company} className="h-9" />
      </div>

      <div className="mt-4">
        <Label>Invoice / Ref # *</Label>
        <Input defaultValue={invoice?.invoiceNumber} className="h-9" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label>Date *</Label>
          <div className="relative">
            <Input defaultValue={invoice?.date || "2025-06-20"} className="pr-8 h-9" />
            <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <div>
          <Label>Due Date *</Label>
          <div className="relative">
            <Input defaultValue="2025-06-27" className="pr-8 h-9" />
            <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
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
              <SelectItem value="INR">INR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4">
        <Label>Tax Rate</Label>
        <Select defaultValue="GST on Expenses 10%">
          <SelectTrigger className="mt-1 h-9 text-sm">
            <SelectValue placeholder="Select tax" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GST on Expenses 10%">GST on Expenses 10%</SelectItem>
            <SelectItem value="GST Free">GST Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label>Subtotal</Label>
          <Input defaultValue="1,215.78" className="h-9" />
        </div>
        <div>
          <Label>Tax</Label>
          <Input defaultValue="121.78" className="h-9" />
        </div>
      </div>

      <div className="mt-4">
        <Label className="font-semibold text-base">Total</Label>
        <Input defaultValue="1,337.36 AUD" className="h-10 font-semibold text-lg" />
      </div>

      <div className="space-y-4 text-sm mt-4">
        {/* ✅ TAGS */}
        <div>
          <Label>Tags</Label>
          <Input
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type tag & hit ↵ to add"
            className="h-9"
          />
          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-muted border border-border rounded-full flex items-center gap-1"
              >
                {tag}
                <button onClick={() => removeTag(tag)} className="text-xs font-bold">
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* ✅ Xero Component */}
        <div className="border rounded-md bg-white p-4">
          <XeroDestination />
        </div>
      </div>
    </>
  );
};
