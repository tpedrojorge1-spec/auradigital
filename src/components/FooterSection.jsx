import React from "react";

const LOGO_URL = "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/af02c3015_WhatsAppImage2026-05-26at001502.jpeg";

export default function FooterSection() {
  return (
    <footer className="relative border-t border-purple-900/30 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src={LOGO_URL} alt="Aureon Digital" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-cinzel font-bold text-white tracking-widest text-sm">AUREON DIGITAL</span>
            <p className="font-inter text-white/30 text-[10px] tracking-wider">Presença digital profissional</p>
          </div>
        </div>

        <p className="font-inter text-white/25 text-xs text-center">
          © {new Date().getFullYear()} Aureon Digital — Todos os direitos reservados
        </p>

        <a
          href="/admin"
          className="font-inter text-white/20 text-[10px] tracking-widest hover:text-white/40 transition-colors uppercase"
        >
          Área Admin
        </a>
      </div>
    </footer>
  );
}