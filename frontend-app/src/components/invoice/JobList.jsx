// components/JobList.jsx
import { CalendarDays } from "lucide-react";

export const JobList = ({ jobs = [] }) => {
  if (!jobs.length) {
    return (
      <div className="text-sm text-muted-foreground py-8 text-center">
        No connected jobs available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-base">Connected Job(s)</h3>
        <button className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
          + Add
        </button>
      </div>

      {/* Job cards */}
      {jobs.map((job, idx) => (
        <div
          key={idx}
          className="border border-border rounded-md p-4 bg-white flex justify-between items-center"
        >
          {/* Left */}
          <div>
            <div className="font-medium text-sm text-foreground mb-0.5">
              JO #{job.jobNumber}
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              {job.description}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {job.date}
              </div>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium text-xs">
                {job.status}
              </span>
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
