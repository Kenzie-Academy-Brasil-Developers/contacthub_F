import { FormRegister } from "../../components/formRegister";
import style from "./style.module.scss";
import imgRegister from "./../../assets/imgRegister.png";

export const Register = () => {
  return (
    <main className={style.container}>
      <div>
        <img src={imgRegister} alt="image register" />
      </div>
      <div>
        <h1>Cadastro</h1>
        <FormRegister />
      </div>
    </main>
  );
};
