import type { Facility, MomentumEntry } from "./types";

export const DUMMY_FACILITIES: Facility[] = [
  {
    id: "f-001",
    name: "Trunk Hotel",
    region: "tokyo",
    stayType: "hotel",
    trustLevel: "high",
    tierLevel: "core",
    fitTags: ["urban", "solo"],
    summary:
      "A design-forward boutique hotel in Shibuya blending contemporary Japanese aesthetics with community-minded hospitality.",
    location: "Shibuya, Tokyo",
    priceNote: "Premium",
    externalUrl: "https://trunk-hotel.com",
  },
  {
    id: "f-002",
    name: "Nui. Hostel & Bar Lounge",
    region: "tokyo",
    stayType: "hostel",
    trustLevel: "high",
    tierLevel: "core",
    fitTags: ["urban", "solo"],
    summary:
      "A Kuramae hostel in a converted warehouse with an atmospheric bar and strong neighborhood character.",
    location: "Kuramae, Tokyo",
    priceNote: "Budget",
    externalUrl: "https://backpackersjapan.co.jp/nui/en/",
  },
  {
    id: "f-003",
    name: "Nazuna Kyoto Gosho",
    region: "kyoto",
    stayType: "ryokan",
    trustLevel: "medium",
    tierLevel: "core",
    fitTags: ["cultural", "onsen"],
    summary:
      "A cluster of restored machiya townhouses near the Imperial Palace with ryokan-style hospitality.",
    location: "Imperial Palace area, Kyoto",
    priceNote: "Premium",
    externalUrl: "https://www.nazuna.co/",
  },
  {
    id: "f-004",
    name: "Piece Hostel Sanjo",
    region: "kyoto",
    stayType: "hostel",
    trustLevel: "high",
    tierLevel: "core",
    fitTags: ["urban", "solo"],
    summary:
      "A design-conscious hostel in central Kyoto with generous common space and strong access to key attractions.",
    location: "Sanjo, Kyoto",
    priceNote: "Budget",
    externalUrl: "https://www.piecehostel.com/sanjo",
  },
  {
    id: "f-005",
    name: "WeBase Hakata",
    region: "fukuoka",
    stayType: "hostel",
    trustLevel: "high",
    tierLevel: "core",
    fitTags: ["urban", "solo", "family"],
    summary:
      "A modern hostel near Hakata Station with both dorm and private room options.",
    location: "Hakata, Fukuoka",
    priceNote: "Budget",
    externalUrl: "https://www.we-base.jp/hakata/en/",
  },
  {
    id: "f-006",
    name: "Lamp Light Books Hotel Fukuoka",
    region: "fukuoka",
    stayType: "hotel",
    trustLevel: "low",
    tierLevel: "watchlist",
    fitTags: ["urban", "solo"],
    summary:
      "A book-themed hotel with a curated lobby library and a quiet, concept-driven atmosphere.",
    location: "Central Fukuoka",
    priceNote: "Mid-range",
    externalUrl: null,
  },
  {
    id: "f-007",
    name: "Maruya Hatago Hakone",
    region: "hakone",
    stayType: "ryokan",
    trustLevel: "medium",
    tierLevel: "core",
    fitTags: ["onsen", "cultural", "solo"],
    summary:
      "A renovated ryokan in Hakone-Yumoto connecting traditional onsen hospitality with a more contemporary feel.",
    location: "Hakone-Yumoto, Kanagawa",
    priceNote: "Mid-range",
    externalUrl: "https://www.maruya-hakone.com/en/",
  },
  {
    id: "f-008",
    name: "Alpine Satoyama Retreat",
    region: "nagano",
    stayType: "villa",
    trustLevel: "medium",
    tierLevel: "core",
    fitTags: ["nature", "wellness", "cultural"],
    summary:
      "A mountain retreat in Nagano blending restored farmhouse character with contemporary comfort.",
    location: "Northern Nagano",
    priceNote: "Premium",
    externalUrl: null,
  },
  {
    id: "f-009",
    name: "Hoshinoya Okinawa",
    region: "okinawa",
    stayType: "hotel",
    trustLevel: "high",
    tierLevel: "core",
    fitTags: ["beach", "wellness", "family"],
    summary:
      "A beachfront resort on Okinawa's west coast designed around a long horizon-facing pool.",
    location: "Yomitan, Okinawa",
    priceNote: "Premium",
    externalUrl: "https://hoshinoya.com/okinawa/en/",
  },
  {
    id: "f-010",
    name: "Yanbaru Hostel",
    region: "okinawa",
    stayType: "hostel",
    trustLevel: "low",
    tierLevel: "watchlist",
    fitTags: ["nature", "solo", "beach"],
    summary:
      "A small guesthouse in northern Okinawa with strong access to forest and coastal nature experiences.",
    location: "Northern Okinawa",
    priceNote: "Budget",
    externalUrl: null,
  },
];

export const DUMMY_MOMENTUM: MomentumEntry[] = [
  {
    region: "tokyo",
    stayType: "hotel",
    label: "steady",
    rationale:
      "English-language review volume for Tokyo boutique hotels remains consistent.",
  },
  {
    region: "tokyo",
    stayType: "hostel",
    label: "rising",
    rationale:
      "Kuramae-area hostels are seeing increased English reviews driven by the neighborhood's craft reputation.",
  },
  {
    region: "kyoto",
    stayType: "ryokan",
    label: "steady",
    rationale:
      "Machiya accommodations maintain stable interest with seasonal peaks.",
  },
  {
    region: "kyoto",
    stayType: "hostel",
    label: "steady",
    rationale:
      "Central Kyoto hostels remain in stable demand among budget-conscious travelers.",
  },
  {
    region: "fukuoka",
    stayType: "hostel",
    label: "rising",
    rationale:
      "Food tourism and lower costs are increasing attention to Fukuoka hostels.",
  },
  {
    region: "fukuoka",
    stayType: "hotel",
    label: "rising",
    rationale:
      "Niche concept stays in Fukuoka are appearing more often in English travel coverage.",
  },
  {
    region: "hakone",
    stayType: "ryokan",
    label: "steady",
    rationale:
      "Hakone ryokans hold steady interest as an accessible onsen destination from Tokyo.",
  },
  {
    region: "nagano",
    stayType: "villa",
    label: "rising",
    rationale:
      "Mountain retreats in Nagano are drawing fresh interest in English-language travel media.",
  },
  {
    region: "okinawa",
    stayType: "hotel",
    label: "steady",
    rationale:
      "Okinawa's premium resorts maintain consistent international demand.",
  },
  {
    region: "okinawa",
    stayType: "hostel",
    label: "cooling",
    rationale:
      "Northern Okinawa guesthouses remain under the radar for English-speaking travelers.",
  },
];
