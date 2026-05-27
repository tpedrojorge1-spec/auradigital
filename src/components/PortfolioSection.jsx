import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Escritório Jefferson Uchoa - Advocacia",
    category: "Advocacia",
    before: {
      label: "Antes",
      desc: "Site em Canva genérico. Sem profissionalismo, lento e sem otimização.",
      color: "from-red-900/30 to-red-950/50",
      border: "border-red-700/20",
      items: ["❌ Canva genérico", "❌ Sem SEO", "❌ Falta de credibilidade"],
    },
    after: {
      label: "Depois",
      desc: "Site profissional personalizável com identidade visual forte e CTA otimizados.",
      color: "from-purple-900/30 to-violet-950/50",
      border: "border-purple-600/30",
      items: ["✅ Design profissional Premium", "✅ Navbar intuitiva", "✅ Foto e especialidades destaque"],
    },
    tag: "Premium",
    tagColor: "text-amber-300 bg-amber-900/20 border-amber-700/30",
  },
  {
    id: 2,
    title: "Clínica Estética Ana Costa",
    category: "Saúde & Beleza",
    before: {
      label: "Antes",
      desc: "Página do Instagram desorganizada como único canal de captação.",
      color: "from-red-900/30 to-red-950/50",
      border: "border-red-700/20",
      items: ["❌ Só Instagram", "❌ Sem agendamento online", "❌ Passava falta de confiança"],
    },
    after: {
      label: "Depois",
      desc: "Site elegante com formulário de agendamento e portfólio de procedimentos.",
      color: "from-purple-900/30 to-violet-950/50",
      border: "border-purple-600/30",
      items: ["✅ Site com portfólio", "✅ Formulário de contato", "✅ Aumento de 40% nas consultas"],
    },
    tag: "Profissional",
    tagColor: "text-violet-300 bg-violet-900/20 border-violet-700/30",
  },
  {
    id: 3,
    title: "Consultoria Lima & Associados",
    category: "Consultoria",
    before: {
      label: "Antes",
      desc: "Site antigo, lento e sem identidade visual. Transmitia desprofissionalismo.",
      color: "from-red-900/30 to-red-950/50",
      border: "border-red-700/20",
      items: ["❌ Site de 2015 desatualizado", "❌ Não abria no celular", "❌ Clientes desconfiavam"],
    },
    after: {
      label: "Depois",
      desc: "Redesign completo com identidade visual forte e carregamento ultrarrápido.",
      color: "from-purple-900/30 to-violet-950/50",
      border: "border-purple-600/30",
      items: ["✅ Design moderno e responsivo", "✅ Carregamento em <2s", "✅ Fechou 2 contratos novos"],
    },
    tag: "Premium",
    tagColor: "text-amber-300 bg-amber-900/20 border-amber-700/30",
  },
];

export default function PortfolioSection() {
  const [active, setActive] = useState(null);

  return (
    <section id="portfolio" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-purple-400/70 uppercase block mb-4">Resultados Reais</span>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-white mb-4">
            Nosso <span className="text-shimmer">Portfólio</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6" />
          <p className="font-playfair text-white/50 text-lg italic max-w-xl mx-auto">
            Veja a transformação real que entregamos para nossos clientes
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Project header */}
              <div
                className="card-professional rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setActive(active === project.id ? null : project.id)}
              >
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-700/30 flex items-center justify-center font-cinzel font-bold text-purple-300 text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-cinzel font-semibold text-white text-sm">{project.title}</p>
                        <span className={`font-inter text-[10px] font-bold px-2 py-0.5 rounded-md border ${project.tagColor}`}>
                          {project.tag}
                        </span>
                      </div>
                      <p className="font-inter text-white/40 text-xs mt-0.5">{project.category}</p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${active === project.id ? "rotate-90" : ""}`} />
                </div>

                {/* Before / After */}
                {active === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-purple-800/20"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {/* Before */}
                      <div className={`bg-gradient-to-br ${project.before.color} p-6 border-r border-purple-800/20`}>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${project.before.border} mb-3`}>
                          <span className="font-inter text-xs font-bold text-red-400">ANTES</span>
                        </div>
                        <p className="font-inter text-white/50 text-xs mb-4">{project.before.desc}</p>
                        <ul className="space-y-2">
                          {project.before.items.map((item, j) => (
                            <li key={j} className="font-inter text-white/60 text-xs">{item}</li>
                          ))}
                        </ul>
                      </div>
                      {/* After */}
                      <div className={`bg-gradient-to-br ${project.after.color} p-6`}>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${project.after.border} mb-3`}>
                          <span className="font-inter text-xs font-bold text-purple-300">DEPOIS</span>
                        </div>
                        <p className="font-inter text-white/50 text-xs mb-4">{project.after.desc}</p>
                        <ul className="space-y-2">
                          {project.after.items.map((item, j) => (
                            <li key={j} className="font-inter text-white/70 text-xs">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <a href="#planos"
            className="btn-primary-aura flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold tracking-wider shadow-2xl shadow-purple-900/40 text-sm">
            Solicitar Orçamento
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#servicos"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-purple-500/50 transition-all duration-300 font-inter text-sm tracking-wider">
            Ver Serviços
          </a>
        </motion.div>
      </div>
    </section>
  );
}