import React, { useEffect, useState } from "react";
import { ArrowRight, Shield, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const LOGO_URL = "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/af02c3015_WhatsAppImage2026-05-26at001502.jpeg";

export default function HeroSection() {
  const [clientesAtendidos, setClientesAtendidos] = useState(0);

  useEffect(() => {
    base44.entities.Stats.filter({ key: "clientes_atendidos" })
      .then((data) => {
        const val = data?.[0]?.value || 0;
        let n = 0;
        const step = Math.max(1, Math.floor(val / 30));
        const interval = setInterval(() => {
          n = Math.min(n + step, val);
          setClientesAtendidos(n);
          if (n >= val) clearInterval(interval);
        }, 50);
      })
      .catch(() => setClientesAtendidos(0));
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Decorative ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-purple-800/15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-purple-900/10 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-600/30 bg-purple-900/20 backdrop-blur-sm mb-8"
        >
          <Shield className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-inter text-xs text-purple-300 tracking-widest font-medium uppercase">Presença Digital Profissional</span>
        </motion.div>

        {/* Logo com efeito */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-8 float-anim"
        >
          <div className="relative group w-28 h-28 md:w-36 md:h-36">
            <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-2xl scale-125 transition-all duration-500 group-hover:bg-purple-500/40 group-hover:blur-3xl" />
            <img
              src={LOGO_URL}
              alt="Aureon Digital"
              className="relative w-full h-full object-contain rounded-full transition-all duration-500 group-hover:brightness-150 group-hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.9)]"
              style={{ background: "transparent", mixBlendMode: "normal" }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-cinzel font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight"
        >
          <span className="text-white">Aureon</span>{" "}
          <span className="text-shimmer">Digital</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-playfair text-xl md:text-2xl text-white/60 mb-4 max-w-3xl mx-auto leading-relaxed italic"
        >
          "Transformamos sua presença no mundo digital com{" "}
          <span className="text-purple-300 not-italic font-semibold">elegância</span>,{" "}
          <span className="text-purple-300 not-italic font-semibold">autoridade</span> e{" "}
          <span className="text-purple-300 not-italic font-semibold">profissionalismo</span>."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="font-inter text-sm text-white/40 mb-10 tracking-wider uppercase"
        >
          Sites profissionais para empresas e escritórios jurídicos
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#planos"
            className="btn-primary-aura flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold tracking-wider shadow-2xl shadow-purple-900/40 text-sm"
          >
            Quero Meu Site Agora
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#servicos"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-300 font-inter text-sm tracking-wider"
          >
            Conhecer Serviços
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { icon: Users, value: `${clientesAtendidos}+`, label: "Clientes Atendidos", color: "text-purple-400" },
            { icon: Star, value: "5.0", label: "Avaliação Média", color: "text-yellow-400" },
            { icon: Shield, value: "100%", label: "Satisfação Garantida", color: "text-green-400" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <s.icon className={`w-5 h-5 ${s.color} flex-shrink-0`} />
              <div>
                <div className={`font-cinzel font-bold text-2xl ${s.color}`}>{s.value}</div>
                <div className="font-inter text-xs text-white/40 tracking-wider uppercase">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-pulse" />
        <span className="font-inter text-[10px] text-white/30 tracking-widest uppercase">Explorar</span>
      </motion.div>
    </section>
  );
}