import type { Project } from '@/services/data';
import { getResult } from '@/services/result/api';
import { Treemap } from '@ant-design/charts';
import { ProCard } from '@ant-design/pro-components';
import { Spin } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

type Props = {
  projectData: Project;
};

const Result: FC<Props> = ({ projectData }) => {
  const [roseChart, setRoseChart] = useState(<></>);

  useEffect(() => {
    if (projectData.projectName && projectData.projectName.trim().length > 0) {
      setRoseChart(
        <div className="loading_spin_div">
          <Spin />
        </div>,
      );
      getResult(projectData).then((result) => {
        setRoseChart(
          <>
            <h1>
              {result.projectName} (Total Carbon Footprint: {result.sumAllCo2e.toFixed(2)} kg)
            </h1>
            <Treemap
              {...{
                data: {
                  name: 'total',
                  children: [
                    {
                      name: 'Upstream supply',
                      children: result.supply.map((s: any) => {
                        return {
                          name: s.material,
                          children: [
                            {
                              name: 'Material',
                              children: [
                                {
                                  name: `${s.materialCategory} > ${s.materialType}`,
                                  value: s.co2e,
                                },
                              ],
                            },
                            {
                              name: 'Processing',
                              children: s.processing.map((p: any) => {
                                return {
                                  name: `${p.processCategory}>${p.processType}`,
                                  value: p.co2e,
                                };
                              }),
                            },
                            {
                              name: 'Transportation',
                              children: s.transportation.map((t: any) => {
                                return {
                                  name: `${t.supplierLocation}`,
                                  value: t.co2e,
                                };
                              }),
                            },
                          ],
                        };
                      }),
                    },
                    { name: 'Direct emission', value: result.manufactureCo2e },
                    { name: 'Purchased electricity', value: result.electricityCo2e },
                    {
                      name: 'Distrubution',
                      children: result.destination.map((item: any) => {
                        return { name: item.destinationLocation, value: item.o2e };
                      }),
                    },
                  ],
                },
                colorField: 'name',
                legend: {
                  position: 'bottom',
                },
                tooltip: {
                  customContent: (_title, data) => {
                    return data.map((d: any) => (
                      <div key="0">
                        {d.name}: {d.value.toFixed(2)} kg
                      </div>
                    ));
                  },
                  // formatter: (v: { path: string | any[]; name: any; value: number }) => {
                  //   const root = v.path[v.path.length - 1];
                  //   return {
                  //     name: v.name,
                  //     value: `${v.value.toFixed(2)} (${((v.value / root.value) * 100).toFixed(2)}%)`,
                  //   };
                  // },
                },
                drilldown: {
                  enabled: true,
                  breadCrumb: {
                    position: 'top-left',
                    rootText: 'Total',
                  },
                },
                interactions: [
                  {
                    type: 'treemap-drill-down',
                  },
                ],
                animation: {},
              }}
            />
          </>,
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData]);

  return <ProCard>{roseChart}</ProCard>;
};

export default Result;
