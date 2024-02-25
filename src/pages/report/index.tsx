import { useState } from "react";
import { ReportComponent } from "../../components/report";
import style from "./style.module.scss";
import { HeaderReport } from "../../components/report/header";

export const Report = () => {
  const [userId] = useState<number>(1);
  return (
    <>
      <HeaderReport />
      <main className={style.container}>
        <div>
          <h1>Resumo geral</h1>
          <ReportComponent userId={userId} />
        </div>
      </main>
    </>
  );
};
