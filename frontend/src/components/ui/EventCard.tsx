export type EventCardProps = {
  title: string;
  dayLabel: string;
  time: string;
};

export default function EventCard({ title, dayLabel, time }: EventCardProps) {
  return (
    <li className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
          {title}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {dayLabel}
        </p>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{time}</p>
    </li>
  );
}
