import React from "react";
import { ArrowLeft, FileText } from "lucide-react";
import PurpleRaysBackground from "../components/PurpleRaysBackground";

export default function Termos() {
  return (
    <div className="min-h-screen bg-black relative">
      <PurpleRaysBackground />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-inter text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar ao site
        </a>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-700/30 flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-white text-2xl">Termos de Uso</h1>
            <p className="font-inter text-white/30 text-xs mt-0.5">Última atualização: maio de 2026</p>
          </div>
        </div>

        <div className="space-y-8 font-inter text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar os serviços da Aureon Digital, você concorda com estes Termos de Uso. Se não concordar com algum termo, recomendamos que não utilize nossos serviços.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">2. Serviços Prestados</h2>
            <p>A Aureon Digital oferece serviços de criação e desenvolvimento de sites profissionais. Os planos disponíveis (Essencial, Profissional e Premium) possuem escopos distintos, conforme descrito na página de planos.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">3. Pagamento e Entrega</h2>
            <ul className="list-disc list-inside space-y-1 text-white/50">
              <li>O pagamento deve ser confirmado antes do início do desenvolvimento;</li>
              <li>O prazo de entrega começa após confirmação do pagamento;</li>
              <li>Revisões incluídas conforme o plano contratado;</li>
              <li>Alterações fora do escopo podem gerar cobranças adicionais.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">4. Responsabilidades do Cliente</h2>
            <p>O cliente é responsável por fornecer os materiais necessários (textos, imagens, logos) dentro do prazo acordado. Atrasos no fornecimento de materiais podem impactar o prazo de entrega.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">5. Propriedade Intelectual</h2>
            <p>Após a quitação integral do serviço, o cliente recebe os direitos de uso do site desenvolvido. A Aureon Digital reserva o direito de utilizar o projeto como portfólio, salvo solicitação expressa de sigilo.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">6. Cancelamento e Reembolso</h2>
            <p>Cancelamentos solicitados antes do início do desenvolvimento terão reembolso integral. Após o início, o reembolso será proporcional ao trabalho não realizado, a ser analisado caso a caso.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">7. Limitação de Responsabilidade</h2>
            <p>A Aureon Digital não se responsabiliza por resultados de negócio do cliente, como vendas ou conversões, que dependem de fatores externos ao escopo do desenvolvimento do site.</p>
          </section>

          <section>
            <h2 className="font-cinzel text-white font-semibold text-base mb-3">8. Contato</h2>
            <p>Para dúvidas ou solicitações relacionadas a estes termos:</p>
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