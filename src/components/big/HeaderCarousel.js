import '../../static/css/components/HeaderCarousel.css'

function HeaderCarousel()
{
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={require('../../static/imgs/header/1.jpg')} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h1>ProfiProf</h1>
                            <h3>Cauta profesoul de care ai nevoie</h3>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={require('../../static/imgs/header/2.jpg')} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h1>ProfiProf</h1>
                            <h3>Cauta profesoul de care ai nevoie</h3>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={require('../../static/imgs/header/3.jpg')} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h1>ProfiProf</h1>
                            <h3>Cauta profesoul de care ai nevoie</h3>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}

export default HeaderCarousel;