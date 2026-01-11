import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../Menu_Itins';
import './Sidebar_Home.scss';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  subItems?: { id: string; label: string; path?: string }[];
}

export const Sidebar_Home: React.FC = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Determinar item ativo baseado na rota atual
  const getActiveItem = () => {
    const currentPath = location.pathname;
    
    // Verificar menus principais
    const mainItem = menuItems.find(item => item.path === currentPath);
    if (mainItem) return mainItem.id;
    
    // Verificar submenus
    for (const item of menuItems) {
      if (item.subItems) {
        const subItem = item.subItems.find(sub => sub.path === currentPath);
        if (subItem) return subItem.id;
      }
    }
    
    return 'dashboard';
  };

  const activeItem = getActiveItem();

  const toggleMenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const filterMenuItems = (items: MenuItem[]) => {
    if (!searchQuery) return items;

    return items.filter((item) => {
      const matchesMain = item.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSub = item.subItems?.some((sub) =>
        sub.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchesMain || matchesSub;
    });
  };

  const filteredMenuItems = filterMenuItems(menuItems);

  return (
    <div className="sidebar-container">
      <div className="user-profile">
        <div className="user-avatar">LR</div>
        <div className="user-info">
          <div className="user-name">Teste Teste</div>
          <div className="user-email">Teste@gmail.com</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-container">
        {filteredMenuItems.map((item) => (
          <div key={item.id}>
            {/* Main Menu Item */}
            {item.subItems ? (
              // Item com submenu - apenas toggle
              <div
                className={`menu-item has-submenu`}
                onClick={() => toggleMenu(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                <span className={`menu-arrow ${expandedMenus.has(item.id) ? 'expanded' : ''}`}>
                  ▼
                </span>
              </div>
            ) : (
              // Item sem submenu - Link direto
              <Link
                to={item.path || '#'}
                className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Link>
            )}

            {/* Sub Menu Items */}
            {item.subItems && expandedMenus.has(item.id) && (
              <div className="submenu-container">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.id}
                    to={subItem.path || '#'}
                    className={`submenu-item ${activeItem === subItem.id ? 'active' : ''}`}
                  >
                    • {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};