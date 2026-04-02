interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string; // Caminho/rota do menu
  subItems?: { id: string; label: string; path?: string }[];
}

export const menuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: '📊',
    path: '/Dashboard' 
  },
  {
    id: 'tarefas',
    label: 'Calculadoras',
    icon: '🧮',
    subItems: [
      { id: 'tarefas-pendentes', label: 'Juros compostos', path: '/Compound_Interest_Calculator' },
    ],
  },
  // { 
  //   id: 'calendario', 
  //   label: 'Calendário', 
  //   icon: '📅',
  //   path: '/calendario' 
  // },
  // {
  //   id: 'relatorios',
  //   label: 'Relatórios',
  //   icon: '📈',
  //   subItems: [
  //     { id: 'relatorios-vendas', label: 'Vendas', path: '/relatorios/vendas' },
  //     { id: 'relatorios-producao', label: 'Produção', path: '/relatorios/producao' },
  //     { id: 'relatorios-financeiro', label: 'Financeiro', path: '/relatorios/financeiro' },
  //   ],
  // },
];