"""Narrative news event system for the Galactic Empire.

Every event returns one or more NewsItem dispatches written as imperial
news broadcasts.  Events react both to random chance and to the current
policy settings, so the Emperor always has something to read and respond
to.
"""
from __future__ import annotations
import random
from .models import EmpireState, NewsItem, PlanetType

# ── Named characters used across dispatches ────────────────────────────────
_SENATORS = [
    "Senator Vorkan the Elder", "Senator Miren of the Outer Reach",
    "Senator Elath-Cassius", "Senator Ceta-Borral", "Senator Hexar the Younger",
    "Senator Lyria of the Solaris Belt",
]
_ADMIRALS = [
    "Fleet Admiral Zannick", "Admiral Vel Secundus", "Grand Admiral Borrath",
    "Rear Admiral Lyrith", "Fleet Admiral Axon-Prime",
]
_ECONOMISTS = [
    "Treasury Prefect Oryn", "Guild Master Lorn", "Merchant-Prince Ceta",
    "Chief Auditor Dorn", "Comptroller Hexaris",
]
_GENERALS = [
    "General Axon", "Commander Gorrath", "Field Marshal Keth",
    "Legate Mira", "Pacification Commander Vel",
]

# ── Source masthead labels ─────────────────────────────────────────────────
SRC = {
    "herald":   "IMPERIAL HERALD",
    "senate":   "SENATE DISPATCH",
    "military": "IMPERIAL MILITARY COMMAND",
    "economy":  "ECONOMIC AFFAIRS BUREAU",
    "security": "IMPERIAL SECURITY BUREAU",
    "colony":   "COLONIAL ADMINISTRATION",
    "trade":    "TRADE GUILD CONSORTIUM",
    "science":  "IMPERIAL SCIENCE DIRECTORATE",
    "health":   "IMPERIAL HEALTH COMMISSION",
    "edict":    "IMPERIAL EDICT",
    "treasury": "IMPERIAL TREASURY",
}


def _rng(turn: int) -> random.Random:
    return random.Random(turn * 9_999_991 + 7)


# ═══════════════════════════════════════════════════════════════════════════
# Public entry point
# ═══════════════════════════════════════════════════════════════════════════

def process_events(state: EmpireState) -> list[NewsItem]:
    """Generate narrative news and mutate state. Returns list of NewsItem."""
    rng = _rng(state.turn)
    items: list[NewsItem] = []
    t = state.turn

    # Policy reactions come first — they set the political context
    items.extend(_policy_reactions(state, rng))

    # ── Rebellions ─────────────────────────────────────────────────────────
    for cluster in state.clusters:
        if cluster.rebellious:
            if state.military_strength >= 60:
                cluster.rebellious = False
                for sys in cluster.systems:
                    for p in sys.planets:
                        p.loyalty = max(30.0, p.loyalty - 10)
                general = rng.choice(_GENERALS)
                items.append(NewsItem(t, SRC["military"],
                    f"IMPERIAL FORCES CRUSH REBELLION IN {cluster.name.upper()}",
                    f"{general} reports that pacification operations across {cluster.name} have "
                    f"concluded. Rebel strongholds have been reduced to rubble and order nominally "
                    f"restored, though at considerable cost to civilian goodwill. Loyalty across "
                    f"the cluster has fallen further following the crackdown. Analysts warn that "
                    f"grievances remain unaddressed and a second rising is possible if conditions "
                    f"do not improve.",
                    "warning"))
            else:
                for sys in cluster.systems:
                    for p in sys.planets:
                        p.loyalty = max(5.0, p.loyalty - 5)
                senator = rng.choice(_SENATORS)
                items.append(NewsItem(t, SRC["security"],
                    f"REBELLION IN {cluster.name.upper()} SPREADS — EMPIRE LOSING GRIP",
                    f"With insufficient military forces committed to the theatre, the insurrection "
                    f"in {cluster.name} enters another cycle unchecked. Rebel factions have "
                    f"consolidated control of key orbital platforms and are actively recruiting from "
                    f"disaffected populations. Tax collection has ceased entirely. {senator} "
                    f"addressed the Senate in emergency session: 'We are watching a cluster slip "
                    f"from our grasp. Fund the fleet or negotiate — indecision is not a policy.'",
                    "critical"))
            continue

        if cluster.average_loyalty < 30 and rng.random() < 0.6:
            cluster.rebellious = True
            sys = rng.choice(cluster.systems)
            senator = rng.choice(_SENATORS)
            items.append(NewsItem(t, SRC["security"],
                f"OPEN REVOLT ERUPTS IN {cluster.name.upper()} — IMPERIAL AUTHORITY COLLAPSES",
                f"Armed militias have seized the orbital platforms above {sys.name}, declaring "
                f"independence from the Imperial throne. Governors throughout {cluster.name} "
                f"have fled or pledged loyalty to the rebel council. {senator} demanded "
                f"immediate military intervention: 'If this cluster is lost, others will follow.' "
                f"Cluster loyalty now stands at {cluster.average_loyalty:.0f}%. "
                f"Military commanders are requesting authorisation to deploy a pacification fleet.",
                "critical"))
            continue

        if cluster.average_loyalty < 45 and rng.random() < 0.3:
            senator = rng.choice(_SENATORS)
            items.append(NewsItem(t, SRC["colony"],
                f"CIVIL UNREST GRIPS {cluster.name.upper()} — GOVERNORS FILE URGENT DISPATCHES",
                f"Governors across {cluster.name} describe widening civil unrest. "
                f"Protests have turned violent on two inhabited worlds; local security "
                f"forces are struggling to maintain order. Cluster loyalty stands at "
                f"{cluster.average_loyalty:.0f}%. {senator} has raised the matter before "
                f"the full Senate, urging the Emperor to address grievances before they "
                f"crystallise into open rebellion. Raising Bread & Circus allocations or "
                f"easing the tax burden would signal goodwill to the affected populations.",
                "warning"))

    # ── External invasion ──────────────────────────────────────────────────
    if state.military_strength < 25 and rng.random() < 0.4:
        target = rng.choice(state.clusters)
        lost = rng.uniform(500, 2000)
        state.treasury -= lost
        for sys in target.systems:
            for p in sys.planets:
                p.loyalty = max(10.0, p.loyalty - 15)
        admiral = rng.choice(_ADMIRALS)
        items.append(NewsItem(t, SRC["military"],
            f"BARBARIAN FLEETS RAID {target.name.upper()} — {lost:,.0f} CREDITS PLUNDERED",
            f"With Imperial defences at critically low readiness, unidentified warships "
            f"have struck deep into {target.name}. Multiple inhabited worlds report "
            f"orbital bombardment and mass looting. {admiral} submitted an emergency "
            f"briefing: 'The frontier is open. We cannot hold the line on this budget. "
            f"Every cycle we remain underfunded is an invitation to our enemies.' "
            f"Civilian loyalty across {target.name} has collapsed.",
            "critical"))

    # ── Trade boom ─────────────────────────────────────────────────────────
    if rng.random() < 0.12:
        bonus = rng.uniform(300, 1200)
        state.treasury += bonus
        cluster = rng.choice(state.clusters)
        economist = rng.choice(_ECONOMISTS)
        items.append(NewsItem(t, SRC["trade"],
            f"MARKETS SURGE ACROSS {cluster.name.upper()} — {bonus:,.0f} CREDITS IN WINDFALL TARIFFS",
            f"A wave of interstellar commerce has delivered an unexpected {bonus:,.0f}-credit "
            f"windfall in trade tariffs. Merchant convoys report record cargo volumes and "
            f"broker houses are hiring aggressively. {economist} credited stable Imperial "
            f"monetary policy for investor confidence, urging the Emperor to maintain "
            f"conditions favourable to long-range commerce. The Guilds have sent formal "
            f"compliments to the throne.",
            "good"))

    # ── Plague ─────────────────────────────────────────────────────────────
    if rng.random() < 0.08:
        ww = [
            (c, s, p)
            for c in state.clusters for s in c.systems
            for p in s.planets
            if p.planet_type == PlanetType.WATER_WORLD and p.population > 0
        ]
        if ww:
            c, s, planet = rng.choice(ww)
            lost = int(planet.population * rng.uniform(0.05, 0.20))
            planet.population = max(1, planet.population - lost)
            items.append(NewsItem(t, SRC["health"],
                f"BLIGHT CLAIMS {lost}M LIVES ON {planet.name.upper()} — PANDEMIC FEARED",
                f"A virulent pathogen of unknown origin has swept through the water world "
                f"{planet.name} in the {s.name} system ({c.name}). Imperial health "
                f"commissioners report {lost} million dead, with strict quarantine measures "
                f"now in effect. Planetary broadcasts show mass funeral pyres. "
                f"Survivors are demanding Imperial relief funds and expanded medical "
                f"infrastructure. Without a visible response from the throne, loyalty "
                f"across the affected system will continue to erode.",
                "critical" if lost > 50 else "warning"))

    # ── Mineral discovery ─────────────────────────────────────────────────
    if rng.random() < 0.10:
        cluster = rng.choice(state.clusters)
        sys = rng.choice(cluster.systems)
        bonus_prod = rng.uniform(20, 60)
        for p in sys.planets:
            if p.planet_type == PlanetType.MINERAL_ROCK:
                p.base_production += bonus_prod
                items.append(NewsItem(t, SRC["science"],
                    f"VAST ORE DEPOSITS FOUND ON {p.name.upper()} — PRODUCTION TO SURGE",
                    f"Geological survey teams operating in the {sys.name} system have confirmed "
                    f"extensive deep-crust ore deposits beneath {p.name}. Mining output is "
                    f"projected to increase by {bonus_prod:.0f} units per cycle. The Science "
                    f"Directorate is recommending an emergency infrastructure appropriation to "
                    f"accelerate extraction. Once fully operational, the find could meaningfully "
                    f"expand the productive capacity of {cluster.name}.",
                    "good"))
                break

    # ── Inflation crisis ──────────────────────────────────────────────────
    if state.inflation_rate > 15 and rng.random() < 0.5:
        penalty = rng.uniform(200, 800)
        state.treasury -= penalty
        economist = rng.choice(_ECONOMISTS)
        items.append(NewsItem(t, SRC["economy"],
            f"RUNAWAY INFLATION AT {state.inflation_rate:.1f}% DESTROYS SAVINGS",
            f"Citizens empire-wide report that the Imperial credit is losing value faster "
            f"than they can spend it. Markets are in turmoil, merchants are refusing "
            f"to honour long-term contracts, and bread queues snake around city blocks "
            f"on a dozen water worlds. {economist} has submitted a resignation letter to "
            f"the Treasury and released a public statement calling the Emperor's monetary "
            f"policy 'an act of economic vandalism.' {penalty:,.0f} credits in real value "
            f"has been destroyed this cycle.",
            "critical"))

    # ── Festival loyalty boost ────────────────────────────────────────────
    if state.bread_circus_spending >= 400 and rng.random() < 0.3:
        cluster = rng.choice(state.clusters)
        for sys in cluster.systems:
            for p in sys.planets:
                p.loyalty = min(100.0, p.loyalty + 5)
        items.append(NewsItem(t, SRC["herald"],
            f"IMPERIAL GAMES DELIGHT CITIZENS OF {cluster.name.upper()} — LOYALTY CLIMBS",
            f"The Imperial Games Commission reports jubilant celebrations across "
            f"{cluster.name} following this cycle's generous festival decree. Arenas "
            f"are packed to capacity, free grain distributions are oversubscribed, and "
            f"loyalty across the cluster has risen by 5 points. Citizens have taken to "
            f"the streets in spontaneous processions, carrying portraits of the Emperor. "
            f"'This is what the Empire stands for,' declared one local governor, "
            f"'generosity and power in equal measure.'",
            "good"))

    # ── Pirate activity when mid-range military ───────────────────────────
    if 25 <= state.military_strength < 50 and rng.random() < 0.15:
        cluster = rng.choice(state.clusters)
        lost = rng.uniform(100, 500)
        state.treasury -= lost
        items.append(NewsItem(t, SRC["trade"],
            f"PIRATE RAIDS DISRUPT COMMERCE IN {cluster.name.upper()}",
            f"A confederation of corsair vessels has been preying on merchant traffic "
            f"passing through {cluster.name}, seizing cargoes and demanding protection "
            f"credits. The Trade Guild estimates {lost:,.0f} credits in losses this cycle. "
            f"Guild factors are calling on the Emperor to despatch a naval patrol squadron "
            f"to restore safe passage. Until then, insurance premiums on {cluster.name} "
            f"routes have tripled.",
            "warning"))

    # ── Flavour events ────────────────────────────────────────────────────
    if rng.random() < 0.10:
        items.extend(_flavour_event(state, rng))

    return items


# ═══════════════════════════════════════════════════════════════════════════
# Policy reactions
# ═══════════════════════════════════════════════════════════════════════════

def _policy_reactions(state: EmpireState, rng: random.Random) -> list[NewsItem]:
    """News items that comment on current — and recently changed — policy."""
    items = []
    t = state.turn
    senator  = rng.choice(_SENATORS)
    admiral  = rng.choice(_ADMIRALS)
    economist = rng.choice(_ECONOMISTS)

    tr  = state.tax_rate
    ir  = state.inflation_rate
    ds  = state.defense_spending
    bcs = state.bread_circus_spending

    # ── Tax too high ───────────────────────────────────────────────────────
    if tr >= 45 and rng.random() < 0.75:
        items.append(NewsItem(t, SRC["senate"],
            f"SENATORS DEMAND EMERGENCY TAX RELIEF AS LEVY HITS {tr:.0f}%",
            f"In an unprecedented joint declaration, senators from all eight clusters "
            f"have demanded that the Emperor immediately reduce the {tr:.0f}% Imperial tax "
            f"levy. {senator} addressed the chamber: 'At this rate we are not governing "
            f"an empire — we are strip-mining it. The productive classes are fleeing to "
            f"the outer systems. Rebellion is not a question of if, but when.' "
            f"Intelligence reports confirm that underground resistance cells are forming "
            f"in at least four clusters.",
            "critical"))
    elif tr >= 35 and rng.random() < 0.55:
        items.append(NewsItem(t, SRC["senate"],
            f"SENATE PETITIONS EMPEROR — TAX BURDEN AT {tr:.0f}% 'UNSUSTAINABLE'",
            f"A delegation of senior senators presented a formal petition at the "
            f"Imperial Palace urging a reduction in the empire-wide tax rate, currently "
            f"standing at {tr:.0f}%. {senator} told the press afterwards: 'We are not "
            f"opposed to taxation — the empire must function — but {tr:.0f}% is destroying "
            f"goodwill built over generations. The Emperor must listen before it is too late.' "
            f"Loyalty indices across outer clusters have been trending downward for "
            f"three consecutive cycles.",
            "warning"))

    # ── Tax too low ────────────────────────────────────────────────────────
    elif tr <= 5 and rng.random() < 0.5:
        items.append(NewsItem(t, SRC["treasury"],
            f"TREASURY WARNS: {tr:.0f}% TAX RATE IMPERILS IMPERIAL FINANCES",
            f"{economist} has issued an urgent advisory noting that the current "
            f"{tr:.0f}% tax rate is generating insufficient revenue to sustain Imperial "
            f"operations. 'We are spending reserves accumulated over decades,' the "
            f"advisory reads. 'Within cycles, we will be unable to fund the fleet, "
            f"the games, or even basic administration. A modest levy increase is "
            f"not greed — it is survival.'",
            "warning"))

    # ── Low defence ────────────────────────────────────────────────────────
    if ds < 100 and rng.random() < 0.65:
        items.append(NewsItem(t, SRC["military"],
            f"FLEET ADMIRALS WARN OF CATASTROPHIC DEFENCE GAP",
            f"{admiral} has delivered an emergency briefing to the Imperial Council. "
            f"With defence spending at just {ds:,.0f} credits per cycle, the Imperial "
            f"Navy has been reduced to a skeleton force. Garrison worlds report mass "
            f"desertions. Border monitoring has lapsed entirely. 'We cannot hold the "
            f"frontier on promises alone,' {admiral} stated. 'Fund the fleet now, or "
            f"accept that the empire will contract — violently — to whatever enemies "
            f"choose to take from us.'",
            "warning"))

    # ── High inflation ─────────────────────────────────────────────────────
    if ir > 12 and rng.random() < 0.55:
        items.append(NewsItem(t, SRC["economy"],
            f"ECONOMISTS SOUND ALARM: INFLATION AT {ir:.1f}% RISKS SYSTEMIC COLLAPSE",
            f"{economist} has published an emergency economic report warning that "
            f"Imperial monetary expansion has pushed inflation to {ir:.1f}% — far above "
            f"the stable range of 0–8%. Bread prices have tripled on multiple water "
            f"worlds. Merchants are hoarding physical goods rather than accepting Imperial "
            f"credits. The report concludes starkly: 'If monetary expansion does not "
            f"cease immediately, the Imperial credit will become worthless within "
            f"a handful of cycles. The collapse will be swift and irreversible.'",
            "warning" if ir < 16 else "critical"))

    # ── Zero entertainment ─────────────────────────────────────────────────
    if bcs == 0 and rng.random() < 0.55:
        items.append(NewsItem(t, SRC["colony"],
            "ALL IMPERIAL FESTIVALS CANCELLED — MORALE COLLAPSES EMPIRE-WIDE",
            f"Following the Emperor's decision to eliminate all Bread & Circus "
            f"expenditure, Imperial Governors are reporting an alarming collapse in "
            f"public morale. Arenas stand empty, food distributions have ceased, and "
            f"entertainment venues are dark. Citizens across multiple clusters describe "
            f"the atmosphere as 'joyless and resentful.' One governor wrote privately: "
            f"'The people do not ask for much — a festival, a full stomach, a reason "
            f"to be proud of the Empire. Give them nothing and you will reap nothing "
            f"but contempt.'",
            "warning"))

    # ── Generous entertainment — positive notice ───────────────────────────
    elif bcs >= 700 and rng.random() < 0.35:
        items.append(NewsItem(t, SRC["herald"],
            "EMPEROR'S GENEROSITY CELEBRATED — LOYALTY AT HISTORIC HIGHS",
            f"The Imperial Herald reports extraordinary public jubilation following the "
            f"Emperor's commitment of {bcs:,.0f} credits per cycle to public welfare and "
            f"entertainment. Citizens describe their ruler as 'the most generous Emperor "
            f"in living memory.' Loyalty indices are trending upward across every cluster. "
            f"Political analysts note that this level of popular support provides a strong "
            f"buffer against the inevitable hardships of governing a galactic empire. "
            f"The Senate has formally endorsed the Emperor's approach.",
            "good"))

    # ── High stability, high happiness — golden age ────────────────────────
    if state.stability >= 80 and state.happiness >= 75 and rng.random() < 0.25:
        items.append(NewsItem(t, SRC["herald"],
            "PAX IMPERIALIS — ANALYSTS DECLARE GOLDEN AGE OF IMPERIAL RULE",
            f"With stability at {state.stability:.0f}% and empire-wide happiness at "
            f"{state.happiness:.0f}%, senior analysts at the Imperial Institute for "
            f"Strategic Affairs have declared the current period a 'golden age of "
            f"Imperial governance.' Trade is flourishing, rebellions are at a historic "
            f"low, and citizens express unprecedented confidence in the throne. "
            f"'This is what wise rulership looks like,' wrote the Institute's director. "
            f"'The Emperor has found the balance between strength and generosity that "
            f"empires throughout history have struggled to maintain.'",
            "good"))

    return items


# ═══════════════════════════════════════════════════════════════════════════
# Flavour events
# ═══════════════════════════════════════════════════════════════════════════

_FLAVOUR = [
    (SRC["science"],
     "ANCIENT ALIEN RUINS UNEARTHED — HISTORIANS DECLARE FIND OF THE MILLENNIUM",
     "An Imperial archaeology team excavating a remote moon in the {cluster} cluster "
     "has unearthed ruins that predate human expansion by millions of years. Holographic "
     "recordings of the site show vast chambers carved with symbols no linguist can yet "
     "decode. Chief Archivist Dorn has declared it 'the most significant discovery in "
     "the history of the Empire.' Scholars from across the galaxy are converging on the "
     "site. The Emperor has been invited to the formal unveiling.",
     "info"),

    (SRC["trade"],
     "NEW HYPERSPACE LANE OPENS — TRAVEL TIMES BETWEEN CLUSTERS HALVED",
     "Guild navigators aboard the survey vessel ISV Meridian have plotted a new "
     "hyperspace corridor linking the {cluster} cluster to the Imperial core, cutting "
     "journey times from weeks to days. Merchants celebrated in the streets of three "
     "trading ports. The discovery is projected to significantly boost inter-cluster "
     "commerce and lower the cost of garrisoning the outer systems.",
     "good"),

    (SRC["senate"],
     "SENATE VOTES TO COMMISSION IMPERIAL MONUMENT TO CURRENT REIGN",
     "In a rare display of cross-cluster unity, the Senate has voted to commission "
     "a monument to the current reign to be erected in the Imperial capital. The "
     "project — to be funded from voluntary senatorial contributions — will depict "
     "the Emperor at the helm of the galaxy. {senator} proposed the motion: "
     "'Let future generations know that in our time, the Empire was guided by "
     "a steady hand.'",
     "info"),

    (SRC["science"],
     "STELLAR CARTOGRAPHERS CHART PREVIOUSLY UNKNOWN NEBULA",
     "Imperial survey vessels operating beyond the {cluster} cluster have charted "
     "a spectacular nebula of unknown origin. Initial spectral analysis suggests "
     "unusually rich concentrations of exotic materials. The Science Directorate "
     "has requested Imperial funding for a full survey mission. By ancient tradition, "
     "the Emperor holds the right to name any newly charted stellar phenomenon.",
     "info"),

    (SRC["herald"],
     "CENSUS DATA REVEALS EMPIRE'S POPULATION GROWS DESPITE HARDSHIPS",
     "The latest Imperial census confirms that the empire's total population continues "
     "to grow, with the {cluster} cluster leading expansion. Demographers credit "
     "relative stability and access to water worlds for the trend. "
     "'An expanding population is ultimately a sign of confidence in the future,' "
     "noted the Census Director. 'People have children when they believe tomorrow "
     "will be better than today.'",
     "good"),

    (SRC["colony"],
     "MYSTERIOUS OBJECT PASSES THROUGH IMPERIAL SPACE — SCIENTISTS BAFFLED",
     "An object of unknown origin on an hyperbolic trajectory has been tracked passing "
     "through the {cluster} cluster at extraordinary velocity. Its composition does "
     "not match any known stellar body. The Science Directorate has deployed observation "
     "probes but the object has already left sensor range. 'It was not from this galaxy,' "
     "admitted the lead astronomer. 'Beyond that, we know nothing — yet.'",
     "info"),
]


def _flavour_event(state: EmpireState, rng: random.Random) -> list[NewsItem]:
    src, headline, body, severity = rng.choice(_FLAVOUR)
    cluster = rng.choice(state.clusters)
    senator = rng.choice(_SENATORS)
    return [NewsItem(
        turn=state.turn,
        source=src,
        headline=headline,
        body=body.format(cluster=cluster.name, senator=senator),
        severity=severity,
    )]
