import { UserProvider } from "./providers/userProvider";
import { RoutesMain } from "./routes";
import "./styles/index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <UserProvider>
        <RoutesMain />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
