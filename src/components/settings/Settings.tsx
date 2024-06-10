import * as React from "react";
import { useState } from "react";
import BackgroundSettings from "./Background";
import QuoteSettings from "./Quote";
import TerminalSettings from "./Terminal";
import "./Settings.css";

export interface SettingsProps {
  onClose: () => void;
}

enum MenuName {
  Background = "background",
  Quote = "quote",
  Terminal = "terminal",
}

interface Menu {
  name: string;
  type: MenuName;
  elem: React.ReactElement<any, any>;
}

const Menus: Menu[] = [
  {
    name: "Background",
    type: MenuName.Background,
    elem: <BackgroundSettings />,
  },
  { name: "Quote", type: MenuName.Quote, elem: <QuoteSettings /> },
  { name: "Terminal", type: MenuName.Terminal, elem: <TerminalSettings /> },
];

export default function Settings(props: SettingsProps) {
  const { onClose } = props;
  const [menu, setMenu] = useState(MenuName.Background);

  return (
    <div className="settings">
      <div className="close-button" onClick={() => onClose()}>
        <img alt="cross" src="/assets/cross.svg" width="20px" height="20px" />
      </div>
      <div className="navbar">
        {Menus.map((item) => (
          <MenuItemComponent
            isActive={menu == item.name}
            onClick={() => setMenu(item.type)}
            value={item.name}
          />
        ))}
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

interface MenuProp {
  isActive: boolean;
  value: string;
  onClick: () => void;
}

const MenuItemComponent = ({ isActive, value, onClick }: MenuProp) => (
  <div className={`menu${isActive ? " active" : ""}`} onClick={onClick}>
    {value}
  </div>
);
