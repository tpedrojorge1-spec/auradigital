import React from "react";
import { ArrowLeft, Shield } from "lucide-react";
import PurpleRaysBackground from "../components/PurpleRaysBackground";

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-black relative">
      <PurpleRaysBackground />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-inter text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar ao site
        </a>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-700/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-white text-2xl">Política de Privacidade</h1>
            <p className="font-inter text-white/30 text-xs mt-0.5">Última atualização: maio de 2026</p>
          </div>
        </div>

        <div className="space-y-8 font-inter text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">1. Coleta de Informações</h2>
            <p>A Aureon Digital coleta informações fornecidas voluntariamente por você ao preencher formulários de contato ou solicitar orçamentos, como nome, e-mail e telefone. Não coletamos dados sensíveis sem o seu consentimento.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">2. Uso das Informações</h2>
            <p>As informações coletadas são utilizadas exclusivamente para:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
              <li>Entrar em contato sobre seus pedidos e serviços;</li>
              <li>Enviar confirmações e atualizações de projetos;</li>
              <li>Melhorar nossos serviços e atendimento.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">3. Compartilhamento</h2>
            <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei ou para prestação do serviço contratado (ex: processamento de pagamento).</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">4. Cookies</h2>
            <p>Nosso site pode utilizar cookies para melhorar sua experiência de navegação. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">5. Segurança</h2>
            <p>Adotamos medidas técnicas adequadas para proteger suas informações contra acesso não autorizado, alteração ou divulgação indevida.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">6. Seus Direitos (LGPD)</h2>
            <p>Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a acessar, corrigir ou solicitar a exclusão dos seus dados. Entre em contato conosco via WhatsApp ou e-mail para exercer esses direitos.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">7. Contato</h2>
            <p>Para dúvidas sobre esta política, entre em contato:</p>
            <div className="mt-2 space-y-1 text-purple-300">
              <p>📱 WhatsApp: (99) 98493-0092</p>
              <p>📸 Instagram: @aureon.digital_ofc</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}