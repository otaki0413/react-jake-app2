import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManagement";
import { HeaderLayout } from "../components/templates/HeaderLayout";

export const Router: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />
      {/* ネストされたルート */}
      <Route
        path="/home"
        element={<Home />}
      />
      <Route
        path="/home/user_management"
        element={
          <HeaderLayout>
            <UserManagement />
          </HeaderLayout>
        }
      />
      <Route
        path="/home/setting"
        element={
          <HeaderLayout>
            <Setting />
          </HeaderLayout>
        }
      />
      <Route
        path="/*"
        element={<Page404 />}
      />
    </Routes>
  );
};
