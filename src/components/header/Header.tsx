import "./Header.scss";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useStore } from "effector-react";

import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Logout from "@mui/icons-material/Logout";
import {
  $isDrawerOpened,
  toggleDrawer,
  toggleUserProfile,
} from "../../models/app";
import {
  $isAuthenticated,
  $userData,
  clearUserData,
  toggleLoginModal,
  toggleSignupModal,
} from "../../models/auth";
import { AuthService } from "../../services/AuthService";

export default function Header() {
  const theme = useTheme();
  const isDrawerOpened = useStore($isDrawerOpened);
  const isAuthenticated = useStore($isAuthenticated);
  const userData = useStore($userData);
  const [_, { loading }] = useMutation(AuthService.SIGNUP);
  const [LogoutFunction] = useLazyQuery(AuthService.LOGOUT);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLDivElement>(null);
  const location = useLocation();
  const onClickSignUp = () => toggleSignupModal(true);
  const onClickLogin = () => toggleLoginModal(true);

  const open = Boolean(menuAnchorEl);

  const handleClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const handleClickLogout = async () => {
    await LogoutFunction();
    clearUserData();
  };

  const openProfileModal = () => toggleUserProfile(true);

  return (
    <>
      <header className="header">
        <div className="container container_header">
          <div className="header__wrapper">
            {!loading && isAuthenticated && (
              <div className="header__button-avatar-wrapper">
                <button
                  type="button"
                  className="header__button-avatar"
                  onClick={handleClick}
                >
                  <Avatar alt={userData.email}>{userData?.email[0]}</Avatar>
                </button>
                <Typography
                  sx={{
                    [theme.breakpoints.down(520)]: {
                      display: "none",
                    },
                  }}
                  color="#fff"
                >
                  {userData?.email}
                </Typography>
              </div>
            )}
            <Menu
              anchorEl={menuAnchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  borderRadius: "12px",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 20,
                    width: 10,
                    height: 10,
                    bgcolor: "var(--grey-500)",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              <MenuItem onClick={openProfileModal}>
                <ListItemIcon>
                  <AccountBoxIcon fontSize="small" />
                </ListItemIcon>
                Профиль
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClickLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Выйти
              </MenuItem>
            </Menu>
            {!isAuthenticated && (
              <div className="header__buttons-wrapper">
                <button
                  type="button"
                  className="header__nav-el header__button"
                  onClick={onClickLogin}
                >
                  Войти
                </button>
                <button
                  type="button"
                  className="header__nav-el header__button"
                  onClick={onClickSignUp}
                >
                  Регистрация
                </button>
              </div>
            )}
            <div className="header__nav-ham-wrapper">
              <nav className="header__nav-menu">
                <ul className="header__nav-menu-list">
                  <li className="header__nav-menu-list-item">
                    <Link to="/" className="header__nav-el">
                      Главная
                    </Link>
                  </li>
                </ul>
              </nav>
              {location.pathname === "/" && (
                <div
                  onClick={() => toggleDrawer(!isDrawerOpened)}
                  className={`header__hamburger ${
                    isDrawerOpened ? "header__hamburger_active" : ""
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <g strokeWidth="6.5" strokeLinecap="round">
                      <path
                        d="M72 82.286h28.75"
                        fill="#009100"
                        fillRule="evenodd"
                        stroke="#fff"
                      />
                      <path
                        d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
                        fill="none"
                        stroke="#fff"
                      />
                      <path
                        d="M72 125.143h28.75"
                        fill="#009100"
                        fillRule="evenodd"
                        stroke="#fff"
                      />
                      <path
                        d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
                        fill="none"
                        stroke="#fff"
                      />
                      <path
                        d="M100.75 82.286h28.75"
                        fill="#009100"
                        fillRule="evenodd"
                        stroke="#fff"
                      />
                      <path
                        d="M100.75 125.143h28.75"
                        fill="#009100"
                        fillRule="evenodd"
                        stroke="#fff"
                      />
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
