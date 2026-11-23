import { useEffect, useState } from "react";
import { listSessoes } from "../../services/SessoesService";
import { listFilmes } from "../../services/FilmesService";
import { listSalas } from "../../services/SalasService";
import { createIngresso } from "../../services/IngressosService";
import { useAuth } from "../../contexts/AuthContext";

import type { Sessao } from "../../models/Sessao";
import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";

export default function VendaIngressos() {
  const { user } = useAuth();
  
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);

  const [sessaoId, setSessaoId] = useState("");
  const [cliente, setCliente] = useState(user?.name || user?.nome || "");
  const [cpf, setCpf] = useState("");
  const [assento, setAssento] = useState("");
  const [pagamento, setPagamento] = useState("Cartão de Crédito");

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Combos
  const combos = [
    { nome: "Sem combo", preco: 0 },
    { nome: "Combo Pipoca Pequena + Refri", preco: 15 },
    { nome: "Combo Pipoca Média + Refri", preco: 22 },
    { nome: "Combo Pipoca Grande + Refri", preco: 29 },
    { nome: "Combo Premium (Pipoca + 2 Refri + Chocolate)", preco: 39 },
  ];

  const [comboSelecionado, setComboSelecionado] = useState("Sem combo");
  const [valorCombo, setValorCombo] = useState(0);

  const [precoSessao, setPrecoSessao] = useState(0);

  useEffect(() => {
    async function carregar() {
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
        showFeedback("Erro ao carregar dados.", "error");
      }
    }
    carregar();
  }, []);

  function getFilmeNome(id: string | number) {
    return filmes.find((f) => String(f.id) === String(id))?.titulo ?? "—";
  }

  function getSalaNome(id: string | number) {
    return salas.find((s) => String(s.id) === String(id))?.nome ?? "—";
  }

  useEffect(() => {
    const sessao = sessoes.find((s) => String(s.id) === String(sessaoId));
    if (sessao) {
      setPrecoSessao(Number(sessao.preco));
    } else {
      setPrecoSessao(0);
    }
  }, [sessaoId, sessoes]);

  function atualizarCombo(nome: string) {
    setComboSelecionado(nome);
    const c = combos.find((cb) => cb.nome === nome);
    setValorCombo(c?.preco ?? 0);
  }

  function showFeedback(msg: string, type: "success" | "error") {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 5000);
  }

  async function salvarIngresso() {
    if (!sessaoId || !cliente || !cpf || !assento) {
      showFeedback("Preencha todos os campos obrigatórios!", "error");
      return;
    }

    const valorFinal = precoSessao + valorCombo;

    const payload = {
      nomeCliente: cliente,
      cpfCliente: cpf,
      assento,
      tipoPagamento: pagamento,
      sessaoId: Number(sessaoId),
      userId: Number(user?.id)
    };

    try {
      await createIngresso(payload as any);
      
      const confirmMsg = `Venda confirmada!\nResumo do ingresso:\nCliente: ${cliente}\nSessão ID: ${sessaoId}\nAssento: ${assento}\nValor: R$ ${valorFinal}`;
      showFeedback(confirmMsg, "success");
      
      setSessaoId("");
      setCliente(user?.name || user?.nome || "");
      setCpf("");
      setAssento("");
      setPagamento("Cartão de Crédito");
      atualizarCombo("Sem combo");
    } catch (err) {
      showFeedback("Erro ao processar a venda do ingresso.", "error");
    }
  }

  return (
    <div className="container mt-5 pt-5 text-white">

      <h2 className="mb-4">Venda de Ingressos</h2>

      {feedback && (
        <div className={`alert alert-${feedback.type === "success" ? "success" : "danger"}`} style={{ whiteSpace: "pre-wrap" }}>
          {feedback.msg}
        </div>
      )}

      <div className="card bg-dark p-4">

        <div className="row g-3">

          {/* SELECT DE SESSÃO */}
          <div className="col-md-6">
            <label className="form-label text-white">Sessão</label>
            <select
              className="form-select"
              value={sessaoId}
              onChange={(e) => setSessaoId(e.target.value)}
            >
              <option value="">Selecione...</option>

              {sessoes.map((s: any) => (
                <option key={s.id} value={String(s.id)}>
                  🎬 {getFilmeNome(s.filmeId)} | Sala: {getSalaNome(s.salaId)} |{" "}
                  {new Date(s.dataHora).toLocaleString('pt-BR')} — R$ {s.preco}
                </option>
              ))}

            </select>
          </div>

          {/* CLIENTE */}
          <div className="col-md-6">
            <label className="form-label text-white">Nome do Cliente</label>
            <input
              type="text"
              className="form-control"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>

          {/* CPF */}
          <div className="col-md-6">
            <label className="form-label text-white">CPF</label>
            <input
              type="text"
              className="form-control"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
            />
          </div>

          {/* ASSENTO */}
          <div className="col-md-6">
            <label className="form-label text-white">Assento</label>
            <input
              type="text"
              className="form-control"
              value={assento}
              onChange={(e) => setAssento(e.target.value)}
              placeholder="Ex: A10"
            />
          </div>

          {/* PAGAMENTO */}
          <div className="col-md-6">
            <label className="form-label text-white">Pagamento</label>
            <select
              className="form-select"
              value={pagamento}
              onChange={(e) => setPagamento(e.target.value)}
            >
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="PIX">PIX</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </div>

          {/* COMBOS */}
          <div className="col-md-12">
            <label className="form-label text-white">Combos / Lanches</label>
            <select
              className="form-select"
              value={comboSelecionado}
              onChange={(e) => atualizarCombo(e.target.value)}
            >
              {combos.map((c) => (
                <option key={c.nome}>{c.nome}</option>
              ))}
            </select>
            <small className="text-info">
              Preço do combo selecionado: R$ {valorCombo}
            </small>
          </div>

          {/* PREÇO FINAL */}
          <div className="col-md-12">
            <h4 className="text-warning mt-3">
              Preço Final: R$ {precoSessao + valorCombo}
            </h4>
          </div>

          <div className="col-12 mt-2">
            <button
              className="btn btn-danger w-100"
              onClick={salvarIngresso}
            >
              Confirmar Venda
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
