export function StackGroups({ groups }: { groups: { label: string; items: string[] }[] }) {
  return (
    <dl className="not-prose mt-2 grid gap-4 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.label} className="border-line rounded-[22px] border p-4">
          <dt className="label-mono text-muted mb-3 text-[10px]">{g.label}</dt>
          <dd className="flex flex-wrap gap-1.5">
            {g.items.map((it) => (
              <span key={it} className="bg-surface rounded-full px-3 py-1.5 text-sm">
                {it}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
