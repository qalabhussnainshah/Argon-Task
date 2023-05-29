import Login from "./pages/Login/Login";
import Home from "../src/pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Admin from "../src/pages/adminDashboard/adminDashboard";
import Missing from "../src/pages/Missing/Missing";
import Unauthorized from "../src/pages/Unauthorized/Unauthorized";
import RequireAuth from "../src/pages/RequireAuth/RequireAuth";
import { Routes, Route } from "react-router-dom";

const ROLES = {
  User: "user",
  Admin: "admin",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
