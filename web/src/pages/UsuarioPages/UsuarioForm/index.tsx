import { useState, useEffect } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { IUsuario } from "../../../models/usuario.model";

interface UsuarioFormProps {
    key?: string;
    usuario: IUsuario | null;
    onSave: (usuario: IUsuario) => void;
    onCancel: () => void;
    errors?: Record<string, string>; // Recebe erros do pai
}

export const UsuarioForm = (
    { usuario = null, onSave, onCancel, errors = {} }: UsuarioFormProps) => {

    const [usuarioState, setUsuarioState] = useState<IUsuario>(usuario || { id: '', nome: '', email: '', senha: '', status: 'ativo', role: 'USER' });
    
    useEffect(() => {
        if (usuario) {
            setUsuarioState(usuario);
        } else {
            setUsuarioState({ id: '', nome: '', email: '', senha: '', status: 'ativo', role: 'USER' });
        }
    }, [usuario]);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-lg" style={{ backgroundColor: '#1e242d', color: '#fff', border: 'none' }}>
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Formulário de Usuário</h5>
                            
                            <div className="container">
                                <form onSubmit={(e) => { e.preventDefault(); onSave(usuarioState); }}>
                                    <div className="mb-3">
                                        <Input
                                            label="Nome"
                                            id="nome"
                                            type="text"
                                            placeholder="Digite o nome ..."
                                            value={usuarioState.nome}
                                            onChange={(value) => setUsuarioState({ ...usuarioState, nome: value })}
                                            error={errors.nome}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Input
                                            label="Email"
                                            id="email"
                                            type="email"
                                            placeholder="Digite o email ..."
                                            value={usuarioState.email}
                                            onChange={(value) => setUsuarioState({ ...usuarioState, email: value })}
                                            error={errors.email}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Input
                                            label="Senha"
                                            id="senha"
                                            type="password"
                                            placeholder="Digite a senha ..."
                                            value={usuarioState.senha}
                                            onChange={(value) => setUsuarioState({ ...usuarioState, senha: value })}
                                            error={errors.senha}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: 'white' }}>Permissão</label>
                                        <select 
                                            className="form-select" 
                                            value={usuarioState.role || 'USER'} 
                                            onChange={(e) => setUsuarioState({ ...usuarioState, role: e.target.value as 'ADMIN' | 'USER' })}
                                            style={{ backgroundColor: '#2a323d', color: '#fff', border: 'none' }}
                                        >
                                            <option value="USER">Usuário Comum</option>
                                            <option value="ADMIN">Administrador</option>
                                        </select>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <button 
                                                type="button"
                                                className="btn btn-secondary w-100"
                                                onClick={() => onCancel()}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button 
                                                type="submit"
                                                className="btn w-100 fw-bold"
                                                style={{ backgroundColor: '#ca0000', color: '#fff' }}
                                            >
                                                {usuarioState.id ? "Atualizar" : "Salvar"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}