import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { LoginModal } from "../loginModal/LoginModal";
import { SignUpModal } from "../signUpModal/SignUpModal";
import Spinner from "../spinner/Spinner";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import UserProfile from "../userProfile/UserProfile";
import Page404 from "../../pages/Page404";
import Main from "../../pages/Main";
import { AuthService } from "../../services/AuthService";
import { useLazyQuery } from "@apollo/client";
import { checkAuthFx } from "../../models/auth";

const AboutFilm = lazy(() => import("../../pages/AboutFilm"));

const App = () => {
  const location = useLocation();
  const [AuthCheck] = useLazyQuery(AuthService.AUTH_CHECK);

  useEffect(() => {
    checkAuthFx();
  }, [AuthCheck]);

  return (
    <>
      <CSSTransition
        appear={true}
        key={location.key}
        classNames="scale"
        timeout={300}
      >
        <Header />
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
                  <Main />
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
      <LoginModal />
      <SignUpModal />
      <Footer />
      <UserProfile />
    </>
  );
};

export default App;
