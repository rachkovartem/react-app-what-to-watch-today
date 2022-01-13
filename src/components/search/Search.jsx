import './Search.scss'
import './InputForm.scss'

import { useState, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

import search from '../../resources/icons/search.svg'

let timer;
function debounce(func, timeout = 500){
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const Search = (props) => {
  const nodeRef = useRef(null)
  const { setFilterSearch } = props;
  const [filter, setFilter] = useState(''); 
  const debouncedSetFilterSearch = debounce((e) => setFilterSearch(e), 500);
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return setIsMounted(false)
  }, [])
  
  const onClickSearch = (e) => {
    if (e.target.value !== undefined) {
      debouncedSetFilterSearch(e.target.value);
      setFilter(e.target.value)
    }
  }

  
  return (
    <section className="search">
      <CSSTransition in={true} appear={true} timeout={200} classNames="transition">
          <div className="container container__search">
            <h1 className="search__title">Запиши, что хотел посмотреть</h1>
            <p className="search__subtitle">И потом не нужно будет искать в безликих заметках, какие фильмы ты видел в Тик&#8209;токе, пока бездельничал на работе.</p>
            <div className="input-form">
              <img className="input-form__icon" src={search} alt="Поиск"/>
              <input 
              value={filter ? filter : ''} 
              onChange={onClickSearch} 
              autoComplete="off" 
              placeholder="название фильма или описание" 
              id="search" type="text" 
              className="input-form__input"/>
              <label className="input-form__label" htmlFor="search">Поиск по записанным фильмам</label>
            </div>
          </div>
      </CSSTransition>
    </section>   
  )
}

export default Search;