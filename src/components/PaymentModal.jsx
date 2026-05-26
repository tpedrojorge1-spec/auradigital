import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, QrCode, FileText } from "lucide-react";
import { base44 } from "@/api/base44Client";

const PIX_KEY = "63036234330";
const PIX_PAYLOAD = "00020101021126440014br.gov.bcb.pix0122tpedrojorge1@gmail.com5204000053039865802BR5919PEDRO J L L TAVARES6009PEDREIRAS62070503***6304AEE9";

export default function PaymentModal({ plan, onClose }) {
  const [tab, setTab] = useState("pix");
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1); // 1=form, 2=payment
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyPix = () => {
    navigator.clipboard.writeText(PIX_PAYLOAD);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.entities.Order.create({
        client_name: form.name,
        client_email: form.email,
        client_phone: form.phone,
        plan: plan.name,
        plan_price: plan.price,
        payment_method: tab,
        notes: form.notes,
        status: "pendente",
      });
      setStep(2);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFinalConfirm = () => {
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative w-full max-w-lg bg-[#0a0514] border border-purple-700/40 rounded-3xl shadow-2xl shadow-purple-900/50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-purple-900/30">
            <div>
              <h3 className="font-cinzel font-bold text-white text-lg tracking-wide">Contratar Plano</h3>
              <p className="font-inter text-purple-300 text-sm">
                {plan.name} — R$ {plan.price.toLocaleString("pt-BR")}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {!submitted ? (
              <>
                {step === 1 && (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <p className="font-inter text-white/50 text-sm mb-6">Preencha seus dados para prosseguir com o pagamento.</p>
                    {[
                      { key: "name", label: "Nome Completo", type: "text", required: true },
                      { key: "email", label: "E-mail", type: "email", required: true },
                      { key: "phone", label: "WhatsApp", type: "tel", required: false },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="font-inter text-xs text-white/50 tracking-wider uppercase block mb-1.5">{f.label}</label>
                        <input
                          type={f.type}
                          required={f.required}
                          value={form[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="font-inter text-xs text-white/50 tracking-wider uppercase block mb-1.5">Observações (opcional)</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 resize-none transition-all"
                        placeholder="Descreva seu negócio, necessidades especiais..."
                      />
                    </div>
                    {/* Payment Method Tabs */}
                    <div>
                      <label className="font-inter text-xs text-white/50 tracking-wider uppercase block mb-2">Forma de Pagamento</label>
                      <div className="flex gap-3">
                        {["pix", "boleto"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTab(t)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold font-inter tracking-wider uppercase transition-all ${tab === t ? "bg-purple-700 text-white border border-purple-500" : "bg-white/5 text-white/40 border border-white/10 hover:border-purple-700/40"}`}
                          >
                            {t === "pix" ? "💠 PIX" : "📄 Boleto"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-bold tracking-wider text-sm mt-2"
                    >
                      {loading ? "Processando..." : "Continuar para Pagamento →"}
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    {tab === "pix" && (
                      <div className="space-y-5">
                        <div className="text-center">
                          <p className="font-cinzel text-white text-base font-semibold mb-1">Pagamento via PIX</p>
                          <p className="font-inter text-white/40 text-xs">Escaneie o QR Code ou copie o código</p>
                        </div>
                        {/* QR code representativo */}
                        <div className="flex justify-center">
                          <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center p-2 border-4 border-purple-600">
                            <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-0.5">
                              {Array.from({ length: 49 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`rounded-sm ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="font-inter text-xs text-white/40 mb-2 text-center">Código PIX</p>
                          <div className="flex items-center gap-2 bg-white/5 border border-purple-800/40 rounded-xl px-4 py-3">
                            <span className="font-inter text-xs text-white/60 flex-1 break-all leading-relaxed">{PIX_PAYLOAD.slice(0, 60)}...</span>
                            <button
                              onClick={copyPix}
                              className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-700/50 hover:bg-purple-600/70 flex items-center justify-center transition-colors"
                            >
                              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/70" />}
                            </button>
                          </div>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4 text-center">
                          <p className="font-inter text-xs text-white/50">Valor a pagar</p>
                          <p className="font-cinzel font-bold text-white text-2xl">R$ {plan.price.toLocaleString("pt-BR")}</p>
                          <p className="font-inter text-xs text-white/30 mt-1">Chave PIX: {PIX_KEY}</p>
                        </div>
                      </div>
                    )}

                    {tab === "boleto" && (
                      <div className="space-y-5">
                        <div className="text-center">
                          <p className="font-cinzel text-white text-base font-semibold mb-1">Pagamento via Boleto</p>
                          <p className="font-inter text-white/40 text-xs">O boleto será gerado e enviado para seu e-mail</p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-5 text-center space-y-3">
                          <FileText className="w-10 h-10 text-purple-400 mx-auto" />
                          <p className="font-cinzel font-bold text-white text-2xl">R$ {plan.price.toLocaleString("pt-BR")}</p>
                          <p className="font-inter text-xs text-white/40">
                            Plano: <span className="text-purple-300 font-semibold">{plan.name}</span>
                          </p>
                          <p className="font-inter text-xs text-white/30">
                            O boleto será enviado para o e-mail informado com validade de 3 dias úteis.
                          </p>
                        </div>
                        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4">
                          <p className="font-inter text-xs text-yellow-300/80">
                            ⚠️ Após o pagamento do boleto, o processo pode levar até 3 dias úteis para confirmação.
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleFinalConfirm}
                      className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-bold tracking-wider text-sm"
                    >
                      {tab === "pix" ? "✅ Já realizei o pagamento" : "📧 Receber boleto por e-mail"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-cinzel font-bold text-white text-xl">Pedido Recebido!</h3>
                <p className="font-inter text-white/50 text-sm max-w-xs mx-auto">
                  Entraremos em contato em breve para confirmar seu pedido e iniciar o projeto. Obrigado por escolher a Aureon Digital!
                </p>
                <button
                  onClick={onClose}
                  className="btn-primary-aura px-8 py-3 rounded-xl text-white font-semibold text-sm tracking-wider"
                >
                  Fechar
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}