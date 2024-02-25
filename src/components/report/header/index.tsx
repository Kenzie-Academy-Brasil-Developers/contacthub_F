import { Link } from "react-router-dom";
import imgLogoIcon from "../../../assets/imgLogoIcon.png";
import style from "./style.module.scss";

export const HeaderReport = () => {
  return (
    <div className={style.container}>
      <img src={imgLogoIcon} alt="imagem logo" />
      <Link className={style.redirectDashBoard} to={"/dashboard"}>
        Voltar
      </Link>
    </div>
  );
};
