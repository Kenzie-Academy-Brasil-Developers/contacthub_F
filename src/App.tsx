import { UserProvider } from "./providers/userProvider";
import { RoutesMain } from "./routes";

function App() {
  return (
    <>
      <UserProvider>
        <RoutesMain />
      </UserProvider>
    </>
  );
}

export default App;
