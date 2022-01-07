import poster from '../../resources/img/poster.jpg';
import kinopoiskImg from '../../resources/img/kinopoisk.svg';
import imdbImg from '../../resources/img/IMDB.svg';

const Description = () => {


    return (
        <section class="description">
          <div class="container">
            <div class="description__grid">
              <div class="description__poster-wrapper">
                <img class="description__poster" src={poster}/>
              </div>
              
              <div class="description__about">
                <h2 class="description__slogan">Тихого пофигиста по ошибке принимают за богача. Криминальная комедия братьев Коэн, которая разошлась на цитаты</h2>
                
                <p class="description__main-text">Лос-Анджелес, 1991 год, война в Персидском заливе. Главный герой по прозвищу Чувак считает себя совершенно счастливым человеком. Его жизнь составляют игра в боулинг и выпивка. Но внезапно его счастье нарушается, гангстеры по ошибке принимают его за миллионера-однофамильца, требуют деньги, о которых он ничего не подозревает, и, ко всему прочему, похищают жену миллионера, будучи уверенными, что «муж» выплатит за нее любую сумму.</p>
                
                <div class="ratings ratings_position_initial">
                  <img class="rating-icon rating-icon_big" src={kinopoiskImg} alt="Кинопоиск"/>
                  <span class="rating rating_big">8.8</span>
                  <img class="rating-icon rating-icon_big rating-icon_margin_left" src={imdbImg} alt="IMDB"/>
                  <span class="rating rating_big">9</span>
                </div>

                <div class="description__detalis">
                  <p class="description__details__title">Тип</p>
                  <p class="description__details__value">Фильм</p>
                </div>

                <div class="description__detalis">
                  <p class="description__details__title">Год релиза</p>
                  <p class="description__details__value">1998</p>
                </div>
                
                <div class="description__detalis">
                  <p class="description__details__title">Длительность</p>
                  <p class="description__details__value">117 минут</p>
                </div>

                <div class="description__detalis">
                  <p class="description__details__title">Жанры</p>
                  <p class="description__details__value">Комедия, криминал, спорт</p>
                </div>
              
              
              </div>

              
            </div>
          </div>
        </section>
    )
}

export default Description;