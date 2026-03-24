import type { SourceLink, StayRecord } from "../types";

const REVIEWED_AT = "2026-03-21";

function buildLinks(slug: string, name: string): SourceLink[] {
  return [
    {
      label: `${name} Official`,
      url: `https://example.com/${slug}`,
      kind: "official",
    },
    {
      label: `${name} Booking`,
      url: `https://example.com/${slug}/booking`,
      kind: "booking",
    },
    {
      label: `${name} Editorial Note`,
      url: `https://example.com/${slug}/editorial`,
      kind: "editorial",
    },
  ];
}

export const dummyStays: StayRecord[] = [
  {
    id: "stay-hokkaido-001",
    slug: "sora-house-niseko",
    name: "Sora House Niseko",
    region: "hokkaido",
    city: "Niseko",
    stayType: "villa",
    priceBand: "luxury",
    headline: "A polished private-base option with strong winter attention.",
    summary:
      "A high-comfort villa positioned for travelers who prioritize privacy, design clarity, and easy access to resort movement during peak season.",
    heroNote: "Best for small groups who want a quiet premium base.",
    fitTags: ["Ski trips", "Small groups", "Design-led", "Private stay"],
    highlights: [
      "Private-use format",
      "Clear premium positioning",
      "Strong winter relevance",
    ],
    momentum: "rising",
    momentumRationale:
      "Seasonal visibility is strong, listing freshness is high, and the stay is easy to explain editorially as a premium Niseko base.",
    trust: "high",
    trustRationale:
      "The stay has a clear official source structure and enough supporting material to justify a confident editorial summary.",
    tier: "core",
    tierRationale:
      "This is a strong flagship example for the Hokkaido slice of the dashboard.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/sora-house-niseko",
    bookingUrl: "https://example.com/sora-house-niseko/booking",
    sourceLinks: buildLinks("sora-house-niseko", "Sora House Niseko"),
    momentumInputs: {
      recentCoverageLevel: "high",
      bookingInterestSignal: "strong",
      listingFreshness: "new",
      seasonalAttention: "high",
      sourceDepth: "deep",
    },
    editorialNotes: [
      "A useful anchor property for demonstrating why a stay is marked as rising.",
    ],
  },
  {
    id: "stay-hokkaido-002",
    slug: "harbor-lantern-otaru",
    name: "Harbor Lantern Otaru",
    region: "hokkaido",
    city: "Otaru",
    stayType: "hotel",
    priceBand: "upper-mid",
    headline: "A quieter harbor-side option with stable appeal rather than hype.",
    summary:
      "A compact city stay that fits short Otaru itineraries and travelers who care more about mood and walkability than resort intensity.",
    heroNote: "A steadier pick for a slower Hokkaido city break.",
    fitTags: ["Walkable", "Couples", "Short stay", "Calm atmosphere"],
    highlights: [
      "Good harbor access",
      "Stable editorial fit",
      "Moderate source depth",
    ],
    momentum: "steady",
    momentumRationale:
      "The stay remains useful and legible, but the current signal set suggests stable interest rather than accelerated momentum.",
    trust: "medium",
    trustRationale:
      "There is enough material to describe it clearly, but not enough breadth to support a high-trust rating.",
    tier: "watchlist",
    tierRationale:
      "Worth keeping visible, but not currently a lead property for the homepage narrative.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/harbor-lantern-otaru",
    bookingUrl: "https://example.com/harbor-lantern-otaru/booking",
    sourceLinks: buildLinks("harbor-lantern-otaru", "Harbor Lantern Otaru"),
    momentumInputs: {
      recentCoverageLevel: "medium",
      bookingInterestSignal: "moderate",
      listingFreshness: "recent",
      seasonalAttention: "medium",
      sourceDepth: "moderate",
    },
  },
  {
    id: "stay-tohoku-001",
    slug: "akiu-hills-ryokan",
    name: "Akiu Hills Ryokan",
    region: "tohoku",
    city: "Sendai",
    stayType: "ryokan",
    priceBand: "upper-mid",
    headline: "A traditional-format stay that is easy to position for restorative trips.",
    summary:
      "A ryokan-style property suited to travelers looking for a quieter Tohoku reset, with enough editorial clarity to explain the appeal quickly.",
    heroNote: "A strong Tohoku candidate for restorative travel intent.",
    fitTags: ["Onsen mood", "Slow travel", "Couples", "Traditional stay"],
    highlights: [
      "Clear restorative angle",
      "Good ryokan positioning",
      "Usable for Tohoku storytelling",
    ],
    momentum: "rising",
    momentumRationale:
      "It fits a strong travel narrative, and its seasonal plus editorial positioning currently makes it easier to surface than many peers.",
    trust: "high",
    trustRationale:
      "The property presents enough stable information for a confident editorial read.",
    tier: "core",
    tierRationale:
      "A high-clarity representative entry for the Tohoku region.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/akiu-hills-ryokan",
    bookingUrl: "https://example.com/akiu-hills-ryokan/booking",
    sourceLinks: buildLinks("akiu-hills-ryokan", "Akiu Hills Ryokan"),
    momentumInputs: {
      recentCoverageLevel: "medium",
      bookingInterestSignal: "strong",
      listingFreshness: "recent",
      seasonalAttention: "high",
      sourceDepth: "deep",
    },
  },
  {
    id: "stay-tohoku-002",
    slug: "morioka-craft-stay",
    name: "Morioka Craft Stay",
    region: "tohoku",
    city: "Morioka",
    stayType: "hostel",
    priceBand: "budget",
    headline: "A lower-friction city base with clear value but thinner signal depth.",
    summary:
      "A compact, budget-oriented stay that may fit solo travelers and local-city exploration, though the evidence base is still relatively light.",
    heroNote: "Potentially useful, but not yet a high-confidence editorial lead.",
    fitTags: ["Solo travel", "Budget", "City base", "Short booking window"],
    highlights: [
      "Low-friction entry point",
      "Useful city access",
      "Thin information depth",
    ],
    momentum: "insufficient",
    momentumRationale:
      "The stay could become more interesting, but the current signal set is too thin to justify a directional label with confidence.",
    trust: "low",
    trustRationale:
      "The available source material is limited, which weakens the editorial confidence level.",
    tier: "unlisted",
    tierRationale:
      "Kept in the data layer, but not recommended for prominent placement until the information base improves.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/morioka-craft-stay",
    bookingUrl: "https://example.com/morioka-craft-stay/booking",
    sourceLinks: buildLinks("morioka-craft-stay", "Morioka Craft Stay"),
    momentumInputs: {
      recentCoverageLevel: "low",
      bookingInterestSignal: "unknown",
      listingFreshness: "stable",
      seasonalAttention: "low",
      sourceDepth: "thin",
    },
  },
  {
    id: "stay-tokyo-001",
    slug: "kanda-archive-hotel",
    name: "Kanda Archive Hotel",
    region: "tokyo",
    city: "Tokyo",
    stayType: "hotel",
    priceBand: "upper-mid",
    headline: "A sharp urban hotel concept with strong editorial readability.",
    summary:
      "A design-forward hotel for travelers who want a reliable central Tokyo base without sliding into generic luxury positioning.",
    heroNote: "A clear urban flagship for the Tokyo slice.",
    fitTags: ["Urban design", "Work trips", "Couples", "Central access"],
    highlights: [
      "Strong city positioning",
      "Sharp concept clarity",
      "Easy to compare against peers",
    ],
    momentum: "rising",
    momentumRationale:
      "The property is easy to frame, visually legible, and currently strong as an editorial recommendation candidate.",
    trust: "high",
    trustRationale:
      "There is enough stable structure in the source material to support confident summarization.",
    tier: "core",
    tierRationale:
      "One of the clearest example properties for demonstrating the value of the dashboard.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/kanda-archive-hotel",
    bookingUrl: "https://example.com/kanda-archive-hotel/booking",
    sourceLinks: buildLinks("kanda-archive-hotel", "Kanda Archive Hotel"),
    momentumInputs: {
      recentCoverageLevel: "high",
      bookingInterestSignal: "strong",
      listingFreshness: "recent",
      seasonalAttention: "medium",
      sourceDepth: "deep",
    },
  },
  {
    id: "stay-tokyo-002",
    slug: "asakusa-river-house",
    name: "Asakusa River House",
    region: "tokyo",
    city: "Tokyo",
    stayType: "aparthotel",
    priceBand: "mid",
    headline: "A practical family-friendly option with stable utility.",
    summary:
      "A practical aparthotel-style choice for travelers who care about room functionality, local access, and slightly slower travel rhythm in Tokyo.",
    heroNote: "A sensible rather than glamorous Tokyo pick.",
    fitTags: ["Families", "Longer stay", "Functional rooms", "Local access"],
    highlights: [
      "Good for longer stays",
      "Functional format",
      "Lower hype, solid utility",
    ],
    momentum: "steady",
    momentumRationale:
      "Its usefulness remains clear, but there is no strong signal suggesting a sharp upswing in editorial priority right now.",
    trust: "medium",
    trustRationale:
      "The stay is sufficiently documented for publication, though the evidence is less rich than top-tier entries.",
    tier: "watchlist",
    tierRationale:
      "Useful to retain in the grid for comparison, but not a lead example.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/asakusa-river-house",
    bookingUrl: "https://example.com/asakusa-river-house/booking",
    sourceLinks: buildLinks("asakusa-river-house", "Asakusa River House"),
    momentumInputs: {
      recentCoverageLevel: "medium",
      bookingInterestSignal: "moderate",
      listingFreshness: "stable",
      seasonalAttention: "medium",
      sourceDepth: "moderate",
    },
  },
  {
    id: "stay-central-001",
    slug: "alpine-window-matsumoto",
    name: "Alpine Window Matsumoto",
    region: "central",
    city: "Matsumoto",
    stayType: "hotel",
    priceBand: "mid",
    headline: "A gateway-style stay that benefits from route-based travel logic.",
    summary:
      "A strong base for travelers moving through Central Japan who want a practical but still characterful property with clear regional context.",
    heroNote: "A useful Central Japan anchor with route-planning appeal.",
    fitTags: ["Transit-friendly", "Regional travel", "Couples", "Scenic routes"],
    highlights: [
      "Good route logic",
      "Clear regional value",
      "Solid editorial framing",
    ],
    momentum: "rising",
    momentumRationale:
      "This stay benefits from route-based travel narratives and is currently easy to position for travelers planning broader regional movement.",
    trust: "high",
    trustRationale:
      "The source structure is solid enough to justify confident editorial treatment.",
    tier: "core",
    tierRationale:
      "A representative and highly usable entry for Central Japan.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/alpine-window-matsumoto",
    bookingUrl: "https://example.com/alpine-window-matsumoto/booking",
    sourceLinks: buildLinks(
      "alpine-window-matsumoto",
      "Alpine Window Matsumoto"
    ),
    momentumInputs: {
      recentCoverageLevel: "medium",
      bookingInterestSignal: "strong",
      listingFreshness: "recent",
      seasonalAttention: "high",
      sourceDepth: "deep",
    },
  },
  {
    id: "stay-central-002",
    slug: "kanazawa-courtyard-inn",
    name: "Kanazawa Courtyard Inn",
    region: "central",
    city: "Kanazawa",
    stayType: "ryokan",
    priceBand: "upper-mid",
    headline: "A tasteful heritage-leaning stay with stable editorial value.",
    summary:
      "A property that fits travelers looking for a more composed Kanazawa experience, with enough traditional atmosphere to be legible but not over-romanticized.",
    heroNote: "A calm heritage-oriented comparison point.",
    fitTags: ["Cultural trip", "Traditional mood", "Walkable", "Couples"],
    highlights: [
      "Good heritage framing",
      "Stable usefulness",
      "Moderate source certainty",
    ],
    momentum: "steady",
    momentumRationale:
      "The case for inclusion remains solid, but the current signals suggest maintenance rather than acceleration.",
    trust: "medium",
    trustRationale:
      "Good enough to support publication, though not at the strongest evidence level.",
    tier: "watchlist",
    tierRationale:
      "A useful secondary option in the region, especially for travelers prioritizing atmosphere.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/kanazawa-courtyard-inn",
    bookingUrl: "https://example.com/kanazawa-courtyard-inn/booking",
    sourceLinks: buildLinks(
      "kanazawa-courtyard-inn",
      "Kanazawa Courtyard Inn"
    ),
    momentumInputs: {
      recentCoverageLevel: "medium",
      bookingInterestSignal: "moderate",
      listingFreshness: "stable",
      seasonalAttention: "medium",
      sourceDepth: "moderate",
    },
  },
  {
    id: "stay-kansai-001",
    slug: "kyoto-higashiyama-house",
    name: "Kyoto Higashiyama House",
    region: "kansai",
    city: "Kyoto",
    stayType: "villa",
    priceBand: "luxury",
    headline: "A premium Kyoto stay with strong narrative clarity for discerning travelers.",
    summary:
      "A private-format Kyoto property that fits travelers seeking a composed, high-aesthetic base rather than high-traffic convenience alone.",
    heroNote: "A strong Kyoto flagship with clear premium intent.",
    fitTags: ["Luxury", "Private stay", "Design-led", "Kyoto first visit"],
    highlights: [
      "Very strong editorial framing",
      "Premium private format",
      "High signal clarity",
    ],
    momentum: "rising",
    momentumRationale:
      "The property aligns cleanly with premium Kyoto demand patterns and is especially easy to justify as a highlighted recommendation.",
    trust: "high",
    trustRationale:
      "There is strong enough source stability to support a confident high-trust label.",
    tier: "core",
    tierRationale:
      "This is the most obvious lead property for the Kansai slice in a premium-first view.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/kyoto-higashiyama-house",
    bookingUrl: "https://example.com/kyoto-higashiyama-house/booking",
    sourceLinks: buildLinks(
      "kyoto-higashiyama-house",
      "Kyoto Higashiyama House"
    ),
    momentumInputs: {
      recentCoverageLevel: "high",
      bookingInterestSignal: "strong",
      listingFreshness: "new",
      seasonalAttention: "high",
      sourceDepth: "deep",
    },
  },
  {
    id: "stay-kansai-002",
    slug: "kii-coast-retreat",
    name: "Kii Coast Retreat",
    region: "kansai",
    city: "Wakayama",
    stayType: "resort",
    priceBand: "upper-mid",
    headline: "A resort-style stay with seasonal appeal but more uneven signal quality.",
    summary:
      "A slower, destination-style Kansai option that may work well for off-urban itineraries, though its current editorial evidence is not yet top-tier.",
    heroNote: "Promising, but more context-dependent than urban flagships.",
    fitTags: ["Scenic coast", "Resort mood", "Driving trip", "Long weekend"],
    highlights: [
      "Good destination logic",
      "Season-sensitive demand",
      "Uneven confidence level",
    ],
    momentum: "cooling",
    momentumRationale:
      "The stay still has value, but compared with other entries the current signals feel less immediate and less editorially urgent.",
    trust: "medium",
    trustRationale:
      "There is enough information to keep it in the system, but not enough to elevate it further.",
    tier: "watchlist",
    tierRationale:
      "Best treated as a secondary candidate rather than a front-of-grid recommendation.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/kii-coast-retreat",
    bookingUrl: "https://example.com/kii-coast-retreat/booking",
    sourceLinks: buildLinks("kii-coast-retreat", "Kii Coast Retreat"),
    momentumInputs: {
      recentCoverageLevel: "low",
      bookingInterestSignal: "soft",
      listingFreshness: "stable",
      seasonalAttention: "low",
      sourceDepth: "moderate",
    },
  },
  {
    id: "stay-kyushu-001",
    slug: "beppu-steam-lodge",
    name: "Beppu Steam Lodge",
    region: "kyushu",
    city: "Beppu",
    stayType: "ryokan",
    priceBand: "mid",
    headline: "A Kyushu onsen-oriented option with strong experiential clarity.",
    summary:
      "A practical but experience-led stay for travelers who want Beppu atmosphere without losing editorial legibility or booking relevance.",
    heroNote: "A strong Kyushu entry for onsen-oriented travel.",
    fitTags: ["Onsen", "Experience-led", "Couples", "Regional trip"],
    highlights: [
      "Strong experience framing",
      "Good city fit",
      "Reliable comparison value",
    ],
    momentum: "rising",
    momentumRationale:
      "Its experiential clarity and regional fit make it easier to elevate than generic alternatives in the same area.",
    trust: "high",
    trustRationale:
      "The editorial evidence is stable enough to support confident presentation.",
    tier: "core",
    tierRationale:
      "A leading Kyushu candidate in a utility-plus-experience view.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/beppu-steam-lodge",
    bookingUrl: "https://example.com/beppu-steam-lodge/booking",
    sourceLinks: buildLinks("beppu-steam-lodge", "Beppu Steam Lodge"),
    momentumInputs: {
      recentCoverageLevel: "medium",
      bookingInterestSignal: "strong",
      listingFreshness: "recent",
      seasonalAttention: "high",
      sourceDepth: "deep",
    },
  },
  {
    id: "stay-kyushu-002",
    slug: "yufuin-grove-villa",
    name: "Yufuin Grove Villa",
    region: "kyushu",
    city: "Yufuin",
    stayType: "villa",
    priceBand: "luxury",
    headline: "A premium scenic stay with good fit for slower luxury itineraries.",
    summary:
      "A design-conscious private stay suited to travelers who want a slower, more self-contained Yufuin experience with high emotional clarity.",
    heroNote: "Premium and quiet, with narrower but strong-fit demand.",
    fitTags: ["Luxury", "Scenic", "Private stay", "Slow travel"],
    highlights: [
      "Strong fit for premium leisure",
      "High aesthetic coherence",
      "More niche than universal",
    ],
    momentum: "steady",
    momentumRationale:
      "The stay is attractive and coherent, but its present signal pattern suggests stable premium appeal rather than broad acceleration.",
    trust: "medium",
    trustRationale:
      "The evidence base is good enough for confident use, but still thinner than the strongest flagship entries.",
    tier: "watchlist",
    tierRationale:
      "A strong-fit property that should remain visible, especially for slower luxury trip planning.",
    lastReviewedAt: REVIEWED_AT,
    officialUrl: "https://example.com/yufuin-grove-villa",
    bookingUrl: "https://example.com/yufuin-grove-villa/booking",
    sourceLinks: buildLinks("yufuin-grove-villa", "Yufuin Grove Villa"),
    momentumInputs: {
      recentCoverageLevel: "medium",
      bookingInterestSignal: "moderate",
      listingFreshness: "recent",
      seasonalAttention: "medium",
      sourceDepth: "moderate",
    },
  },
];