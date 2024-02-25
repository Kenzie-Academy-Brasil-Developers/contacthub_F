import { useForm } from "react-hook-form";
import { authUser } from "../../hooks/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, schemaRegister } from "../../pages/register/validator";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const FormRegister = () => {
  const { registerUser } = authUser();
  const { register, handleSubmit } = useForm<RegisterSchema>({
    resolver: zodResolver(schemaRegister),
  });

  const onSubmit = (data: RegisterSchema) => {
    const formData = { ...data };
    registerUser(formData);
  };

  return (
    <>
      <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" {...register("name")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="contactNumber">Celular</label>
        <input type="tel" id="contactNumber" {...register("contactNumber")} />

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register("password")} />

        <div>
          <p>
            Já possui uma conta?{" "}
            <Link className={style.redirectLogin} to={"/"}>
              clique aqui para entrar
            </Link>
          </p>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </>
  );
};
