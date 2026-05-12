export default function Loader({
  label = "Loading",
}: {
  label?: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-12"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span
        className="size-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800 dark:border-neutral-700 dark:border-t-neutral-100"
        aria-hidden
      />
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
    </div>
  );
}
