import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation } from '../sidebarNavigation';
import { observer } from 'mobx-react-lite';

interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

const SiderMenu: React.FC<SiderContentProps> = observer(({ setCollapsed }) => {

  sidebarNavigation[2] = {
    title: sidebarNavigation[2].title,
    key: sidebarNavigation[2].key,
    url: `/packinglists/${window.localStorage.getItem('RVPID') ? window.localStorage.getItem('RVPID') : 0}/cases`,
    icon: sidebarNavigation[2].icon,
  }

  sidebarNavigation[3] = {
    title: sidebarNavigation[3].title,
    key: sidebarNavigation[3].key,
    url: `/packinglists/${window.localStorage.getItem('RVMPID') ? window.localStorage.getItem('RVMPID') : 0}/cases/${window.localStorage.getItem('RVMCID') ? window.localStorage.getItem('RVMCID') : 0}/materials`,
    icon: sidebarNavigation[3].icon,
  }
  
  const { t } = useTranslation();
  const location = useLocation();

  let defaultSelectedKeys: any[] = [];
  if (location.pathname.includes("packinglists") && location.pathname.includes("cases") && location.pathname.includes("materials")) {
    defaultSelectedKeys = ["materials"]
  } else if (location.pathname.includes("packinglists") && location.pathname.includes("cases")) {
    defaultSelectedKeys = ["cases"]
  } else if (location.pathname == "/packinglists") {
    defaultSelectedKeys = ["packinglists"]
  } else if (location.pathname == "/dashboard") {
    defaultSelectedKeys = ["dashboard"]
  } else if (location.pathname == "/grids") {
    defaultSelectedKeys = ["grids"]
  }

  return (
    <S.Menu
      selectedKeys={defaultSelectedKeys}
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      items={sidebarNavigation.map((nav) => {

        return {
          key: nav.key,
          title: t(nav.title),
          label: <Link to={nav.url || ''}>{t(nav.title)}</Link>,
          icon: nav.icon,
        };
      })}
    />
  );
});

export default SiderMenu;
