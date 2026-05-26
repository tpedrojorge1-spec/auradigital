import React from "react";
import { motion } from "framer-motion";
import { Globe, Gavel, Search, Smartphone, Settings, Headphones } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sites Empresariais",
    desc: "Desenvolvemos sites institucionais modernos e profissionais que transmitem credibilidade e autoridade para sua empresa.",
    color: "from-purple-500/20 to-violet-600/10",
  },
  {
    icon: Gavel,
    title: "Escritórios Jurídicos",
    desc: "Especialistas em sites para advogados e escritórios de advocacia, com linguagem formal e design que inspira confiança.",
    color: "from-indigo-500/20 to-purple-600/10",
  },
  {
    icon: Search,
    title: "SEO & Visibilidade",
    desc: "Otimizamos seu site para aparecer nas primeiras posições do Google, atraindo clientes qualificados organicamente.",
    color: "from-violet-500/20 to-purple-700/10",
  },
  {
    icon: Smartphone,
    title: "Design Responsivo",
    desc: "Sites 100% adaptados para celular, tablet e desktop, garantindo a melhor experiência em qualquer dispositivo.",
    color: "from-purple-600/20 to-indigo-500/10",
  },
  {
    icon: Settings,
    title: "Configuração Completa",
    desc: "Configuramos email profissional, domínio, hospedagem e todas as integrações necessárias para você.",
    color: "from-violet-600/20 to-purple-500/10",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    desc: "Acompanhamento e suporte técnico para ajustes, atualizações e melhorias contínuas no seu site.",
    color: "from-indigo-600/20 to-violet-500/10",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-purple-400/70 uppercase block mb-4">O que fazemos</span>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-white mb-4">
            Nossos <span className="text-shimmer">Serviços</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6" />
          <p className="font-playfair text-white/50 text-lg italic max-w-2xl mx-auto">
            Soluções digitais completas para posicionar sua marca com excelência no mercado
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-professional p-6 rounded-2xl group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} border border-purple-700/30 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:border-purple-500/60`}>
                <svc.icon className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="font-cinzel font-semibold text-white text-base mb-3 tracking-wide">{svc.title}</h3>
              <p className="font-inter text-white/50 text-sm leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}