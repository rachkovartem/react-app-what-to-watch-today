import './Search.scss'
import './InputForm.scss'

import { useState } from 'react'
import { Transition } from 'react-transition-group'

import search from '../../resources/icons/search.svg'

let timer;
function debounce(func, timeout = 500){
  
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const Search = (props) => {
  const { setFilterSearch } = props;
  const [filter, setFilter] = useState(''); 

  const debouncedSetFilterSearch = debounce((e) => setFilterSearch(e), 500);

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }
  
  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };
  
  return (
    <Transition 
      component='li' 
      appear={false} 
      in={true} 
      timeout={duration}  
      >
        {state => (<section
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
          }}
        className="search container_search">
          <div className="container">
            <h1 className="search__title">Запиши, что хотел посмотреть</h1>
            <p className="search__subtitle">И потом не нужно будет искать в безликих заметках, какие фильмы ты видел в Тик&#8209;токе, пока бездельничал на работе.</p>
            <div className="input-form">
              <img className="input-form__icon" src={search} alt="Поиск"/>
              
              <input 
              value={filter ? filter : ''} 
              onChange={(e) => {debouncedSetFilterSearch(e.target.value); setFilter(e.target.value)}} 
              autoComplete="off" 
              placeholder="название фильма или описание" 
              id="search" type="text" 
              className="input-form__input"/>
              <label className="input-form__label" htmlFor="search">Поиск по записанным фильмам</label>
            </div>
          </div>
        </section>        
      )}
    </Transition>    
  )
}

export default Search;