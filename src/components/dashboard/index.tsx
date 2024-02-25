import { HeaderDashBoard } from "./header";
import addIcon from "../../assets/addIcon.png";
import style from "./style.module.scss";
import { ContactCard } from "./card";
import { useEffect, useState } from "react";
import { contactHubWs } from "../../services/api";
import { ModalAddContact } from "../modals/addContact";

export interface Contact {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  createdAt: string;
}

export const DashBoardComponent = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("@Token:User");
        const response = await contactHubWs.get<Contact[]>(
          "contact/all/contacts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleModal = () => setIsOpenModal(!isOpenModal);

  return (
    <>
      <HeaderDashBoard />
      <div className={style.container}>
        <h2>Contatos</h2>
        <div className={style.containerAdd}>
          <div className={style.containerSearch}>
            <label htmlFor="searchContact">Buscar Contato</label>
            <input
              type="text"
              id="searchContact"
              placeholder="Digite o nome do contato"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <img src={addIcon} alt="adicionar contato" onClick={toggleModal} />
        </div>
        {isOpenModal && (
          <ModalAddContact
            toggleModal={toggleModal}
            setContacts={setContacts}
          />
        )}
        <main>
          <div className={style.containerUl}>
            {filteredContacts.length === 0 ? (
              <p>Nenhum contato encontrado.</p>
            ) : (
              <ul className={style.containerList}>
                {filteredContacts.map((contact) => (
                  <ContactCard
                    setContacts={setContacts}
                    contacts={contacts}
                    key={contact.id}
                    contact={contact}
                  />
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </>
  );
};
