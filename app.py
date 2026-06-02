"""Galactic Empire — Plotly Dash strategy game."""
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

# ── Visual constants ────────────────────────────────────────────────────────

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

SEV_BORDER = {
    "info":     "#3498db",
    "good":     "#2ecc71",
    "warning":  "#f39c12",
    "critical": "#e74c3c",
}
SEV_BG = {
    "info":     "rgba(52,152,219,0.07)",
    "good":     "rgba(46,204,113,0.07)",
    "warning":  "rgba(243,156,18,0.08)",
    "critical": "rgba(231,76,60,0.12)",
}
SEV_BADGE = {
    "info":     ("INFO",     "#3498db"),
    "good":     ("POSITIVE", "#2ecc71"),
    "warning":  ("WARNING",  "#f39c12"),
    "critical": ("URGENT",   "#e74c3c"),
}


def loyalty_color(v: float) -> str:
    if v >= 70: return "#2ecc71"
    if v >= 45: return "#f39c12"
    return "#e74c3c"


# ── Galaxy figure ───────────────────────────────────────────────────────────

def build_galaxy_figure(state: EmpireState, selected: str | None = None) -> go.Figure:
    fig = go.Figure()

    rng_bg = np.random.default_rng(12345)
    bx = rng_bg.uniform(-90, 90, 300)
    by = rng_bg.uniform(-70, 70, 300)
    bs = rng_bg.uniform(1, 3, 300)
    fig.add_trace(go.Scatter(x=bx, y=by, mode="markers",
        marker=dict(color="white", size=bs, opacity=0.22),
        hoverinfo="skip", showlegend=False))

    for cluster in state.clusters:
        cx, cy = cluster.center
        spread = 18
        theta = np.linspace(0, 2 * math.pi, 60)
        hx = cx + spread * np.cos(theta) * 1.3
        hy = cy + spread * np.sin(theta)
        col = "#FF2222" if cluster.rebellious else cluster.color
        fig.add_trace(go.Scatter(x=hx, y=hy, fill="toself",
            fillcolor=col, opacity=0.07,
            line=dict(color=col, width=1, dash="dot"),
            mode="lines", hoverinfo="skip", showlegend=False))
        fig.add_annotation(x=cx, y=cy + spread * 0.9,
            text=f"<b>{cluster.name}</b>",
            showarrow=False, font=dict(color=col, size=9), opacity=0.85)
        if cluster.rebellious:
            fig.add_annotation(x=cx, y=cy - spread * 0.8,
                text="⚔ REVOLT", showarrow=False,
                font=dict(color="#FF4444", size=8))

    for cluster in state.clusters:
        col = "#FF3333" if cluster.rebellious else cluster.color
        for sys in cluster.systems:
            size = 8 + min(sys.total_population / 30, 16)
            loy  = sys.average_loyalty
            is_sel = sys.name == selected
            fig.add_trace(go.Scatter(
                x=[sys.x], y=[sys.y],
                mode="markers+text",
                marker=dict(
                    color=STAR_COLORS[sys.star_type],
                    size=size + (7 if is_sel else 0),
                    line=dict(color=loyalty_color(loy), width=3 if is_sel else 1.5),
                    symbol="star" if sys.star_type == StarType.BLUE_GIANT else "circle",
                ),
                text=[sys.name], textposition="top center",
                textfont=dict(color="#CCCCCC", size=7),
                customdata=[[sys.name, STAR_LABELS[sys.star_type],
                             sys.total_population, f"{loy:.0f}",
                             len(sys.planets), cluster.name]],
                hovertemplate=(
                    "<b>%{customdata[0]}</b><br>"
                    "Star: %{customdata[1]}<br>"
                    "Cluster: %{customdata[5]}<br>"
                    "Population: %{customdata[2]}M<br>"
                    "Loyalty: %{customdata[3]}%<br>"
                    "Planets: %{customdata[4]}<br>"
                    "<i>Click to inspect</i><extra></extra>"
                ),
                showlegend=False,
            ))

    fig.update_layout(
        paper_bgcolor="#050A14", plot_bgcolor="#050A14",
        xaxis=dict(showgrid=False, zeroline=False, showticklabels=False, range=[-95, 95]),
        yaxis=dict(showgrid=False, zeroline=False, showticklabels=False,
                   range=[-75, 75], scaleanchor="x"),
        margin=dict(l=0, r=0, t=0, b=0),
        uirevision="galaxy",
    )
    return fig


# ── News card ───────────────────────────────────────────────────────────────

def news_card(item: dict) -> html.Div:
    sev = item.get("severity", "info")
    border = SEV_BORDER.get(sev, "#3498db")
    bg     = SEV_BG.get(sev, SEV_BG["info"])
    badge_label, badge_color = SEV_BADGE.get(sev, ("INFO", "#3498db"))

    return html.Div([
        # Card header row
        html.Div([
            html.Span(f"CYCLE {item['turn']}", style={
                "color": "#555", "fontSize": "9px", "letterSpacing": "1px",
                "marginRight": "10px",
            }),
            html.Span(item["source"], style={
                "color": "#8899BB", "fontSize": "9px", "letterSpacing": "1px",
                "flex": "1",
            }),
            html.Span(f"● {badge_label}", style={
                "color": badge_color, "fontSize": "9px",
                "letterSpacing": "1px", "fontWeight": "bold",
            }),
        ], style={"display": "flex", "alignItems": "center", "marginBottom": "5px"}),

        # Headline
        html.Div(item["headline"], style={
            "color": "#EEEEFF", "fontSize": "12px",
            "fontWeight": "bold", "lineHeight": "1.4",
            "marginBottom": "6px", "letterSpacing": "0.5px",
        }),

        # Body
        html.Div(item["body"], style={
            "color": "#99AABB", "fontSize": "11px",
            "lineHeight": "1.6", "whiteSpace": "pre-wrap",
        }),
    ], style={
        "borderLeft": f"3px solid {border}",
        "background": bg,
        "borderRadius": "0 4px 4px 0",
        "padding": "10px 14px",
        "marginBottom": "8px",
    })


# ── System inspector ────────────────────────────────────────────────────────

def system_panel(state: EmpireState, name: str | None) -> html.Div:
    if not name:
        return html.Div("Click a star on the map to inspect its worlds.",
                        style={"color": "#444", "fontStyle": "italic",
                               "fontSize": "11px", "padding": "8px"})
    sys_obj = cluster_name = None
    for c in state.clusters:
        for s in c.systems:
            if s.name == name:
                sys_obj, cluster_name = s, c.name
    if not sys_obj:
        return html.Div()

    rows = []
    for p in sys_obj.planets:
        lc = loyalty_color(p.loyalty)
        rows.append(html.Div([
            html.Span(PLANET_ICONS[p.planet_type],
                      style={"fontSize": "14px", "marginRight": "6px"}),
            html.Span(p.name,
                      style={"color": "#EEE", "fontWeight": "bold",
                             "minWidth": "110px", "display": "inline-block", "fontSize": "11px"}),
            html.Span(PLANET_LABELS[p.planet_type],
                      style={"color": PLANET_COLORS[p.planet_type],
                             "minWidth": "90px", "display": "inline-block", "fontSize": "10px"}),
            html.Span(f"Pop {p.population}M",
                      style={"color": "#888", "minWidth": "70px",
                             "display": "inline-block", "fontSize": "10px"}),
            html.Span(f"Loyalty {p.loyalty:.0f}%",
                      style={"color": lc, "fontSize": "10px", "fontWeight": "bold"}),
        ], style={"display": "flex", "alignItems": "center", "marginBottom": "4px"}))

    return html.Div([
        html.Div([
            html.Span(sys_obj.name,
                      style={"color": "#FFD700", "fontWeight": "bold", "fontSize": "13px",
                             "marginRight": "12px"}),
            html.Span(STAR_LABELS[sys_obj.star_type],
                      style={"color": STAR_COLORS[sys_obj.star_type], "fontSize": "10px",
                             "marginRight": "10px"}),
            html.Span(cluster_name, style={"color": "#555", "fontSize": "10px"}),
        ], style={"marginBottom": "8px"}),
        *rows,
    ])


# ── Stat bar ────────────────────────────────────────────────────────────────

def stat_bar(label: str, value: float, color: str) -> html.Div:
    return html.Div([
        html.Div([
            html.Span(label,          style={"color": "#888", "fontSize": "11px"}),
            html.Span(f"{value:.0f}%", style={"color": color, "fontSize": "11px",
                                               "fontWeight": "bold"}),
        ], style={"display": "flex", "justifyContent": "space-between"}),
        html.Div(html.Div(style={
            "width": f"{value}%", "height": "5px",
            "backgroundColor": color, "borderRadius": "2px",
            "transition": "width 0.4s ease",
        }), style={"backgroundColor": "#0D1528", "borderRadius": "2px",
                   "overflow": "hidden", "marginTop": "2px"}),
    ], style={"marginBottom": "8px"})


# ── Layout ──────────────────────────────────────────────────────────────────

_PANEL = {
    "background": "#080E1C",
    "border": "1px solid #1A2540",
    "borderRadius": "6px",
    "padding": "12px",
}

app.layout = html.Div([
    dcc.Store(id="game-state"),
    dcc.Store(id="selected-system"),

    # ── Header ────────────────────────────────────────────────────────────
    html.Div([
        html.Div([
            html.Span("⚡ GALACTIC EMPIRE", style={
                "color": "#FFD700", "fontSize": "18px",
                "letterSpacing": "4px", "fontWeight": "bold",
            }),
            html.Span(id="header-subtitle", style={
                "color": "#445566", "fontSize": "10px",
                "letterSpacing": "2px", "marginLeft": "20px",
            }),
        ]),
        html.Div(id="header-right", style={"color": "#556677", "fontSize": "10px"}),
    ], style={
        "background": "linear-gradient(90deg, #080E1C 0%, #0C1428 100%)",
        "borderBottom": "1px solid #1A2540",
        "padding": "10px 18px",
        "display": "flex", "justifyContent": "space-between", "alignItems": "center",
        "flexShrink": "0",
    }),

    # ── Main area ──────────────────────────────────────────────────────────
    html.Div([

        # Left column: map + system inspector
        html.Div([
            dcc.Graph(id="galaxy-map",
                      style={"flex": "1", "minHeight": "0"},
                      config={"displayModeBar": False}),
            html.Div([
                html.Div(id="system-panel"),
            ], style={**_PANEL, "flexShrink": "0", "minHeight": "100px",
                      "maxHeight": "160px", "overflowY": "auto",
                      "marginTop": "6px"}),
        ], style={"flex": "1", "display": "flex", "flexDirection": "column",
                  "padding": "8px", "minWidth": "0", "overflow": "hidden"}),

        # Right column: stats + controls
        html.Div([

            # Empire stats
            html.Div([
                html.Div("EMPIRE STATUS", style={
                    "color": "#FFD700", "fontSize": "9px",
                    "letterSpacing": "2px", "marginBottom": "8px",
                }),
                html.Div(id="stats-treasury", style={
                    "fontSize": "16px", "fontWeight": "bold", "marginBottom": "10px",
                }),
                html.Div(id="stats-bars"),
            ], style={**_PANEL, "marginBottom": "8px"}),

            # Sliders
            html.Div([
                html.Div("IMPERIAL EDICTS", style={
                    "color": "#FFD700", "fontSize": "9px",
                    "letterSpacing": "2px", "marginBottom": "12px",
                }),

                *[html.Div([
                    html.Div([
                        html.Span(lbl, style={"color": "#888", "fontSize": "10px"}),
                        html.Span(id=disp_id, style={"color": col, "fontSize": "10px",
                                                      "fontWeight": "bold"}),
                    ], style={"display": "flex", "justifyContent": "space-between"}),
                    dcc.Slider(id=slider_id, min=lo, max=hi, step=step, value=val,
                               marks={lo: str(lo), hi: str(hi)},
                               tooltip={"always_visible": False},
                               className="empire-slider"),
                ], style={"marginBottom": "12px"})
                for lbl, disp_id, slider_id, lo, hi, step, val, col in [
                    ("Tax Rate",        "tax-display",     "tax-slider",     0,  50,   1,    20,  "#f39c12"),
                    ("Inflation Rate",  "inflation-display","inflation-slider",0, 20, 0.5,    5,  "#e74c3c"),
                    ("Defense Spending","defense-display", "defense-slider", 0, 1000, 25,  300,  "#3498db"),
                    ("Bread & Circus",  "bc-display",      "bc-slider",      0, 1000, 25,  200,  "#9b59b6"),
                ]],

                html.Button("▶  ADVANCE TURN", id="advance-btn", n_clicks=0, style={
                    "width": "100%", "marginTop": "6px",
                    "background": "linear-gradient(135deg,#1a3a6a,#0d2044)",
                    "color": "#FFD700", "border": "1px solid #FFD700",
                    "borderRadius": "4px", "padding": "9px",
                    "fontSize": "12px", "letterSpacing": "2px",
                    "cursor": "pointer", "fontFamily": "monospace",
                }),
                html.Button("↺  NEW GAME", id="new-game-btn", n_clicks=0, style={
                    "width": "100%", "marginTop": "6px",
                    "background": "#080E1C", "color": "#445566",
                    "border": "1px solid #1A2540", "borderRadius": "4px",
                    "padding": "7px", "fontSize": "10px", "letterSpacing": "1px",
                    "cursor": "pointer", "fontFamily": "monospace",
                }),
            ], style={**_PANEL, "marginBottom": "8px"}),

            # Cluster overview
            html.Div([
                html.Div("SECTOR OVERVIEW", style={
                    "color": "#FFD700", "fontSize": "9px",
                    "letterSpacing": "2px", "marginBottom": "10px",
                }),
                html.Div(id="cluster-summary", style={"overflowY": "auto", "maxHeight": "200px"}),
            ], style=_PANEL),

        ], style={"width": "270px", "flexShrink": "0", "padding": "8px",
                  "overflowY": "auto", "display": "flex", "flexDirection": "column"}),

    ], style={"flex": "1", "display": "flex", "overflow": "hidden", "minHeight": "0"}),

    # ── Imperial News Feed ─────────────────────────────────────────────────
    html.Div([
        html.Div([
            html.Span("THE IMPERIAL GAZETTE", style={
                "color": "#FFD700", "fontSize": "9px", "letterSpacing": "3px",
                "marginRight": "16px",
            }),
            html.Span("— all dispatches from the empire, newest first —", style={
                "color": "#334455", "fontSize": "9px",
            }),
        ], style={"marginBottom": "10px", "borderBottom": "1px solid #1A2540",
                  "paddingBottom": "8px"}),
        html.Div(id="news-feed", style={"overflowY": "auto", "height": "calc(100% - 36px)"}),
    ], style={
        "height": "38vh",
        "flexShrink": "0",
        "background": "#050A14",
        "borderTop": "1px solid #1A2540",
        "padding": "10px 16px",
        "fontFamily": "monospace",
    }),

], style={
    "backgroundColor": "#050A14",
    "height": "100vh",
    "display": "flex",
    "flexDirection": "column",
    "fontFamily": "monospace",
    "color": "#CCC",
    "overflow": "hidden",
})


# ── State callback ──────────────────────────────────────────────────────────

@callback(
    Output("game-state", "data"),
    Output("selected-system", "data"),
    Input("advance-btn",   "n_clicks"),
    Input("new-game-btn",  "n_clicks"),
    Input("galaxy-map",    "clickData"),
    State("game-state",    "data"),
    State("selected-system","data"),
    State("tax-slider",    "value"),
    State("inflation-slider","value"),
    State("defense-slider","value"),
    State("bc-slider",     "value"),
    prevent_initial_call=False,
)
def update_state(adv, newg, click_data, raw, selected,
                 tax, inflation, defense, bc):
    triggered = ctx.triggered_id

    if raw is None or triggered == "new-game-btn":
        return new_game().to_dict(), None

    state = EmpireState.from_dict(raw)

    if triggered == "advance-btn":
        state.tax_rate              = tax
        state.inflation_rate        = inflation
        state.defense_spending      = defense
        state.bread_circus_spending = bc
        state = process_turn(state)
        return state.to_dict(), selected

    if triggered == "galaxy-map" and click_data:
        pt = click_data["points"][0]
        if "customdata" in pt:
            return raw, pt["customdata"][0]

    return raw, selected


# ── Render callback ─────────────────────────────────────────────────────────

@callback(
    Output("galaxy-map",       "figure"),
    Output("header-subtitle",  "children"),
    Output("header-right",     "children"),
    Output("stats-treasury",   "children"),
    Output("stats-bars",       "children"),
    Output("cluster-summary",  "children"),
    Output("system-panel",     "children"),
    Output("news-feed",        "children"),
    Output("tax-display",      "children"),
    Output("inflation-display","children"),
    Output("defense-display",  "children"),
    Output("bc-display",       "children"),
    Input("game-state",        "data"),
    Input("selected-system",   "data"),
    State("tax-slider",        "value"),
    State("inflation-slider",  "value"),
    State("defense-slider",    "value"),
    State("bc-slider",         "value"),
)
def render_ui(raw, selected, tax, inflation, defense, bc):
    if not raw:
        raise dash.exceptions.PreventUpdate

    state = EmpireState.from_dict(raw)

    fig = build_galaxy_figure(state, selected)

    # Header
    subtitle = f"CYCLE {state.turn}  ·  {len(state.clusters)} CLUSTERS  ·  {sum(len(c.systems) for c in state.clusters)} SYSTEMS"
    header_right = f"Happiness {state.happiness:.0f}%  ·  Stability {state.stability:.0f}%  ·  Military {state.military_strength:.0f}%"

    # Treasury
    tc = "#2ecc71" if state.treasury >= 0 else "#e74c3c"
    treasury = html.Span(f"Treasury: {state.treasury:,.0f} Cr", style={"color": tc})

    # Stat bars
    bars = html.Div([
        stat_bar("Happiness",        state.happiness,        loyalty_color(state.happiness)),
        stat_bar("Military Strength",state.military_strength,"#3498db"),
        stat_bar("Stability",        state.stability,        loyalty_color(state.stability)),
    ])

    # Cluster overview
    cluster_rows = [
        html.Div([
            html.Span("●", style={"color": c.color, "marginRight": "6px", "fontSize": "10px"}),
            html.Span(c.name, style={"color": "#BCC", "fontSize": "10px", "flex": "1"}),
            html.Span(f"{c.total_population}M",
                      style={"color": "#445566", "fontSize": "9px", "marginRight": "8px"}),
            html.Span("⚔ REVOLT" if c.rebellious else f"{c.average_loyalty:.0f}%",
                      style={"color": "#FF4444" if c.rebellious else loyalty_color(c.average_loyalty),
                             "fontSize": "10px", "fontWeight": "bold"}),
        ], style={"display": "flex", "alignItems": "center", "marginBottom": "5px"})
        for c in state.clusters
    ]

    # System inspector
    sys_panel = system_panel(state, selected)

    # News feed — render each stored dict as a card
    if state.news:
        feed = [news_card(item) for item in state.news]
    else:
        feed = [html.Div("No dispatches yet.", style={"color": "#334455", "fontSize": "11px"})]

    # Game-over overlay
    if state.game_over:
        fig.add_annotation(
            x=0.5, y=0.5, xref="paper", yref="paper",
            text=f"<b>EMPIRE FALLEN</b><br><span style='font-size:14px'>{state.game_over_reason}</span>",
            showarrow=False,
            font=dict(color="#FF4444", size=24),
            bgcolor="rgba(5,5,10,0.88)",
            bordercolor="#FF4444",
            borderwidth=2,
            xanchor="center", yanchor="middle",
        )

    # Slider value labels
    tax_lbl = f"{tax}%"
    inf_lbl = f"{inflation:.1f}%"
    def_lbl = f"{defense:,} Cr"
    bc_lbl  = f"{bc:,} Cr"

    return (fig, subtitle, header_right, treasury, bars,
            cluster_rows, sys_panel, feed,
            tax_lbl, inf_lbl, def_lbl, bc_lbl)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8050)
