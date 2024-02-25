import { Dispatch, SetStateAction } from "react";
import { Modal } from "../modalComponent";
import style from "./style.module.scss";
import { Contact } from "../../dashboard";
import { contactHubWs } from "../../../services/api";
import { toast } from "react-toastify";

interface ModalProps {
  toggleModal: () => void;
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  contacts: Contact[];
  contactId: number;
}

export const ModalDelete = ({
  setContacts,
  toggleModal,
  contactId,
}: ModalProps) => {
  const contactDelete = async (contactId: number) => {
    try {
      const token = localStorage.getItem("@Token:User");
      await contactHubWs.delete<Contact>(`contact/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts((previousContacts) =>
        previousContacts.filter((contact) => contact.id !== contactId)
      );
      toast.success("Contato excluído!");
      toggleModal();
    } catch (error) {
      toast.error("Erro ao excluir contato.");
    }
  };

  const handleDelete = () => {
    contactDelete(contactId);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <div className={style.container}>
        <p>Deseja excluir?</p>
        <div className={style.containerButtons}>
          <button onClick={handleDelete}>Sim</button>
          <button onClick={toggleModal}>Não</button>
        </div>
      </div>
    </Modal>
  );
};
