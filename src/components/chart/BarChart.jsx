import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Box } from '@mui/system';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BarChart = ({
  chartData,
  width,
  height,
  maxWidthLegend,
  indexAxis,
  options,
  labelX,
  labelY,
  refChart,
  isStackedChart,
  isFullStackedChart,
  legendClassName,
  showAxisValue,
  className,
}) => {
  const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);

    let listContainer = legendContainer?.querySelector('ul');

    if (!listContainer) {
      listContainer = document.createElement('ul');
      // listContainer.style.display = 'flex';
      // listContainer.style.flexDirection = 'row';
      listContainer.style.display = 'grid';
      listContainer.style.gridTemplateColumns = 'auto auto auto auto';
      listContainer.style.rowGap = '17px';
      listContainer.style.columnGap = '0px';
      listContainer.style.width = '100%';
      listContainer.style.margin = '0 0 0 50px';

      listContainer.style.padding = 0;
      // listContainer.style.maxWidth = maxWidthLegend;

      legendContainer.appendChild(listContainer);
    }

    return listContainer;
  };

  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);

      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach((item) => {
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';

        li.onclick = () => {
          const { type } = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';

        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

        const text = document.createTextNode(item.text);
        textContainer?.appendChild(text);

        li?.appendChild(boxSpan);
        li?.appendChild(textContainer);
        ul?.appendChild(li);
      });
    },
  };
  // const subLabels = {
  //   id: 'subLabels',
  //   afterDatasetDraw(chart, arg, plugOptions) {
  //     const {
  //       ctx,
  //       chartArea: { left, right, top, bottom, width, height },
  //     } = chart;
  //     ctx.save();
  //     ctx.font = 'bolder 12px sans-serif';
  //     ctx.fillStyle = 'rgba(102, 102, 102, 1)';
  //     ctx.fillText('Month 1', left, top / 2);
  //     ctx.font = 'bolder 12px sans-serif';
  //     ctx.fillStyle = 'rgba(102, 102, 102, 1)';
  //     ctx.fillText('Month 1', width + left, bottom);
  //   },
  // };
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: options?.maintainAspectRatio || true,
    plugins: {
      htmlLegend: {
        // ID of the container to put the legend in
        containerID: legendClassName,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,

        ...(isStackedChart ? { anchor: 'center', align: 'center' } : { anchor: 'end', align: 'end', offset: -2 }),
        color: 'rgba(0, 0, 0, 1.0)',
        backgroundColor: null,
        font: {
          size: 10,
          weight: '700',
          lineHeight: '15px',
          // family: 'Poppins',
        },
      },
    },
    indexAxis: indexAxis ? indexAxis : 'x',
    layout: {
      // borderColor: '#000000',
      //  borderColor: ''
      padding: {
        // top: 100,
        // right: 30,
        // borderColor: '#000000',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: labelX,
          font: {
            size: '12px',
            lineHeight: '18px',
            weight: 700,
          },
          color: '#000000',
        },
        grid: {
          ...(isFullStackedChart ? { display: false } : {}),

          // lineWidth: function (context) {
          //   return context?.index === 0 ? 0 : 1; // <-- this removes the base line
          // }
          lineWidth: 0,
        },
        ticks: {
          display: showAxisValue,
          color: '#000000',
        },
        stacked: isStackedChart ? true : false,
        ...(isFullStackedChart ? { max: 1500 } : {}),
      },
      x: {
        // offset: true,
        title: {
          display: true,
          text: labelY,
          font: {
            size: '12px',
            lineHeight: '18px',
            weight: 700,
          },
          color: '#000000',
        },
        // display: isFullStackedChart ? false : true,
        ticks: {
          display: showAxisValue,
          color: '#000000',
        },
        stacked: isStackedChart ? true : false,
        grid: {
          ...(isFullStackedChart ? { display: false } : {}),
          lineWidth: 0, // <-- this removes vertical lines between bars
        },
        ...(isFullStackedChart ? { max: 1000 } : {}),
      },
    },
    ...options,
  };
  const renderMain = useMemo(() => {
    return (
      <Box sx={{ height: '100%' }} className={className}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            maxHeight: '315px',
          }}
        >
          <Bar
            data={chartData}
            options={defaultOptions}
            // width={width}
            // height={height}
            plugins={[htmlLegendPlugin, ChartDataLabels]}
            ref={refChart}
          ></Bar>
        </Box>
        <Box id={legendClassName} display={'flex'} justifyContent={'center'} sx={{ marginTop: '24px' }} />
      </Box>
    );
  }, [
    chartData,
    refChart,
    width,
    height,
    width,
    defaultOptions,
    htmlLegendPlugin,
    isStackedChart,
    isFullStackedChart,
    showAxisValue,
    className,
  ]);
  return renderMain;
};

export default BarChart;
