export default [
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: './calculator/index',
  },
  {
    path: '/',
    redirect: '/calculator',
  },
  {
    component: './404',
  },
];
