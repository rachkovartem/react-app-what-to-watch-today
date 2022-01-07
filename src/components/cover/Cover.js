import aboutposter from '../../resources/img/aboutposter.jpg'

const Cover = (props) => {
  const {title, image} = props;
    return (
        <section className="cover">
          <div className="container">
            <div className="container__poster-wrapper">
              <img className="container__poster" src={image} alt="Постер"/>
            </div>
            <div className="cover__title-wrapper">
              <div className="cover__breadcrumbs">
                <a className="cover__breadcrumb" href="#">Movieiti</a>
                <span>/</span>
                <a className="cover__breadcrumb" href="#">Movies</a>
              </div>
              <h1 className="cover__title">{title}</h1>
            </div>
          </div>
        </section>
    )
}

export default Cover;