import { Link } from 'react-router-dom';
import { bannersMock, filmesEmCartazMock } from '../../services/mockData';
import './Home.css'; // Let's create a css file for specific styles

export const HomePages = () => {
  return (
    <div className="home-container bg-dark text-white pb-5">
      
      {/* Hero Banner Carousel */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {bannersMock.map((_, index) => (
            <button 
              key={index} 
              type="button" 
              data-bs-target="#heroCarousel" 
              data-bs-slide-to={index} 
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        
        <div className="carousel-inner">
          {bannersMock.map((banner, index) => (
            <div key={banner.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div 
                className="banner-image"
                style={{ 
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.1)), url(${banner.imagemUrl})`
                }}
              ></div>
              <div className="carousel-caption d-none d-md-block text-start" style={{ bottom: '20%', left: '10%' }}>
                <h1 className="fw-bold display-4 text-uppercase mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  {banner.titulo}
                </h1>
                <h4 className="fw-light mb-4 text-uppercase" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                  {banner.subtitulo}
                </h4>
                <Link to={banner.linkAcao} className="btn btn-lg fw-bold text-dark px-4 py-2 banner-btn" style={{ backgroundColor: '#fff', borderRadius: '4px' }}>
                  COMPRE AGORA &#9654;
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Em Cartaz Section */}
      <div className="container mt-5">
        <h3 className="fw-bold text-uppercase mb-4 px-2 border-start border-4 border-danger">Em Cartaz</h3>
        
        <div className="row g-4">
          {filmesEmCartazMock.map((filme) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg" key={filme.id}>
              <Link to="/sessoes" className="text-decoration-none">
                <div className="card h-100 bg-transparent border-0 movie-card position-relative">
                  <div className="position-absolute top-0 start-0 m-2 z-1">
                    <span className="badge text-dark fw-bold px-2 py-1" style={{ backgroundColor: '#ccc' }}>
                      ASSISTA AGORA
                    </span>
                  </div>
                  <div className="poster-container overflow-hidden rounded">
                    <img 
                      src={filme.posterUrl} 
                      className="card-img-top w-100 object-fit-cover" 
                      alt={filme.titulo}
                      style={{ aspectRatio: '2/3' }}
                    />
                  </div>
                  <div className="card-body px-0 pt-3 pb-0 text-white">
                    <h6 className="card-title fw-bold text-uppercase mb-1 movie-title">{filme.titulo}</h6>
                    <p className="card-text text-muted small">{filme.genero} • {filme.classificacao}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
