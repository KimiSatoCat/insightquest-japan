"use client";

import { useMemo, useState } from "react";
import type { Region } from "../../lib/types";
import { getFacilities, getMomentumEntries } from "../../lib/facilities";
import { findMomentum } from "../../lib/momentum";
import RegionFilter from "../../components/RegionFilter";
import FacilityCard from "../../components/FacilityCard";

const facilities = getFacilities();
const momentumEntries = getMomentumEntries();

export default function SignalsPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (selectedRegion === "all") return facilities;
    return facilities.filter((facility) => facility.region === selectedRegion);
  }, [selectedRegion]);

  const handleRegionChange = (region: Region | "all") => {
    setSelectedRegion(region);
    setOpenId(null);
  };

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="container dashboard-section">
      <h1 className="dashboard-title">Signals Dashboard</h1>
      <p className="dashboard-subtitle">
        Filter and compare stays across Japan. Click any row to see details.
      </p>

      <RegionFilter
        selectedRegion={selectedRegion}
        onChange={handleRegionChange}
      />

      <p className="dashboard-subtitle" style={{ marginBottom: "0.75rem" }}>
        Showing {filtered.length} of {facilities.length} properties
      </p>

      {filtered.length === 0 ? (
        <p style={{ color: "#8a8580", fontSize: "0.875rem", padding: "2rem 0" }}>
          No properties match this filter.
        </p>
      ) : (
        filtered.map((facility) => {
          const momentumEntry = findMomentum(
            momentumEntries,
            facility.region,
            facility.stayType
          );

          return (
            <FacilityCard
              key={facility.id}
              facility={facility}
              momentumEntry={momentumEntry}
              isOpen={openId === facility.id}
              onToggle={() => handleToggle(facility.id)}
            />
          );
        })
      )}
    </div>
  );
}
