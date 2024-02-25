import { Dispatch, SetStateAction } from "react";
import { Contact } from "../../dashboard";
import { Modal } from "../modalComponent";
import style from "./style.module.scss";
import { useForm } from "react-hook-form";
import { CreateContact, schema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactHubWs } from "../../../services/api";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  toggleModal: () => void;
  setContacts: Dispatch<SetStateAction<Contact[]>>;
}

export const ModalAddContact = ({ setContacts, toggleModal }: ModalProps) => {
  const { register, handleSubmit } = useForm<CreateContact>({
    resolver: zodResolver(schema),
  });

  const createContact = async (formData: CreateContact) => {
    try {
      const token = localStorage.getItem("@Token:User");
      const response = await contactHubWs.post<Contact>("contact", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts((previousContacts) => [response.data, ...previousContacts]);
      toast.success("Contato criado com sucesso!");
      toggleModal();
    } catch (error) {
      toast.error("Dados incorretos.");
    }
  };
  const onSubmit = (data: CreateContact) => {
    const formData = { ...data };
    createContact(formData);
  };
  return (
    <Modal toggleModal={toggleModal}>
      <div className={style.container}>
        <div className={style.containerContent}>
          <div className={style.containerHeader}>
            <h1>Adicionar contato</h1>
            <CloseIcon onClick={toggleModal} className={style.closeButton} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="digite o nome aqui"
              {...register("name")}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="digite o email aqui"
              {...register("email")}
            />
            <label htmlFor="contactNumber">Telefone</label>
            <input
              type="tel"
              id="contactNumber"
              placeholder="digite o telefone aqui"
              {...register("contactNumber")}
            />
            <button type="submit">adicionar</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
