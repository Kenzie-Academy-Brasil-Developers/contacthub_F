import { useEffect, useState } from "react";
import { UserCard } from "./cardProfile";
import { contactHubWs } from "../../services/api";
import style from "./style.module.scss";

interface ReportComponentProps {
  userId?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  createdAt: string;
}

export const ReportComponent = ({ userId }: ReportComponentProps) => {
  const [user, setUser] = useState<User | undefined>();
  const [recentContacts, setRecentContacts] = useState<User[]>([]);
  const [totalContacts, setTotalContacts] = useState<number>(0);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("@Token:User");
        const response = await contactHubWs.get(`/report/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setUser(data.user);
        setTotalContacts(data.totalContacts);
        setRecentContacts(data.recentContacts);
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    if (userId !== undefined) {
      fetchReport();
    }
  }, [userId]);

  return (
    <div className={style.container}>
      <h1>Meu Perfil</h1>
      <div className={style.containerReport}>
        {user && <UserCard user={user} />}
      </div>
      <h2>Total de Contatos: {totalContacts}</h2>
      <h3>Contatos Recentes:</h3>
      <div className={style.containerContacts}>
        {recentContacts.map((contact) => (
          <UserCard key={contact.id} user={contact} />
        ))}
      </div>
    </div>
  );
};
