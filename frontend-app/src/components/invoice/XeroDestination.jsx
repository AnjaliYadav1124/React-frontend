import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const XeroDestination = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleOpen = () => setIsOpen((prev) => !prev);

    return (
        <div className="border rounded-md bg-white p-4 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-start w-full">
                    {/* Left block: Logo + info */}
                    <div className="flex items-start gap-3">
                        <img
                            src="https://seeklogo.com/images/X/xero-logo-FD83A9B40F-seeklogo.com.png"
                            alt="Xero"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <div className="font-medium text-base text-black">Xero</div>

                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <span className="text-green-600 text-lg">●</span>
                                <span>Published on Jan 8, 2022 at 11:11 AM</span>
                            </div>

                            <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <span>
                                    <strong>Vibhuti Raval</strong> (
                                    <span className="font-medium">vibhuti@finsoeasy.com</span>)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right block: Chevron and View Purchases */}
                    <div className="flex items-center gap-2 self-start">
                        <button
                            onClick={toggleOpen}
                            className="h-8 w-8 rounded-full flex border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                            {isOpen ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                        </button>

                        <button className="border border-gray-300 rounded-md px-3 py-1 text-sm font-medium hover:bg-gray-50">
                            View Purchases
                        </button>
                    </div>
                </div>


            </div>


            {/* Collapsible Content */}
            {isOpen && (
                <div className="space-y-4 pt-2 border-t border-border">
                    {/* Set Preferences */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="accent-blue-600" />
                            <span className="text-sm">Auto Sync</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" className="accent-blue-600" />
                            <span className="text-sm">Save Configuration</span>
                        </div>
                    </div>

                    {/* Publish & Status */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <Label>Publish as*</Label>
                            <Select defaultValue="Purchase">
                                <SelectTrigger className="mt-1 h-9 text-sm">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Purchase">Purchase</SelectItem>
                                    <SelectItem value="Bill">Bill</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Status*</Label>
                            <Select defaultValue="Awaiting Payment">
                                <SelectTrigger className="mt-1 h-9 text-sm">
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



                    {/* Line Items */}
                    <div className="flex items-center justify-between mt-2">
                        <Label className="font-medium text-sm">Line Items</Label>
                        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md overflow-hidden text-sm">
                            <button className="px-3 py-1 text-blue-600 bg-blue-50 font-medium">Single</button>
                            <button className="px-3 py-1 text-gray-700">Multiple</button>
                        </div>
                    </div>

                    {/* Contact / Customer */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="flex items-center gap-1">Contact<span className="text-red-600">*</span><span className="text-gray-400 text-sm">ⓘ</span></Label>
                            <Input defaultValue="Eye Dream" className="h-9 mt-1" />
                        </div>
                        <br />
                        <div>
                            <Label className="flex items-center gap-1">Customer<span className="text-gray-400 text-sm">ⓘ</span></Label>
                            <Input defaultValue="Eye Dream" className="h-9 mt-1" />
                        </div>
                    </div>

                    {/* Account Code */}
                    <div>
                        <Label>Account Code*</Label>
                        <Select defaultValue="310 - Cost of Goods Sold">
                            <SelectTrigger className="mt-1 h-9 text-sm">
                                <SelectValue placeholder="Select code" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="310 - Cost of Goods Sold">
                                    310 - Cost of Goods Sold
                                </SelectItem>
                                <SelectItem value="320 - Operating Costs">
                                    320 - Operating Costs
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Description */}
                    <div>
                        <Label>Description</Label>
                        <textarea
                            className="w-full h-24 border border-border rounded-md px-3 py-2 text-sm"
                            defaultValue={`Your insurance policies are approaching renewal beginning in mid August.\nPlease find attached a current schedule for your review.`}
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-600 font-medium cursor-pointer">
                            Xero Configuration Support
                        </span>
                        <Button size="sm" className="text-sm bg-blue-600 text-white">
                            Publish
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
