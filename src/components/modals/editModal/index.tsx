import { Dispatch, SetStateAction } from "react";
import { Contact } from "../../dashboard";
import { Modal } from "../modalComponent";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { contactHubWs } from "../../../services/api";
import { UpdatedContact } from "./validator";
import { toast } from "react-toastify";
import style from "./style.module.scss";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  toggleModal: () => void;
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  contacts: Contact[];
  contactId: number;
}

export const ModalEdit = ({
  contacts,
  toggleModal,
  contactId,
  setContacts,
}: ModalProps) => {
  const { register, handleSubmit, setValue } = useForm<UpdatedContact>();

  const contactToEdit = contacts.find((contact) => contact.id === contactId);

  useEffect(() => {
    if (contactToEdit) {
      setValue("name", contactToEdit.name);
      setValue("email", contactToEdit.email);
      setValue("contactNumber", contactToEdit.contactNumber);
    }
  }, [contactToEdit, setValue]);
  const updatedContact = async (formData: UpdatedContact) => {
    try {
      const token = localStorage.getItem("@Token:User");
      const response = await contactHubWs.patch<Contact>(
        `contact/${contactId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContacts((previousContacts) => {
        const updatedContacts = previousContacts.map((contact) =>
          contact.id === contactId ? response.data : contact
        );
        return updatedContacts;
      });
      toast.success("Contato atualizado com sucesso!");
      toggleModal();
    } catch (error) {
      toast.error("Erro ao atualizar contato, verifique os dados.");
    }
  };

  const onSubmit = (data: UpdatedContact) => {
    const formData = { ...data };
    updatedContact(formData);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <div className={style.container}>
        <div className={style.containerContent}>
          <div className={style.containerHeader}>
            <h1>Editar contato</h1>
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
            <button type="submit">atualizar</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
