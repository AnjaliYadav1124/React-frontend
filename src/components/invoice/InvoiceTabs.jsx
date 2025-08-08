export const InvoiceTabs = () => {
  const tabs = [
    { label: "All", count: 128 },
    { label: "Review", count: 24 },
    { label: "Approved", count: 76 },
    { label: "Archived", count: 3 },
  ];

  return (
    <div className="flex items-center gap-6 px-4 pt-2 pb-1 bg-white text-sm font-medium">
      {tabs.map((tab, idx) => (
        <button
          key={tab.label}
          className={`flex items-center gap-1 border-b-2 pb-1 ${
            idx === 0
              ? "text-[#6366f1] border-[#6366f1]"
              : "text-gray-500 border-transparent hover:text-black"
          }`}
        >
          <span className="text-sm">{tab.label}</span>
          <span className="text-[13px] font-bold">{tab.count}</span>
        </button>
      ))}
    </div>
  );
};
