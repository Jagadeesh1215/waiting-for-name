const COLS = [
  { w: 56, label: "img" },
  { w: 200, label: "title" },
  { w: 100, label: "cat" },
  { w: 90, label: "date" },
  { w: 120, label: "actions" },
];

export function SkeletonRow() {
  return (
    <tr>
      {COLS.map(({ w, label }) => (
        <td key={label} className="px-5 py-4">
          <div
            className="h-3 rounded-md bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse"
            style={{ width: w }}
          />
        </td>
      ))}
    </tr>
  );
}
