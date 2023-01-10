import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useStore } from "effector-react";
import { $isSignupModalOpened, toggleSignupModal } from "../../models/auth";

import "./SignUpModal.scss";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { AuthService } from "../../services/AuthService";

export const SignUpModal = () => {
  const [SignUp, { error, loading }] = useMutation(AuthService.SIGNUP);
  const open = useStore($isSignupModalOpened);
  const onClose = () => toggleSignupModal(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const result = await SignUp({ variables: data });
    console.log(result);
  };
  console.log(error, loading);
  return (
    <Modal open={open} onClose={onClose}>
      <div className="signup-modal">
        <form className="signup-modal__form" onSubmit={handleSubmit(onSubmit)}>
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
            Войти
          </Button>
        </form>
      </div>
    </Modal>
  );
};
