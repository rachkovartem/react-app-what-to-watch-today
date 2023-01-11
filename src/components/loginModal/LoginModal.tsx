import { TextField } from "@mui/material";
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
import { useLazyQuery } from "@apollo/client";
import { AuthService } from "../../services/AuthService";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const LoginModal = () => {
  const [Login] = useLazyQuery(AuthService.LOGIN);
  const open = useStore($isLoginModalOpened);
  const onClose = () => toggleLoginModal(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const loginResult = await Login({
      variables: { email: data.email, password: data.password },
    });
    updateUserData(loginResult.data.login);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="login-modal">
        <form className="login-modal__form" onSubmit={handleSubmit(onSubmit)}>
          <HighlightOffIcon onClick={onClose} />
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
          <Button className="login-modal__button" type="submit">
            Войти
          </Button>
        </form>
      </div>
    </Modal>
  );
};
