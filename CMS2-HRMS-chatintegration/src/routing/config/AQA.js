import AllRoles from './AllRoles';

const titles = {
  AQA: 'QualityAssurance',
};

const roles = {
  faculty: [AllRoles.AQA.FACULTY],
  programmes: [AllRoles.AQA.PROGRAMMES],
  modules: [AllRoles.AQA.MODULES],
  forms: [AllRoles.AQA.FORMS],
  calendar: [AllRoles.AQA.CALENDAR],
  incentive: [AllRoles.AQA.INCENTIVE],
  requests: [AllRoles.AQA.REQUESTS],
  setup: [AllRoles.AQA.SETUP],
};

export const AQA = [
  {
    component: 'Overview',
    path: '/aqa/overview',
    title: titles.AQA,
    permission: roles.faculty,
    menu: 'Quality Assurance',
    submenu: 'Overview',
    key: 'aqa',
    icon: 'OverviewIcon',
    parent: true,
  },
  {
    component: 'FacultyList',
    path: '/aqa/faculty',
    title: titles.AQA,
    permission: roles.faculty,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Faculty',
    icon: 'FacultyIcon',
    parent: true,
  },
  {
    component: 'AddFaculty',
    path: '/aqa/faculty/addnew',
    title: titles.AQA,
    permission: roles.faculty,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Faculty',
    parent: false,
  },
  {
    component: 'EditFaculty',
    path: '/aqa/faculty/edit/:id',
    title: titles.AQA,
    permission: roles.faculty,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Faculty',
    parent: false,
  },
  {
    component: 'ProgrammeList',
    path: '/aqa/programme',
    title: titles.AQA,
    permission: roles.programmes,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Programmes',
    icon: 'ProgrammeIcon',
    parent: true,
  },
  {
    component: 'AddProgramme',
    path: '/aqa/programme/addnew',
    title: titles.AQA,
    permission: roles.programmes,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Programmes',
    parent: false,
  },
  {
    component: 'ProgramDetails',
    path: '/aqa/programme/edit/:id',
    title: titles.AQA,
    permission: roles.programmes,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Programmes',
    parent: false,
  },
  {
    component: 'ModuleList',
    path: '/aqa/modules',
    title: titles.AQA,
    permission: roles.modules,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Modules',
    icon: 'ModuleIcon',
    parent: true,
  },
  {
    component: 'AddModule',
    path: '/aqa/modules/addnew',
    title: titles.AQA,
    permission: roles.modules,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Modules',
    parent: false,
  },
  {
    component: 'EditModule',
    path: '/aqa/modules/edit/:id',
    title: titles.AQA,
    permission: roles.modules,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Modules',
    parent: false,
  },

  {
    component: 'Requests',
    path: '/aqa/requests',
    title: titles.AQA,
    permission: roles.requests,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Requests',
    icon: 'RequestIcon',
    parent: true,
    badge: true,
  },
  {
    component: 'AddRequest',
    path: '/aqa/requests/addnew',
    title: titles.AQA,
    permission: roles.requests,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Requests',
    parent: false,
  },
  {
    component: 'StudentDetails',
    path: '/aqa/requests/:id',
    title: titles.AQA,
    permission: roles.requests,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Requests',
    parent: false,
  },
  {
    component: 'FormsList',
    path: '/aqa/forms',
    title: titles.AQA,
    permission: roles.forms,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Forms',
    icon: 'FormsIcon',
    parent: true,
  },
  {
    component: 'AddForms',
    path: '/aqa/forms/addnew',
    title: titles.AQA,
    permission: roles.forms,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Forms',
    parent: false,
  },
  {
    component: 'EditForms',
    path: '/aqa/forms/edit/:id',
    title: titles.AQA,
    permission: roles.forms,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Forms',
    parent: false,
  },
  // {
  //   component: 'Letters',
  //   path: '/dashboard',
  //   title: titles.AQA,
  //   permission: aqa,
  //   key: 'aqa',
  //   menu: 'Quality Assurance',
  //   submenu: 'Letters',
  //   icon: 'LetterIcon',
  //   parent: true,
  // },
  {
    component: 'Calendar',
    path: '/aqa/academic-calendar',
    title: titles.AQA,
    permission: roles.calendar,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Academic Calendar',
    icon: 'CalendarIcon',
    parent: true,
  },
  {
    component: 'TermDetails',
    path: '/aqa/academic-calendar/terms-detail/:id',
    title: titles.AQA,
    permission: roles.calendar,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Academic Calendar',
    parent: false,
  },
  {
    component: 'AddNewTerm',
    path: '/aqa/academic-calendar/addterms',
    title: titles.AQA,
    permission: roles.calendar,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Academic Calendar',
    parent: false,
  },
  {
    component: 'CalendarRequestDetail',
    path: '/aqa/academic-calendar/request-detail/:id',
    title: titles.AQA,
    permission: roles.calendar,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Academic Calendar',
    parent: false,
  },
  {
    component: 'Incentives',
    path: '/aqa/incentives',
    title: titles.AQA,
    permission: roles.incentive,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Incentives',
    icon: 'IncentiveIcon',
    parent: true,
  },
  {
    component: 'AddIncentive',
    path: '/aqa/incentives/addnew',
    title: titles.AQA,
    permission: roles.incentive,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Incentives',
    icon: 'SetupIcon',
    parent: false,
  },
  {
    component: 'IncentiveDetails',
    path: '/aqa/incentives/edit/:id',
    title: titles.AQA,
    permission: roles.incentive,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Incentives',
    icon: 'SetupIcon',
    parent: false,
  },
  {
    component: 'Customize',
    path: '/aqa/customize',
    title: titles.AQA,
    permission: roles.setup,
    key: 'aqa',
    menu: 'Quality Assurance',
    submenu: 'Customize',
    icon: 'SetupIcon',
    parent: true,
  },
];
