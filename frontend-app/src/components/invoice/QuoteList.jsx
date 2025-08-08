import { CalendarDays, Building2, MoreHorizontal } from "lucide-react";

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
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-[15px] text-foreground">
          Connected PO(s)
        </h3>
        <button className="text-sm font-medium px-3 py-1.5 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition">
          + Add
        </button>
      </div>

      {/* Quote Cards */}
      {quotes.map((quote, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-lg bg-white px-4 pt-3 pb-2 shadow-sm"
        >
          {/* Top section */}
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-sm text-foreground mb-1">
                QI #{quote.quoteNumber}
              </div>
              <div className="text-sm text-gray-600">
                Total amount of {quote.amount}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <button className="px-4 py-1.5 text-sm font-medium border border-gray-200 rounded-md bg-white hover:bg-gray-50 shadow-sm transition">
                View
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Full-width line */}
          <div className="mt-3 mb-3 border-t border-gray-200" />

          {/* Vendor and date */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{quote.vendor}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{quote.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
