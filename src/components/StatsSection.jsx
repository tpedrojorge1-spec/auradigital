import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Rocket, Users, Star, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

function useCountUp(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 30)));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [target, inView]);
  return count;
}

function StatCard({ icon: Icon, value, suffix = "", label, sublabel, color, delay, inView }) {
  const animated = useCountUp(typeof value === "number" ? value : 0, 1600, inView);
  const display = typeof value === "number" ? animated : value;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="card-professional rounded-3xl p-8 text-center flex flex-col items-center gap-3 group hover:scale-105 transition-transform duration-300"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-900/50 to-black/60 border border-purple-700/30 flex items-center justify-center`}>
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <div>
        <div className={`font-cinzel font-bold text-4xl md:text-5xl ${color}`}>
          {display}{suffix}
        </div>
        <div className="font-cinzel font-semibold text-white text-sm mt-1">{label}</div>
        {sublabel && <div className="font-inter text-white/35 text-xs mt-1">{sublabel}</div>}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const [clientesAtendidos, setClientesAtendidos] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    base44.entities.Stats.filter({ key: "clientes_atendidos" })
      .then((data) => setClientesAtendidos(data?.[0]?.value || 0))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const STATS = [
    {
      icon: Rocket,
      value: clientesAtendidos,
      suffix: "+",
      label: "Projetos Entregues",
      sublabel: "Sites publicados com sucesso",
      color: "text-purple-400",
      delay: 0,
    },
    {
      icon: Users,
      value: clientesAtendidos,
      suffix: "+",
      label: "Clientes Atendidos",
      sublabel: "Negócios transformados digitalmente",
      color: "text-violet-400",
      delay: 0.1,
    },
    {
      icon: Star,
      value: "5.0",
      suffix: "★",
      label: "Satisfação",
      sublabel: "Nota média nas avaliações",
      color: "text-yellow-400",
      delay: 0.2,
    },
  ];

  return (
    <section id="estatisticas" ref={ref} className="relative py-24 px-6">
      {/* Glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-purple-700/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-purple-400/70 uppercase block mb-4">Números que Falam</span>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-white mb-4">
            Nossa <span className="text-shimmer">Autoridade</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {STATS.map((stat, i) => (
            <StatCard key={i} {...stat} inView={inView} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="card-professional rounded-3xl p-8 md:p-10 text-center border border-purple-700/30"
        >
          <h3 className="font-cinzel font-bold text-2xl md:text-3xl text-white mb-3">
            Pronto para transformar seu negócio?
          </h3>
          <p className="font-playfair text-white/50 italic text-base mb-8 max-w-lg mx-auto">
            Junte-se aos nossos clientes que já conquistaram presença digital profissional
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#planos"
              className="btn-primary-aura flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold tracking-wider shadow-2xl shadow-purple-900/40 text-sm">
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#portfolio"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-purple-500/50 transition-all duration-300 font-inter text-sm tracking-wider">
              Ver Projetos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}