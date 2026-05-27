import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ZoomIn } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Escritório Previdenciário",
    category: "Advocacia",
    before: {
      label: "Antes",
      desc: "Layout genérico sem estrutura profissional. Difícil navegação e baixa conversão.",
      color: "from-red-900/30 to-red-950/50",
      border: "border-red-700/20",
      image: "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/4bcd6c279_50508446-362e-46cc-8dd2-4edd9053fefd.png",
    },
    after: {
      label: "Depois",
      desc: "Site profissional com navegação clara e destaque nas especialidades com imagens.",
      color: "from-purple-900/30 to-violet-950/50",
      border: "border-purple-600/30",
      image: "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/61d782f87_29b3507f-60a1-4149-8756-899781adc21d.png",
    },
    tag: "Premium",
    tagColor: "text-amber-300 bg-amber-900/20 border-amber-700/30",
  },
];

export default function PortfolioSection() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
    {/* Lightbox */}
    <AnimatePresence>
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <motion.img
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
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

        {/* Projects - Before/After Grid */}
        <div className="space-y-12">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Before */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-inter text-xs font-bold px-3 py-1 rounded-full bg-red-900/30 border border-red-700/40 text-red-400 tracking-widest uppercase">❌ Antes</span>
                </div>
                <div
                  className="relative group rounded-2xl overflow-hidden border border-red-700/30 cursor-zoom-in"
                  style={{ height: "380px" }}
                  onClick={() => setLightbox({ src: project.before.image, alt: "Antes" })}
                >
                  <img src={project.before.image} alt="Antes" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-inter text-xs font-bold px-3 py-1 rounded-full bg-purple-900/30 border border-purple-600/40 text-purple-300 tracking-widest uppercase">✅ Depois</span>
                </div>
                <div
                  className="relative group rounded-2xl overflow-hidden border border-purple-600/30 cursor-zoom-in"
                  style={{ height: "380px" }}
                  onClick={() => setLightbox({ src: project.after.image, alt: "Depois" })}
                >
                  <img src={project.after.image} alt="Depois" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
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
    </>
  );
}