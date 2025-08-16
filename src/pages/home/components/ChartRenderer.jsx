import React from 'react';
import { Box } from '@mui/material';

import BarChart from '@/components/chart/BarChart';
import LineChart from '@/components/chart/LineChart';
import DonutChart from '@/components/chart/DonutChart';
import PieChart from '@/components/chart/PieChart';
import TableChart from '@/components/chart/TableChart';
// AreaChart is implemented using LineChart with isAreaChart prop
import InformationChart from '@/components/chart/InformationChart';
import HeaderContainerChart from './HeaderContainerChart';
import { mappingDataChart } from '../utils/chartUtils';

/**
 * Renders different types of charts based on the provided type
 * @param {Object} props - Component props
 * @param {Object} props.chart - Chart data and configuration
 * @param {string} props.chartId - Unique ID for the chart
 * @returns {React.ReactElement} Rendered chart component
 */
const ChartRenderer = ({ chart, chartId }) => {
  // Add null check to prevent TypeError when chart is null or undefined
  if (!chart) {
    return (
      <HeaderContainerChart
        data={{ chart: { id: chartId || 'unknown', title: 'No Data' } }}
        store={{}}
        chartElement={<Box>No chart data available</Box>}
        indexContent={{}}
        className={`container-chart-${chartId || 'unknown'}`}
        useButtonGroupAxis={false}
      />
    );
  }

  const { type, title, data } = chart;
  const chartData = data ? mappingDataChart(data, type) : null;

  const renderChart = () => {
    switch (type) {
      case 'Bar Chart':
        return (
          <BarChart
            chartData={chartData}
            width={500}
            height={300}
            maxWidthLegend="100%"
            indexAxis="x"
            options={{}}
            labelX=""
            labelY=""
            refChart={React.createRef()}
            isStackedChart={false}
            isFullStackedChart={false}
            legendClassName=""
            showAxisValue
            className=""
          />
        );
      case 'Line Chart':
        return (
          <LineChart
            chartData={chartData}
            width={500}
            height={300}
            maxWidthLegend="100%"
            labelX=""
            labelY=""
            options={{}}
            refChart={React.createRef()}
            isAreaChart={false}
            legendClassName=""
            showAxisValue
            className=""
          />
        );
      case 'Donut Chart':
        return (
          <DonutChart
            chartData={chartData}
            width={500}
            height={300}
            maxWidthLegend="100%"
            options={{}}
            refChart={React.createRef()}
            legendClassName=""
            isWidth25={false}
            className=""
          />
        );
      case 'Pie Chart':
        return (
          <PieChart
            chartData={chartData}
            width={500}
            height={300}
            maxWidthLegend="100%"
            options={{}}
            refChart={React.createRef()}
            legendClassName=""
            isWidth25={false}
            className=""
          />
        );
      case 'Table Chart':
        return <TableChart chartData={data?.tabular} className="" />;
      case 'Area Chart':
        return (
          <LineChart
            chartData={chartData}
            width={500}
            height={300}
            maxWidthLegend="100%"
            labelX=""
            labelY=""
            options={{}}
            refChart={React.createRef()}
            isAreaChart
            legendClassName=""
            showAxisValue
            className=""
          />
        );
      case 'Information Chart':
        return <InformationChart data={data?.tabular || {}} imageUrl={data?.imageUrl || null} />;
      default:
        return <Box>Unsupported chart type</Box>;
    }
  };

  return (
    <HeaderContainerChart
      data={{ chart: { id: chartId, title } }}
      store={{}}
      chartElement={renderChart()}
      indexContent={{}}
      className={`container-chart-${chartId}`}
      useButtonGroupAxis={false}
    />
  );
};

export default ChartRenderer;
