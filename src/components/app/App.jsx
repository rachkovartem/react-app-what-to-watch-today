import { useLazyQuery } from "@apollo/client";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { updateUserData } from "../../models/auth";
import { AuthService } from "../../services/AuthService";
import { ToWatchList, Page404 } from "../pages";
import { SignUpModal } from "../signUpModal/SignUpModal";
import Spinner from "../spinner/Spinner";

import Header from "../header/Header";
import Footer from "../footer/Footer";

const AboutFilm = lazy(() => import("../pages/AboutFilm"));

const App = () => {
  const [AuthCheck] = useLazyQuery(AuthService.AUTH_CHECK);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filmsToWatch, setFilmsToWatch] = useState(0);
  const [domContentLoaded, setDomContentLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AuthCheck().then((result) => updateUserData(result.data.profile));
  }, [AuthCheck]);

  const onDomLoaded = () => {
    setDomContentLoaded(true);
  };
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", onDomLoaded);
  }, []);

  useEffect(() => {
    if (!domContentLoaded) {
      return;
    }
    if (drawerOpen) {
      document
        .querySelector(".header__hamburger")
        .classList.add("header__hamburger_active");
      if (window.innerWidth > 900) {
        document.querySelector(".header__hamburger").style.marginRight = "3px";
        document.querySelector(".film-list__add-button").style.marginRight =
          "3px";
      }
    }
    if (!drawerOpen) {
      document
        .querySelector(".header__hamburger")
        .classList.remove("header__hamburger_active");
      if (window.innerWidth > 900) {
        document.querySelector(".header__hamburger").style.marginRight = "";
        document.querySelector(".film-list__add-button").style.marginRight = "";
      }
    }
  }, [drawerOpen]);

  const onClickDrawerToggle = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };

  const View = () => {
    return (
      <>
        <CSSTransition
          appear={true}
          key={location.key}
          classNames="scale"
          timeout={300}
        >
          <Header
            onClickDrawerToggle={onClickDrawerToggle}
            drawerOpen={drawerOpen}
            filmsToWatch={filmsToWatch}
            domContentLoaded={domContentLoaded}
          />
        </CSSTransition>
        <TransitionGroup component={null}>
          <CSSTransition
            appear={true}
            key={location.key}
            classNames="scale"
            timeout={300}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <div className="default-view scale">
                    <ToWatchList
                      drawerOpen={drawerOpen}
                      setDrawerOpen={setDrawerOpen}
                      setFilmsToWatch={setFilmsToWatch}
                    />
                  </div>
                }
              />
              <Route
                path="/film/:id"
                element={
                  <Suspense fallback={<Spinner />}>
                    <div className="default-view scale">
                      <AboutFilm />
                    </div>
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <div className="default-view scale">
                    <Page404 />
                  </div>
                }
              />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        <SignUpModal />
        <Footer />
      </>
    );
  };
  return <>{View()}</>;
};

export default App;
