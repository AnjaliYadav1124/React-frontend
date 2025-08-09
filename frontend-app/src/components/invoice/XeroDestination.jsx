import { useState } from "react";
import { ChevronUp, ChevronDown, Mail } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const XeroDestination = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        {/* Left: logo + info */}
        <div className="flex items-start gap-3">
          <img
            src="https://seeklogo.com/images/X/xero-logo-FD83A9B40F-seeklogo.com.png"
            alt="Xero"
            className="w-9 h-9 rounded-full"
          />

          <div>
            <div className="text-[15px] font-semibold text-gray-900">Xero</div>

            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-blue-gray">Published on Jan 8, 2022 at 11:11 AM</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-md  bg-white">
                <Mail className="h-3.5 w-3.5 text-gray-600" />
              </span>
              <span>
                <span className="font-semibold text-gray-800">Vibhuti Raval</span>{" "}
                <span className="text-gray-600">(vibhuti@finsoeasy.com)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: chevron + button */}
        <div className="flex items-center gap-3 self-center">
          <button
            onClick={toggleOpen}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full 
                       border border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            )}
          </button>

          <button
            className="inline-flex items-center rounded-full border border-gray-300 
                       bg-white px-4 py-1.5 text-sm font-medium text-gray-800 
                       hover:bg-gray-50 shadow-sm"
          >
            View Purchases
          </button>
        </div>
      </div>

      {/* Divider like the ref */}
      <div className="mt-3 border-t border-gray-200" />

      {/* BODY */}
      {isOpen && (
        <div className="space-y-5 pt-3">
          {/* Set Preferences row (title + info) */}
          <div className="flex items-center gap-2 text-[13px] text-gray-600">
            <span className="font-medium text-gray-800">Set Preferences</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs">
              i
            </span>
          </div>

          {/* Preferences checkboxes */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="accent-blue-600" />
              Auto Sync
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-blue-600" />
              Save Configuration
            </label>
          </div>

          {/* Publish & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Publish as  <span className="text-red-600 ">*</span></Label>
              <Select defaultValue="Purchase">
                <SelectTrigger className="mt-1 h-10 text-[15px] rounded-md border-gray-300 bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Purchase">Purchase</SelectItem>
                  <SelectItem value="Bill">Bill</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Status  <span className="text-red-600 ">*</span></Label>
              <Select defaultValue="Awaiting Payment">
                <SelectTrigger className="mt-1 h-10 text-[15px] rounded-md border-gray-300 bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Awaiting Payment">Awaiting Payment</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Divider above line items (thin + roomy) */}
          <div className="border-t border-gray-200" />

          {/* Line Items header + segmented control */}
          <div className="flex items-center justify-between">
            <Label className="font-medium text-sm text-gray-800">Line Items</Label>
            <div className="flex items-center rounded-md overflow-hidden text-sm border border-gray-300 bg-white">
              <button className="px-3 py-1.5 font-medium text-blue-600 bg-blue-50">Single</button>
              <button className="px-3 py-1.5 text-gray-700">Multiple</button>
            </div>
          </div>

          {/* Contact / Customer */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-1 text-sm">
                Contact<span className="text-red-600"> <span className="text-red-600 ">*</span></span>
                <span className="text-gray-400 text-xm">ⓘ</span>
              </Label>
              <Input
                defaultValue="Eye Dream"
                className="h-10 mt-1 text-[15px] rounded-md border border-gray-300"
              />
            </div>
            <br/>

            <div>
              <Label className="flex items-center gap-1 text-sm">
                Customer<span className="text-gray-400 text-xm">ⓘ</span>
              </Label>
              <Input
                defaultValue="Eye Dream"
                className="h-10 mt-1 text-[15px] rounded-md border border-gray-300"
              />
            </div>
          </div>

          {/* Account Code */}
          <div>
            <Label className="text-sm">Account Code  <span className="text-red-600 ">*</span></Label>
            <Select defaultValue="310 - Cost of Goods Sold">
              <SelectTrigger className="mt-1 h-10 text-[15px] rounded-md border-gray-300 bg-white">
                <SelectValue placeholder="Select code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="310 - Cost of Goods Sold">310 - Cost of Goods Sold</SelectItem>
                <SelectItem value="320 - Operating Costs">320 - Operating Costs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm">Description</Label>
            <textarea
              className="w-full h-24 border border-gray-300 rounded-md px-3 py-2 text-sm"
              defaultValue={`Your insurance policies are approaching renewal beginning in mid August.\nPlease find attached a current schedule for your review.`}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-sm  font-medium cursor-pointer">Xero Configuration Support</span>
            <Button size="sm" className="text-sm  text-white ">
              Publish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
