import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AccordionGroup({
  title,
  details,
}: {
  title: string;
  details: { key: string; value: string }[];
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition"
      >
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Body */}
      {isOpen && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-200 bg-white transition-all">
          {details?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm font-bold text-gray-700">
                    {detail.key}
                  </span>
                  <span className="text-sm text-gray-600 text-right w-1/2">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No details available</p>
          )}
        </div>
      )}
    </div>
  );
}
