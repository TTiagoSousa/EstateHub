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
  // {
  //   id: 'tarefas',
  //   label: 'Tarefas',
  //   icon: '✓',
  //   subItems: [
  //     { id: 'tarefas-pendentes', label: 'Pendentes', path: '/tarefas/pendentes' },
  //     { id: 'tarefas-concluidas', label: 'Concluídas', path: '/tarefas/concluidas' },
  //     { id: 'tarefas-prioritarias', label: 'Prioritárias', path: '/tarefas/prioritarias' },
  //   ],
  // },
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