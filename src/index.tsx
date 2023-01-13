import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/index.scss";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./config/apollo-client";
import { theme } from "./config/mui";
import { ThemeProvider } from "@mui/material";
import App from "./components/app/App";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
