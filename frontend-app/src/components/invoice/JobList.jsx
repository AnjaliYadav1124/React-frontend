import { CalendarDays, MoreHorizontal } from "lucide-react";

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
        <h3 className="font-semibold text-[15px] text-foreground">
          Connected Job(s)
        </h3>
        <button className="text-sm font-medium px-3 py-1.5 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition">
          + Add
        </button>
      </div>

      {/* Job Cards */}
      {jobs.map((job, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-lg bg-white px-4 pt-3 pb-2 shadow-sm"
        >
          {/* Top section: title, description, buttons */}
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-sm text-foreground mb-1">
                JO #{job.jobNumber}
              </div>
              <div className="text-sm text-gray-600">{job.description}</div>
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

          {/* Full-width horizontal line */}
          <div className="mt-3 mb-3 border-t border-gray-200" />

          {/* Footer info */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{job.date}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium border border-indigo-100">
              {job.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
