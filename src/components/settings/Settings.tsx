import * as React from "react";
import { useState } from "react";
import BackgroundSettings from "./Background";
import QuoteSettings from "./Quote";
import TerminalSettings from "./Terminal";
import "./Settings.css";

export interface SettingsProps {
  onClose: () => void;
}

enum MenuItem {
  Background = "background",
  Quote = "quote",
  Terminal = "terminal",
}

interface Menu {
  name: string;
  type: MenuItem;
  elem: React.ReactElement<any, any>;
}

const Menus: Menu[] = [
  {
    name: "Background",
    type: MenuItem.Background,
    elem: <BackgroundSettings />,
  },
  { name: "Quote", type: MenuItem.Quote, elem: <QuoteSettings /> },
  { name: "Terminal", type: MenuItem.Terminal, elem: <TerminalSettings /> },
];

export default function Settings(props: SettingsProps) {
  const { onClose } = props;
  const [menu, setMenu] = useState(MenuItem.Background);

  return (
    <div className="settings">
      <div className="close-button" onClick={() => onClose()}>
        <img alt="cross" src="/assets/cross.svg" width="20px" height="20px" />
      </div>
      <div className="navbar">
        {Menus.map((item) =>
          createMenuItem(menu, setMenu, item.type, item.name)
        )}
        <div className="menu" onClick={() => {}}>
          Restore Defaults
        </div>
      </div>
      <div className="divider" />
      <div className="settings-content">
        {Menus.filter((item) => menu === item.type).map((item) => item.elem)}
      </div>
    </div>
  );
}

const createMenuItem = (
  currentItem: MenuItem,
  setMenu: (value: any) => void,
  menuItem: MenuItem,
  menuName: string
): React.ReactElement<any, any> => (
  <div
    className={`menu ${currentItem === menuItem ? "active" : ""}`}
    onClick={() => setMenu(menuItem)}
  >
    {menuName}
  </div>
);
