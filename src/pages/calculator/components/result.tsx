import type { Project } from '@/services/data';
import { getResult } from '@/services/result/api';
import { ProCard } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useEffect } from 'react';

type Props = {
  projectData: Project;
};

const Result: FC<Props> = ({ projectData }) => {
  useEffect(() => {
    if (projectData.projectName && projectData.projectName.trim().length > 0)
      getResult(projectData).then((result) => {
        console.log('result', result);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData]);

  return <ProCard title={`Report: ${projectData.projectName}`} />;
};

export default Result;
