import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Send, LogIn } from "lucide-react";
import { base44 } from "@/api/base44Client";

function StarRating({ value, onChange, readOnly = false, size = "w-6 h-6" }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange && onChange(s)}
          onMouseEnter={() => !readOnly && setHover(s)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={`transition-transform ${!readOnly ? "hover:scale-125 cursor-pointer" : "cursor-default"}`}
        >
          <Star
            className={`${size} transition-colors ${
              (hover || value) >= s ? "text-yellow-400 fill-yellow-400" : "text-white/20"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

const MOCK_REVIEWS = [
  { author_name: "Dr. Carlos Mendonça", rating: 5, comment: "Resultado excepcional! O site do escritório ficou extremamente profissional. Clientes já comentaram a credibilidade que transmite.", plan: "Premium", created_date: "2025-05-10" },
  { author_name: "Ana Paula Ferreira", rating: 5, comment: "Atendimento impecável e entrega no prazo. O site ficou moderno e elegante, exatamente o que precisávamos para nossa empresa.", plan: "Profissional", created_date: "2025-04-22" },
  { author_name: "Adv. Roberto Lima", rating: 5, comment: "Investimento que valeu muito. Já recebi vários novos clientes por conta do site. Recomendo sem hesitar!", plan: "Profissional", created_date: "2025-04-05" },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [plan, setPlan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [authMethod, setAuthMethod] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;
    setSubmitting(true);
    try {
      await base44.entities.Review.create({
        author_name: name,
        rating,
        comment,
        plan,
        approved: true,
      });
      setReviews([{ author_name: name, rating, comment, plan, created_date: new Date().toISOString() }, ...reviews]);
      setDone(true);
    } catch (e) {
      console.error(e);
    }
    setSubmitting(false);
  };

  const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  return (
    <section id="avaliacoes" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-xs tracking-[0.4em] text-purple-400/70 uppercase block mb-4">Depoimentos</span>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-white mb-4">
            O que dizem nossos <span className="text-shimmer">Clientes</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6" />
          <div className="flex items-center justify-center gap-3">
            <StarRating value={Math.round(avgRating)} readOnly size="w-5 h-5" />
            <span className="font-cinzel font-bold text-white text-2xl">{avgRating.toFixed(1)}</span>
            <span className="font-inter text-white/40 text-sm">({reviews.length} avaliações)</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-professional p-6 rounded-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-700 to-violet-900 flex items-center justify-center font-cinzel font-bold text-white text-sm">
                  {r.author_name[0]}
                </div>
                <StarRating value={r.rating} readOnly size="w-4 h-4" />
              </div>
              <p className="font-playfair text-white/70 text-sm italic leading-relaxed mb-4">"{r.comment}"</p>
              <div className="border-t border-purple-900/30 pt-4 flex items-center justify-between">
                <span className="font-cinzel text-white text-sm font-semibold">{r.author_name}</span>
                {r.plan && (
                  <span className="font-inter text-[10px] text-purple-400/70 bg-purple-900/20 px-2 py-0.5 rounded-full border border-purple-800/30">
                    {r.plan}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Review */}
        {!showForm && !done && (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary-aura px-8 py-3.5 rounded-full text-white font-semibold text-sm tracking-wider"
            >
              Deixar Minha Avaliação
            </button>
          </div>
        )}

        {showForm && !done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto"
          >
            <div className="card-professional rounded-3xl p-8">
              <h3 className="font-cinzel font-bold text-white text-xl mb-6 text-center tracking-wide">Sua Avaliação</h3>

              {/* Auth options */}
              {!authMethod && (
                <div className="space-y-4 mb-6">
                  <p className="font-inter text-white/50 text-sm text-center">Identifique-se para avaliar:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setAuthMethod("google")}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all text-sm font-inter text-white/70 hover:text-white"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </button>
                    <button
                      onClick={() => setAuthMethod("facebook")}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all text-sm font-inter text-white/70 hover:text-white"
                    >
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-white/10" /></div>
                    <div className="relative flex justify-center">
                      <span className="font-inter text-xs text-white/30 bg-[#0a0514] px-3">ou continue sem login</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAuthMethod("anonymous")}
                    className="w-full py-2.5 rounded-xl border border-purple-800/40 bg-purple-900/20 hover:bg-purple-900/30 text-white/60 hover:text-white text-sm font-inter transition-all"
                  >
                    Continuar como visitante
                  </button>
                </div>
              )}

              {authMethod && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center mb-4">
                    <StarRating value={rating} onChange={setRating} size="w-8 h-8" />
                    <p className="font-inter text-white/40 text-xs mt-2">
                      {rating === 5 ? "Excelente!" : rating === 4 ? "Muito bom!" : rating === 3 ? "Regular" : rating === 2 ? "Ruim" : "Péssimo"}
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 transition-all"
                    />
                  </div>
                  <div>
                    <select
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-800/40 text-white/60 text-sm focus:outline-none focus:border-purple-500/60 transition-all"
                    >
                      <option value="" className="bg-black">Plano utilizado (opcional)</option>
                      {["Essencial", "Profissional", "Premium"].map((p) => (
                        <option key={p} value={p} className="bg-black">{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <textarea
                      placeholder="Conte sua experiência com a Aureon Digital..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 resize-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-bold tracking-wider text-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "Enviando..." : "Publicar Avaliação"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}

        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            <p className="font-cinzel font-bold text-white text-lg">Obrigado pela sua avaliação!</p>
            <p className="font-inter text-white/40 text-sm mt-2">Sua opinião é muito importante para nós.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}