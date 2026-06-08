import { useState, useEffect, useRef } from "react";

const EMERALD = "#0F5A4A";
const GOLD = "#C9A45C";
const GOLD_LIGHT = "#E8C87A";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const fadeUp = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "translateY(0)" : "translateY(36px)",
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
});

const GoldDivider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 auto 20px", width: 120 }}>
    <div style={{ flex: 1, height: 1, background: GOLD }} />
    <div style={{ width: 6, height: 6, background: GOLD, transform: "rotate(45deg)" }} />
    <div style={{ flex: 1, height: 1, background: GOLD }} />
  </div>
);

// ── NAV ──────────────────────────────────────────────────────────────────────
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Services", "Process", "About", "Testimonials", "FAQ", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 2px 24px rgba(15,90,74,0.08)" : "none",
      transition: "all 0.4s ease",
      padding: "0 24px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: 0 }}>
          <div style={{ width: 38, height: 38, background: `linear-gradient(135deg, ${EMERALD}, #1a7a63)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: GOLD, fontWeight: 900, fontSize: 18, fontFamily: "Georgia, serif" }}>F</span>
          </div>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: scrolled ? EMERALD : "#fff", letterSpacing: 0.5 }}>
            Fintrack <span style={{ color: GOLD }}>In</span>
          </span>
        </button>
        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13.5, fontWeight: 600, letterSpacing: 0.8,
              color: scrolled ? "#374151" : "rgba(255,255,255,0.88)",
              textTransform: "uppercase", transition: "color 0.2s", padding: 0,
            }}
              onMouseOver={e => e.currentTarget.style.color = GOLD}
              onMouseOut={e => e.currentTarget.style.color = scrolled ? "#374151" : "rgba(255,255,255,0.88)"}
            >{l}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            color: "#fff", padding: "10px 22px", borderRadius: 6,
            fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer", letterSpacing: 0.5,
            boxShadow: "0 4px 14px rgba(201,164,92,0.35)",
          }}>Free Consult</button>
        </div>
        {/* Mobile burger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }} className="burger">
          <div style={{ width: 24, height: 2, background: scrolled ? EMERALD : "#fff", margin: "5px 0", transition: "0.3s" }} />
          <div style={{ width: 24, height: 2, background: scrolled ? EMERALD : "#fff", margin: "5px 0" }} />
          <div style={{ width: 24, height: 2, background: scrolled ? EMERALD : "#fff", margin: "5px 0" }} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "#fff", padding: "16px 24px 24px", borderTop: `2px solid ${GOLD}` }}>
          {links.map(l => (
            <button key={l} onClick={() => { scrollTo(l.toLowerCase()); setMenuOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "12px 0", color: EMERALD, background: "none", border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 15, borderBottom: "1px solid #f0f0f0",
            }}>{l}</button>
          ))}
        </div>
      )}
      <style>{`.desktop-nav { display: flex !important; } .burger { display: none !important; } @media(max-width:768px){.desktop-nav{display:none!important}.burger{display:block!important}}`}</style>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  return (
    <section id="hero" style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      background: `linear-gradient(150deg, ${EMERALD} 0%, #0a3d30 55%, #062b22 100%)`,
      display: "flex", alignItems: "center",
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 480, height: 480, borderRadius: "50%", border: `1px solid rgba(201,164,92,0.15)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -40, right: -40, width: 320, height: 320, borderRadius: "50%", border: `1px solid rgba(201,164,92,0.1)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 500, height: 500, borderRadius: "50%", border: `1px solid rgba(201,164,92,0.08)`, pointerEvents: "none" }} />
      {/* Gold dots grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, rgba(201,164,92,0.12) 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">
          {/* Left */}
          <div>
            <div style={{ ...fadeUp(loaded, 0), display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,164,92,0.15)", border: `1px solid rgba(201,164,92,0.4)`, padding: "8px 18px", borderRadius: 100, marginBottom: 32 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD }} />
              <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>India's Trusted Share Recovery Desk</span>
            </div>
            <h1 style={{ ...fadeUp(loaded, 0.1), fontFamily: "Georgia, serif", fontSize: "clamp(36px, 5vw, 62px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 24 }}>
              Reclaiming wealth<br />
              <span style={{ color: GOLD }}>locked in old paper.</span>
            </h1>
            <p style={{ ...fadeUp(loaded, 0.2), color: "rgba(255,255,255,0.72)", fontSize: 17, lineHeight: 1.8, marginBottom: 40, maxWidth: 520 }}>
              We specialize in recovering value from physical share certificates, filing IEPF claims, resolving transmission cases, and correcting name mismatches — so your family wealth is never lost again.
            </p>
            <div style={{ ...fadeUp(loaded, 0.3), display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("contact")} style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                color: "#fff", padding: "15px 32px", borderRadius: 8,
                fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer",
                boxShadow: "0 8px 28px rgba(201,164,92,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(201,164,92,0.5)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(201,164,92,0.4)"; }}
              >📋 Book Free Consultation</button>
              <a href="https://wa.me/917990559748" target="_blank" rel="noreferrer" style={{
                background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff", padding: "15px 32px", borderRadius: 8,
                fontWeight: 700, fontSize: 15, textDecoration: "none",
                backdropFilter: "blur(8px)", transition: "all 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              >💬 Chat on WhatsApp</a>
            </div>
          </div>
          {/* Right card */}
          <div style={{ ...fadeUp(loaded, 0.25) }} className="hero-card-wrap">
            <div style={{
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(201,164,92,0.25)", borderRadius: 20, padding: 40,
            }}>
              <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24 }}>Our Impact at a Glance</p>
              {[
                ["₹100+ Crore", "Total Wealth Recovered"],
                ["2,400+", "Families Assisted"],
                ["15 Years", "of Trusted Experience"],
                ["97%", "Success Rate"],
              ].map(([val, label]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: "#fff" }}>{val}</span>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500 }}>{label}</span>
                </div>
              ))}
              <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 18 }}>✓</span>
                </div>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>SEBI compliant · IEPF authorized · PAN verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #fff, transparent)" }} />
      <style>{`@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}.hero-card-wrap{display:none}}`}</style>
    </section>
  );
}

// ── STATS ────────────────────────────────────────────────────────────────────
function Stats() {
  const [ref, inView] = useInView();
  const stats = [
    { value: "₹100+ Cr", label: "Recovered", icon: "💰" },
    { value: "2,400+", label: "Families Assisted", icon: "👨‍👩‍👧‍👦" },
    { value: "15 Yrs", label: "Experience", icon: "🏆" },
    { value: "97%", label: "Success Rate", icon: "✅" },
  ];
  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="stats-grid">
        {stats.map((s, i) => (
          <div key={s.label} style={{
            ...fadeUp(inView, i * 0.1),
            textAlign: "center", padding: "40px 24px",
            background: "#fff", borderRadius: 16,
            boxShadow: "0 4px 32px rgba(15,90,74,0.08)",
            border: `1px solid rgba(15,90,74,0.06)`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${EMERALD}, ${GOLD})` }} />
            <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 700, color: EMERALD, lineHeight: 1 }}>{s.value}</div>
            <div style={{ color: "#6b7280", fontSize: 14, marginTop: 8, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

// ── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  const [ref, inView] = useInView();
  const services = [
    { icon: "📜", title: "Physical Share Recovery", desc: "We convert your old physical share certificates into electronic form with complete end-to-end handling." },
    { icon: "🏛️", title: "IEPF Claim & Transfer", desc: "Expert filing with IEPF Authority to reclaim unclaimed dividends and shares transferred to government." },
    { icon: "🔍", title: "Lost Share Certificates", desc: "Duplicate certificate issuance through proper legal channels — FIR, indemnity bond, and company liaison." },
    { icon: "✏️", title: "Name Mismatch Correction", desc: "Resolving discrepancies between RTA records, PAN, and Demat details for smooth transfer." },
    { icon: "🔄", title: "Transmission of Shares", desc: "Seamless transmission to legal heirs in cases of demise — without probate wherever possible." },
    { icon: "🤝", title: "End-to-End Advisory", desc: "Dedicated relationship manager for every case. No hidden fees. No jargon. Just results." },
  ];
  return (
    <section id="services" ref={ref} style={{ padding: "100px 24px", background: "#f9faf8" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <GoldDivider />
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>What We Do</p>
          <h2 style={{ ...fadeUp(inView), fontFamily: "Georgia, serif", fontSize: "clamp(28px,4vw,46px)", color: EMERALD, fontWeight: 700 }}>Comprehensive Share Recovery Services</h2>
          <p style={{ ...fadeUp(inView, 0.1), color: "#6b7280", fontSize: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.7 }}>
            Every service is handled by specialists with deep experience in Indian capital markets regulations.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }} className="services-grid">
          {services.map((s, i) => (
            <div key={s.title} style={{
              ...fadeUp(inView, i * 0.08),
              background: "#fff", borderRadius: 16, padding: "36px 32px",
              border: "1px solid rgba(15,90,74,0.08)",
              boxShadow: "0 2px 20px rgba(15,90,74,0.05)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "default",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(15,90,74,0.12)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(15,90,74,0.05)"; }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, rgba(15,90,74,0.08), rgba(201,164,92,0.12))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, color: EMERALD, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: "#6b7280", fontSize: 14.5, lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.services-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:600px){.services-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ── PROCESS ──────────────────────────────────────────────────────────────────
function Process() {
  const [ref, inView] = useInView();
  const steps = [
    { num: "01", title: "Free Consultation", desc: "Share your case details. We assess feasibility and explain the exact process — no fee, no obligation." },
    { num: "02", title: "Documentation Audit", desc: "We audit your share certificates, ownership documents, and identity proofs and prepare a checklist." },
    { num: "03", title: "Filing & Follow-up", desc: "We file with RTAs, companies, IEPF, courts (if needed) and follow up relentlessly on your behalf." },
    { num: "04", title: "Credit to Demat", desc: "Shares are credited to your Demat account. Dividends are released. Your wealth is yours again." },
  ];
  return (
    <section id="process" ref={ref} style={{ padding: "100px 24px", background: EMERALD, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, rgba(201,164,92,0.08) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>How It Works</p>
          <h2 style={{ ...fadeUp(inView), fontFamily: "Georgia, serif", fontSize: "clamp(28px,4vw,46px)", color: "#fff", fontWeight: 700 }}>Our 4-Step Recovery Process</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }} className="process-grid">
          {/* Connector line */}
          <div style={{ position: "absolute", top: 52, left: "12.5%", right: "12.5%", height: 2, background: `linear-gradient(90deg, ${GOLD}, rgba(201,164,92,0.3))`, zIndex: 0 }} className="connector" />
          {steps.map((s, i) => (
            <div key={s.num} style={{ ...fadeUp(inView, i * 0.12), textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: i === 0 ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : "rgba(255,255,255,0.08)",
                border: `2px solid ${i === 0 ? GOLD : "rgba(201,164,92,0.3)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px",
                transition: "all 0.3s",
              }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: i === 0 ? "#fff" : GOLD }}>{s.num}</span>
              </div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "#fff", fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.process-grid{grid-template-columns:repeat(2,1fr)!important}.connector{display:none}}`}</style>
    </section>
  );
}

// ── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView();
  const points = [
    "SEBI-compliant processes and IEPF-authorised filing",
    "No recovery, no fee — complete transparency",
    "Dedicated relationship manager for every family",
    "Handled 2,400+ cases across 18 Indian states",
    "Deep expertise with RTAs: Kfintech, CAMS, Link Intime",
    "We handle all government correspondence on your behalf",
  ];
  return (
    <section id="about" ref={ref} style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
        {/* Left visual */}
        <div style={{ ...fadeUp(inView, 0) }}>
          <div style={{ position: "relative" }}>
            <div style={{ background: `linear-gradient(135deg, ${EMERALD}, #1a7a63)`, borderRadius: 20, padding: "48px 40px", color: "#fff" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>🏛️</div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 22, fontStyle: "italic", lineHeight: 1.6, marginBottom: 24 }}>
                "We treat your old paper like it is family wealth."
              </p>
              <div style={{ height: 2, background: GOLD, width: 60, marginBottom: 24 }} />
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.7 }}>
                Founded in 2009, Fintrack In was born from a simple belief — no family should lose their wealth to paperwork. We've helped over 2,400 families recover shares worth ₹100+ crore from neglected certificates and unclaimed IEPF accounts.
              </p>
            </div>
            <div style={{ position: "absolute", bottom: -20, right: -20, width: 120, height: 120, borderRadius: 16, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(201,164,92,0.4)" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: "#fff" }}>15+</span>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 600 }}>Years</span>
            </div>
          </div>
        </div>
        {/* Right content */}
        <div style={{ ...fadeUp(inView, 0.15) }}>
          <GoldDivider />
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>About Us</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(26px,3.5vw,40px)", color: EMERALD, fontWeight: 700, marginBottom: 24, lineHeight: 1.3 }}>
            India's Most Trusted Share Recovery Specialists
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15.5, lineHeight: 1.8, marginBottom: 32 }}>
            We understand that behind every old share certificate is a family story — a grandfather's investment, an inheritance, a forgotten asset. Our mission is to ensure that wealth reaches its rightful owners, not remain lost in bureaucracy.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {points.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: `linear-gradient(135deg, ${EMERALD}, #1a7a63)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>
                </div>
                <span style={{ color: "#374151", fontSize: 14.5, lineHeight: 1.6 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const [ref, inView] = useInView();
  const testimonials = [
    { name: "Rajesh Mehta", location: "Mumbai, Maharashtra", text: "My father had 500 shares of Reliance from 1987. Fintrack In recovered them in just 3 months. I had given up hope. The team was professional, patient, and kept us updated at every step.", stars: 5, role: "Retired Engineer" },
    { name: "Sunita Agarwal", location: "Jaipur, Rajasthan", text: "After my husband passed away, the shares were stuck in transmission limbo for 2 years. Fintrack In resolved everything within weeks. Their empathy and expertise made all the difference.", stars: 5, role: "Homemaker" },
    { name: "Vikram Bose", location: "Kolkata, West Bengal", text: "IEPF claim was something I never understood. Fintrack In handled every filing, follow-up, and government communication. ₹8 lakh credited to my Demat. Absolutely brilliant service!", stars: 5, role: "Business Owner" },
  ];
  return (
    <section id="testimonials" ref={ref} style={{ padding: "100px 24px", background: "#f9faf8" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <GoldDivider />
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Testimonials</p>
          <h2 style={{ ...fadeUp(inView), fontFamily: "Georgia, serif", fontSize: "clamp(28px,4vw,46px)", color: EMERALD, fontWeight: 700 }}>Families We've Helped</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} style={{
              ...fadeUp(inView, i * 0.1),
              background: "#fff", borderRadius: 20, padding: "40px 36px",
              boxShadow: "0 4px 32px rgba(15,90,74,0.08)",
              border: "1px solid rgba(15,90,74,0.06)",
              position: "relative",
            }}>
              <div style={{ position: "absolute", top: 28, right: 32, fontSize: 64, color: "rgba(201,164,92,0.12)", fontFamily: "Georgia, serif", lineHeight: 1 }}>"</div>
              <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                {Array(t.stars).fill(0).map((_, j) => <span key={j} style={{ color: GOLD, fontSize: 16 }}>★</span>)}
              </div>
              <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.8, marginBottom: 28, fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", gap: 14, alignItems: "center", borderTop: `1px solid rgba(15,90,74,0.08)`, paddingTop: 20 }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, ${EMERALD}, #1a7a63)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, color: EMERALD, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: "#9ca3af", fontSize: 12 }}>{t.role} · {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.testimonials-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [ref, inView] = useInView();
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What documents do I need to start the share recovery process?", a: "You'll need the original physical share certificates (or a copy), proof of identity (PAN, Aadhaar), proof of ownership (folio numbers, share certificates), and a Demat account. We'll guide you through every document during our free consultation." },
    { q: "How long does the IEPF claim process take?", a: "IEPF claims typically take 3–6 months depending on the company and volume of pending cases. We expedite the process through regular follow-up and ensure your claim is filed accurately the first time to avoid rejections." },
    { q: "What is your fee structure? Do you charge upfront?", a: "We operate on a success-fee model for most cases — you pay only when your shares are recovered. There are no hidden fees. The fee percentage is discussed transparently during your free consultation before we proceed." },
    { q: "Can you help if the original shareholder has passed away?", a: "Absolutely. Transmission of shares to legal heirs is one of our core services. We handle the entire process — obtaining legal heir certificates, interacting with the company/RTA, and ensuring a smooth transfer to nominees or heirs." },
    { q: "What if my name on the share certificate doesn't match my current documents?", a: "Name mismatches are very common due to marriage, spelling errors, or document changes. We specialize in resolving these through affidavits, gazette notifications, and direct liaison with RTAs and companies — it's a straightforward process for us." },
  ];
  return (
    <section id="faq" ref={ref} style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <GoldDivider />
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>FAQs</p>
          <h2 style={{ ...fadeUp(inView), fontFamily: "Georgia, serif", fontSize: "clamp(28px,4vw,42px)", color: EMERALD, fontWeight: 700 }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{
              ...fadeUp(inView, i * 0.08),
              border: `1px solid ${open === i ? GOLD : "rgba(15,90,74,0.1)"}`,
              borderRadius: 12, overflow: "hidden",
              transition: "border-color 0.3s",
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "24px 28px", background: open === i ? `rgba(15,90,74,0.03)` : "#fff",
                border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.3s",
              }}>
                <span style={{ fontWeight: 700, fontSize: 15.5, color: EMERALD, paddingRight: 20, lineHeight: 1.5 }}>{f.q}</span>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background: open === i ? EMERALD : "rgba(15,90,74,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.3s",
                }}>
                  <span style={{ color: open === i ? "#fff" : EMERALD, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{open === i ? "−" : "+"}</span>
                </div>
              </button>
              {open === i && (
                <div style={{ padding: "0 28px 24px", color: "#6b7280", fontSize: 15, lineHeight: 1.8, borderTop: "1px solid rgba(15,90,74,0.06)" }}>
                  <p style={{ paddingTop: 20, margin: 0 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EMAILJS LOADER ────────────────────────────────────────────────────────────
const loadEmailJS = () => new Promise((resolve, reject) => {
  if (window.emailjs) { resolve(window.emailjs); return; }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  s.onload = () => { window.emailjs.init({ publicKey: "Xdc5JA1zjsdJ9FkNp" }); resolve(window.emailjs); };
  s.onerror = reject;
  document.head.appendChild(s);
});

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", phone: "", email: "", caseType: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.phone) { setError("Please fill in your name and phone number."); return; }
    setError("");
    setSending(true);
    try {
      const ejs = await loadEmailJS();
      await ejs.send(
        "service_zic18s4",      // Service ID
        "template_0f4h10m",     // Template ID
        {
          from_name:  form.name,
          from_phone: form.phone,
          from_email: form.email || "Not provided",
          case_type:  form.caseType || "Not specified",
          message:    form.message || "No message",
          to_email:   "fintrackin@gmail.com",
        }
      );
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send. Please email us directly at fintrackin@gmail.com");
    } finally {
      setSending(false);
    }
  };
  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 10, fontSize: 15,
    border: "1.5px solid rgba(15,90,74,0.15)", outline: "none",
    fontFamily: "inherit", background: "#fff", color: "#111",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };
  return (
    <section id="contact" ref={ref} style={{ padding: "100px 24px", background: "#f9faf8" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }} className="contact-grid">
        {/* Left info */}
        <div style={{ ...fadeUp(inView) }}>
          <GoldDivider />
          <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Get In Touch</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(26px,3.5vw,40px)", color: EMERALD, fontWeight: 700, marginBottom: 20, lineHeight: 1.3 }}>
            Start Your Free Consultation Today
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15.5, lineHeight: 1.8, marginBottom: 40 }}>
            No fee, no obligation. Share your case and we'll tell you exactly what's possible — in plain language.
          </p>
          {[
            { icon: "📧", label: "Email", val: "Fintrackin@gmail.com", href: "mailto:Fintrackin@gmail.com" },
            { icon: "📞", label: "Phone", val: "+91 79905 59748", href: "tel:+917990559748" },
            { icon: "📞", label: "Alternate", val: "+91 97249 09152", href: "tel:+919724909152" },
            { icon: "💬", label: "WhatsApp", val: "Chat with us instantly", href: "https://wa.me/917990559748" },
          ].map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20, textDecoration: "none" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(15,90,74,0.08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, marginBottom: 2 }}>{c.label}</div>
                <div style={{ color: EMERALD, fontWeight: 600, fontSize: 15 }}>{c.val}</div>
              </div>
            </a>
          ))}
          {/* Address */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 4 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(15,90,74,0.08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📍</div>
            <div>
              <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, marginBottom: 2 }}>Address</div>
              <div style={{ color: EMERALD, fontWeight: 600, fontSize: 15, lineHeight: 1.6 }}>
                Flat No. C 704, Radhe Paramount<br />
                Nana Chiloda, Opp. Nyara Petrol Pump<br />
                Ahmedabad – 382330, Gujarat
              </div>
            </div>
          </div>
        </div>
        {/* Right form */}
        <div style={{ ...fadeUp(inView, 0.15), background: "#fff", borderRadius: 20, padding: "48px 40px", boxShadow: "0 8px 48px rgba(15,90,74,0.1)", border: `1px solid rgba(15,90,74,0.08)` }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 28, color: EMERALD, marginBottom: 12 }}>Thank You!</h3>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7 }}>We've received your request. Our team will reach out to you within 24 hours for your free consultation.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: EMERALD, marginBottom: 28, fontWeight: 700 }}>Book Free Consultation</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Full Name *</label>
                  <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={e => e.target.style.borderColor = EMERALD} onBlur={e => e.target.style.borderColor = "rgba(15,90,74,0.15)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Phone *</label>
                  <input style={inputStyle} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={e => e.target.style.borderColor = EMERALD} onBlur={e => e.target.style.borderColor = "rgba(15,90,74,0.15)"} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Email Address</label>
                <input style={inputStyle} placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={e => e.target.style.borderColor = EMERALD} onBlur={e => e.target.style.borderColor = "rgba(15,90,74,0.15)"} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Case Type</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.caseType} onChange={e => setForm({ ...form, caseType: e.target.value })}
                  onFocus={e => e.target.style.borderColor = EMERALD} onBlur={e => e.target.style.borderColor = "rgba(15,90,74,0.15)"}>
                  <option value="">Select your case type</option>
                  <option>Physical Share Recovery</option>
                  <option>IEPF Claim & Transfer</option>
                  <option>Lost Share Certificate</option>
                  <option>Name Mismatch Correction</option>
                  <option>Transmission of Shares</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Brief Message</label>
                <textarea style={{ ...inputStyle, height: 110, resize: "vertical" }} placeholder="Tell us about your shares — company name, approximate quantity, what you know..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={e => e.target.style.borderColor = EMERALD} onBlur={e => e.target.style.borderColor = "rgba(15,90,74,0.15)"} />
              </div>
              {error && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: "#dc2626", fontSize: 13 }}>
                  ⚠️ {error}
                </div>
              )}
              <button onClick={handleSubmit} disabled={sending} style={{
                width: "100%", padding: "16px", borderRadius: 10,
                background: sending ? "#9ca3af" : `linear-gradient(135deg, ${EMERALD}, #1a7a63)`,
                color: "#fff", fontWeight: 700, fontSize: 16, border: "none",
                cursor: sending ? "not-allowed" : "pointer",
                boxShadow: sending ? "none" : "0 8px 28px rgba(15,90,74,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseOver={e => { if (!sending) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(15,90,74,0.4)"; }}}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = sending ? "none" : "0 8px 28px rgba(15,90,74,0.3)"; }}
              >{sending ? "⏳ Sending..." : "Submit — It's Free 🚀"}</button>
              <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: 16 }}>We respond within 24 hours · No spam · Your data is safe</p>
            </>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const links = [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <footer style={{ background: "#0a3d30", color: "rgba(255,255,255,0.7)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 38, height: 38, background: `linear-gradient(135deg, ${EMERALD}, #1a7a63)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: GOLD, fontWeight: 900, fontSize: 18, fontFamily: "Georgia, serif" }}>F</span>
              </div>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>Fintrack <span style={{ color: GOLD }}>In</span></span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 300 }}>India's most trusted share recovery specialists. We've helped 2,400+ families reclaim wealth locked in old paper since 2009.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <a href="https://wa.me/917990559748" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>💬 WhatsApp</a>
              <a href="mailto:Fintrackin@gmail.com" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>📧 Email</a>
            </div>
          </div>
          {/* Navigation */}
          <div>
            <h4 style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Navigation</h4>
            {links.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.label.toLowerCase())} style={{ display: "block", color: "rgba(255,255,255,0.65)", background: "none", border: "none", cursor: "pointer", fontSize: 14, marginBottom: 12, transition: "color 0.2s", padding: 0, textAlign: "left" }}
                onMouseOver={e => e.currentTarget.style.color = GOLD} onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}>{l.label}</button>
            ))}
          </div>
          {/* Contact */}
          <div>
            <h4 style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Contact Us</h4>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: GOLD, fontWeight: 600, marginBottom: 4 }}>EMAIL</div>
              <a href="mailto:Fintrackin@gmail.com" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 14 }}>Fintrackin@gmail.com</a>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: GOLD, fontWeight: 600, marginBottom: 4 }}>PHONE</div>
              <a href="tel:+917990559748" style={{ display: "block", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 14, marginBottom: 4 }}>+91 79905 59748</a>
              <a href="tel:+919724909152" style={{ display: "block", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 14 }}>+91 97249 09152</a>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: GOLD, fontWeight: 600, marginBottom: 8 }}>ADDRESS</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                Flat No. C 704, Radhe Paramount<br />
                Nana Chiloda, Opp. Nyara Petrol Pump<br />
                Ahmedabad – 382330, Gujarat
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: GOLD, fontWeight: 600, marginBottom: 8 }}>SERVICES</div>
              {["Physical Share Recovery", "IEPF Claims", "Transmission", "Name Correction"].map(s => (
                <div key={s} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>· {s}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>© 2026 Fintrack In. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", lineHeight: 1.7, maxWidth: 820 }}>
            Fintrack In is an independent consultancy. We are not affiliated with SEBI, the Ministry of Corporate Affairs, the IEPF Authority, or any Registrar &amp; Transfer Agent. We do not provide investment advice.
          </p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}

// ── FLOATING WHATSAPP ─────────────────────────────────────────────────────────
function FloatingWA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 2000); }, []);
  return visible ? (
    <a href="https://wa.me/917990559748" target="_blank" rel="noreferrer" style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 200,
      width: 58, height: 58, borderRadius: "50%",
      background: "#25D366", color: "#fff", fontSize: 28,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 8px 28px rgba(37,211,102,0.5)",
      textDecoration: "none", transition: "transform 0.3s",
      animation: "pulse 2s infinite",
    }}
      onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
    >
      💬
      <style>{`@keyframes pulse{0%,100%{box-shadow:0 8px 28px rgba(37,211,102,0.5)}50%{box-shadow:0 8px 40px rgba(37,211,102,0.8)}}`}</style>
    </a>
  ) : null;
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWA />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(15,90,74,0.15); color: #0F5A4A; }
      `}</style>
    </div>
  );
}
