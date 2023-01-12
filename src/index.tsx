import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/app/App.jsx";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./config/apollo-client";
import { theme } from "./config/mui";
import { ThemeProvider } from "@mui/material";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <ScrollToTop />
          <Auth0Provider
            domain="dev-1t49jta2.us.auth0.com"
            clientId="AN5UCoIBmgqcXlbnCT0Dvg0jaLSOWrTd"
            redirectUri={window.location.origin}
            audience="https://dev-1t49jta2.us.auth0.com/api/v2/"
            scope="read:current_user update:current_user_metadata"
            useRefreshTokens={true}
            cacheLocation="localstorage"
          >
            <App />
          </Auth0Provider>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
