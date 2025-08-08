// components/EmailList.jsx
import { useState } from "react";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";

export const EmailList = ({ emails = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!emails.length) {
    return (
      <div className="text-sm text-muted-foreground py-8 text-center">
        No connected emails available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {emails.map((email, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border border-border rounded-md">
            <div
              onClick={() => toggle(idx)}
              className="cursor-pointer p-4 flex items-start justify-between"
            >
              <div>
                <div className="font-medium text-sm text-foreground mb-0.5">
                  {email.subject}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {email.date} ・ {email.time}
                </div>
              </div>
              <div className="mt-1">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>

            {isOpen && (
              <div className="px-4 pb-4 text-sm text-gray-700 space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground">From</div>
                  <div>{email.from}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">To</div>
                  <div>{email.to}</div>
                </div>
                <div className="border-t pt-3">{email.body}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
