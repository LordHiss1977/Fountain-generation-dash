"""Turn-processing engine. Produces policy-change dispatches and runs events."""
from __future__ import annotations
from .models import EmpireState, NewsItem
from .events import process_events, SRC


def _clamp(v: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, v))


def _policy_change_news(state: EmpireState) -> list[NewsItem]:
    """Report Imperial Edicts when the Emperor has significantly changed policy."""
    items = []
    t = state.turn

    def _delta(new, old, label, unit="", fmt=".0f"):
        if abs(new - old) < (2 if "%" in unit else 50):
            return
        direction = "RAISES" if new > old else "REDUCES"
        tone = "warning" if new > old and ("Tax" in label or "Inflation" in label) else "info"
        tone = "good" if new < old and "Tax" in label else tone
        items.append(NewsItem(t, SRC["edict"],
            f"IMPERIAL EDICT: EMPEROR {direction} {label.upper()} TO {new:{fmt}}{unit}",
            f"By Imperial Decree, effective immediately, the {label} has been "
            f"{'raised' if new > old else 'reduced'} from {old:{fmt}}{unit} to "
            f"{new:{fmt}}{unit}. "
            + (f"The Senate has registered formal concern about the impact on cluster loyalty."
               if new > old and "Tax" in label else
               f"Economic advisors warn the change will take several cycles to take full effect."
               if "Inflation" in label else
               f"Military commanders have acknowledged the directive and will adjust deployments accordingly."
               if "Defense" in label else
               f"The Games Commission will update entertainment schedules to reflect the new allocation."),
            tone))

    _delta(state.tax_rate,             state.last_tax_rate,             "Tax Rate",           "%")
    _delta(state.inflation_rate,       state.last_inflation_rate,       "Inflation Rate",     "%", ".1f")
    _delta(state.defense_spending,     state.last_defense_spending,     "Defense Spending",   " Cr/cycle", ",.0f")
    _delta(state.bread_circus_spending,state.last_bread_circus_spending,"Bread & Circus",     " Cr/cycle", ",.0f")
    return items


def process_turn(state: EmpireState) -> EmpireState:
    if state.game_over:
        return state

    tr  = state.tax_rate
    ir  = state.inflation_rate
    ds  = state.defense_spending
    bcs = state.bread_circus_spending

    # ── Revenue ────────────────────────────────────────────────────────────
    taxable_yield = sum(c.total_tax_yield for c in state.clusters if not c.rebellious)
    inflation_boost = 1.0 + (ir / 200.0)
    revenue = taxable_yield * (tr / 100.0) * inflation_boost

    # ── Expenses ───────────────────────────────────────────────────────────
    expenses = ds + bcs
    state.treasury += revenue - expenses

    # ── Happiness ──────────────────────────────────────────────────────────
    tax_drag     = max(0.0, tr - 15.0) * 0.9
    infl_drag    = ir * 1.1
    bc_boost     = bcs / 25.0
    target_hap   = 50.0 - tax_drag - infl_drag + bc_boost
    state.happiness += (target_hap - state.happiness) * 0.25
    state.happiness  = _clamp(state.happiness, 0.0, 100.0)

    # ── Military strength ──────────────────────────────────────────────────
    target_mil          = ds / 8.0
    state.military_strength += (target_mil - state.military_strength) * 0.3
    state.military_strength  = _clamp(state.military_strength, 0.0, 100.0)

    # ── Loyalty drift ─────────────────────────────────────────────────────
    for cluster in state.clusters:
        hap_nudge  = (state.happiness - 50.0) * 0.05
        bc_nudge   = bcs / 400.0
        tax_drag_l = max(0.0, tr - 20.0) * 0.15
        for sys in cluster.systems:
            for p in sys.planets:
                p.loyalty = _clamp(p.loyalty + hap_nudge + bc_nudge - tax_drag_l, 0.0, 100.0)

    # ── Stability ─────────────────────────────────────────────────────────
    rebellious_count = sum(1 for c in state.clusters if c.rebellious)
    target_stab = (
        state.happiness * 0.5
        + state.military_strength * 0.3
        - rebellious_count * 8.0
        - max(0.0, ir - 8.0) * 2.0
    )
    state.stability += (target_stab - state.stability) * 0.2
    state.stability  = _clamp(state.stability, 0.0, 100.0)

    # ── Build news for this turn ───────────────────────────────────────────
    state.turn += 1

    new_items: list[NewsItem] = []

    # Imperial Edict items (policy changes the Emperor made)
    new_items.extend(_policy_change_news(state))

    # Random world events
    new_items.extend(process_events(state))

    # Turn financial summary — always appears
    net = revenue - expenses
    sev = "good" if net >= 0 else "warning"
    new_items.append(NewsItem(state.turn, SRC["treasury"],
        f"CYCLE {state.turn} TREASURY REPORT — NET: {net:+,.0f} Cr",
        f"Revenue: {revenue:,.0f} Cr  |  Expenditure: {expenses:,.0f} Cr  |  "
        f"Net: {net:+,.0f} Cr  |  Treasury balance: {state.treasury:,.0f} Cr\n"
        f"Happiness: {state.happiness:.0f}%  ·  "
        f"Military: {state.military_strength:.0f}%  ·  "
        f"Stability: {state.stability:.0f}%",
        sev))

    # Update stored policy baselines
    state.last_tax_rate             = state.tax_rate
    state.last_inflation_rate       = state.inflation_rate
    state.last_defense_spending     = state.defense_spending
    state.last_bread_circus_spending = state.bread_circus_spending

    # Prepend new items (newest first), cap history at 80 items
    state.news = [item.to_dict() for item in new_items] + state.news
    state.news = state.news[:80]

    # ── Game-over checks ──────────────────────────────────────────────────
    if state.treasury < -50_000:
        state.game_over = True
        state.game_over_reason = "The empire is bankrupt. Creditors seize the throne."
    elif state.happiness < 5:
        state.game_over = True
        state.game_over_reason = "The people rise as one. The Imperial line is extinguished."
    elif all(c.rebellious for c in state.clusters):
        state.game_over = True
        state.game_over_reason = "Every sector is in open rebellion. The empire has fallen."

    return state
