import { Route, Routes, Navigate } from "react-router-dom"
import { HomePages } from "../pages/HomePages"
import { SobrePages } from "../pages/SobrePages"
import { UsuarioPages } from "../pages/UsuarioPages"
import { LoginPages } from "../pages/LoginPages"

import CadastroFilmes from "../pages/CadastroFilmes/CadastroFilmes";
import CadastroSalas from "../pages/CadastroSalas/CadastroSalas";

import CadastroSessoes from "../pages/CadastroSessoes/CadastroSessoes";
import VendaIngressos from "../pages/VendaIngressos/VendaIngressos";
import Sessoes from "../pages/Sessoes/Sessoes";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }: { children: JSX.Element, requireAdmin?: boolean }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && user?.role !== 'ADMIN') {
        // Redireciona com aviso amigável - na prática o toast ou alert seria melhor, 
        // mas o redirect para Home atende o requisito principal.
        alert('Acesso negado: Você não tem permissão para acessar esta página.');
        return <Navigate to="/" replace />;
    }

    return children;
};

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/login" element={<LoginPages />} />
            <Route path="/" element={<HomePages />} />
            <Route path="/sobre" element={<SobrePages />} />
            <Route path="/sessoes" element={<Sessoes />} />

            {/* Rotas Administrativas Protegidas */}
            <Route path="/usuario" element={
                <ProtectedRoute requireAdmin={true}>
                    <UsuarioPages />
                </ProtectedRoute>
            } />
            <Route path="/cadastro-filmes" element={
                <ProtectedRoute requireAdmin={true}>
                    <CadastroFilmes />
                </ProtectedRoute>
            } />
            <Route path="/cadastro-salas" element={
                <ProtectedRoute requireAdmin={true}>
                    <CadastroSalas />
                </ProtectedRoute>
            } />
            <Route path="/cadastro-sessoes" element={
                <ProtectedRoute requireAdmin={true}>
                    <CadastroSessoes />
                </ProtectedRoute>
            } />

            {/* Rotas de Usuário Logado (Qualquer um) */}
            <Route path="/venda-ingressos" element={
                <ProtectedRoute>
                    <VendaIngressos />
                </ProtectedRoute>
            } />
            
        </Routes>
    </>
    )
}
