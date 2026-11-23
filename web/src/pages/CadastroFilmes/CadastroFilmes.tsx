import { useEffect, useState } from "react";
import {
  listFilmes,
  createFilme,
  updateFilme,
  deleteFilme,
} from "../../services/FilmesService";
import type { Filme } from "../../models/Filme";

export default function CadastroFilmes() {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("Ação");
  const [descricao, setDescricao] = useState("");
  const [classificacaoIndicativa, setClassificacaoIndicativa] = useState("Livre");
  const [duracaoMinutos, setDuracaoMinutos] = useState<number | "">("");
  const [dataEstreia, setDataEstreia] = useState("");

  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    carregarFilmes();
  }, []);

  function carregarFilmes() {
    listFilmes().then((res) => setFilmes(res.data)).catch(() => showFeedback("Erro ao carregar filmes.", "error"));
  }

  function limparFormulario() {
    setTitulo("");
    setGenero("Ação");
    setDescricao("");
    setClassificacaoIndicativa("Livre");
    setDuracaoMinutos("");
    setDataEstreia("");
    setEditId(null);
  }

  function showFeedback(msg: string, type: "success" | "error") {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3000);
  }

  async function salvarFilme() {
    if (!titulo || !genero || !classificacaoIndicativa || !duracaoMinutos || !dataEstreia) {
      showFeedback("Preencha todos os campos obrigatórios!", "error");
      return;
    }

    const novoFilme = {
      titulo,
      descricao,
      genero,
      classificacaoIndicativa,
      duracaoMinutos: Number(duracaoMinutos),
      dataEstreia: new Date(dataEstreia).toISOString(),
    };

    try {
      if (editId === null) {
        await createFilme(novoFilme);
        showFeedback("Filme cadastrado com sucesso!", "success");
      } else {
        await updateFilme(editId, novoFilme);
        showFeedback("Filme atualizado com sucesso!", "success");
      }
      carregarFilmes();
      limparFormulario();
    } catch (err) {
      showFeedback("Erro ao salvar o filme.", "error");
    }
  }

  function editarFilme(filme: any) {
    setTitulo(filme.titulo || "");
    setGenero(filme.genero || "Ação");
    setDescricao(filme.descricao || "");
    setClassificacaoIndicativa(filme.classificacaoIndicativa || filme.classificacao || "Livre");
    setDuracaoMinutos(filme.duracaoMinutos || filme.duracao || "");
    
    // Tratamento para string ISO
    let dataFormatada = "";
    if (filme.dataEstreia || filme.estreia) {
        try {
            dataFormatada = new Date(filme.dataEstreia || filme.estreia).toISOString().split("T")[0];
        } catch(e) {
            dataFormatada = "";
        }
    }
    setDataEstreia(dataFormatada);
    setEditId(filme.id);
  }

  async function excluirFilme(id: number) {
    if (confirm("Deseja realmente excluir este filme?")) {
      try {
        await deleteFilme(id);
        showFeedback("Filme excluído com sucesso!", "success");
        carregarFilmes();
      } catch (err) {
        showFeedback("Erro ao excluir filme.", "error");
      }
    }
  }

  return (
    <div className="container mt-5 pt-5 text-white">
      <h2 className="mb-4">Cadastro de Filmes</h2>

      {feedback && (
        <div className={`alert alert-${feedback.type === "success" ? "success" : "danger"}`}>
          {feedback.msg}
        </div>
      )}

      {/* FORMULÁRIO */}
      <div className="card bg-dark text-white p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Título</label>
            <input 
              type="text" 
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Gênero</label>
            <select 
              className="form-select"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option>Ação</option>
              <option>Drama</option>
              <option>Comédia</option>
              <option>Aventura</option>
              <option>Animação</option>
              <option>Documentário</option>
              <option>Fantasia</option>
              <option>Musical</option> 
              <option>Terror</option>
              <option>Romance</option>
              <option>Ficção Científica</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Descrição</label>
            <textarea 
              className="form-control"
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>

          <div className="col-md-4">
            <label className="form-label">Classificação Indicativa</label>
            <select 
              className="form-select"
              value={classificacaoIndicativa}
              onChange={(e) => setClassificacaoIndicativa(e.target.value)}
            >
              <option value="Livre">Livre</option>
              <option value="10">10 Anos</option>
              <option value="12">12 Anos</option>
              <option value="14">14 Anos</option>
              <option value="16">16 Anos</option>
              <option value="18">18 Anos</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Duração (minutos)</label>
            <input 
              type="number"
              className="form-control"
              value={duracaoMinutos}
              onChange={(e) => setDuracaoMinutos(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Data de Estreia</label>
            <input
              type="date"
              className="form-control"
              value={dataEstreia}
              onChange={(e) => setDataEstreia(e.target.value)}
            />
          </div>

          <div className="col-12">
            <button 
              className="btn btn-danger w-100"
              onClick={salvarFilme}
            >
              {editId === null ? "Salvar Filme" : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </div>

      {/* LISTA DE FILMES */}
      <h3 className="mt-4">Filmes Cadastradas</h3>
      <div className="row gy-3 mt-1">
        {filmes.length === 0 && (
          <p className="text-center">Nenhum filme cadastrado.</p>
        )}

        {filmes.map((f: any) => (
          <div className="col-md-4" key={f.id}>
            <div className="card bg-dark text-white p-3 shadow">
              <h5>{f.titulo}</h5>
              <p className="mb-1"><strong>Gênero:</strong> {f.genero}</p>
              <p className="mb-1"><strong>Classificação:</strong> {f.classificacaoIndicativa || f.classificacao}</p>
              <p className="mb-1"><strong>Duração:</strong> {f.duracaoMinutos || f.duracao} min</p>

              <div className="d-flex gap-2 mt-2">
                <button 
                  className="btn btn-warning w-50"
                  onClick={() => editarFilme(f)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger w-50"
                  onClick={() => excluirFilme(f.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}