"""Procedural galaxy generator."""
from __future__ import annotations
import random
import math
from typing import List

from .models import (
    Planet, PlanetType, SolarSystem, StarType, Cluster, EmpireState
)

CLUSTER_NAMES = [
    "Aurelian Reach", "Vortex Expanse", "Crimson Nebula", "Obsidian Drift",
    "Solaris Belt", "Aquila Sector", "Dusk Frontier", "Iron Veil",
    "Phantom Rift", "Nova Confluence", "Ember Fields", "Void Fringe",
]

SYSTEM_PREFIXES = [
    "Sol", "Arc", "Vel", "Keth", "Mor", "Tal", "Zan", "Hex",
    "Lyr", "Ori", "Cas", "Sig", "Den", "Ath", "Bel", "Cal",
]
SYSTEM_SUFFIXES = [
    "Prime", "Major", "Minor", "Rex", "Nova", "Alpha", "Omega",
    "Secundus", "Tertius", "IV", "V", "VI",
]

PLANET_PREFIXES = [
    "Axon", "Baran", "Ceta", "Dorn", "Eos", "Frix", "Gorrath", "Heln",
    "Ixa", "Jorak", "Kyrel", "Lorn", "Miren", "Nexos", "Oryn", "Petra",
]
PLANET_SUFFIXES = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]

CLUSTER_COLORS = [
    "#e74c3c", "#3498db", "#2ecc71", "#f39c12",
    "#9b59b6", "#1abc9c", "#e67e22", "#34495e",
    "#e91e63", "#00bcd4", "#8bc34a", "#ff5722",
]

STAR_TYPE_WEIGHTS = [
    (StarType.YELLOW_DWARF, 35),
    (StarType.RED_GIANT, 25),
    (StarType.WHITE_DWARF, 20),
    (StarType.BLUE_GIANT, 15),
    (StarType.NEUTRON_STAR, 5),
]

PLANET_TYPE_WEIGHTS = [
    (PlanetType.MINERAL_ROCK, 30),
    (PlanetType.WATER_WORLD, 25),
    (PlanetType.GAS_GIANT, 25),
    (PlanetType.ASTEROID, 20),
]


def _weighted_choice(choices: list, rng: random.Random):
    population = [item for item, weight in choices for _ in range(weight)]
    return rng.choice(population)


def _unique_name(used: set, prefix_list, suffix_list, rng: random.Random) -> str:
    for _ in range(200):
        name = f"{rng.choice(prefix_list)} {rng.choice(suffix_list)}"
        if name not in used:
            used.add(name)
            return name
    # fallback
    n = f"{rng.choice(prefix_list)}-{rng.randint(100,999)}"
    used.add(n)
    return n


def _make_planet(name: str, rng: random.Random) -> Planet:
    ptype = _weighted_choice(PLANET_TYPE_WEIGHTS, rng)
    if ptype == PlanetType.WATER_WORLD:
        pop = rng.randint(50, 500)
        prod = rng.uniform(20, 80)
    elif ptype == PlanetType.MINERAL_ROCK:
        pop = rng.randint(0, 30)
        prod = rng.uniform(60, 200)
    elif ptype == PlanetType.GAS_GIANT:
        pop = 0
        prod = rng.uniform(80, 250)
    else:  # asteroid
        pop = 0
        prod = rng.uniform(20, 100)
    return Planet(
        name=name,
        planet_type=ptype,
        population=pop,
        base_production=prod,
        loyalty=rng.uniform(60, 90),
    )


def _make_system(name: str, x: float, y: float, rng: random.Random,
                 used_planet_names: set) -> SolarSystem:
    star_type = _weighted_choice(STAR_TYPE_WEIGHTS, rng)
    num_planets = rng.randint(2, 6)
    planets = []
    for i in range(num_planets):
        pname = _unique_name(used_planet_names, PLANET_PREFIXES, PLANET_SUFFIXES, rng)
        planets.append(_make_planet(pname, rng))
    return SolarSystem(name=name, star_type=star_type, planets=planets, x=x, y=y)


def generate_galaxy(seed: int = 42, num_clusters: int = 8) -> List[Cluster]:
    rng = random.Random(seed)
    used_system_names: set = set()
    used_planet_names: set = set()
    used_cluster_names = rng.sample(CLUSTER_NAMES, min(num_clusters, len(CLUSTER_NAMES)))
    colors = CLUSTER_COLORS[:num_clusters]

    clusters: List[Cluster] = []

    # Place cluster centres on a rough ellipse
    for ci in range(num_clusters):
        angle = 2 * math.pi * ci / num_clusters + rng.uniform(-0.3, 0.3)
        radius = rng.uniform(35, 55)
        cx = radius * math.cos(angle) * 1.4
        cy = radius * math.sin(angle)

        num_systems = rng.randint(4, 8)
        systems: List[SolarSystem] = []
        for _ in range(num_systems):
            sname = _unique_name(used_system_names, SYSTEM_PREFIXES, SYSTEM_SUFFIXES, rng)
            sx = cx + rng.uniform(-12, 12)
            sy = cy + rng.uniform(-10, 10)
            systems.append(_make_system(sname, sx, sy, rng, used_planet_names))

        clusters.append(Cluster(
            name=used_cluster_names[ci],
            systems=systems,
            color=colors[ci],
        ))

    return clusters


def new_game(seed: int = 42) -> EmpireState:
    clusters = generate_galaxy(seed)
    state = EmpireState(clusters=clusters)
    state.events = [
        "Turn 1 — The Galactic Empire spans the stars. Your reign begins.",
        "Advisors report the empire is stable. Set your policies wisely, Emperor.",
    ]
    return state
