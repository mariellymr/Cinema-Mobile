import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export const LoginPages = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [fieldErrors, setFieldErrors] = useState({ nome: '', email: '', senha: '' });

    const { login } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        const newErrors = { nome: '', email: '', senha: '' };

        if (!isLogin && !nome.trim()) {
            newErrors.nome = 'O nome é obrigatório.';
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'O email é obrigatório.';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Formato de e-mail inválido.';
            valid = false;
        }

        if (!senha.trim()) {
            newErrors.senha = 'A senha é obrigatória.';
            valid = false;
        } else if (!isLogin && senha.length < 6) {
            newErrors.senha = 'A senha deve ter no mínimo 6 caracteres.';
            valid = false;
        }

        setFieldErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        
        if (!validateForm()) return;

        setIsLoading(true);

        if (isLogin) {
            const success = await login(email, senha);
            setIsLoading(false);
            if (success) {
                navigate('/');
            } else {
                setError('Email ou senha inválidos.');
            }
        } else {
            try {
                const payload = {
                    name: nome.trim(),
                    email: email.trim(),
                    password: senha
                };
                
                const response = await api.post('/users', payload);
                
                if (response.status === 201) {
                    setSuccessMessage('Conta criada com sucesso! Redirecionando para o login...');
                    setNome('');
                    setEmail('');
                    setSenha('');
                    
                    setTimeout(() => {
                        setIsLogin(true);
                        setSuccessMessage('');
                        setError('');
                        setFieldErrors({ nome: '', email: '', senha: '' });
                    }, 2000);
                }
            } catch (err: any) {
                if (err.response && (err.response.status === 409 || err.response.data?.message?.includes('já existe') || err.response.data?.message?.includes('already exists'))) {
                    setError('Este e-mail já está cadastrado. Tente fazer login.');
                } else if (!err.response || err.response.status === 500) {
                    setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
                } else {
                    setError('Erro ao criar conta. Verifique os dados e tente novamente.');
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1e242d', color: '#fff' }}>
                <div className="card-body p-4">
                    <h3 className="text-center mb-4">{isLogin ? 'Entrar no Cinema' : 'Criar Conta'}</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    
                    <form onSubmit={handleSubmit} noValidate>
                        {!isLogin && (
                            <div className="mb-3 text-start">
                                <label className="form-label">Nome Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{ backgroundColor: '#2a323d', color: '#fff', border: fieldErrors.nome ? '1px solid #ca0000' : 'none' }}
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    disabled={isLoading}
                                />
                                {fieldErrors.nome && <div className="text-danger mt-1 small">{fieldErrors.nome}</div>}
                            </div>
                        )}
                        <div className="mb-3 text-start">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                style={{ backgroundColor: '#2a323d', color: '#fff', border: fieldErrors.email ? '1px solid #ca0000' : 'none' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                            {fieldErrors.email && <div className="text-danger mt-1 small">{fieldErrors.email}</div>}
                        </div>
                        <div className="mb-4 text-start">
                            <label className="form-label">Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                style={{ backgroundColor: '#2a323d', color: '#fff', border: fieldErrors.senha ? '1px solid #ca0000' : 'none' }}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                disabled={isLoading}
                            />
                            {fieldErrors.senha && <div className="text-danger mt-1 small">{fieldErrors.senha}</div>}
                        </div>
                        <button 
                            type="submit" 
                            className="btn w-100 mb-3 fw-bold" 
                            style={{ backgroundColor: '#ca0000', color: '#fff', transition: 'all 0.3s' }}
                            disabled={isLoading}
                        >
                            {isLoading ? (isLogin ? 'Entrando...' : 'Cadastrando...') : (isLogin ? 'Entrar' : 'Cadastrar-se')}
                        </button>
                    </form>
                    
                    <div className="text-center mt-3">
                        <button 
                            className="btn btn-link text-decoration-none" 
                            style={{ color: '#aaa' }}
                            onClick={() => { 
                                setIsLogin(!isLogin); 
                                setError(''); 
                                setSuccessMessage(''); 
                                setFieldErrors({ nome: '', email: '', senha: '' });
                            }}
                            disabled={isLoading}
                        >
                            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entrar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
