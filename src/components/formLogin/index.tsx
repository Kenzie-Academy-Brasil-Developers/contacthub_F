import { useForm } from "react-hook-form";
import { authUser } from "../../hooks/user";
import { LoginSchema, schemaLogin } from "../../pages/login/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

export const FormLogin = () => {
  const { login } = authUser();
  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(schemaLogin),
  });

  const submit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <>
      <form className={style.container} onSubmit={handleSubmit(submit)}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register("password")} />
        <div>
          <p>
            Ainda não possui uma conta?{" "}
            <Link className={style.redirectRegister} to={"/register"}>
              {" "}
              clique aqui para criar uma
            </Link>
          </p>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </>
  );
};
