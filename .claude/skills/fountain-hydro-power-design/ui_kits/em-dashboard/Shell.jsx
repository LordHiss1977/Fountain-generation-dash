const { Logo, Icon, IconButton, Badge, Button } = window.FountainHydroPowerDesignSystem_39598f;

const NAV = [
  { id: "resumen", label: "Resumen", icon: "layout-dashboard" },
  { id: "ordenes", label: "Órdenes de trabajo", icon: "clipboard-list" },
  { id: "activos", label: "Activos", icon: "cog" },
  { id: "indicadores", label: "Indicadores", icon: "trending-up" },
  { id: "informes", label: "Informes", icon: "file-text" },
];

function Sidebar({ view, onNav }) {
  return (
    <aside style={{ width: 244, flex: "none", background: "var(--color-teal-900)", display: "flex", flexDirection: "column", padding: "22px 0" }}>
      <div style={{ padding: "0 20px 24px" }}>
        <Logo variant="secondary" background="negative" width={150} basePath="../../assets/logos" />
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 10px" }}>
        {NAV.map((n) => {
          const on = n.id === view;
          return (
            <button key={n.id} onClick={() => onNav(n.id)}
              style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", border: "none",
                borderLeft: "3px solid " + (on ? "var(--color-teal-300)" : "transparent"),
                background: on ? "rgba(255,255,255,.10)" : "transparent", cursor: "pointer", textAlign: "left",
                color: on ? "#fff" : "rgba(255,255,255,.66)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                fontFamily: "var(--font-brand)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)",
                letterSpacing: "var(--tracking-wide)",
                transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)" }}>
              <Icon name={n.icon} size={18} />
              {n.label}
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: "auto", padding: "0 20px", borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 18 }}>
        <div style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-2xs)", letterSpacing: "var(--tracking-wider)", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Central</div>
        <div style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-md)", fontWeight: "var(--weight-semibold)", color: "#fff", marginTop: 4 }}>Bajo Frío</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "rgba(255,255,255,.5)", marginTop: 2 }}>Chiriquí, Panamá</div>
      </div>
    </aside>
  );
}

function Topbar({ title, week, period, onExport }) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-6)",
      padding: "16px var(--space-8)", background: "var(--surface-card)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-semibold)" }}>{title}</h1>
          <Badge tone="brand">Semana {week}</Badge>
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-faint)", marginTop: 3 }}>{period}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <IconButton icon={<Icon name="search" size={18} />} label="Buscar" />
        <IconButton icon={<Icon name="bell" size={18} />} label="Alertas" />
        <Button variant="secondary" size="sm" iconLeft={<Icon name="download" size={16} />} onClick={onExport}>Exportar informe</Button>
        <div style={{ width: 34, height: 34, borderRadius: "var(--radius-circle)", background: "var(--surface-brand-soft)",
          color: "var(--color-teal-800)", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-brand)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)" }}>MG</div>
      </div>
    </header>
  );
}

Object.assign(window, { Sidebar, Topbar, NAV });
