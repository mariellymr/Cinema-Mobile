import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Nav = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-dark p-3 mb-3 text-white">
        <div className="d-flex align-items-center">
          <Link
            to="/"
            className="navbar-brand me-4 ms-2"
            style={{ fontFamily: "'Lobster Two', cursive", color: '#f5c518', fontSize: '2rem', fontWeight: 'bold', textDecoration: 'none' }}
          >
            Lumière
          </Link>
          <ul className="nav">

            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/sessoes">Sessões Disponíveis</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/sobre">Sobre</Link>
            </li>

            {/* Administrativo */}
            {isAuthenticated && user?.role === 'ADMIN' && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="cadastroDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Cadastro
                </a>
                <ul className="dropdown-menu" aria-labelledby="cadastroDropdown">
                  <li>
                    <Link className="dropdown-item" to="/cadastro-filmes">Cadastro de Filmes</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/cadastro-salas">Cadastro de Salas</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/cadastro-sessoes">Cadastro de Sessões</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/usuario">Cadastro de Usuários</Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Cliente */}
            {isAuthenticated && user?.role === 'USER' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/venda-ingressos">Meus Ingressos</Link>
              </li>
            )}
          </ul>
        </div>

        <ul className="nav">
          {!isAuthenticated ? (
            <li className="nav-item">
              <Link className="btn btn-outline-light ms-3" style={{ borderColor: '#ca0000', color: '#fff', backgroundColor: '#ca0000' }} to="/login">Entrar</Link>
            </li>
          ) : (
            <li className="nav-item d-flex align-items-center">
              <span className="me-3 fw-bold">
                Olá, {user?.name || user?.nome}
                {user?.role === 'ADMIN' && (
                  <span className="badge bg-danger ms-2" style={{ fontSize: '0.75rem', verticalAlign: 'middle' }}>ADMIN</span>
                )}
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Sair</button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
