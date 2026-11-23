import { useEffect, useState } from "react";
import {
  listSessoes,
  createSessao,
  deleteSessao,
  updateSessao,
} from "../../services/SessoesService";

import { listFilmes } from "../../services/FilmesService";
import { listSalas } from "../../services/SalasService";

import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";
import type { Sessao } from "../../models/Sessao";

export default function CadastroSessoes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);

  // Campos do formulário
  const [filmeId, setFilmeId] = useState("");
  const [salaId, setSalaId] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [preco, setPreco] = useState<number | "">("");
  const [idioma, setIdioma] = useState("Dublado");
  const [formato, setFormato] = useState("2D");

  // ID em edição (string)
  const [editId, setEditId] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const [filmesRes, salasRes, sessoesRes] = await Promise.all([
          listFilmes(),
          listSalas(),
          listSessoes(),
        ]);
        setFilmes(filmesRes.data);
        setSalas(salasRes.data);
        setSessoes(sessoesRes.data);
      } catch (err) {
        showFeedback("Erro ao carregar dados.", "error");
      }
    }

    carregar();
  }, []);

  function showFeedback(msg: string, type: "success" | "error") {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3000);
  }

  async function salvarSessao() {
    if (!filmeId || !salaId || !dataHora || preco === "") {
      showFeedback("Preencha todos os campos!", "error");
      return;
    }

    const payload = {
      filmeId: Number(filmeId),
      salaId: Number(salaId),
      dataHora: new Date(dataHora).toISOString(),
      preco: Number(preco),
      idioma,
      formato,
    };

    try {
      if (editId === null) {
        const res = await createSessao(payload);
        setSessoes((prev) => [...prev, res.data]);
        showFeedback("Sessão cadastrada com sucesso!", "success");
      } else {
        await updateSessao(editId, payload);
        // Atualiza item na lista
        setSessoes((prev) =>
          prev.map((s) => (s.id === editId ? { ...s, ...payload, id: editId } : s))
        );
        showFeedback("Sessão atualizada com sucesso!", "success");
      }
      limparFormulario();
    } catch (err) {
      showFeedback("Erro ao salvar sessão.", "error");
    }
  }

  function limparFormulario() {
    setEditId(null);
    setFilmeId("");
    setSalaId("");
    setDataHora("");
    setPreco("");
    setIdioma("Dublado");
    setFormato("2D");
  }

  function editar(sessao: any) {
    setEditId(sessao.id);
    setFilmeId(String(sessao.filmeId));
    setSalaId(String(sessao.salaId));
    
    // Tratamento para data input
    let dataFormatada = "";
    if (sessao.dataHora) {
      try {
        // Remover o 'Z' para o input datetime-local aceitar se for ISO completo
        dataFormatada = new Date(sessao.dataHora).toISOString().slice(0, 16);
      } catch(e) {
        dataFormatada = sessao.dataHora;
      }
    }
    setDataHora(dataFormatada);
    
    setPreco(sessao.preco);
    setIdioma(sessao.idioma);
    setFormato(sessao.formato);
  }

  async function excluir(id: string) {
    if (!confirm("Deseja realmente excluir esta sessão?")) return;
    try {
      await deleteSessao(id);
      setSessoes((prev) => prev.filter((s) => s.id !== id));
      showFeedback("Sessão excluída com sucesso!", "success");
    } catch (err) {
      showFeedback("Erro ao excluir sessão.", "error");
    }
  }

  function getFilmeNome(id: string | number) {
    return filmes.find((f) => String(f.id) === String(id))?.titulo ?? "—";
  }

  function getSalaNome(id: string | number) {
    return salas.find((s) => String(s.id) === String(id))?.nome ?? "—";
  }

  return (
    <div className="container mt-5 pt-5 text-white">
      <h2 className="mb-4">Cadastro de Sessões</h2>

      {feedback && (
        <div className={`alert alert-${feedback.type === "success" ? "success" : "danger"}`}>
          {feedback.msg}
        </div>
      )}

      <div className="card bg-dark p-4 border border-secondary mb-4">
        <div className="row g-3">
          {/* FILME */}
          <div className="col-md-6">
            <label className="form-label text-white">Filme</label>
            <select
              className="form-select"
              value={filmeId}
              onChange={(e) => setFilmeId(e.target.value)}
            >
              <option value="">Selecione</option>
              {filmes.map((f: any) => (
                <option key={f.id} value={String(f.id)}>
                  {f.titulo}
                </option>
              ))}
            </select>
          </div>

          {/* SALA */}
          <div className="col-md-6">
            <label className="form-label text-white">Sala</label>
            <select
              className="form-select"
              value={salaId}
              onChange={(e) => setSalaId(e.target.value)}
            >
              <option value="">Selecione</option>
              {salas.map((s) => (
                <option key={s.id} value={String(s.id)}>
                  {s.nome}
                </option>
              ))}
            </select>
          </div>

          {/* DATA/HORA */}
          <div className="col-md-6">
            <label className="form-label text-white">Data e Hora</label>
            <input
              type="datetime-local"
              className="form-control"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
            />
          </div>

          {/* PREÇO */}
          <div className="col-md-6">
            <label className="form-label text-white">Preço (R$)</label>
            <input
              type="number"
              className="form-control"
              value={preco}
              onChange={(e) =>
                setPreco(e.target.value ? Number(e.target.value) : "")
              }
            />
          </div>

          {/* IDIOMA */}
          <div className="col-md-6">
            <label className="form-label text-white">Idioma</label>
            <select
              className="form-select"
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
            >
              <option>Dublado</option>
              <option>Legendado</option>
            </select>
          </div>

          {/* FORMATO */}
          <div className="col-md-6">
            <label className="form-label text-white">Formato</label>
            <select
              className="form-select"
              value={formato}
              onChange={(e) => setFormato(e.target.value)}
            >
              <option>2D</option>
              <option>3D</option>
            </select>
          </div>

          <div className="col-12">
            <button className="btn btn-danger w-100" onClick={salvarSessao}>
              {editId === null ? "Salvar Sessão" : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </div>

      {/* TABELA */}
      <h3 className="mb-3">Sessões Cadastradas</h3>

      <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered align-middle">
          <thead>
            <tr>
              <th>Filme</th>
              <th>Sala</th>
              <th>Data/Hora</th>
              <th>Preço</th>
              <th>Idioma</th>
              <th>Formato</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {sessoes.map((s: any) => (
              <tr key={s.id}>
                <td>{getFilmeNome(s.filmeId)}</td>
                <td>{getSalaNome(s.salaId)}</td>
                <td>{new Date(s.dataHora).toLocaleString('pt-BR')}</td>
                <td>R$ {s.preco}</td>
                <td>{s.idioma}</td>
                <td>{s.formato}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editar(s)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => excluir(s.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
