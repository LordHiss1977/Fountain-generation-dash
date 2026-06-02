"""Turn-processing engine for the Galactic Empire."""
from __future__ import annotations
from .models import EmpireState
from .events import process_events


def _clamp(v: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, v))


def process_turn(state: EmpireState) -> EmpireState:
    """Advance one turn, return the mutated state."""
    if state.game_over:
        return state

    tr = state.tax_rate          # 0–50
    ir = state.inflation_rate    # 0–20
    ds = state.defense_spending  # credits/turn
    bcs = state.bread_circus_spending  # credits/turn

    # ── Revenue ────────────────────────────────────────────────────────────
    # Loyalty modifier: rebellious clusters pay no tax
    taxable_yield = sum(
        c.total_tax_yield for c in state.clusters if not c.rebellious
    )
    # Inflation inflates nominal revenue slightly
    inflation_revenue_boost = 1.0 + (ir / 200.0)
    revenue = taxable_yield * (tr / 100.0) * inflation_revenue_boost

    # ── Expenses ───────────────────────────────────────────────────────────
    expenses = ds + bcs

    # ── Treasury ───────────────────────────────────────────────────────────
    state.treasury += revenue - expenses

    # ── Happiness ──────────────────────────────────────────────────────────
    # Tax pressure beyond ~15% makes people unhappy
    tax_unhappiness = max(0.0, tr - 15.0) * 0.9
    # Inflation erodes purchasing power
    inflation_unhappiness = ir * 1.1
    # Bread & circus improves happiness
    bc_happiness = bcs / 25.0
    # Compute delta and nudge toward target
    target_happiness = 50.0 - tax_unhappiness - inflation_unhappiness + bc_happiness
    state.happiness += (target_happiness - state.happiness) * 0.25
    state.happiness = _clamp(state.happiness, 0.0, 100.0)

    # ── Military strength ──────────────────────────────────────────────────
    # Defense spending drives military; atrophies when underfunded
    target_military = ds / 8.0
    state.military_strength += (target_military - state.military_strength) * 0.3
    state.military_strength = _clamp(state.military_strength, 0.0, 100.0)

    # ── Loyalty drift ─────────────────────────────────────────────────────
    for cluster in state.clusters:
        happiness_nudge = (state.happiness - 50.0) * 0.05
        bc_nudge = bcs / 400.0
        tax_drag = max(0.0, tr - 20.0) * 0.15
        for sys in cluster.systems:
            for planet in sys.planets:
                delta = happiness_nudge + bc_nudge - tax_drag
                planet.loyalty = _clamp(planet.loyalty + delta, 0.0, 100.0)

    # ── Stability ─────────────────────────────────────────────────────────
    rebellious_count = sum(1 for c in state.clusters if c.rebellious)
    target_stability = (
        state.happiness * 0.5
        + state.military_strength * 0.3
        - rebellious_count * 8.0
        - max(0.0, ir - 8.0) * 2.0
    )
    state.stability += (target_stability - state.stability) * 0.2
    state.stability = _clamp(state.stability, 0.0, 100.0)

    # ── Events ────────────────────────────────────────────────────────────
    state.turn += 1
    event_msgs = process_events(state)

    turn_summary = (
        f"Turn {state.turn} — Revenue: {revenue:,.0f} | "
        f"Expenses: {expenses:,.0f} | "
        f"Net: {revenue - expenses:+,.0f} | "
        f"Treasury: {state.treasury:,.0f}"
    )
    new_events = [turn_summary] + event_msgs
    # Keep last 50 log lines
    state.events = (new_events + state.events)[:50]

    # ── Game-over checks ──────────────────────────────────────────────────
    if state.treasury < -50_000:
        state.game_over = True
        state.game_over_reason = "The empire is bankrupt. Creditors seize your throne."
    elif state.happiness < 5:
        state.game_over = True
        state.game_over_reason = "The people rise as one. The empire is overthrown."
    elif all(c.rebellious for c in state.clusters):
        state.game_over = True
        state.game_over_reason = "Every sector is in open rebellion. The empire has fallen."

    return state
