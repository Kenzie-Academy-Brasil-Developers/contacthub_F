import { ContactSchema } from "../../../pages/dashboard/validator";
import style from "./style.module.scss";
import contactIcon from "../../../assets/card/contactIcon.svg";
import deleteIcon from "../../../assets/card/deleteIcon.svg";
import editIcon from "../../../assets/card/editIcon.svg";
import emailIcon from "../../../assets/card/emailIcon.svg";
import telIcon from "../../../assets/card/telIcon.svg";
import imgHeader from "../../../assets/card/imgCard.svg";
import { useState } from "react";
import { ModalDelete } from "../../modals/deleteModal";
import { ModalEdit } from "../../modals/editModal";

interface ContactCardProps {
  contact: ContactSchema;
  setContacts: React.Dispatch<React.SetStateAction<ContactSchema[]>>;
  contacts: ContactSchema[];
}

export const ContactCard = ({
  contact,
  setContacts,
  contacts,
}: ContactCardProps) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );

  const toggleDeleteModal = (contactId: number) => {
    setSelectedContactId(contactId);
    setIsOpenDeleteModal(true);
  };

  const toggleEditModal = (contactId: number) => {
    setSelectedContactId(contactId);
    setIsOpenEditModal(true);
  };

  return (
    <>
      <li className={style.container}>
        <img
          className={style.imgHeader}
          src={imgHeader}
          alt="icone cabeçalho"
        />
        <div className={style.containerContact}>
          <img src={contactIcon} alt="icone nome" />
          <p>{contact.name}</p>
        </div>
        <div className={style.containerContact}>
          <img src={emailIcon} alt="icone email" />
          <p>{contact.email}</p>
        </div>
        <div className={style.containerContact}>
          <img src={telIcon} alt="icone telefone" />
          <p>{contact.contactNumber}</p>
        </div>
        <div className={style.containerDate}>
          <p>criado em:</p>
          <span>{contact.createdAt}</span>
        </div>
        <div className={style.containerEdit}>
          <img
            src={editIcon}
            alt="icone edição"
            onClick={() => toggleEditModal(contact.id)}
          />
          <img
            src={deleteIcon}
            alt="icone deleção"
            onClick={() => toggleDeleteModal(contact.id)}
          />
        </div>
        {isOpenDeleteModal && (
          <ModalDelete
            setContacts={setContacts}
            toggleModal={() => setIsOpenDeleteModal(false)}
            contacts={contacts}
            contactId={selectedContactId || 0}
          />
        )}
        {isOpenEditModal && (
          <ModalEdit
            setContacts={setContacts}
            toggleModal={() => setIsOpenEditModal(false)}
            contacts={contacts}
            contactId={selectedContactId || 0}
          />
        )}
      </li>
    </>
  );
};
