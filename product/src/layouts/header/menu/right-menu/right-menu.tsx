import NavLink from 'components/nav-link/nav-link';
import dynamic from 'next/dynamic';
import React from 'react';
import { ABOUT_MENU_ITEM, BLOG_MENU_ITEM } from 'site-settings/site-navigation';
import LanguageSwitcher from '../language-switcher/language-switcher';
import { RightMenuBox } from './right-menu.style';
const AuthMenu = dynamic(() => import('../auth-menu'), { ssr: false });

type Props = {
  onLogout: () => void;
  onJoin: () => void;
  avatar: string;
  isAuthenticated: boolean;
};

export const RightMenu: React.FC<Props> = ({
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
}) => {
  return (
    <RightMenuBox>

      {/* <NavLink
        className="menu-item"
        href={OFFER_MENU_ITEM.href}
        label={OFFER_MENU_ITEM.defaultMessage}
        intlId={OFFER_MENU_ITEM.id}
      /> */}


      {/* <NavLink
        className="menu-item"
        href={HELP_MENU_ITEM.href}
        label={HELP_MENU_ITEM.defaultMessage}
        intlId={HELP_MENU_ITEM.id}
        iconClass="menu-icon"
        icon={<HelpIcon />}
      /> */}

      <NavLink
        className="menu-item"
        href={BLOG_MENU_ITEM.href}
        label={BLOG_MENU_ITEM.defaultMessage}
        intlId={BLOG_MENU_ITEM.id}
        iconClass="menu-icon"
      />
      
      <NavLink
        className="menu-item"
        href={ABOUT_MENU_ITEM.href}
        label={ABOUT_MENU_ITEM.defaultMessage}
        intlId={ABOUT_MENU_ITEM.id}
        iconClass="menu-icon"
      />

      <LanguageSwitcher />

      <AuthMenu
        avatar={avatar}
        onJoin={onJoin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
    </RightMenuBox>
  );
};
