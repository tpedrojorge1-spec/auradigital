import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, ChevronDown } from "lucide-react";
import { base44 } from "@/api/base44Client";

const INITIAL_VISIBLE = 6;

const MOCK_REVIEWS = [
  { id: "m1", author_name: "Dr. Carlos Mendonça", rating: 5, comment: "Resultado excepcional! O site do escritório ficou extremamente profissional. Clientes já comentaram a credibilidade que transmite.", plan: "Premium", approved: true, created_date: "2025-05-10" },
  { id: "m2", author_name: "Ana Paula Ferreira", rating: 5, comment: "Atendimento impecável e entrega no prazo. O site ficou moderno e elegante, exatamente o que precisávamos.", plan: "Profissional", approved: true, created_date: "2025-04-22" },
  { id: "m3", author_name: "Adv. Roberto Lima", rating: 5, comment: "Investimento que valeu muito. Já recebi vários novos clientes por conta do site. Recomendo sem hesitar!", plan: "Profissional", approved: true, created_date: "2025-04-05" },
  { id: "m4", author_name: "Mariana Costa", rating: 5, comment: "Superou todas as expectativas! A equipe é super atenciosa e o resultado é simplesmente incrível.", plan: "Premium", approved: true, created_date: "2025-03-18" },
  { id: "m5", author_name: "Lucas Andrade", rating: 4, comment: "Ótimo serviço, entrega rápida e qualidade acima do esperado. Já estou planejando upgrades no plano.", plan: "Essencial", approved: true, created_date: "2025-03-02" },
  { id: "m6", author_name: "Fernanda Rocha", rating: 5, comment: "Meu negócio ganhou outra cara depois do site. As vendas aumentaram e a credibilidade da marca cresceu muito!", plan: "Profissional", approved: true, created_date: "2025-02-14" },
];

function StarRating({ value, onChange, readOnly = false, size = "w-5 h-5" }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" disabled={readOnly}
          onClick={() => !readOnly && onChange?.(s)}
          onMouseEnter={() => !readOnly && setHover(s)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={!readOnly ? "hover:scale-125 cursor-pointer transition-transform" : "cursor-default"}
        >
          <Star className={`${size} transition-colors ${(hover || value) >= s ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`} />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const dateStr = review.created_date
    ? new Date(review.created_date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      className="card-professional rounded-2xl p-6 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-700 to-violet-900 flex items-center justify-center font-cinzel font-bold text-white text-sm flex-shrink-0">
            {review.author_name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-cinzel font-semibold text-white text-sm">{review.author_name}</p>
            {review.plan && (
              <span className="font-inter text-[10px] text-purple-400/70 bg-purple-900/20 px-2 py-0.5 rounded-full border border-purple-800/30">
                {review.plan}
              </span>
            )}
          </div>
        </div>
        <StarRating value={review.rating} readOnly size="w-3.5 h-3.5" />
      </div>

      <p className="font-playfair text-white/70 text-sm italic leading-relaxed flex-1">"{review.comment}"</p>

      {dateStr && (
        <p className="font-inter text-white/25 text-[10px] mt-1">{dateStr}</p>
      )}
    </motion.div>
  );
}

export default function ReviewsSection() {
  const [dbReviews, setDbReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [plan, setPlan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    base44.entities.Review.filter({ approved: true }, "-created_date", 100)
      .then((data) => setDbReviews(data || []))
      .catch(() => {});
  }, []);

  // Merge: DB first, then mocks as fallback padding
  const allReviews = dbReviews.length >= 6
    ? dbReviews
    : [...dbReviews, ...MOCK_REVIEWS.filter((m) => !dbReviews.find((d) => d.author_name === m.author_name)).slice(0, 6 - dbReviews.length)];

  const visibleReviews = allReviews.slice(0, visibleCount);
  const hasMore = visibleCount < allReviews.length;

  const avgRating = allReviews.length > 0
    ? (allReviews.reduce((a, r) => a + (r.rating || 5), 0) / allReviews.length).toFixed(1)
    : "5.0";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setSubmitting(true);
    const created = await base44.entities.Review.create({
      author_name: name,
      rating,
      comment,
      plan,
      approved: false, // pending moderation
    });
    setSubmitting(false);
    setDone(true);
  };

  return (
    <section id="avaliacoes" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="font-inter text-xs tracking-[0.4em] text-purple-400/70 uppercase block mb-4">Depoimentos</span>
          <h2 className="font-cinzel font-bold text-3xl md:text-5xl text-white mb-4">
            O que dizem nossos <span className="text-shimmer">Clientes</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6" />
          <div className="flex items-center justify-center gap-3">
            <StarRating value={Math.round(parseFloat(avgRating))} readOnly />
            <span className="font-cinzel font-bold text-white text-2xl">{avgRating}</span>
            <span className="font-inter text-white/40 text-sm">({allReviews.length} avaliações)</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <AnimatePresence>
            {visibleReviews.map((r, i) => (
              <ReviewCard key={r.id || i} review={r} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Ver mais */}
        {hasMore && (
          <div className="text-center mb-10">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="flex items-center gap-2 mx-auto font-inter text-sm text-purple-300/80 border border-purple-700/40 px-6 py-2.5 rounded-full hover:bg-purple-900/20 hover:border-purple-500/60 transition-all"
            >
              <ChevronDown className="w-4 h-4" /> Ver mais comentários
            </button>
          </div>
        )}

        {/* Add Review Button */}
        {!showForm && !done && (
          <div className="text-center">
            <button onClick={() => setShowForm(true)}
              className="btn-primary-aura px-8 py-3.5 rounded-full text-white font-semibold text-sm tracking-wider">
              Deixar Minha Avaliação
            </button>
          </div>
        )}

        {/* Review Form */}
        <AnimatePresence>
          {showForm && !done && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="max-w-lg mx-auto mt-8">
              <div className="card-professional rounded-3xl p-8">
                <h3 className="font-cinzel font-bold text-white text-xl mb-6 text-center tracking-wide">Sua Avaliação</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col items-center gap-1">
                    <StarRating value={rating} onChange={setRating} size="w-8 h-8" />
                    <p className="font-inter text-white/40 text-xs">
                      {rating === 5 ? "Excelente!" : rating === 4 ? "Muito bom!" : rating === 3 ? "Regular" : rating === 2 ? "Ruim" : "Péssimo"}
                    </p>
                  </div>
                  <input type="text" placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 transition-all" />
                  <select value={plan} onChange={(e) => setPlan(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-800/40 text-white/60 text-sm focus:outline-none focus:border-purple-500/60 transition-all">
                    <option value="" className="bg-black">Plano utilizado (opcional)</option>
                    {["Essencial", "Profissional", "Premium"].map((p) => (
                      <option key={p} value={p} className="bg-black">{p}</option>
                    ))}
                  </select>
                  <textarea placeholder="Conte sua experiência com a Aureon Digital..." value={comment}
                    onChange={(e) => setComment(e.target.value)} required rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 resize-none transition-all" />
                  <button type="submit" disabled={submitting}
                    className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-bold tracking-wider text-sm flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    {submitting ? "Enviando..." : "Publicar Avaliação"}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success */}
        {done && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            <p className="font-cinzel font-bold text-white text-lg">Obrigado pela sua avaliação!</p>
            <p className="font-inter text-white/40 text-sm mt-2">Será publicada após aprovação da equipe.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}