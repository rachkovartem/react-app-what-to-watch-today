import aboutposter from '../../resources/img/aboutposter.jpg'

const Cover = () => {
    return (
        <section class="cover">
          <div class="container">
            <div class="container__poster-wrapper">
              <img class="container__poster" src={aboutposter} alt="Постер"/>
            </div>
            <div class="cover__title-wrapper">
              <div class="cover__breadcrumbs">
                <a class="cover__breadcrumb" href="#">Movieiti</a>
                <span>/</span>
                <a class="cover__breadcrumb" href="#">Movies</a>
              </div>
              <h1 class="cover__title">Большой Лебовски</h1>
            </div>
          </div>
        </section>
    )
}

export default Cover;