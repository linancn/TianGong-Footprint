import type { Project } from '@/services/data';
import { getResult } from '@/services/result/api';
import { Treemap } from '@ant-design/charts';
import { ProCard } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

type Props = {
  projectData: Project;
};

const Result: FC<Props> = ({ projectData }) => {
  const [roseChart, setRoseChart] = useState(<></>);

  useEffect(() => {
    if (projectData.projectName && projectData.projectName.trim().length > 0)
      getResult(projectData).then((result) => {
        setRoseChart(
          <Treemap
            {...{
              data: {
                name: 'total',
                children: [
                  { name: 'Upstream supply', value: result.sumSupplyCo2e },
                  { name: 'Direct emission', value: result.manufactureCo2e },
                  { name: 'Purchased electricity', value: result.electricityCo2e },
                  { name: 'Distrubution', value: result.sumDestinationCo2e },
                ],
              },
              colorField: 'name',
              legend: {
                position: 'top-left',
              },
              tooltip: {
                formatter: (v) => {
                  const root = v.path[v.path.length - 1];
                  return {
                    name: v.name,
                    value: `${v.value.toFixed(2)}kg (总占比${((v.value / root.value) * 100).toFixed(
                      2,
                    )}%)`,
                  };
                },
              },
              animation: {},
            }}
          />,
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData]);

  return <ProCard title={`Report: ${projectData.projectName}`}>{roseChart}</ProCard>;
};

export default Result;
