import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useStore } from "effector-react";
import {
  $isSignupModalOpened,
  toggleSignupModal,
  updateUserData,
} from "../../models/auth";

import "./SignUpModal.scss";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AuthService } from "../../services/AuthService";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const SignUpModal = () => {
  const [SignUp] = useMutation(AuthService.SIGNUP);
  const [Login] = useLazyQuery(AuthService.LOGIN);
  const open = useStore($isSignupModalOpened);
  const onClose = () => toggleSignupModal(false);

  const { register, handleSubmit } = useForm({
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
    const signupResult = await SignUp({ variables: data });
    const createdUser = signupResult.data.createUser;
    if (createdUser) {
      const loginResult = await Login({
        variables: { email: data.email, password: data.password },
      });
      updateUserData(loginResult.data.login);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="signup-modal">
        <form className="signup-modal__form" onSubmit={handleSubmit(onSubmit)}>
          <HighlightOffIcon onClick={onClose} />
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
          />
          <p>Пароль</p>
          <TextField
            {...register("password")}
            className="signup-modal__input"
            name="password"
          />
          <Button className="signup-modal__button" type="submit">
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </Modal>
  );
};
