import AuthInit from "auth/AuthInit";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
      <AuthInit>
        <Outlet />
      </AuthInit>
  );
};

export default App;
