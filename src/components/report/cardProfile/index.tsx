import style from "./style.module.scss";
import contactIcon from "../../../assets/card/contactIcon.svg";
import emailIcon from "../../../assets/card/emailIcon.svg";
import telIcon from "../../../assets/card/telIcon.svg";
import { User } from "./../index";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className={style.container}>
      <div className={style.containerContact}>
        <img src={contactIcon} alt="icone nome" />
        <p>{user.name}</p>
      </div>
      <div className={style.containerContact}>
        <img src={emailIcon} alt="icone email" />
        <p>{user.email}</p>
      </div>
      <div className={style.containerContact}>
        <img src={telIcon} alt="icone telefone" />
        <p>{user.contactNumber}</p>
      </div>
      <div className={style.containerDate}>
        <p>Criado em:</p>
        <span>{user.createdAt}</span>
      </div>
    </div>
  );
};
