import FilmList from "../components/filmList/FilmList";
import AppSidemenu from "../components/sidemenu/AppSideMenu";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

import Search from "../components/search/Search";
import NewFilmDialog from "../components/newFilmDialog/NewFilmDialog";

const Main = () => {
  return (
    <>
      <Search />
      <ErrorBoundary>
        <AppSidemenu />
      </ErrorBoundary>

      <ErrorBoundary>
        <FilmList />
      </ErrorBoundary>

      <ErrorBoundary>
        <NewFilmDialog />
      </ErrorBoundary>
    </>
  );
};

export default Main;
