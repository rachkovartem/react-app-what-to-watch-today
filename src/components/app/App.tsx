import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import { LoginModal } from "../loginModal/LoginModal";
import { SignUpModal } from "../signUpModal/SignUpModal";
import Spinner from "../spinner/Spinner";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import UserProfile from "../userProfile/UserProfile";
import Page404 from "../../pages/Page404";
import Main from "../../pages/Main";
import { checkAuthFx } from "../../models/auth";

const AboutFilm = lazy(() => import("../../pages/AboutFilm"));

const App = () => {
  useEffect(() => {
    checkAuthFx();
  }, []);

  return (
    <>
      <Header />
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
      <LoginModal />
      <SignUpModal />
      <Footer />
      <UserProfile />
    </>
  );
};

export default App;
