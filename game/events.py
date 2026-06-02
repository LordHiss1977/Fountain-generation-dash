"""Random event system for the galactic empire."""
from __future__ import annotations
import random
from .models import EmpireState, PlanetType


def _rng(turn: int) -> random.Random:
    return random.Random(turn * 9_999_991 + 7)


def process_events(state: EmpireState) -> list[str]:
    """Return list of event messages and mutate state accordingly."""
    rng = _rng(state.turn)
    messages: list[str] = []

    # ── Rebellion ──────────────────────────────────────────────────────────
    for cluster in state.clusters:
        if cluster.rebellious:
            if state.military_strength >= 60:
                # Suppress rebellion
                cluster.rebellious = False
                for sys in cluster.systems:
                    for planet in sys.planets:
                        planet.loyalty = max(30.0, planet.loyalty - 10)
                messages.append(
                    f"⚔ SUPPRESSION — Imperial forces crush the rebellion in "
                    f"{cluster.name}. Loyalty suffers."
                )
            else:
                # Rebellion persists and spreads loyalty damage
                for sys in cluster.systems:
                    for planet in sys.planets:
                        planet.loyalty = max(5.0, planet.loyalty - 5)
                messages.append(
                    f"🔥 REBELLION SPREADS — {cluster.name} remains in open revolt. "
                    f"Send more troops or offer concessions!"
                )
            continue  # skip other events for rebellious clusters

        if cluster.average_loyalty < 30 and rng.random() < 0.6:
            cluster.rebellious = True
            messages.append(
                f"💥 REBELLION ERUPTS — The people of {cluster.name} have taken up arms! "
                f"Loyalty: {cluster.average_loyalty:.0f}%."
            )
            continue

        if cluster.average_loyalty < 45 and rng.random() < 0.3:
            messages.append(
                f"⚠ UNREST — Protests grip {cluster.name}. "
                f"Loyalty: {cluster.average_loyalty:.0f}%. Consider raising Bread & Circus."
            )

    # ── External invasion ──────────────────────────────────────────────────
    if state.military_strength < 25 and rng.random() < 0.4:
        target = rng.choice(state.clusters)
        lost_credits = rng.uniform(500, 2000)
        state.treasury -= lost_credits
        for sys in target.systems:
            for planet in sys.planets:
                planet.loyalty = max(10.0, planet.loyalty - 15)
        messages.append(
            f"🚀 INVASION — Barbarian fleets raid {target.name}! "
            f"{lost_credits:,.0f} credits plundered. Reinforce your defences!"
        )

    # ── Economic boom ──────────────────────────────────────────────────────
    if rng.random() < 0.12:
        bonus = rng.uniform(300, 1200)
        state.treasury += bonus
        messages.append(
            f"📈 TRADE BOOM — Interstellar merchants flood the lanes. "
            f"+{bonus:,.0f} credits in trade tariffs."
        )

    # ── Plague on water world ──────────────────────────────────────────────
    if rng.random() < 0.08:
        water_worlds = [
            (c, s, p)
            for c in state.clusters for s in c.systems
            for p in s.planets if p.planet_type == PlanetType.WATER_WORLD and p.population > 0
        ]
        if water_worlds:
            c, s, planet = rng.choice(water_worlds)
            lost = int(planet.population * rng.uniform(0.05, 0.20))
            planet.population = max(1, planet.population - lost)
            messages.append(
                f"☠ PLAGUE — Blight sweeps {planet.name} ({s.name}). "
                f"{lost}M souls lost."
            )

    # ── Mineral discovery ──────────────────────────────────────────────────
    if rng.random() < 0.10:
        cluster = rng.choice(state.clusters)
        sys = rng.choice(cluster.systems)
        bonus_prod = rng.uniform(20, 60)
        for p in sys.planets:
            if p.planet_type == PlanetType.MINERAL_ROCK:
                p.base_production += bonus_prod
                messages.append(
                    f"⛏ DISCOVERY — Vast ore deposits found on {p.name} ({sys.name}). "
                    f"Production +{bonus_prod:.0f}."
                )
                break

    # ── Inflation crisis ──────────────────────────────────────────────────
    if state.inflation_rate > 15 and rng.random() < 0.5:
        penalty = rng.uniform(200, 800)
        state.treasury -= penalty
        messages.append(
            f"💸 INFLATION CRISIS — Runaway prices destroy savings. "
            f"-{penalty:,.0f} credits evaporated."
        )

    # ── Loyalty boost from bread & circus ────────────────────────────────
    if state.bread_circus_spending >= 400 and rng.random() < 0.3:
        cluster = rng.choice(state.clusters)
        for sys in cluster.systems:
            for planet in sys.planets:
                planet.loyalty = min(100.0, planet.loyalty + 5)
        messages.append(
            f"🎪 FESTIVAL — Grand games delight the citizens of {cluster.name}. "
            f"Loyalty +5."
        )

    return messages
