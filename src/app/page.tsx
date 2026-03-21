import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ maxWidth: "36rem", margin: "4rem auto", padding: "0 1.5rem" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>
        Stay Signals
      </h1>
      <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
        Weekly trend intelligence on Japan accommodation.
      </p>
      <Link href="/signals">Open dashboard</Link>
    </div>
  );
}