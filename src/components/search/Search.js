import search from '../../resources/icons/search.svg'


const Search = () => {

    
    




    return (
        <section className="search container_search">
          <div className="container">
            <h1 className="search__title">Запиши, что хотел посмотреть</h1>
            <p className="search__subtitle">И потом не нужно будет искать в безликих заметках, какие фильмы ты видел в Тик&#8209;токе, пока бездельничал на работе.</p>
            <div className="input-form">
              <img className="input-form__icon" src={search} alt="Поиск"/>
              
              <input autoComplete="off" placeholder="название фильма или описание" id="search" type="text" className="input-form__input"/>
              <label className="input-form__label" htmlFor="search">Поиск по записанным фильмам</label>
            </div>
            
          
          </div>
        </section>
    )
}

export default Search;