import type { Project } from '@/services/data';
import type { FC } from 'react';
import { useEffect } from 'react';

type Props = {
  projectData: Project;
};

const Results: FC<Props> = ({ projectData }) => {
  useEffect(() => {
    console.log(projectData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData]);

  return <></>;
};

export default Results;
