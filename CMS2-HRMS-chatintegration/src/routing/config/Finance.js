import AllRoles from './AllRoles';

const titles = {
  Finance: 'Finance',
};

export const Finance = [
    {
        component: 'Transactions',
        path: '/finance/transactions',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.TRANSACTION],
        key: 'finance',
        menu: 'Finance',
        submenu: 'Transactions',
        icon: 'TransactionIcon',
        parent: true,
      },
      {
        component: 'Students',
        path: '/finance/students',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.STUDENTS],
        key: 'finance',
        menu: 'Finance',
        submenu: 'Students',
        icon: 'StudentsIcon',
        parent: true,
      },
      {
        component: 'StudentDetails',
        path: '/finance/students/:id',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.STUDENTS],
        menu: 'Finance',
        key: 'finance',
        submenu: 'Students',
        parent: false,
      },
      {
        component: 'Applicants',
        path: '/finance/applicants',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.APPLICANTS],
        key: 'finance',
        menu: 'Finance',
        submenu: 'Applicants',
        icon: 'ApplicationsIcon',
        parent: true,
      },
      {
        component: 'Accounts',
        path: '/finance/applicants/:id',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.APPLICANTS],
        key: 'finance',
        menu: 'Finance',
        submenu: 'Applicants',
        parent: false,
      },
      {
        component: 'Scholarships',
        path: '/finance/scholarships',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.SCHOLARSHIP],
        key: 'finance',
        menu: 'Finance',
        submenu: 'Scholarships',
        icon: 'ScholarshipIcon',
        parent: true,
      },
      {
        component: 'ScholarshipDetail',
        path: '/finance/scholarships/:id',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.SCHOLARSHIP],
        key: 'finance',
        menu: 'Finance',
        submenu: 'Scholarships',
        parent: false,
      },
      {
        component: 'Grants',
        path: '/finance/grants',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.GRANTS],
        key: 'finance',
        menu: 'Finance',
        submenu: 'Grants',
        icon: 'GrantsIcon',
        parent: true,
      },
      {
        component: 'GrantDetails',
        path: '/finance/grants/:id',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.GRANTS],
        key: 'finance',
        menu: 'Finance',
        submenu: 'Grants',
        parent: false,
      },
    //   {
    //     component: 'ReportsList',
    //     path: '',
    //     title: titles.Finance,
    //     permission: finance,
    //     key: 'finance',
    //     menu: 'Finance',
    //     submenu: 'Reports',
    //     icon: 'ReportsIcon',
    //     parent: true,
    //   },
      {
        component: 'Customize',
        path: '/finance/setup',
        title: titles.Finance,
        permission: [AllRoles.FINANCE.SETUP],
        key: 'finance',
        menu: 'Finance',
        submenu: 'Customize',
        icon: 'SetupIcon',
        parent: true,
      },
]