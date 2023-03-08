import AllRoles from './AllRoles';

const titles = {
  MARKETING: 'Marketing',
};

export const Marketing = [
  {
    component: 'Overview',
    path: '/marketing/overview',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    key: 'marketing',
    menu: 'Marketing',
    submenu: 'Overview',
    icon: 'OverviewIcon',
    parent: true,
  },
  {
    component: 'ApplicationsList',
    path: '/marketing/applications',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    key: 'marketing',
    menu: 'Marketing',
    submenu: 'Application',
    icon: 'ApplicationsIcon',
    parent: true,
  },
  {
    component: 'IncompleteApplications',
    path: '/marketing/applications/incomplete-applications',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    key: 'marketing',
    menu: 'Marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'AddApplication',
    path: '/marketing/applications/addnew',
    title: titles.MARKETING,
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    permission: [AllRoles.MARKETING.APPLICATION],
    parent: false,
  },
  // {
  //   component: 'EditApplication',
  //   path: '/marketing/applications/:id',
  //   title: titles.MARKETING,
  //   permission: marketing,
  //   key: 'marketing',
  //   menu: 'Marketing',
  //   submenu: 'Application',
  //   parent: false,
  // },
  {
    component: 'IncompleteDocuments',
    path: '/marketing/applications/incomplete-documents',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'EditApplication',
    path: '/marketing/applications/incomplete-documents/:id',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    key: 'marketing',
    menu: 'Marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'EligibilityAssessments',
    path: '/marketing/applications/eligibility-assessments',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'EditApplication',
    path: '/marketing/applications/eligibility-assessments/:id',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'PendingRegistrationsVisa',
    path: '/marketing/applications/pending-registration-visa',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'EditApplication',
    path: '/marketing/applications/pending-registration-visa/:id',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'PendingAccommodations',
    path: '/marketing/applications/pending-accommodations',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'EditApplication',
    path: '/marketing/applications/pending-accommodations/:id',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'PendingEnrolment',
    path: '/marketing/applications/pending-enrolment',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'EditApplication',
    path: '/marketing/applications/pending-enrolment/:id',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'Students',
    path: '/marketing/students',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.STUDENTS],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Students',
    icon: 'StudentsIcon',
    parent: true,
  },
  {
    component: 'StudentDetails',
    path: '/marketing/students/:id',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.STUDENTS],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Students',
    parent: false,
  },
  {
    component: 'EditApplication',
    path: '/marketing/applications/approved/:id',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.APPLICATION],
    key: 'marketing',
    menu: 'Marketing',
    submenu: 'Application',
    parent: false,
  },
  {
    component: 'Incentives',
    path: '/marketing/incentives',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.INCENTIVE],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Incentives',
    icon: 'IncentiveIcon',
    parent: true,
  },
  {
    component: 'AddIncentive',
    path: '/marketing/incentives/addnew',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.INCENTIVE],
    key: 'marketing',
    menu: 'Marketing',
    submenu: 'Incentives',
    icon: 'IncentiveIcon',
    parent: false,
  },
  {
    component: 'IncentiveDetails',
    path: '/marketing/incentives/edit/:id',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.INCENTIVE],
    key: 'marketing',
    menu: 'Marketing',
    submenu: 'Incentives',
    icon: 'IncentiveIcon',
    parent: false,
  },
  {
    component: 'Customize',
    path: '/marketing/customize',
    title: titles.MARKETING,
    permission: [AllRoles.MARKETING.SETUP],
    menu: 'Marketing',
    key: 'marketing',
    submenu: 'Customize',
    icon: 'SetupIcon',
    parent: true,
  },
];