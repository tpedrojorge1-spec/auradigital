import React from "react";

const LOGO_URL = "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/af02c3015_WhatsAppImage2026-05-26at001502.jpeg";
const WHATSAPP_URL = "https://wa.me/5599984930092?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20planos%20da%20Aureon%20Digital!";
const INSTAGRAM_URL = "https://www.instagram.com/aureon.digital_ofc/";
const EMAIL = "mailto:aureondigitalofc@gmail.com";

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-purple-900/20 bg-black/60 backdrop-blur-sm">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-700/30">
                <img src={LOGO_URL} alt="Aureon Digital" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-cinzel font-bold text-white tracking-widest text-sm">AUREON DIGITAL</span>
                <p className="font-inter text-white/30 text-[10px] tracking-wider">Presença digital profissional</p>
              </div>
            </div>
            <p className="font-inter text-white/40 text-xs leading-relaxed max-w-[220px]">
              Transformamos sua presença no mundo digital com elegância, autoridade e profissionalismo.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="font-cinzel text-white/60 text-xs tracking-widest uppercase mb-1">Links Rápidos</p>
            {[
              { label: "Início", href: "#hero" },
              { label: "Serviços", href: "#servicos" },
              { label: "Planos", href: "#planos" },
              { label: "Avaliações", href: "#avaliacoes" },
              { label: "Contato", href: "#contato" },
              { label: "Meus Pedidos", href: "/meus-pedidos" },
            ].map((l) => (
              <a key={l.label} href={l.href}
                className="font-inter text-white/35 text-xs hover:text-purple-300 transition-colors w-fit">
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="font-cinzel text-white/60 text-xs tracking-widest uppercase mb-1">Contato</p>

            {/* WhatsApp */}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit">
              <div className="w-8 h-8 rounded-full bg-green-600/15 border border-green-700/30 flex items-center justify-center group-hover:bg-green-600/30 transition-colors">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="font-inter text-white/40 text-xs group-hover:text-green-400 transition-colors">(99) 98493-0092</span>
            </a>

            {/* Instagram */}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit">
              <div className="w-8 h-8 rounded-full bg-pink-600/15 border border-pink-700/30 flex items-center justify-center group-hover:bg-pink-600/30 transition-colors overflow-hidden">
                <img src={LOGO_URL} alt="Instagram" className="w-full h-full object-cover" />
              </div>
              <span className="font-inter text-white/40 text-xs group-hover:text-pink-400 transition-colors">@aureon.digital_ofc</span>
            </a>

            {/* Email */}
            <a href={EMAIL}
              className="flex items-center gap-3 group w-fit">
              <div className="w-8 h-8 rounded-full bg-purple-600/15 border border-purple-700/30 flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <span className="font-inter text-white/40 text-xs group-hover:text-purple-300 transition-colors">aureondigitalofc@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-purple-900/15 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-white/20 text-[11px] text-center">
            © {year} Aureon Digital — Todos os direitos reservados
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacidade" className="font-inter text-white/20 text-[11px] hover:text-white/50 transition-colors">
              Política de Privacidade
            </a>
            <span className="text-white/10">·</span>
            <a href="/termos" className="font-inter text-white/20 text-[11px] hover:text-white/50 transition-colors">
              Termos de Uso
            </a>
            <span className="text-white/10">·</span>
            <a href="/admin" className="font-inter text-white/15 text-[10px] hover:text-white/30 transition-colors">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}