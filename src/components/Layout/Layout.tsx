import { FC } from "react";
import Header from "./Header/Header";

import { Outlet } from "react-router-dom";

interface LayoutProps {
  loggedIn: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ loggedIn, onLogout }) => {
  return (
    <div className="layout">
      <Header loggedIn={loggedIn} onLogout={onLogout} />
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
