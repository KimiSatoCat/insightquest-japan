import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="site-header-logo">
          Stay Signals
        </Link>
        <nav className="site-header-nav">
          <Link href="/">Home</Link>
          <Link href="/signals">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
