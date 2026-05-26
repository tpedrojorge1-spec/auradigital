import React from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/af02c3015_WhatsAppImage2026-05-26at001502.jpeg";
const INSTAGRAM_URL = "https://www.instagram.com/aureon.digital_ofc/";
const WHATSAPP_URL = "https://wa.me/5599984930092?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20planos%20da%20Aureon%20Digital!";

const contacts = [
  {
    icon: null,
    label: "Instagram",
    value: "@aureon.digital_ofc",
    href: INSTAGRAM_URL,
    isLogo: true,
    hoverClass: "hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]",
    borderClass: "border-purple-700/40",
  },
  {
    icon: null,
    label: "WhatsApp",
    value: "(99) 98493-0092",
    href: WHATSAPP_URL,
    isWhatsapp: true,
    hoverClass: "hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]",
    borderClass: "border-green-700/40",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "aureon.digital@email.com",
    href: "mailto:aureon.digital@email.com",
    hoverClass: "hover:border-purple-400/60",
    borderClass: "border-purple-800/30",
  },
];

export default function ContactSection() {
  return (
    <section id="contato" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-purple-400/70 uppercase block mb-4">Fale conosco</span>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-white mb-4">
            Entre em <span className="text-shimmer">Contato</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6" />
          <p className="font-playfair text-white/50 text-lg italic max-w-xl mx-auto">
            Estamos prontos para transformar sua presença digital. Fale conosco agora mesmo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contacts.map((c, i) => (
            <motion.a
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card-professional flex flex-col items-center gap-4 p-8 rounded-2xl border ${c.borderClass} ${c.hoverClass} transition-all duration-300 group cursor-pointer`}
            >
              {c.isLogo && (
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-600/40 transition-all duration-300 group-hover:brightness-150 group-hover:scale-110">
                  <img src={LOGO_URL} alt="Instagram" className="w-full h-full object-cover" />
                </div>
              )}
              {c.isWhatsapp && (
                <div className="w-14 h-14 rounded-full bg-green-600/20 border-2 border-green-600/40 flex items-center justify-center transition-all duration-300 group-hover:brightness-150 group-hover:scale-110">
                  <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
              )}
              {c.icon && (
                <div className="w-14 h-14 rounded-full bg-purple-900/40 border-2 border-purple-700/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <c.icon className="w-6 h-6 text-purple-400" />
                </div>
              )}
              <div className="text-center">
                <p className="font-cinzel text-white/50 text-xs tracking-widest uppercase mb-1">{c.label}</p>
                <p className="font-inter text-white font-medium text-sm">{c.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#planos"
            className="btn-primary-aura inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-bold text-base tracking-wider shadow-2xl shadow-purple-900/40"
          >
            Começar Meu Projeto
          </a>
          <p className="font-inter text-white/25 text-xs mt-4 tracking-wider">
            Resposta em até 24 horas • Atendimento personalizado
          </p>
        </motion.div>
      </div>
    </section>
  );
}