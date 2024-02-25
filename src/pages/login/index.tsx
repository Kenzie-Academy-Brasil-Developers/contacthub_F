import { FormLogin } from "../../components/formLogin";
import imgLogin from "../../assets/imgLogin.png";
import style from "./style.module.scss";

export const Login = () => {
  return (
    <main className={style.container}>
      <div>
        <img src={imgLogin} alt="image login" />
      </div>
      <div>
        <h1>Login</h1>
        <FormLogin />
      </div>
    </main>
  );
};
