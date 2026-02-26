import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════
const T = {
  black: "#0C0C0C",
  white: "#FAF9F6",
  cream: "#F2F0EB",
  gold: "#B8965A",
  goldLight: "rgba(184,150,90,0.12)",
  grey900: "#1A1A1A",
  grey700: "#4A4A4A",
  grey500: "#7A7A7A",
  grey400: "#999",
  grey300: "#B5B5B5",
  grey200: "#D4D4D4",
  grey100: "#E8E8E8",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Outfit', 'Helvetica Neue', sans-serif",
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeSlow: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

const LOGO = "data:image/png;base64,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";

// ═══════════════════════════════════════════
// GRAIN OVERLAY
// ═══════════════════════════════════════════
function Grain() {
  return (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999, opacity: 0.03 }}>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

// ═══════════════════════════════════════════
// PHASE 1: SPLASH
// ═══════════════════════════════════════════
function SplashScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1100),
      setTimeout(() => setStep(3), 2200),
      setTimeout(() => setStep(4), 3600),
      setTimeout(() => onComplete(), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, background: T.black,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transition: `opacity 0.8s ${T.ease}`,
      opacity: step >= 4 ? 0 : 1,
    }}>
      {/* Horizontal accent line */}
      <div style={{
        width: step >= 1 ? 64 : 0, height: 1,
        background: T.gold, marginBottom: 32,
        transition: `width 0.8s ${T.ease}`,
        opacity: step >= 3 ? 0 : 0.7,
      }} />

      {/* Logo */}
      <img src={LOGO} alt="Louis Polo" style={{
        width: 64, height: "auto",
        filter: "brightness(0) invert(1)",
        opacity: step >= 2 ? 1 : 0,
        transform: step >= 2 ? "scale(1)" : "scale(0.9)",
        transition: `all 1s ${T.easeSlow}`,
      }} />

      {/* Expo info */}
      <div style={{
        marginTop: 40,
        opacity: step >= 3 ? 1 : 0,
        transform: step >= 3 ? "translateY(0)" : "translateY(12px)",
        transition: `all 0.8s ${T.ease}`,
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: T.sans, fontSize: 10,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: T.gold, fontWeight: 400, margin: 0,
        }}>
          Gifts World Expo · Mumbai 2026
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// PHASE 2: WELCOME
// ═══════════════════════════════════════════
function WelcomeScreen({ onStart }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);

  return (
    <div style={{
      minHeight: "100vh", background: T.white,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "60px 32px",
    }}>
      <img src={LOGO} alt="Louis Polo" style={{
        width: 56, height: "auto",
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.8s ${T.ease}`,
      }} />

      <div style={{
        width: 32, height: 1, background: T.gold, margin: "28px 0",
        opacity: ready ? 1 : 0, transition: `opacity 0.6s ${T.ease} 0.15s`,
      }} />

      <h1 style={{
        fontFamily: T.serif, fontSize: 34, fontWeight: 300,
        color: T.black, textAlign: "center", lineHeight: 1.2,
        margin: 0, letterSpacing: "-0.01em",
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.8s ${T.ease} 0.1s`,
      }}>
        Welcome to Louis Polo
      </h1>

      <p style={{
        fontFamily: T.sans, fontSize: 15, fontWeight: 300,
        color: T.grey500, textAlign: "center",
        lineHeight: 1.6, maxWidth: 260, margin: "16px 0 0",
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.8s ${T.ease} 0.2s`,
      }}>
        Share a few details and connect with us
      </p>

      <button onClick={onStart} style={{
        marginTop: 48,
        fontFamily: T.sans, fontSize: 14, fontWeight: 500,
        letterSpacing: "0.08em",
        color: T.white, background: T.black,
        border: "none", borderRadius: 100,
        padding: "16px 48px", cursor: "pointer",
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.8s ${T.ease} 0.35s`,
      }}>
        Get Started
      </button>

      <p style={{
        fontFamily: T.sans, fontSize: 11, color: T.grey300,
        marginTop: 20, letterSpacing: "0.04em",
        opacity: ready ? 1 : 0,
        transition: `opacity 0.6s ${T.ease} 0.5s`,
      }}>
        Takes less than 60 seconds
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════
// PHASE 3: FORM
// ═══════════════════════════════════════════
const STEPS = [
  { id: "contact", type: "input", title: "Let\u2019s start with\nyour details", subtitle: "We\u2019ll only use this to stay in touch" },
  { id: "purpose", type: "single", title: "What brings you\nto the expo?", options: ["Buying for Self", "Bulk / Corporate Order", "Distributor / Reseller", "Just Exploring", "Other"] },
  { id: "industry", type: "single", title: "Which space are\nyou in?", options: ["B2B", "B2C", "Both B2B & B2C", "Other"] },
  { id: "interest", type: "multi", title: "What are you\ninterested in?", subtitle: "Select all that apply", options: ["OEM Manufacturing", "ODM Design", "Corporate Gifting", "Dealership", "Partnership / Collaboration", "Other"] },
];

function FormScreen({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", phone: "", email: "", purpose: "", industry: "", interest: [] });
  const [otherText, setOtherText] = useState({ purpose: "", industry: "", interest: "" });
  const [errors, setErrors] = useState({});
  const [animate, setAnimate] = useState(true);
  const otherRef = useRef(null);
  const totalSteps = STEPS.length;

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, [step]);

  const validateContact = () => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[+]?[\d\s\-()]{7,15}$/.test(data.phone.trim())) errs.phone = "Enter a valid phone number";
    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errs.email = "Enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildFinalData = useCallback((d) => {
    const final = { ...d, interest: [...d.interest] };
    if (final.purpose === "Other" && otherText.purpose.trim()) final.purpose = `Other: ${otherText.purpose.trim()}`;
    if (final.industry === "Other" && otherText.industry.trim()) final.industry = `Other: ${otherText.industry.trim()}`;
    if (final.interest.includes("Other") && otherText.interest.trim()) {
      final.interest = final.interest.map(v => v === "Other" ? `Other: ${otherText.interest.trim()}` : v);
    }
    return final;
  }, [otherText]);

  const handleBack = () => { if (step > 0) setStep(step - 1); };

  const handleContactNext = () => {
    if (!validateContact()) return;
    setStep(1);
  };

  const handleSingleSelect = (field, val) => {
    setData(p => ({ ...p, [field]: val }));
    if (val === "Other") {
      setTimeout(() => otherRef.current?.focus(), 150);
      return;
    }
    setTimeout(() => {
      if (step < totalSteps - 1) setStep(step + 1);
      else onSubmit(buildFinalData({ ...data, [field]: val }));
    }, 300);
  };

  const handleMultiToggle = (val) => {
    const newInterest = data.interest.includes(val) ? data.interest.filter(v => v !== val) : [...data.interest, val];
    setData(p => ({ ...p, interest: newInterest }));
    if (val === "Other" && !data.interest.includes("Other")) {
      setTimeout(() => otherRef.current?.focus(), 150);
      return;
    }
    const willHaveOther = val === "Other" ? !data.interest.includes("Other") : newInterest.includes("Other");
    if (newInterest.length > 0 && !willHaveOther) {
      setTimeout(() => onSubmit(buildFinalData({ ...data, interest: newInterest })), 300);
    }
  };

  const currentStep = STEPS[step];
  const isOtherSelected = currentStep?.type === "single" ? data[currentStep.id] === "Other" : currentStep?.type === "multi" ? data.interest.includes("Other") : false;

  return (
    <div style={{ minHeight: "100vh", background: T.white, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "24px 28px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button onClick={handleBack} style={{
            fontFamily: T.sans, fontSize: 13, fontWeight: 400,
            color: step > 0 ? T.grey700 : "transparent",
            background: "none", border: "none", cursor: step > 0 ? "pointer" : "default",
            padding: 0, transition: `color 0.3s ${T.ease}`,
            pointerEvents: step > 0 ? "auto" : "none",
          }}>
            ← Back
          </button>
          <span style={{
            fontFamily: T.sans, fontSize: 10, fontWeight: 500,
            letterSpacing: "0.2em", color: T.grey400, textTransform: "uppercase",
          }}>
            {step + 1} / {totalSteps}
          </span>
        </div>
        <div style={{ height: 1.5, background: T.grey100, borderRadius: 1, overflow: "hidden", marginBottom: 40 }}>
          <div style={{
            height: "100%", width: `${((step + 1) / totalSteps) * 100}%`,
            background: T.black, borderRadius: 1,
            transition: `width 0.6s ${T.ease}`,
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1, padding: "0 28px 40px",
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(12px)",
        transition: `all 0.5s ${T.ease}`,
      }}>
        <h2 style={{
          fontFamily: T.serif, fontSize: 28, fontWeight: 300,
          color: T.black, lineHeight: 1.25, margin: "0 0 6px",
          letterSpacing: "-0.01em", whiteSpace: "pre-line",
        }}>
          {currentStep.title}
        </h2>
        {currentStep.subtitle && (
          <p style={{
            fontFamily: T.sans, fontSize: 13, fontWeight: 300,
            color: T.grey500, margin: "0 0 32px", lineHeight: 1.5,
          }}>
            {currentStep.subtitle}
          </p>
        )}
        {!currentStep.subtitle && <div style={{ height: 26 }} />}

        {/* Contact inputs */}
        {currentStep.type === "input" && (
          <div>
            {[
              { key: "name", label: "Full Name", type: "text" },
              { key: "phone", label: "Phone Number", type: "tel" },
              { key: "email", label: "Email", type: "email" },
            ].map((field, i) => (
              <div key={field.key} style={{ marginBottom: 28 }}>
                <label style={{
                  fontFamily: T.sans, fontSize: 10, fontWeight: 500,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: T.grey400, display: "block", marginBottom: 8,
                }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={data[field.key]}
                  onChange={e => {
                    setData(p => ({ ...p, [field.key]: e.target.value }));
                    if (errors[field.key]) setErrors(p => ({ ...p, [field.key]: undefined }));
                  }}
                  onKeyDown={e => { if (e.key === "Enter") handleContactNext(); }}
                  autoFocus={i === 0}
                  style={{
                    width: "100%", fontFamily: T.sans,
                    fontSize: 17, fontWeight: 400, color: T.black,
                    background: "transparent", border: "none",
                    borderBottom: `1px solid ${errors[field.key] ? "#D44" : T.grey200}`,
                    padding: "10px 0", outline: "none",
                    transition: `border-color 0.3s ${T.ease}`,
                  }}
                  onFocus={e => e.target.style.borderBottomColor = errors[field.key] ? "#D44" : T.black}
                  onBlur={e => e.target.style.borderBottomColor = errors[field.key] ? "#D44" : T.grey200}
                />
                {errors[field.key] && (
                  <p style={{
                    fontFamily: T.sans, fontSize: 12, fontWeight: 400,
                    color: "#D44", margin: "6px 0 0",
                  }}>
                    {errors[field.key]}
                  </p>
                )}
              </div>
            ))}
            <button onClick={handleContactNext}
              disabled={!data.name.trim() || !data.phone.trim() || !data.email.trim()}
              style={{
                marginTop: 16, width: "100%",
                fontFamily: T.sans, fontSize: 14, fontWeight: 500,
                letterSpacing: "0.06em",
                color: data.name.trim() && data.phone.trim() && data.email.trim() ? T.white : T.grey400,
                background: data.name.trim() && data.phone.trim() && data.email.trim() ? T.black : T.grey100,
                border: "none", borderRadius: 100,
                padding: "16px 0",
                cursor: data.name.trim() && data.phone.trim() && data.email.trim() ? "pointer" : "not-allowed",
                transition: `all 0.4s ${T.ease}`,
              }}>
              Continue
            </button>
          </div>
        )}

        {/* Single select */}
        {currentStep.type === "single" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentStep.options.map(opt => {
                const sel = data[currentStep.id] === opt;
                return (
                  <button key={opt} onClick={() => handleSingleSelect(currentStep.id, opt)} style={{
                    fontFamily: T.sans, fontSize: 15, fontWeight: sel ? 500 : 400,
                    color: sel ? T.white : T.black,
                    background: sel ? T.black : "transparent",
                    border: `1px solid ${sel ? T.black : T.grey200}`,
                    borderRadius: 12, padding: "15px 20px",
                    textAlign: "left", cursor: "pointer",
                    transition: `all 0.3s ${T.ease}`,
                  }}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {isOtherSelected && (
              <div style={{ marginTop: 16 }}>
                <input ref={otherRef} type="text"
                  value={otherText[currentStep.id] || ""}
                  onChange={e => setOtherText(p => ({ ...p, [currentStep.id]: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === "Enter" && otherText[currentStep.id]?.trim()) {
                      if (step < totalSteps - 1) setStep(step + 1);
                      else onSubmit(buildFinalData(data));
                    }
                  }}
                  placeholder="Please specify..."
                  style={{
                    width: "100%", fontFamily: T.sans,
                    fontSize: 15, fontWeight: 400, color: T.black,
                    background: "transparent", border: "none",
                    borderBottom: `1px solid ${T.grey200}`,
                    padding: "12px 0", outline: "none",
                    transition: `border-color 0.3s ${T.ease}`,
                  }}
                  onFocus={e => e.target.style.borderBottomColor = T.black}
                  onBlur={e => e.target.style.borderBottomColor = T.grey200}
                />
                <button onClick={() => {
                    if (!otherText[currentStep.id]?.trim()) return;
                    if (step < totalSteps - 1) setStep(step + 1);
                    else onSubmit(buildFinalData(data));
                  }} style={{
                    marginTop: 20, width: "100%",
                    fontFamily: T.sans, fontSize: 14, fontWeight: 500,
                    color: T.white, background: T.black,
                    border: "none", borderRadius: 100,
                    padding: "15px 0", cursor: "pointer",
                    opacity: otherText[currentStep.id]?.trim() ? 1 : 0.3,
                    transition: `opacity 0.3s ${T.ease}`,
                  }}>
                  Continue
                </button>
              </div>
            )}
          </div>
        )}

        {/* Multi select */}
        {currentStep.type === "multi" && (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {currentStep.options.map(opt => {
                const sel = data.interest.includes(opt);
                return (
                  <button key={opt} onClick={() => handleMultiToggle(opt)} style={{
                    fontFamily: T.sans, fontSize: 14, fontWeight: sel ? 500 : 400,
                    color: sel ? T.white : T.black,
                    background: sel ? T.black : "transparent",
                    border: `1px solid ${sel ? T.black : T.grey200}`,
                    borderRadius: 100, padding: "12px 22px",
                    cursor: "pointer",
                    transition: `all 0.25s ${T.ease}`,
                  }}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {isOtherSelected && (
              <div style={{ marginTop: 16 }}>
                <input ref={otherRef} type="text"
                  value={otherText.interest || ""}
                  onChange={e => setOtherText(p => ({ ...p, interest: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === "Enter" && data.interest.length > 0) onSubmit(buildFinalData(data));
                  }}
                  placeholder="Please specify, then press Enter \u21B5"
                  style={{
                    width: "100%", fontFamily: T.sans,
                    fontSize: 15, fontWeight: 400, color: T.black,
                    background: "transparent", border: "none",
                    borderBottom: `1px solid ${T.grey200}`,
                    padding: "12px 0", outline: "none",
                    transition: `border-color 0.3s ${T.ease}`,
                  }}
                  onFocus={e => e.target.style.borderBottomColor = T.black}
                  onBlur={e => e.target.style.borderBottomColor = T.grey200}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// PHASE 4: THANK YOU
// ═══════════════════════════════════════════
function ThankYouScreen({ userName }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);

  const socials = [
    { name: "Instagram", handle: "@louispololuggage", url: "https://www.instagram.com/louispololuggage/", color: "#E1306C", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs><linearGradient id="ig" x1="0" y1="24" x2="24" y2="0"><stop offset="0%" stopColor="#feda75"/><stop offset="25%" stopColor="#fa7e1e"/><stop offset="50%" stopColor="#d62976"/><stop offset="75%" stopColor="#962fbf"/><stop offset="100%" stopColor="#4f5bd5"/></linearGradient></defs>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig)" strokeWidth="1.8" fill="none"/><circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="1.8" fill="none"/><circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig)"/>
      </svg>
    )},
    { name: "LinkedIn", handle: "Louis Polo", url: "https://www.linkedin.com/company/louis-polo/", color: "#0A66C2", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM6.839 20.452H3.34V9h3.5v11.452z"/>
      </svg>
    )},
    { name: "Website", handle: "louispolo.in", url: "https://louispolo.in", color: T.black, icon: (
      <img src={LOGO} alt="LP" style={{ width: 18, height: "auto" }} />
    )},
  ];

  return (
    <div style={{
      minHeight: "100vh", background: T.white,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "48px 28px", textAlign: "center",
    }}>
      <img src={LOGO} alt="Louis Polo" style={{
        width: 48, height: "auto",
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.7s ${T.ease}`,
      }} />

      <div style={{
        width: 28, height: 1, background: T.gold, margin: "24px 0",
        opacity: ready ? 1 : 0,
        transition: `opacity 0.5s ${T.ease} 0.1s`,
      }} />

      <h2 style={{
        fontFamily: T.serif, fontSize: 28, fontWeight: 300,
        color: T.black, margin: 0, lineHeight: 1.3,
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.7s ${T.ease} 0.1s`,
      }}>
        Thank you{userName ? `, ${userName.split(" ")[0]}` : ""}
      </h2>

      <p style={{
        fontFamily: T.sans, fontSize: 14, fontWeight: 300,
        color: T.grey500, margin: "12px 0 0", lineHeight: 1.6, maxWidth: 240,
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(12px)",
        transition: `all 0.7s ${T.ease} 0.2s`,
      }}>
        {"We\u2019re glad you stopped by.\nWe\u2019ll be in touch soon."}
      </p>

      {/* Download Catalogue Button */}
      <a href="/catalogue.pdf" download="Louis-Polo-Catalogue.pdf" style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        marginTop: 40, width: "100%", maxWidth: 320,
        fontFamily: T.sans, fontSize: 14, fontWeight: 500,
        letterSpacing: "0.06em",
        color: T.white, background: T.black,
        border: "none", borderRadius: 100,
        padding: "16px 32px", cursor: "pointer",
        textDecoration: "none",
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.7s ${T.ease} 0.3s`,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download Our Catalogue
      </a>

      <div style={{
        marginTop: 36, width: "100%", maxWidth: 320,
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.7s ${T.ease} 0.4s`,
      }}>
        <p style={{
          fontFamily: T.sans, fontSize: 10, fontWeight: 500,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: T.grey400, marginBottom: 16,
        }}>
          Visit us at
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {socials.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px", background: "transparent",
              border: `1px solid ${T.grey100}`, borderRadius: 12,
              textDecoration: "none", transition: `all 0.3s ${T.ease}`,
            }}>
              <span style={{
                color: T.gold,
                width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: T.cream,
                borderRadius: 10,
                flexShrink: 0,
              }}>
                {s.icon}
              </span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.black }}>{s.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 300, color: T.grey500, marginTop: 1 }}>{s.handle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── GOOGLE SHEETS INTEGRATION ───
const GOOGLE_SHEETS_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

function submitToGoogleSheets(data) {
  if (GOOGLE_SHEETS_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
    console.warn("Google Sheets URL not configured. Form data:", data);
    return;
  }
  fetch(GOOGLE_SHEETS_URL, {
    method: "POST", mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      name: data.name || "", phone: data.phone || "", email: data.email || "",
      purpose: data.purpose || "", industry: data.industry || "",
      interest: Array.isArray(data.interest) ? data.interest.join(", ") : (data.interest || ""),
    }),
  }).catch(err => console.error("Sheet submit error:", err));
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function LouisPoloExpo() {
  const [phase, setPhase] = useState("splash");
  const [formData, setFormData] = useState({});

  return (
    <div style={{ minHeight: "100vh", background: T.white }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        body { margin: 0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        input::placeholder { color: ${T.grey300}; }
        input:focus { outline: none; }
        a:hover { border-color: ${T.grey300} !important; }
        button:active { transform: scale(0.98); }
      `}</style>
      <Grain />
      {phase === "splash" && <SplashScreen onComplete={() => setPhase("welcome")} />}
      {phase === "welcome" && <WelcomeScreen onStart={() => setPhase("form")} />}
      {phase === "form" && (
        <FormScreen onSubmit={(data) => { submitToGoogleSheets(data); setFormData(data); setPhase("thanks"); }} />
      )}
      {phase === "thanks" && <ThankYouScreen userName={formData.name} />}
    </div>
  );
}
