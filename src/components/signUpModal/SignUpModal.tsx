import { CircularProgress, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useStore } from "effector-react";
import {
  $isSignupModalOpened,
  toggleSignupModal,
  updateUserData,
} from "../../models/auth";

import "./SignUpModal.scss";
import { useForm } from "react-hook-form";
import { AuthService } from "../../services/AuthService";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";

export const SignUpModal = () => {
  const open = useStore($isSignupModalOpened);
  const onClose = () => toggleSignupModal(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const createdUser = await AuthService.signUp(data);
      if (createdUser) {
        const loginResult = await AuthService.login({
          email: data.email,
          password: data.password,
        });
        updateUserData(loginResult);
        toggleSignupModal(false);
      }
    } catch (e) {
      if (e.message.includes("emailAlreadyInUse")) {
        setError("email", { message: "Почта уже используется" });
      }
    }
  };

  console.log(errors);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="signup-modal">
        <form className="signup-modal__form" onSubmit={handleSubmit(onSubmit)}>
          <HighlightOffIcon
            sx={{
              cursor: "pointer",
              position: "absolute",
              top: "-20px",
              right: "-20px",
            }}
            onClick={onClose}
          />
          <p>Имя</p>
          <TextField
            {...register("name")}
            className="signup-modal__input"
            name="name"
          />
          <p>Email</p>
          <TextField
            {...register("email")}
            className="signup-modal__input"
            name="email"
            error={!!errors.email}
          />
          <p>Пароль</p>
          <TextField
            {...register("password")}
            className="signup-modal__input"
            name="password"
            type="password"
          />
          <Button
            className="signup-modal__button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <CircularProgress
                sx={{ color: "var(--primary-400)", mr: "10px" }}
                size={30}
              />
            )}
            Зарегистрироваться
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
