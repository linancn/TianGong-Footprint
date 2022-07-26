import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  title: 'TianGong Footprint',
  primaryColor: '#5c246a',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  menuRender: false,
  menuHeaderRender: false,
  splitMenus: false,
  pwa: false,
  logo: '/logo.svg',
  // navTheme: 'realDark', //beta功能
  headerHeight: 56,
};

export default Settings;
