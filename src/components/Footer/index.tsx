import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'TianGongLCA R&D Team',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`2021-${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'NGO',
          title: 'NGO',
          href: 'https://www.tiangong.earth/',
          blankTarget: true,
        },
        {
          key: 'TianGongLCA R&D Team',
          title: 'TianGongLCA R&D Team',
          href: 'https://www.tiangong.earth/team',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/linancn/TianGong-Footprint',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
