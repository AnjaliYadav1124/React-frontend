// components/QuoteList.jsx
import { CalendarDays, Building2 } from "lucide-react";

export const QuoteList = ({ quotes = [] }) => {
  if (!quotes.length) {
    return (
      <div className="text-sm text-muted-foreground py-8 text-center">
        No connected quotes available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-base">Connected PO(s)</h3>
        <button className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
          + Add
        </button>
      </div>

      {/* Quote cards */}
      {quotes.map((quote, idx) => (
        <div
          key={idx}
          className="border border-border rounded-md p-4 bg-white flex justify-between items-center"
        >
          {/* Left */}
          <div>
            <div className="font-medium text-sm text-foreground mb-0.5">
              QI #{quote.quoteNumber}
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              Total amount of {quote.amount}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {quote.vendor}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {quote.date}
              </div>
            </div>
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-2">
            <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
              View
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-600 flex items-center justify-center">
              ⋯
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
