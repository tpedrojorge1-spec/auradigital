import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Star, Crown } from "lucide-react";

const plans = [
  {
    id: "Essencial",
    icon: Zap,
    name: "Essencial",
    tagline: "Presença online profissional",
    price: 900,
    oldPrice: null,
    period: "pagamento único",
    color: "from-purple-900/40 to-violet-900/20",
    borderColor: "border-purple-700/40",
    hoverBorder: "hover:border-purple-500/70",
    iconColor: "text-purple-400",
    badge: null,
    features: [
      "Site profissional completo",
      "Domínio incluso por 1 ano",
      "Design responsivo (mobile/desktop)",
      "Remoção de aparência amadora",
      "Configuração básica",
    ],
  },
  {
    id: "Profissional",
    icon: Star,
    name: "Profissional",
    tagline: "Autoridade digital total",
    price: 1300,
    oldPrice: 1500,
    period: "pagamento único",
    color: "from-violet-800/50 to-purple-900/30",
    borderColor: "border-violet-500/60",
    hoverBorder: "hover:border-violet-400",
    iconColor: "text-violet-300",
    badge: "MAIS POPULAR",
    features: [
      "Tudo do plano Essencial",
      "Domínio incluso por 2 anos",
      "Suporte técnico dedicado",
      "Configuração completa avançada",
      "SEO básico para Google",
      "Remoção de aparência amadora",
      "Ajustes por 30 dias",
    ],
  },
  {
    id: "Premium",
    icon: Crown,
    name: "Premium",
    tagline: "Presença inabalável",
    price: 1800,
    oldPrice: 2000,
    period: "pagamento único",
    color: "from-indigo-900/40 to-purple-900/30",
    borderColor: "border-indigo-500/40",
    hoverBorder: "hover:border-indigo-400/70",
    iconColor: "text-indigo-300",
    badge: "COMPLETO",
    features: [
      "Tudo do plano Profissional",
      "Domínio incluso por 5 anos",
      "Manutenção contínua",
      "Melhorias e atualizações",
      "Acompanhamento estratégico",
      "SEO avançado",
      "Suporte de 4 meses",
    ],
  },
];

export default function PlansSection({ onSelectPlan }) {
  return (
    <section id="planos" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-purple-400/70 uppercase block mb-4">Investimento</span>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-white mb-4">
            Nossos <span className="text-shimmer">Planos</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6" />
          <p className="font-playfair text-white/50 text-lg italic max-w-2xl mx-auto">
            Escolha o plano ideal para o momento da sua empresa e comece a transformar sua presença digital
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative flex flex-col rounded-3xl border ${plan.borderColor} ${plan.hoverBorder} bg-gradient-to-b ${plan.color} backdrop-blur-xl p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/30 group`}
              onClick={() => onSelectPlan(plan)}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="font-cinzel text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-900/50">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl border border-purple-700/40 bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <plan.icon className={`w-5 h-5 ${plan.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-white text-lg tracking-wide">{plan.name}</h3>
                  <p className="font-inter text-white/40 text-xs">{plan.tagline}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                {plan.oldPrice && (
                  <span className="font-inter text-sm text-white/30 line-through block mb-1">
                    R$ {plan.oldPrice.toLocaleString("pt-BR")}
                  </span>
                )}
                <div className="flex items-end gap-2">
                  <span className="font-cinzel font-bold text-4xl text-white">
                    R$ {plan.price.toLocaleString("pt-BR")}
                  </span>
                </div>
                <span className="font-inter text-xs text-white/30 tracking-wider uppercase">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="font-inter text-sm text-white/65 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-semibold text-sm tracking-wider"
                onClick={(e) => { e.stopPropagation(); onSelectPlan(plan); }}
              >
                Contratar Agora
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}