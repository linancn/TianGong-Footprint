import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark',
  primaryColor: '#5c246a',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menuRender: false,
  menuHeaderRender: false,
  splitMenus: false,
  title: 'TianGong Footprint',
  pwa: false,
  logo: '/logo.svg',
  iconfontUrl: '',
};

export default Settings;
