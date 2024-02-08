import { useForm } from "react-hook-form";
import { authUser } from "../../hooks/user";
import { LoginSchema, schema } from "../../pages/login/validator";
import { zodResolver } from "@hookform/resolvers/zod";

export const FormLogin = () => {
  const { login } = authUser();
  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
  });

  const submit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register("password")} />

        <button type="submit">Entrar</button>
      </form>
    </>
  );
};
