const { Card, KpiStat, Table, StatusPill, ProgressBar, SectionHeading, Badge, Button, Icon } = window.FountainHydroPowerDesignSystem_39598f;

function AvailabilityChart({ daily }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 168, paddingTop: 8 }}>
      {daily.map((d) => {
        const h = ((d.availability - 88) / 12) * 100;
        const low = d.availability < 98;
        return (
          <div key={d.d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-2xs)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{d.availability}%</div>
            <div style={{ width: "100%", height: 112, background: "var(--surface-sunken)", display: "flex", alignItems: "flex-end" }}>
              <div style={{ width: "100%", height: h + "%", background: low ? "var(--status-warning)" : "var(--accent-primary)", transition: "height var(--duration-slow) var(--ease-out)" }} />
            </div>
            <div style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-faint)" }}>{d.d}</div>
          </div>
        );
      })}
    </div>
  );
}

function NoteList({ notes }) {
  const colors = { danger: "var(--status-danger)", warning: "var(--status-warning)", success: "var(--status-success)" };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {notes.map((n, i) => (
        <div key={n.title} style={{ display: "flex", gap: 12, padding: "14px 0", borderTop: i ? "1px solid var(--border-subtle)" : "none" }}>
          <span style={{ width: 8, height: 8, borderRadius: "var(--radius-circle)", background: colors[n.tone], flex: "none", marginTop: 6 }} />
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)" }}>{n.title}</div>
            <p style={{ margin: "4px 0 0", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)", color: "var(--text-muted)" }}>{n.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Overview({ data, onOpenOrder }) {
  const unitCols = [
    { key: "name", header: "Activo" },
    { key: "status", header: "Estado", width: 210, render: (r) => <StatusPill status={r.status} /> },
    { key: "mw", header: "MW", align: "right", width: 70 },
    { key: "availability", header: "Disponibilidad", width: 170, render: (r) => <ProgressBar value={r.availability} tone={r.availability > 97 ? "brand" : "warning"} label="" /> },
    { key: "hours", header: "Horas", align: "right", width: 80 },
  ];
  const orderCols = [
    { key: "id", header: "OT", width: 92 },
    { key: "desc", header: "Descripción" },
    { key: "type", header: "Tipo", width: 110 },
    { key: "hours", header: "Horas", align: "right", width: 72 },
    { key: "statusLabel", header: "Estado", width: 180, render: (r) => <StatusPill status={r.status} label={r.statusLabel} /> },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-4)" }}>
        {data.kpis.map((k) => (
          <div key={k.label} style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderTop: "3px solid var(--accent-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", padding: "var(--space-5)" }}>
            <KpiStat {...k} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "var(--space-4)" }}>
        <Card eyebrow="Operación" title="Disponibilidad diaria" action={<Badge tone="neutral">Semana {data.week}</Badge>}>
          <AvailabilityChart daily={data.daily} />
        </Card>
        <Card eyebrow="Novedades" title="Notas del período"><NoteList notes={data.notes} /></Card>
      </div>
      <div>
        <SectionHeading level={3} eyebrow="Activos" rule={false}>Estado de unidades</SectionHeading>
        <div style={{ marginTop: "var(--space-4)" }}><Table columns={unitCols} rows={data.units} /></div>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <SectionHeading level={3} eyebrow="Mantenimiento" rule={false}>Órdenes de trabajo</SectionHeading>
          <Button variant="ghost" size="sm" iconRight={<Icon name="arrow-right" size={16} />} onClick={onOpenOrder}>Ver todas</Button>
        </div>
        <div style={{ marginTop: "var(--space-4)" }}><Table columns={orderCols} rows={data.orders} dense /></div>
      </div>
    </div>
  );
}

Object.assign(window, { Overview, AvailabilityChart, NoteList });
