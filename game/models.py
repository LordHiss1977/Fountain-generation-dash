from __future__ import annotations
from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional


class PlanetType(Enum):
    MINERAL_ROCK = "mineral_rock"
    WATER_WORLD = "water_world"
    GAS_GIANT = "gas_giant"
    ASTEROID = "asteroid"


class StarType(Enum):
    YELLOW_DWARF = "yellow_dwarf"
    RED_GIANT = "red_giant"
    WHITE_DWARF = "white_dwarf"
    BLUE_GIANT = "blue_giant"
    NEUTRON_STAR = "neutron_star"


PLANET_LABELS = {
    PlanetType.MINERAL_ROCK: "Mineral Rock",
    PlanetType.WATER_WORLD: "Water World",
    PlanetType.GAS_GIANT: "Gas Giant",
    PlanetType.ASTEROID: "Asteroid",
}

STAR_LABELS = {
    StarType.YELLOW_DWARF: "Yellow Dwarf",
    StarType.RED_GIANT: "Red Giant",
    StarType.WHITE_DWARF: "White Dwarf",
    StarType.BLUE_GIANT: "Blue Giant",
    StarType.NEUTRON_STAR: "Neutron Star",
}

PLANET_ICONS = {
    PlanetType.MINERAL_ROCK: "⛰",
    PlanetType.WATER_WORLD: "🌊",
    PlanetType.GAS_GIANT: "🌀",
    PlanetType.ASTEROID: "☄",
}


@dataclass
class Planet:
    name: str
    planet_type: PlanetType
    population: int        # millions
    base_production: float # raw resource output
    loyalty: float         # 0–100

    @property
    def tax_yield(self) -> float:
        """Credits generated before applying the empire tax rate."""
        if self.planet_type == PlanetType.WATER_WORLD:
            return self.population * 0.6
        if self.planet_type == PlanetType.MINERAL_ROCK:
            return self.base_production * 2.5
        if self.planet_type == PlanetType.GAS_GIANT:
            return self.base_production * 2.0
        if self.planet_type == PlanetType.ASTEROID:
            return self.base_production * 1.2
        return 0.0

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "planet_type": self.planet_type.value,
            "population": self.population,
            "base_production": self.base_production,
            "loyalty": self.loyalty,
        }

    @classmethod
    def from_dict(cls, d: dict) -> Planet:
        return cls(
            name=d["name"],
            planet_type=PlanetType(d["planet_type"]),
            population=d["population"],
            base_production=d["base_production"],
            loyalty=d["loyalty"],
        )


@dataclass
class SolarSystem:
    name: str
    star_type: StarType
    planets: List[Planet]
    x: float
    y: float

    @property
    def total_population(self) -> int:
        return sum(p.population for p in self.planets)

    @property
    def total_tax_yield(self) -> float:
        return sum(p.tax_yield for p in self.planets)

    @property
    def average_loyalty(self) -> float:
        if not self.planets:
            return 100.0
        return sum(p.loyalty for p in self.planets) / len(self.planets)

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "star_type": self.star_type.value,
            "planets": [p.to_dict() for p in self.planets],
            "x": self.x,
            "y": self.y,
        }

    @classmethod
    def from_dict(cls, d: dict) -> SolarSystem:
        return cls(
            name=d["name"],
            star_type=StarType(d["star_type"]),
            planets=[Planet.from_dict(p) for p in d["planets"]],
            x=d["x"],
            y=d["y"],
        )


@dataclass
class Cluster:
    name: str
    systems: List[SolarSystem]
    color: str
    rebellious: bool = False

    @property
    def total_population(self) -> int:
        return sum(s.total_population for s in self.systems)

    @property
    def total_tax_yield(self) -> float:
        return sum(s.total_tax_yield for s in self.systems)

    @property
    def average_loyalty(self) -> float:
        all_loyalties = [p.loyalty for s in self.systems for p in s.planets]
        return sum(all_loyalties) / len(all_loyalties) if all_loyalties else 100.0

    @property
    def center(self) -> tuple[float, float]:
        if not self.systems:
            return 0.0, 0.0
        cx = sum(s.x for s in self.systems) / len(self.systems)
        cy = sum(s.y for s in self.systems) / len(self.systems)
        return cx, cy

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "systems": [s.to_dict() for s in self.systems],
            "color": self.color,
            "rebellious": self.rebellious,
        }

    @classmethod
    def from_dict(cls, d: dict) -> Cluster:
        return cls(
            name=d["name"],
            systems=[SolarSystem.from_dict(s) for s in d["systems"]],
            color=d["color"],
            rebellious=d.get("rebellious", False),
        )


@dataclass
class EmpireState:
    clusters: List[Cluster]
    treasury: float = 15_000.0
    tax_rate: float = 20.0        # percent  0–50
    inflation_rate: float = 5.0   # percent  0–20
    defense_spending: float = 300.0   # credits/turn
    bread_circus_spending: float = 200.0  # credits/turn
    turn: int = 1
    happiness: float = 65.0       # 0–100
    military_strength: float = 60.0  # 0–100
    stability: float = 75.0       # 0–100
    events: List[str] = field(default_factory=list)
    game_over: bool = False
    game_over_reason: str = ""

    def to_dict(self) -> dict:
        return {
            "clusters": [c.to_dict() for c in self.clusters],
            "treasury": self.treasury,
            "tax_rate": self.tax_rate,
            "inflation_rate": self.inflation_rate,
            "defense_spending": self.defense_spending,
            "bread_circus_spending": self.bread_circus_spending,
            "turn": self.turn,
            "happiness": self.happiness,
            "military_strength": self.military_strength,
            "stability": self.stability,
            "events": self.events,
            "game_over": self.game_over,
            "game_over_reason": self.game_over_reason,
        }

    @classmethod
    def from_dict(cls, d: dict) -> EmpireState:
        return cls(
            clusters=[Cluster.from_dict(c) for c in d["clusters"]],
            treasury=d["treasury"],
            tax_rate=d["tax_rate"],
            inflation_rate=d["inflation_rate"],
            defense_spending=d["defense_spending"],
            bread_circus_spending=d["bread_circus_spending"],
            turn=d["turn"],
            happiness=d["happiness"],
            military_strength=d["military_strength"],
            stability=d["stability"],
            events=d["events"],
            game_over=d.get("game_over", False),
            game_over_reason=d.get("game_over_reason", ""),
        )
