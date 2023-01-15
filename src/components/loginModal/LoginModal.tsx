import { CircularProgress, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useStore } from "effector-react";
import {
  $isLoginModalOpened,
  toggleLoginModal,
  updateUserData,
} from "../../models/auth";

import "./LoginModal.scss";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { AuthService } from "../../services/AuthService";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const LoginModal = () => {
  const open = useStore($isLoginModalOpened);
  const onClose = () => toggleLoginModal(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const loginResult = await AuthService.login(data);
      updateUserData(loginResult);
      onClose();
    } catch (e) {
      if (e.message === "Unauthorized") {
        setError("password", { message: "Неверный пароль" });
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="login-modal">
        <form className="login-modal__form" onSubmit={handleSubmit(onSubmit)}>
          <HighlightOffIcon
            sx={{
              cursor: "pointer",
              position: "absolute",
              top: "-20px",
              right: "-20px",
            }}
            onClick={onClose}
          />
          <p>Email</p>
          <TextField
            {...register("email")}
            className="login-modal__input"
            name="email"
            type="email"
          />
          <p>Пароль</p>
          <TextField
            {...register("password")}
            className="login-modal__input"
            name="password"
            type="password"
          />
          <Button
            className="login-modal__button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <CircularProgress
                sx={{ color: "var(--primary-400)", mr: "10px" }}
                size={30}
              />
            )}
            Войти
          </Button>
          {Object.values(errors).map((error, index) => (
            <Typography align="center" color="error" key={index}>
              {error.message}
            </Typography>
          ))}
        </form>
      </div>
    </Modal>
  );
};
