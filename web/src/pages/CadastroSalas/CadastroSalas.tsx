import { useEffect, useState } from "react";
import {
  listSalas,
  createSala,
  updateSala,
  deleteSala,
} from "../../services/SalasService";
import type { Sala } from "../../models/Sala";

export default function CadastroSalas() {
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState<number | "">("");
  const [tipo, setTipo] = useState("Padrão");

  const [salas, setSalas] = useState<Sala[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    carregarSalas();
  }, []);

  function carregarSalas() {
    listSalas().then((res) => setSalas(res.data)).catch(() => showFeedback("Erro ao carregar salas.", "error"));
  }

  function limparFormulario() {
    setNome("");
    setCapacidade("");
    setTipo("Padrão");
    setEditId(null);
  }

  function showFeedback(msg: string, type: "success" | "error") {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3000);
  }

  async function salvarSala() {
    if (!nome || !capacidade || !tipo) {
      showFeedback("Preencha todos os campos!", "error");
      return;
    }

    const novaSala = {
      nome,
      capacidade: Number(capacidade),
      tipo,
    };

    try {
      if (editId === null) {
        await createSala(novaSala);
        showFeedback("Sala cadastrada com sucesso!", "success");
      } else {
        await updateSala(editId, novaSala);
        showFeedback("Sala atualizada com sucesso!", "success");
      }
      carregarSalas();
      limparFormulario();
    } catch (err) {
      showFeedback("Erro ao salvar sala.", "error");
    }
  }

  function editarSala(sala: Sala) {
    setNome(sala.nome);
    setCapacidade(sala.capacidade);
    setTipo(sala.tipo);
    setEditId(String(sala.id));
  }

  async function excluirSala(id: string) {
    if (confirm("Deseja realmente excluir esta sala?")) {
      try {
        await deleteSala(id);
        showFeedback("Sala excluída com sucesso!", "success");
        carregarSalas();
      } catch (err) {
        showFeedback("Erro ao excluir sala.", "error");
      }
    }
  }

  return (
    <div className="container mt-5 pt-5 text-white">
      <h2 className="mb-4">Cadastro de Salas</h2>

      {feedback && (
        <div className={`alert alert-${feedback.type === "success" ? "success" : "danger"}`}>
          {feedback.msg}
        </div>
      )}

      {/* FORMULÁRIO */}
      <div className="card bg-dark p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome da Sala</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Capacidade</label>
            <input
              type="number"
              className="form-control"
              value={capacidade}
              onChange={(e) => setCapacidade(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tipo</label>
            <select
              className="form-select"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="Padrão">Padrão</option>
              <option value="3D">3D</option>
              <option value="VIP">VIP</option>
              <option value="IMAX">IMAX</option>
            </select>
          </div>

          <div className="col-12">
            <button className="btn btn-danger w-100" onClick={salvarSala}>
              {editId === null ? "Salvar Sala" : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </div>

      {/* LISTA DE SALAS */}
      <h3 className="mt-4">Salas Cadastradas</h3>
      <div className="row gy-3 mt-1">
        {salas.length === 0 && (
          <p className="text-center">Nenhuma sala cadastrada.</p>
        )}

        {salas.map((s) => (
          <div className="col-md-4" key={s.id}>
            <div className="card bg-dark text-white p-3 shadow">
              <h5>{s.nome}</h5>
              <p className="mb-1"><strong>Capacidade:</strong> {s.capacidade}</p>
              <p className="mb-1"><strong>Tipo:</strong> {s.tipo}</p>

              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-warning w-50" onClick={() => editarSala(s)}>
                  Editar
                </button>
                <button className="btn btn-danger w-50" onClick={() => excluirSala(String(s.id))}>
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
