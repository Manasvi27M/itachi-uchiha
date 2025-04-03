import React from "react";

export default function CustomTabs({ tabs, activeTab, onTabChange, children }) {
  return (
    <div>
      <div className="grid w-full grid-cols-2 rounded-lg bg-primary-600 p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab.toLowerCase())}
            className={`px-3 py-1.5 text-sm font-medium rounded-md hover:cursor-pointer transition-all ${
              activeTab === tab.toLowerCase()
                ? "bg-tonal-600 text-black shadow-sm"
                : "text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="pt-2">{children}</div>
    </div>
  );
}
