export type CommitteeCardProps = {
  name: string;
  role: string;
};

export default function CommitteeCard({ name, role }: CommitteeCardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
        {name}
      </p>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        {role}
      </p>
    </div>
  );
}
