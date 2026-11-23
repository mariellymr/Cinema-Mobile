import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listSessoes } from "../../services/SessoesService";
import { listFilmes } from "../../services/FilmesService";
import { listSalas } from "../../services/SalasService";

import type { Sessao } from "../../models/Sessao";
import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";

export default function Sessoes() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarTudo() {
      try {
        const [sessoesRes, filmesRes, salasRes] = await Promise.all([
          listSessoes(),
          listFilmes(),
          listSalas(),
        ]);

        setSessoes(sessoesRes.data);
        setFilmes(filmesRes.data);
        setSalas(salasRes.data);
      } catch (err) {
        console.error("Erro ao carregar sessões", err);
      } finally {
        setCarregando(false);
      }
    }

    carregarTudo();
  }, []);

  function getFilme(id: string | number): any {
    return filmes.find((f) => String(f.id) === String(id)) || null;
  }

  function getSalaNome(id: string | number) {
    return salas.find((s) => String(s.id) === String(id))?.nome || "—";
  }

  function formatarDataHora(dataHoraStr: string) {
    try {
      const date = new Date(dataHoraStr);
      const diaStr = date.toLocaleDateString('pt-BR');
      const horaStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      return `${diaStr} às ${horaStr}`;
    } catch {
      return dataHoraStr;
    }
  }

  if (carregando) {
    return (
      <div className="container mt-5 pt-5 text-center text-white">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <h4 className="mt-3">Carregando sessões disponíveis...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5 text-white">
      <h2 className="mb-4 text-center" style={{ color: '#f5c518' }}>Sessões Disponíveis</h2>

      {sessoes.length === 0 ? (
        <div className="text-center mt-5">
          <h4 className="text-muted">Nenhuma sessão disponível no momento.</h4>
        </div>
      ) : (
        <div className="row g-4">
          {sessoes.map((s) => {
            const filme = getFilme(s.filmeId);
            const tituloFilme = filme?.titulo || "Filme Indisponível";
            const generoFilme = filme?.genero || "Desconhecido";
            const posterUrl = `https://placehold.co/300x450/1e242d/f5c518?text=${encodeURIComponent(tituloFilme)}`;

            return (
              <div className="col-md-4 col-lg-3 d-flex" key={s.id}>
                <div className="card bg-dark text-white border-0 shadow-lg w-100 overflow-hidden" style={{ borderRadius: '12px' }}>
                  {/* Poster/Banner */}
                  <img 
                    src={posterUrl} 
                    className="card-img-top" 
                    alt={tituloFilme} 
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                  
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-uppercase mb-1" style={{ color: '#fff', fontSize: '1.1rem' }}>
                      {tituloFilme}
                    </h5>
                    <p className="text-muted small mb-3">{generoFilme}</p>

                    <div className="mb-3" style={{ fontSize: '0.9rem' }}>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-secondary">Sala:</span>
                        <span className="fw-semibold">{getSalaNome(s.salaId)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-secondary">Data/Hora:</span>
                        <span className="text-info fw-semibold">{formatarDataHora(s.dataHora)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-secondary">Idioma:</span>
                        <span>{s.idioma}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-secondary">Formato:</span>
                        <span>{s.formato}</span>
                      </div>
                      <div className="d-flex justify-content-between mt-2 pt-2 border-top border-secondary">
                        <span className="text-secondary">Preço:</span>
                        <span className="text-success fw-bold">R$ {Number(s.preco).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link 
                        to={`/venda-ingressos`} 
                        className="btn w-100 fw-bold"
                        style={{ backgroundColor: '#ca0000', color: '#fff' }}
                      >
                        Comprar Ingresso
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
