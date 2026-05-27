import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Code2, Eye, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Planejamento",
    desc: "Entendemos seu negócio, seu público-alvo e seus objetivos. Definimos a identidade visual, paleta de cores e estrutura ideal para o seu site.",
    color: "text-purple-400",
    glow: "shadow-purple-500/20",
    border: "border-purple-600/30",
  },
  {
    icon: Code2,
    number: "02",
    title: "Desenvolvimento",
    desc: "Desenvolvemos seu site com tecnologia moderna, design responsivo e otimizado para todos os dispositivos — do celular ao desktop.",
    color: "text-violet-400",
    glow: "shadow-violet-500/20",
    border: "border-violet-600/30",
  },
  {
    icon: Eye,
    number: "03",
    title: "Revisão",
    desc: "Você avalia o resultado e solicita ajustes. Trabalhamos juntos até que o site fique exatamente como você imaginou.",
    color: "text-fuchsia-400",
    glow: "shadow-fuchsia-500/20",
    border: "border-fuchsia-600/30",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Entrega",
    desc: "Publicamos o site no ar, realizamos testes finais e entregamos tudo documentado. Seu negócio online começa agora.",
    color: "text-pink-400",
    glow: "shadow-pink-500/20",
    border: "border-pink-600/30",
  },
];

export default function ProcessSection() {
  return (
    <section id="processo" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-purple-400/70 uppercase block mb-4">Como Trabalhamos</span>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-white mb-4">
            Nosso <span className="text-shimmer">Processo</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6" />
          <p className="font-playfair text-white/50 text-lg italic max-w-xl mx-auto">
            Do briefing à entrega, cada etapa é pensada para garantir o melhor resultado
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-purple-700/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-900/40 to-black/60 border ${step.border} flex items-center justify-center mb-5 shadow-xl ${step.glow} group hover:scale-105 transition-transform duration-300`}>
                  <step.icon className={`w-9 h-9 ${step.color}`} />
                  <span className={`absolute -top-2 -right-2 font-cinzel font-bold text-[10px] ${step.color} bg-black border ${step.border} rounded-full w-6 h-6 flex items-center justify-center`}>
                    {step.number}
                  </span>
                </div>

                <h3 className={`font-cinzel font-bold text-lg ${step.color} mb-2`}>{step.title}</h3>
                <p className="font-inter text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="font-playfair text-white/40 italic text-sm mb-6">
            Prazo médio de entrega: <span className="text-purple-300 font-semibold not-italic">5 a 10 dias úteis</span>
          </p>
          <a href="#planos"
            className="btn-primary-aura inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold tracking-wider shadow-2xl shadow-purple-900/40 text-sm">
            Começar Agora
          </a>
        </motion.div>
      </div>
    </section>
  );
}