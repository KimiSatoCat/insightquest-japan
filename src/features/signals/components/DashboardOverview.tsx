interface DashboardOverviewProps {
  total: number;
  rising: number;
  core: number;
  highTrust: number;
}

export default function DashboardOverview({
  total,
  rising,
  core,
  highTrust,
}: DashboardOverviewProps) {
  const items = [
    {
      label: "Shown now",
      value: total,
      note: "Current results after filters",
    },
    {
      label: "Rising",
      value: rising,
      note: "Properties with stronger current momentum",
    },
    {
      label: "Core",
      value: core,
      note: "Lead entries in the editorial stack",
    },
    {
      label: "High trust",
      value: highTrust,
      note: "Entries with stronger source confidence",
    },
  ];

  return (
    <section className="overview-section" aria-label="Dashboard overview">
      <div className="overview-grid">
        {items.map((item) => (
          <article key={item.label} className="overview-card">
            <p className="overview-label">{item.label}</p>
            <p className="overview-value">{item.value}</p>
            <p className="overview-note">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}