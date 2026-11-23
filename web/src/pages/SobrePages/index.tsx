import React from "react";

export const SobrePages = () => {
  return (
    <div className="container my-5">
      {/* Título principal */}
      <h1 className="mb-4 sobre-titulo">Sobre Nós</h1>

      {/* Caixa de texto com informações */}
      <div className="p-4 rounded-3 sobre-box shadow-sm">
        <p className="sobre-texto">
          Bem-vindo ao <strong>Cinema Lumière</strong>!  
          Nosso objetivo é proporcionar a melhor experiência cinematográfica, com conforto, tecnologia e uma programação diversificada para todos os públicos.
        </p>

        <p className="sobre-texto">
          Fundado em 2025, o Cinema Lumière busca unir tradição e inovação, trazendo desde clássicos do cinema até os lançamentos mais recentes, tudo em um ambiente acolhedor e moderno.
        </p>

        <p className="sobre-texto">
          Esperamos que você aproveite cada sessão e volte sempre para viver momentos inesquecíveis conosco!
        </p>
      </div>
    </div>
  );
};
