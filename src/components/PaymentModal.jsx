import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, FileText, MessageCircle, Mail, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

// QR Codes reais por plano
const PIX_DATA = {
  Essencial: {
    qr: "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/fd3b6797b_WhatsAppImage2026-05-26at143753.jpg",
    value: 900,
  },
  Profissional: {
    qr: "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/6c1a09443_WhatsAppImage2026-05-26at143816.jpg",
    value: 1300,
  },
  Premium: {
    qr: "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/e5a358431_WhatsAppImage2026-05-26at143835.jpg",
    value: 1800,
  },
};

const PIX_KEY = "ef21cdf5-63f7-4461-9289-bc7eaa05e375";
const PIX_NAME = "PEDRO JORGE LIMA LEITE TAVARES";
const WHATSAPP_NUMBER = "5599984930092";

// Sanitização: remove HTML/scripts e limita tamanho
function sanitize(str, maxLen = 300) {
  return String(str || "")
    .replace(/<[^>]*>/g, "")
    .replace(/[<>"'`]/g, "")
    .trim()
    .slice(0, maxLen);
}

function validate(form) {
  const errors = {};
  const name = sanitize(form.name, 100);
  const email = sanitize(form.email, 150);
  const phone = sanitize(form.phone, 20);

  if (!name) errors.name = "Nome é obrigatório";
  else if (name.length < 3) errors.name = "Nome muito curto";

  if (!email) {
    errors.email = "E-mail é obrigatório";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "E-mail inválido";
  }
  if (phone && !/^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/.test(phone.replace(/\s/g, ""))) {
    errors.phone = "Telefone inválido (ex: (99) 98493-0092)";
  }
  if (form.notes && sanitize(form.notes, 500).length > 500) {
    errors.notes = "Observações muito longas";
  }
  return errors;
}

// ─── Field component fora do PaymentModal para evitar re-mount a cada render ───
function Field({ value, onChange, error, label, type = "text", required = false, placeholder = "" }) {
  return (
    <div>
      <label className="font-inter text-xs text-white/50 tracking-wider uppercase block mb-1.5">
        {label}{required && <span className="text-purple-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/25 text-sm focus:outline-none focus:ring-1 transition-all ${error ? "border-red-500/70 focus:ring-red-500/20" : "border-purple-800/40 focus:border-purple-500/60 focus:ring-purple-500/30"}`}
      />
      {error && (
        <p className="flex items-center gap-1 mt-1 text-xs text-red-400">
          <AlertCircle className="w-3 h-3" />{error}
        </p>
      )}
    </div>
  );
}

export default function PaymentModal({ plan, onClose }) {
  const [tab, setTab] = useState("pix");
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendingReceipt, setSendingReceipt] = useState(null);
  const [receiptSent, setReceiptSent] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [mpLoading, setMpLoading] = useState(false);

  const pixData = PIX_DATA[plan.name] || PIX_DATA.Essencial;

  const updateField = (k, v) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: null }));
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    // Cartão via Mercado Pago: redireciona para checkout MP
    if (tab === "cartao") {
      setMpLoading(true);
      const res = await base44.functions.invoke("mpCheckout", {
        plan: plan.name,
        client_name: sanitize(form.name, 100),
        client_email: sanitize(form.email, 150).toLowerCase(),
        success_url: window.location.origin + "/meus-pedidos",
        cancel_url: window.location.href,
      });
      setMpLoading(false);
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
      return;
    }

    setLoading(true);
    const order = await base44.entities.Order.create({
      client_name: sanitize(form.name, 100),
      client_email: sanitize(form.email, 150).toLowerCase(),
      client_phone: sanitize(form.phone, 20),
      plan: plan.name,
      plan_price: pixData.value,
      payment_method: tab,
      notes: sanitize(form.notes, 500),
      status: "aguardando_pagamento",
    });
    setOrderId(order.id);
    setLoading(false);
    setStep(2);
  };

  const handleFinalConfirm = () => setSubmitted(true);

  const sendReceiptWhatsApp = () => {
    const msg = encodeURIComponent(
      `Olá! Acabei de realizar o pagamento do Plano ${plan.name} - R$ ${pixData.value.toLocaleString("pt-BR")}.\n\nNome: ${form.name}\nE-mail: ${form.email}\nForma: PIX\n\nAguardo a confirmação. Obrigado!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setReceiptSent("whatsapp");
  };

  const sendReceiptEmail = async () => {
    setSendingReceipt("email");
    await base44.integrations.Core.SendEmail({
      from_name: "Aureon Digital",
      to: form.email,
      subject: `Confirmação do Pedido — Plano ${plan.name} | Aureon Digital`,
      body: `Olá, ${form.name}!\n\nRecebemos seu pedido do Plano ${plan.name} no valor de R$ ${pixData.value.toLocaleString("pt-BR")}.\n\nForma de pagamento: ${tab === "pix" ? "PIX" : "Boleto"}\n\nAsssim que confirmarmos o pagamento, entraremos em contato para iniciar seu projeto.\n\nQualquer dúvida, fale conosco:\nWhatsApp: (99) 98493-0092\nInstagram: @aureon.digital_ofc\n\nObrigado por escolher a Aureon Digital!\n\n— Equipe Aureon Digital`,
    });
    setSendingReceipt(null);
    setReceiptSent("email");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

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
                {plan.name} — R$ {pixData.value.toLocaleString("pt-BR")}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>

          <div className="p-6 max-h-[78vh] overflow-y-auto">
            {!submitted ? (
              <>
                {/* STEP 1: Formulário */}
                {step === 1 && (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <p className="font-inter text-white/50 text-sm mb-2">Preencha seus dados para prosseguir.</p>

                    <Field label="Nome Completo" required placeholder="Seu nome completo"
                      value={form.name} onChange={(e) => updateField("name", e.target.value)} error={errors.name} />
                    <Field label="E-mail" type="email" required placeholder="seu@email.com"
                      value={form.email} onChange={(e) => updateField("email", e.target.value)} error={errors.email} />
                    <Field label="WhatsApp" type="tel" placeholder="(99) 98493-0092"
                      value={form.phone} onChange={(e) => updateField("phone", e.target.value)} error={errors.phone} />

                    <div>
                      <label className="font-inter text-xs text-white/50 tracking-wider uppercase block mb-1.5">Observações</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-800/40 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/60 resize-none transition-all"
                        placeholder="Descreva seu negócio, necessidades especiais..."
                      />
                    </div>

                    {/* Forma de pagamento */}
                    <div>
                     <label className="font-inter text-xs text-white/50 tracking-wider uppercase block mb-2">Forma de Pagamento</label>
                     <div className="flex gap-2">
                       {[
                         { key: "pix", label: "💠 PIX" },
                         { key: "boleto", label: "📄 Boleto" },
                         { key: "cartao", label: "💳 Cartão" },
                       ].map((t) => (
                         <button key={t.key} type="button" onClick={() => setTab(t.key)}
                           className={`flex-1 py-2.5 rounded-xl text-xs font-semibold font-inter tracking-wider uppercase transition-all ${tab === t.key ? "bg-purple-700 text-white border border-purple-500" : "bg-white/5 text-white/40 border border-white/10 hover:border-purple-700/40"}`}>
                           {t.label}
                         </button>
                       ))}
                     </div>
                    </div>

                    <button type="submit" disabled={loading || mpLoading}
                      className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-bold tracking-wider text-sm mt-2">
                      {(loading || mpLoading) ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {mpLoading ? "Redirecionando para Mercado Pago..." : "Processando..."}
                        </span>
                      ) : tab === "cartao" ? "💳 Pagar com Cartão" : "Continuar para Pagamento →"}
                    </button>
                  </form>
                )}

                {/* STEP 2: Pagamento */}
                {step === 2 && (
                  <div className="space-y-5">
                    {tab === "pix" && (
                      <>
                        <div className="text-center">
                          <p className="font-cinzel text-white text-base font-semibold mb-0.5">Pagamento via PIX</p>
                          <p className="font-inter text-white/40 text-xs">Escaneie o QR Code com seu banco</p>
                        </div>

                        {/* QR Code real */}
                        <div className="flex justify-center">
                          <div className="relative w-52 h-52 rounded-2xl overflow-hidden border-4 border-purple-600 shadow-lg shadow-purple-900/40">
                            <img src={pixData.qr} alt={`QR Code PIX ${plan.name}`} className="w-full h-full object-cover" />
                          </div>
                        </div>

                        {/* Valor */}
                        <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4 text-center">
                          <p className="font-inter text-xs text-white/50">Valor a pagar</p>
                          <p className="font-cinzel font-bold text-white text-2xl">R$ {pixData.value.toLocaleString("pt-BR")}</p>
                        </div>

                        {/* Chave PIX */}
                        <div>
                          <p className="font-inter text-xs text-white/40 mb-2">Chave PIX (alternativa)</p>
                          <div className="flex items-center gap-2 bg-white/5 border border-purple-800/40 rounded-xl px-4 py-3">
                            <span className="font-inter text-xs text-white/60 flex-1 break-all">{PIX_KEY}</span>
                            <button onClick={copyPixKey}
                              className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-700/50 hover:bg-purple-600/70 flex items-center justify-center transition-colors">
                              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/70" />}
                            </button>
                          </div>
                          <p className="font-inter text-[11px] text-white/30 mt-1">Beneficiário: {PIX_NAME}</p>
                        </div>

                        {/* Enviar comprovante */}
                        <div className="border border-purple-800/30 rounded-xl p-4 space-y-3">
                          <p className="font-inter text-xs text-white/50 uppercase tracking-wider">Enviar comprovante / notificação</p>
                          <div className="flex gap-2">
                            <button onClick={sendReceiptWhatsApp}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-inter font-medium transition-all ${receiptSent === "whatsapp" ? "bg-green-600/20 border-green-500/50 text-green-400" : "bg-white/5 border-white/10 text-white/60 hover:border-green-500/40 hover:text-green-400"}`}>
                              {receiptSent === "whatsapp" ? <Check className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                              {receiptSent === "whatsapp" ? "Enviado!" : "WhatsApp"}
                            </button>
                            <button onClick={sendReceiptEmail} disabled={sendingReceipt === "email"}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-inter font-medium transition-all ${receiptSent === "email" ? "bg-purple-600/20 border-purple-500/50 text-purple-400" : "bg-white/5 border-white/10 text-white/60 hover:border-purple-500/40 hover:text-purple-400"}`}>
                              {sendingReceipt === "email" ? <span className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" /> : receiptSent === "email" ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                              {sendingReceipt === "email" ? "Enviando..." : receiptSent === "email" ? "Enviado!" : "E-mail"}
                            </button>
                          </div>
                        </div>

                        <button onClick={handleFinalConfirm}
                          className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-bold tracking-wider text-sm">
                          ✅ Já realizei o pagamento
                        </button>
                      </>
                    )}

                    {tab === "boleto" && (
                      <div className="space-y-5">
                        <div className="text-center">
                          <p className="font-cinzel text-white text-base font-semibold mb-1">Pagamento via Boleto</p>
                          <p className="font-inter text-white/40 text-xs">O boleto será enviado por e-mail</p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-5 text-center space-y-3">
                          <FileText className="w-10 h-10 text-purple-400 mx-auto" />
                          <p className="font-cinzel font-bold text-white text-2xl">R$ {pixData.value.toLocaleString("pt-BR")}</p>
                          <p className="font-inter text-xs text-white/40">Plano: <span className="text-purple-300 font-semibold">{plan.name}</span></p>
                          <p className="font-inter text-xs text-white/30">Enviado para: <span className="text-white/50">{form.email}</span></p>
                        </div>
                        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4">
                          <p className="font-inter text-xs text-yellow-300/80">⚠️ Após pagamento, a confirmação pode levar até 3 dias úteis.</p>
                        </div>

                        {/* Enviar notificação boleto */}
                        <div className="border border-purple-800/30 rounded-xl p-4 space-y-3">
                          <p className="font-inter text-xs text-white/50 uppercase tracking-wider">Receber boleto / notificação</p>
                          <div className="flex gap-2">
                            <button onClick={sendReceiptWhatsApp}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-inter font-medium transition-all ${receiptSent === "whatsapp" ? "bg-green-600/20 border-green-500/50 text-green-400" : "bg-white/5 border-white/10 text-white/60 hover:border-green-500/40 hover:text-green-400"}`}>
                              {receiptSent === "whatsapp" ? <Check className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                              {receiptSent === "whatsapp" ? "Enviado!" : "WhatsApp"}
                            </button>
                            <button onClick={sendReceiptEmail} disabled={sendingReceipt === "email"}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-inter font-medium transition-all ${receiptSent === "email" ? "bg-purple-600/20 border-purple-500/50 text-purple-400" : "bg-white/5 border-white/10 text-white/60 hover:border-purple-500/40 hover:text-purple-400"}`}>
                              {sendingReceipt === "email" ? <span className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" /> : receiptSent === "email" ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                              {sendingReceipt === "email" ? "Enviando..." : receiptSent === "email" ? "Enviado!" : "E-mail"}
                            </button>
                          </div>
                        </div>

                        <button onClick={handleFinalConfirm}
                          className="w-full btn-primary-aura py-3.5 rounded-xl text-white font-bold tracking-wider text-sm">
                          📧 Confirmar Pedido
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* Sucesso */
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-cinzel font-bold text-white text-xl">Pedido Recebido!</h3>
                <p className="font-inter text-white/50 text-sm max-w-xs mx-auto">
                  Entraremos em contato em breve para confirmar e iniciar seu projeto. Obrigado por escolher a Aureon Digital!
                </p>
                {form.email && (
                  <p className="font-inter text-xs text-purple-400">Confirmação enviada para {form.email}</p>
                )}
                <a href="/meus-pedidos"
                  className="block font-inter text-xs text-white/30 hover:text-white/60 transition-colors mt-1">
                  Acompanhar pedido →
                </a>
                <button onClick={onClose}
                  className="btn-primary-aura px-8 py-3 rounded-xl text-white font-semibold text-sm tracking-wider">
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