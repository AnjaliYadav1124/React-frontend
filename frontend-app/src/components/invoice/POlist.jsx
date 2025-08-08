import { CalendarDays, Truck, MoreHorizontal } from "lucide-react";

export const POList = ({ pos = [], onAdd, onView, onMore }) => {
  if (!pos.length) {
    return (
      <div className="text-sm text-muted-foreground py-8 text-center">
        No connected POs available.
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
        <button
          className="text-sm font-medium px-3 py-1.5 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition"
          onClick={onAdd}
        >
          + Add
        </button>
      </div>

      {/* PO Cards */}
      {pos.map((po, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-lg bg-white px-4 pt-3 pb-2 shadow-sm"
        >
          {/* Top section */}
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-sm text-foreground mb-1">
                PO #{po.poNumber}
              </div>
              <div className="text-sm text-gray-600">
                {po.description}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <button
                className="px-4 py-1.5 text-sm font-medium border border-gray-200 rounded-md bg-white hover:bg-gray-50 shadow-sm transition"
                onClick={() => onView?.(po)}
              >
                View
              </button>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition"
                onClick={() => onMore?.(po)}
              >
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Full-width line */}
          <div className="mt-3 mb-3 border-t border-gray-200" />

          {/* Date info + status */}
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              <span>{po.deliveryDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{po.poDate}</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full font-medium text-xs ${
                po.match === "Full Match"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {po.match}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
