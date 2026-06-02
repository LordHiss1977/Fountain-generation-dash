"""Galactic Empire — a Plotly Dash strategy game."""
from __future__ import annotations
import json
import math
import numpy as np

import dash
from dash import dcc, html, Input, Output, State, callback, ctx
import plotly.graph_objects as go

from game.generator import new_game
from game.engine import process_turn
from game.models import (
    EmpireState, StarType, PlanetType,
    PLANET_LABELS, PLANET_ICONS, STAR_LABELS,
)

app = dash.Dash(__name__, title="Galactic Empire")

# ── Colour helpers ─────────────────────────────────────────────────────────

STAR_COLORS = {
    StarType.YELLOW_DWARF: "#FFD700",
    StarType.RED_GIANT:    "#FF4500",
    StarType.WHITE_DWARF:  "#E0E8FF",
    StarType.BLUE_GIANT:   "#6699FF",
    StarType.NEUTRON_STAR: "#CC44FF",
}

PLANET_COLORS = {
    PlanetType.MINERAL_ROCK: "#8B6914",
    PlanetType.WATER_WORLD:  "#1E90FF",
    PlanetType.GAS_GIANT:    "#FF8C00",
    PlanetType.ASTEROID:     "#9E9E9E",
}

def loyalty_color(loyalty: float) -> str:
    if loyalty >= 70:
        return "#2ecc71"
    if loyalty >= 45:
        return "#f39c12"
    return "#e74c3c"


# ── Galaxy map ─────────────────────────────────────────────────────────────

def build_galaxy_figure(state: EmpireState, selected_system_name: str | None = None) -> go.Figure:
    fig = go.Figure()

    # Background starfield (static, seeded)
    rng_bg = np.random.default_rng(12345)
    bg_x = rng_bg.uniform(-90, 90, 300)
    bg_y = rng_bg.uniform(-70, 70, 300)
    bg_sizes = rng_bg.uniform(1, 3, 300)
    fig.add_trace(go.Scatter(
        x=bg_x, y=bg_y,
        mode="markers",
        marker=dict(color="white", size=bg_sizes, opacity=0.25),
        hoverinfo="skip",
        showlegend=False,
    ))

    # Cluster halos
    for cluster in state.clusters:
        cx, cy = cluster.center
        spread = 18
        theta = np.linspace(0, 2 * math.pi, 60)
        halo_x = cx + spread * np.cos(theta) * 1.3
        halo_y = cy + spread * np.sin(theta)
        color = cluster.color if not cluster.rebellious else "#FF0000"
        fig.add_trace(go.Scatter(
            x=halo_x, y=halo_y,
            fill="toself",
            fillcolor=color,
            opacity=0.07,
            line=dict(color=color, width=1, dash="dot"),
            mode="lines",
            hoverinfo="skip",
            showlegend=False,
        ))
        # Cluster label
        fig.add_annotation(
            x=cx, y=cy + spread * 0.9,
            text=f"<b>{cluster.name}</b>",
            showarrow=False,
            font=dict(color=color, size=9),
            opacity=0.8,
        )
        if cluster.rebellious:
            fig.add_annotation(
                x=cx, y=cy - spread * 0.85,
                text="⚔ REBELLION",
                showarrow=False,
                font=dict(color="#FF4444", size=8),
            )

    # Systems
    for cluster in state.clusters:
        color = cluster.color if not cluster.rebellious else "#FF3333"
        for sys in cluster.systems:
            pop = sys.total_population
            size = 8 + min(pop / 30, 16)
            loy = sys.average_loyalty
            border_color = loyalty_color(loy)
            is_selected = sys.name == selected_system_name

            fig.add_trace(go.Scatter(
                x=[sys.x], y=[sys.y],
                mode="markers+text",
                marker=dict(
                    color=STAR_COLORS[sys.star_type],
                    size=size + (6 if is_selected else 0),
                    line=dict(color=border_color, width=3 if is_selected else 1.5),
                    symbol="star" if sys.star_type == StarType.BLUE_GIANT else "circle",
                ),
                text=[sys.name],
                textposition="top center",
                textfont=dict(color="#CCCCCC", size=8),
                customdata=[[
                    sys.name,
                    STAR_LABELS[sys.star_type],
                    sys.total_population,
                    f"{loy:.0f}",
                    len(sys.planets),
                    cluster.name,
                ]],
                hovertemplate=(
                    "<b>%{customdata[0]}</b><br>"
                    "Star: %{customdata[1]}<br>"
                    "Cluster: %{customdata[5]}<br>"
                    "Population: %{customdata[2]}M<br>"
                    "Loyalty: %{customdata[3]}%<br>"
                    "Planets: %{customdata[4]}<br>"
                    "<i>Click to inspect</i>"
                    "<extra></extra>"
                ),
                showlegend=False,
            ))

    fig.update_layout(
        paper_bgcolor="#050A14",
        plot_bgcolor="#050A14",
        xaxis=dict(
            showgrid=False, zeroline=False, showticklabels=False,
            range=[-95, 95],
        ),
        yaxis=dict(
            showgrid=False, zeroline=False, showticklabels=False,
            range=[-75, 75], scaleanchor="x",
        ),
        margin=dict(l=0, r=0, t=0, b=0),
        uirevision="galaxy",
    )
    return fig


# ── System detail panel ────────────────────────────────────────────────────

def build_system_panel(state: EmpireState, system_name: str | None) -> html.Div:
    if not system_name:
        return html.Div(
            "Click a solar system on the map to inspect it.",
            style={"color": "#666", "fontStyle": "italic", "padding": "8px"},
        )

    sys_obj = None
    cluster_name = ""
    for c in state.clusters:
        for s in c.systems:
            if s.name == system_name:
                sys_obj = s
                cluster_name = c.name
                break

    if not sys_obj:
        return html.Div("System not found.", style={"color": "#666"})

    planet_rows = []
    for p in sys_obj.planets:
        icon = PLANET_ICONS[p.planet_type]
        loy_col = loyalty_color(p.loyalty)
        planet_rows.append(html.Div([
            html.Span(icon, style={"fontSize": "16px", "marginRight": "6px"}),
            html.Span(p.name, style={"color": "#EEE", "fontWeight": "bold", "minWidth": "120px", "display": "inline-block"}),
            html.Span(PLANET_LABELS[p.planet_type], style={"color": PLANET_COLORS[p.planet_type], "minWidth": "100px", "display": "inline-block", "fontSize": "11px"}),
            html.Span(f"Pop: {p.population}M", style={"color": "#AAA", "minWidth": "80px", "display": "inline-block", "fontSize": "11px"}),
            html.Span(f"Loyalty: ", style={"color": "#AAA", "fontSize": "11px"}),
            html.Span(f"{p.loyalty:.0f}%", style={"color": loy_col, "fontWeight": "bold", "fontSize": "11px"}),
        ], style={"marginBottom": "6px", "display": "flex", "alignItems": "center"}))

    return html.Div([
        html.H4(sys_obj.name, style={"color": "#FFD700", "margin": "0 0 4px 0"}),
        html.Div([
            html.Span(f"Cluster: {cluster_name}", style={"color": "#AAA", "fontSize": "11px", "marginRight": "12px"}),
            html.Span(f"Star: {STAR_LABELS[sys_obj.star_type]}", style={"color": STAR_COLORS[sys_obj.star_type], "fontSize": "11px"}),
        ], style={"marginBottom": "10px"}),
        html.Hr(style={"borderColor": "#333", "margin": "6px 0"}),
        *planet_rows,
    ])


# ── Stat bar helper ────────────────────────────────────────────────────────

def stat_bar(label: str, value: float, color: str) -> html.Div:
    return html.Div([
        html.Div([
            html.Span(label, style={"color": "#AAA", "fontSize": "12px"}),
            html.Span(f"{value:.1f}%", style={"color": color, "fontWeight": "bold", "fontSize": "12px"}),
        ], style={"display": "flex", "justifyContent": "space-between"}),
        html.Div(
            html.Div(style={
                "width": f"{value}%",
                "height": "6px",
                "backgroundColor": color,
                "borderRadius": "3px",
                "transition": "width 0.4s ease",
            }),
            style={"backgroundColor": "#1A2035", "borderRadius": "3px", "overflow": "hidden"},
        ),
    ], style={"marginBottom": "8px"})


# ── Layout ─────────────────────────────────────────────────────────────────

app.layout = html.Div([
    dcc.Store(id="game-state"),
    dcc.Store(id="selected-system"),

    # Header
    html.Div([
        html.H1("⚡ GALACTIC EMPIRE", style={
            "color": "#FFD700", "margin": 0, "fontSize": "22px",
            "letterSpacing": "4px", "fontFamily": "monospace",
        }),
        html.Div(id="header-turn", style={"color": "#888", "fontSize": "12px", "marginTop": "2px"}),
    ], style={
        "background": "linear-gradient(135deg, #0A0F20 0%, #0D1830 100%)",
        "borderBottom": "1px solid #1E2A4A",
        "padding": "10px 20px",
        "display": "flex", "justifyContent": "space-between", "alignItems": "center",
    }),

    # Main body
    html.Div([

        # ── Left: Galaxy map ───────────────────────────────────────────────
        html.Div([
            dcc.Graph(
                id="galaxy-map",
                style={"height": "calc(100vh - 220px)"},
                config={"displayModeBar": False},
            ),
            # System inspector
            html.Div([
                html.Div(id="system-panel", style={"padding": "10px"}),
            ], style={
                "background": "#0A0F20",
                "border": "1px solid #1E2A4A",
                "borderRadius": "6px",
                "minHeight": "100px",
                "maxHeight": "180px",
                "overflowY": "auto",
            }),
        ], style={"flex": "1", "padding": "10px", "display": "flex", "flexDirection": "column", "gap": "8px"}),

        # ── Right: Controls + Stats ────────────────────────────────────────
        html.Div([

            # Empire stats
            html.Div([
                html.H3("EMPIRE STATUS", style={"color": "#FFD700", "fontSize": "11px", "letterSpacing": "2px", "margin": "0 0 10px 0"}),
                html.Div(id="stats-treasury", style={"color": "#2ecc71", "fontSize": "18px", "fontWeight": "bold", "marginBottom": "10px"}),
                html.Div(id="stats-bars"),
            ], style={"background": "#0A0F20", "border": "1px solid #1E2A4A", "borderRadius": "6px", "padding": "12px", "marginBottom": "10px"}),

            # Policy controls
            html.Div([
                html.H3("IMPERIAL EDICTS", style={"color": "#FFD700", "fontSize": "11px", "letterSpacing": "2px", "margin": "0 0 12px 0"}),

                html.Div([
                    html.Div([
                        html.Span("Tax Rate", style={"color": "#AAA", "fontSize": "11px"}),
                        html.Span(id="tax-display", style={"color": "#f39c12", "fontSize": "11px", "fontWeight": "bold"}),
                    ], style={"display": "flex", "justifyContent": "space-between"}),
                    dcc.Slider(id="tax-slider", min=0, max=50, step=1, value=20,
                               marks={0: "0%", 25: "25%", 50: "50%"},
                               tooltip={"always_visible": False},
                               className="empire-slider"),
                ], style={"marginBottom": "14px"}),

                html.Div([
                    html.Div([
                        html.Span("Inflation Rate", style={"color": "#AAA", "fontSize": "11px"}),
                        html.Span(id="inflation-display", style={"color": "#e74c3c", "fontSize": "11px", "fontWeight": "bold"}),
                    ], style={"display": "flex", "justifyContent": "space-between"}),
                    dcc.Slider(id="inflation-slider", min=0, max=20, step=0.5, value=5,
                               marks={0: "0%", 10: "10%", 20: "20%"},
                               tooltip={"always_visible": False},
                               className="empire-slider"),
                ], style={"marginBottom": "14px"}),

                html.Div([
                    html.Div([
                        html.Span("Defense Spending", style={"color": "#AAA", "fontSize": "11px"}),
                        html.Span(id="defense-display", style={"color": "#3498db", "fontSize": "11px", "fontWeight": "bold"}),
                    ], style={"display": "flex", "justifyContent": "space-between"}),
                    dcc.Slider(id="defense-slider", min=0, max=1000, step=25, value=300,
                               marks={0: "0", 500: "500", 1000: "1k"},
                               tooltip={"always_visible": False},
                               className="empire-slider"),
                ], style={"marginBottom": "14px"}),

                html.Div([
                    html.Div([
                        html.Span("Bread & Circus", style={"color": "#AAA", "fontSize": "11px"}),
                        html.Span(id="bc-display", style={"color": "#9b59b6", "fontSize": "11px", "fontWeight": "bold"}),
                    ], style={"display": "flex", "justifyContent": "space-between"}),
                    dcc.Slider(id="bc-slider", min=0, max=1000, step=25, value=200,
                               marks={0: "0", 500: "500", 1000: "1k"},
                               tooltip={"always_visible": False},
                               className="empire-slider"),
                ], style={"marginBottom": "6px"}),

                html.Button(
                    "▶  ADVANCE TURN",
                    id="advance-btn",
                    n_clicks=0,
                    style={
                        "width": "100%", "marginTop": "14px",
                        "background": "linear-gradient(135deg, #1a3a6a, #0d2044)",
                        "color": "#FFD700", "border": "1px solid #FFD700",
                        "borderRadius": "4px", "padding": "10px",
                        "fontSize": "13px", "letterSpacing": "2px",
                        "cursor": "pointer", "fontFamily": "monospace",
                    },
                ),
                html.Button(
                    "↺  NEW GAME",
                    id="new-game-btn",
                    n_clicks=0,
                    style={
                        "width": "100%", "marginTop": "8px",
                        "background": "#0A0F20",
                        "color": "#666", "border": "1px solid #333",
                        "borderRadius": "4px", "padding": "8px",
                        "fontSize": "11px", "letterSpacing": "1px",
                        "cursor": "pointer", "fontFamily": "monospace",
                    },
                ),
            ], style={"background": "#0A0F20", "border": "1px solid #1E2A4A", "borderRadius": "6px", "padding": "12px", "marginBottom": "10px"}),

            # Cluster summary
            html.Div([
                html.H3("CLUSTER OVERVIEW", style={"color": "#FFD700", "fontSize": "11px", "letterSpacing": "2px", "margin": "0 0 10px 0"}),
                html.Div(id="cluster-summary"),
            ], style={"background": "#0A0F20", "border": "1px solid #1E2A4A", "borderRadius": "6px", "padding": "12px", "overflowY": "auto", "maxHeight": "240px"}),

        ], style={"width": "280px", "flexShrink": 0, "padding": "10px", "overflowY": "auto"}),

    ], style={"display": "flex", "flex": "1", "overflow": "hidden"}),

    # Event log
    html.Div([
        html.Div(id="event-log", style={
            "color": "#99AACC", "fontSize": "11px", "fontFamily": "monospace",
            "overflowY": "auto", "height": "80px", "whiteSpace": "pre-wrap",
        }),
    ], style={
        "background": "#050A14",
        "borderTop": "1px solid #1E2A4A",
        "padding": "8px 16px",
    }),

], style={
    "backgroundColor": "#050A14",
    "minHeight": "100vh",
    "display": "flex",
    "flexDirection": "column",
    "fontFamily": "monospace",
    "color": "#CCC",
})


# ── Callbacks ──────────────────────────────────────────────────────────────

@callback(
    Output("game-state", "data"),
    Output("selected-system", "data"),
    Input("advance-btn", "n_clicks"),
    Input("new-game-btn", "n_clicks"),
    Input("galaxy-map", "clickData"),
    State("game-state", "data"),
    State("selected-system", "data"),
    State("tax-slider", "value"),
    State("inflation-slider", "value"),
    State("defense-slider", "value"),
    State("bc-slider", "value"),
    prevent_initial_call=False,
)
def update_state(advance_clicks, new_game_clicks, click_data,
                 raw_state, selected_system,
                 tax, inflation, defense, bc):
    triggered = ctx.triggered_id

    # Initialise on first load
    if raw_state is None or triggered == "new-game-btn":
        state = new_game()
        return state.to_dict(), None

    state = EmpireState.from_dict(raw_state)

    if triggered == "advance-btn":
        state.tax_rate = tax
        state.inflation_rate = inflation
        state.defense_spending = defense
        state.bread_circus_spending = bc
        state = process_turn(state)
        return state.to_dict(), selected_system

    if triggered == "galaxy-map" and click_data:
        point = click_data["points"][0]
        if "customdata" in point:
            return raw_state, point["customdata"][0]

    return raw_state, selected_system


@callback(
    Output("galaxy-map", "figure"),
    Output("header-turn", "children"),
    Output("stats-treasury", "children"),
    Output("stats-bars", "children"),
    Output("cluster-summary", "children"),
    Output("system-panel", "children"),
    Output("event-log", "children"),
    Output("tax-display", "children"),
    Output("inflation-display", "children"),
    Output("defense-display", "children"),
    Output("bc-display", "children"),
    Input("game-state", "data"),
    Input("selected-system", "data"),
    State("tax-slider", "value"),
    State("inflation-slider", "value"),
    State("defense-slider", "value"),
    State("bc-slider", "value"),
)
def render_ui(raw_state, selected_system, tax, inflation, defense, bc):
    if not raw_state:
        raise dash.exceptions.PreventUpdate

    state = EmpireState.from_dict(raw_state)

    fig = build_galaxy_figure(state, selected_system)

    # Header
    header = f"Turn {state.turn}  ·  Clusters: {len(state.clusters)}  ·  Systems: {sum(len(c.systems) for c in state.clusters)}"

    # Treasury
    tval = state.treasury
    tcol = "#2ecc71" if tval >= 0 else "#e74c3c"
    treasury_text = html.Span(f"Treasury: {tval:,.0f} Cr", style={"color": tcol})

    # Stat bars
    hap_col = loyalty_color(state.happiness)
    mil_col = "#3498db"
    sta_col = loyalty_color(state.stability)
    bars = html.Div([
        stat_bar("Happiness", state.happiness, hap_col),
        stat_bar("Military", state.military_strength, mil_col),
        stat_bar("Stability", state.stability, sta_col),
    ])

    # Cluster overview
    cluster_rows = []
    for c in state.clusters:
        loy = c.average_loyalty
        loy_col = loyalty_color(loy)
        status = "🔥 REVOLT" if c.rebellious else f"{loy:.0f}%"
        cluster_rows.append(html.Div([
            html.Span("●", style={"color": c.color, "marginRight": "6px"}),
            html.Span(c.name, style={"color": "#CCC", "fontSize": "11px", "flex": 1}),
            html.Span(f"Pop {c.total_population}M", style={"color": "#666", "fontSize": "10px", "marginRight": "8px"}),
            html.Span(status, style={"color": "#FF4444" if c.rebellious else loy_col, "fontSize": "11px", "fontWeight": "bold"}),
        ], style={"display": "flex", "alignItems": "center", "marginBottom": "5px"}))

    # System panel
    system_panel = build_system_panel(state, selected_system)

    # Event log
    event_text = "\n".join(state.events[:20]) if state.events else "No events yet."

    # Slider labels
    tax_label = f"{tax}%"
    inf_label = f"{inflation:.1f}%"
    def_label = f"{defense:,} Cr/turn"
    bc_label  = f"{bc:,} Cr/turn"

    # Game-over banner
    if state.game_over:
        fig.add_annotation(
            x=0, y=0, xref="paper", yref="paper",
            text=f"<b>EMPIRE FALLEN</b><br>{state.game_over_reason}",
            showarrow=False,
            font=dict(color="#FF4444", size=20),
            bgcolor="rgba(10,5,5,0.85)",
            bordercolor="#FF4444",
            borderwidth=2,
            xanchor="center", yanchor="middle",
        )

    return (
        fig, header, treasury_text, bars, cluster_rows,
        system_panel, event_text,
        tax_label, inf_label, def_label, bc_label,
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8050)
