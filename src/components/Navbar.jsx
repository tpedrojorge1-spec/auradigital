import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/af02c3015_WhatsAppImage2026-05-26at001502.jpeg";
const INSTAGRAM_URL = "https://www.instagram.com/aureon.digital_ofc/";
const WHATSAPP_NUMBER = "5599984930092";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20planos%20da%20Aureon%20Digital!`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#hero" },
    { label: "Serviços", href: "#servicos" },
    { label: "Planos", href: "#planos" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-purple-900/30 shadow-lg shadow-purple-900/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden transition-all duration-300 group-hover:brightness-150 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:scale-110">
            <img src={LOGO_URL} alt="Aureon Digital" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-cinzel font-bold text-white text-base tracking-widest">AUREON</span>
            <span className="font-cinzel font-light text-purple-400 text-[10px] tracking-[0.3em] block -mt-1">DIGITAL</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-inter text-xs font-medium tracking-widest text-white/60 hover:text-white transition-all duration-300 hover:text-shadow-purple uppercase relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Social Icons + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-700/40 transition-all duration-300 group-hover:brightness-150 group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] group-hover:scale-110">
              <img src={LOGO_URL} alt="Instagram" className="w-full h-full object-cover" />
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-green-700/40 transition-all duration-300 group-hover:brightness-150 group-hover:border-green-400 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.7)] group-hover:scale-110 bg-green-600/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
          </a>

          <a
            href="#planos"
            className="btn-primary-aura px-5 py-2 rounded-full text-white text-xs font-semibold tracking-wider shadow-lg shadow-purple-900/30"
          >
            VER PLANOS
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-purple-900/30 px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block font-cinzel text-xs tracking-widest text-white/70 hover:text-white py-2 uppercase border-b border-purple-900/20"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full overflow-hidden border border-purple-700/40 hover:brightness-150 transition-all">
              <img src={LOGO_URL} alt="Instagram" className="w-full h-full object-cover" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-green-600/20 border border-green-700/40 flex items-center justify-center hover:brightness-150 transition-all">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}