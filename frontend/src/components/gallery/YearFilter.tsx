"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface YearFilterProps {
  years: number[];
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  totalCount: number;
}

export default function YearFilter({
  years,
  selectedYear,
  onYearChange,
  totalCount,
}: YearFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>Filter by year:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onYearChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedYear === null
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:bg-secondary"
          }`}
        >
          All Years
        </button>

        {years.map((year) => (
          <motion.button
            key={year}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onYearChange(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedYear === year
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-secondary"
            }`}
          >
            {year}
          </motion.button>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{totalCount.toLocaleString()}</span> photos
        {selectedYear && ` from ${selectedYear}`}
      </div>
    </div>
  );
}
