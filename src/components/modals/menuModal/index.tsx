import { Link } from "react-router-dom";
import { Modal } from "../modalComponent";
import style from "./style.module.scss";

interface ModalProps {
  toggleModal: () => void;
}

export const ModalMenu = ({ toggleModal }: ModalProps) => {
  return (
    <Modal toggleModal={toggleModal}>
      <div className={style.container}>
        <Link className={style.redirectReport} to={"/report"}>Resumo geral</Link>
        <div className={style.containerClose}>
          <Link className={style.redirectLogin} to={"/"}>
            sair
          </Link>
        </div>
      </div>
    </Modal>
  );
};
