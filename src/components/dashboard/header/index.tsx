import menuIcon from "./../../../assets/menuIcon.png";
import style from "./style.module.scss";
import { ModalMenu } from "../../modals/menuModal";
import { useState } from "react";
import imgLogoIcon from "../../../assets/imgLogoIcon.png";

export const HeaderDashBoard = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);
  return (
    <header>
      <div className={style.container}>
        <img src={imgLogoIcon} alt="icone logo" className={style.imgLogo} />
        <img src={menuIcon} alt="icone menu" onClick={toggleModal} />
      </div>
      {isOpenModal && <ModalMenu toggleModal={toggleModal} />}
    </header>
  );
};
