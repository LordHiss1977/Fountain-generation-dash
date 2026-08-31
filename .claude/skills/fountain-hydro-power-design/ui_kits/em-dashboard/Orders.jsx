const { Card, Table, StatusPill, Badge, Button, Input, Select, Field, Checkbox, Icon, Tabs, KpiStat } = window.FountainHydroPowerDesignSystem_39598f;

function OrdersView({ data, onSelect, selected }) {
  const [q, setQ] = React.useState("");
  const [type, setType] = React.useState("todas");
  const [onlyOpen, setOnlyOpen] = React.useState(false);
  const rows = data.orders.filter((o) =>
    (type === "todas" || o.type === type) &&
    (!onlyOpen || o.status !== "operational") &&
    (o.desc.toLowerCase().includes(q.toLowerCase()) || o.id.toLowerCase().includes(q.toLowerCase()))
  );
  const cols = [
    { key: "id", header: "OT", width: 92 },
    { key: "desc", header: "Descripción" },
    { key: "loc", header: "Ubicación", width: 160 },
    { key: "type", header: "Tipo", width: 110 },
    { key: "owner", header: "Responsable", width: 130 },
    { key: "hours", header: "Horas", align: "right", width: 72 },
    { key: "statusLabel", header: "Estado", width: 180, render: (r) => <StatusPill status={r.status} label={r.statusLabel} /> },
    { key: "go", header: "", width: 44, align: "right", render: (r) => (
      <button onClick={() => onSelect(r)} aria-label={"Abrir " + r.id}
        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)", padding: 0 }}>
        <Icon name="chevron-right" size={18} />
      </button>
    ) },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr auto auto", gap: "var(--space-4)", alignItems: "end" }}>
        <Field label="Buscar" htmlFor="q">
          <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="OT o descripción" iconLeft={<Icon name="search" size={16} />} />
        </Field>
        <Field label="Tipo" htmlFor="t">
          <Select id="t" value={type} onChange={(e) => setType(e.target.value)}
            options={[{ value: "todas", label: "Todas" }, { value: "Preventiva", label: "Preventiva" }, { value: "Correctiva", label: "Correctiva" }, { value: "Predictiva", label: "Predictiva" }]} />
        </Field>
        <Checkbox label="Solo abiertas" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} style={{ paddingBottom: 9 }} />
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />}>Nueva orden</Button>
      </div>
      <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "stretch" }}>
        <div style={{ flex: 1 }}><Table columns={cols} rows={rows} dense /></div>
        {selected && (
          <Card style={{ width: 316, flex: "none" }} eyebrow={selected.type} title={selected.id}
            action={<Button variant="ghost" size="sm" onClick={() => onSelect(null)}>Cerrar</Button>}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", lineHeight: "var(--leading-snug)", marginBottom: "var(--space-4)" }}>{selected.desc}</div>
            <StatusPill status={selected.status} label={selected.statusLabel} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)", marginTop: "var(--space-6)" }}>
              <KpiStat label="Horas" value={selected.hours} unit="h" />
              <KpiStat label="Ubicación" value={<span style={{ fontSize: "var(--text-lg)" }}>{selected.loc}</span>} />
            </div>
            <div style={{ borderTop: "1px solid var(--border-subtle)", marginTop: "var(--space-6)", paddingTop: "var(--space-4)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
              Responsable: <strong style={{ color: "var(--text-body)" }}>{selected.owner}</strong>
            </div>
          </Card>
        )}
      </div>
      {rows.length === 0 && (
        <div style={{ padding: "var(--space-12)", textAlign: "center", color: "var(--text-faint)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", border: "1px dashed var(--border-default)", borderRadius: "var(--radius-md)" }}>
          Sin órdenes que coincidan con el filtro.
        </div>
      )}
    </div>
  );
}

function Placeholder({ label }) {
  return (
    <div style={{ padding: "var(--space-16)", textAlign: "center", border: "1px dashed var(--border-default)", borderRadius: "var(--radius-md)", background: "var(--surface-card)" }}>
      <div style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-wider)", textTransform: "uppercase", color: "var(--text-brand)" }}>{label}</div>
      <p style={{ margin: "10px auto 0", maxWidth: "46ch", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)", color: "var(--text-muted)" }}>
        No se proporcionó una fuente de diseño para esta vista. Se deja intencionalmente en blanco en lugar de inventar una pantalla.
      </p>
    </div>
  );
}

Object.assign(window, { OrdersView, Placeholder });
