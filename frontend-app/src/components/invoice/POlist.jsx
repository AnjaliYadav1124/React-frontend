// components/POList.jsx
import { CalendarDays, Truck } from "lucide-react";

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
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-base">Connected PO(s)</h3>
        <button
          className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          onClick={onAdd}
        >
          + Add
        </button>
      </div>

      {pos.map((po, idx) => (
        <div
          key={idx}
          className="border border-border rounded-md p-4 bg-white flex justify-between items-center"
        >
          {/* Left: Info */}
          <div>
            <div className="font-medium text-sm text-foreground mb-0.5">
              PO #{po.poNumber}
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              {po.description}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                {po.deliveryDate}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {po.poDate}
              </div>
              <div
                className={`px-2 py-0.5 rounded-full font-medium text-xs ${
                  po.match === "Full Match"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {po.match}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => onView?.(po)}
            >
              View
            </button>
            <button
              className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-600 flex items-center justify-center"
              onClick={() => onMore?.(po)}
            >
              ⋯
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
