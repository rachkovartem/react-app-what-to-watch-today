import "./Footer.scss";

export default function footer() {
  return (
    <section className="footer">
      <div className="container">
        <div className="footer__disclamer">
          Личный проект, свёрстанный и написанный фронтенд разработчиком{" "}
          <a
            href="https://artem-rachkov.ru/"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Артёмом Рачковым
          </a>
          .
        </div>
        <div className="footer__github">
          Исходники в{" "}
          <a
            href="https://github.com/rachkovartem/react-app-what-to-watch-today"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            репозитории
          </a>{" "}
          на GitHub.
        </div>
      </div>
    </section>
  );
}
