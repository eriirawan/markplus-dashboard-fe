import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box } from '@mui/material';
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

    // Return early if legendContainer doesn't exist
    if (!legendContainer) {
      return null;
    }

    let listContainer = legendContainer.querySelector('ul');

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
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);

      // Skip if ul is null
      if (!ul) return;

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
        boxSpan.style.borderWidth = `${item.lineWidth}px`;
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
    id: 'htmlLegend',
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
    indexAxis: indexAxis || 'x',
    layout: {
      // borderColor: '#000000',
      //  borderColor: ''
      padding: {
        // Adjust this value as needed
        // right: 30,
        // top: 30,
      },
    },
    maintainAspectRatio: options?.maintainAspectRatio || true,
    plugins: {
      datalabels: {
        display: true,

        ...(isStackedChart ? { align: 'center', anchor: 'center' } : { align: 'end', anchor: 'end', offset: -2 }),
        backgroundColor: null,
        color: 'rgba(0, 0, 0, 1.0)',
        font: {
          lineHeight: '15px',
          size: 10,
          weight: '700',
          // family: 'Poppins',
        },
      },
      htmlLegend: {
        // ID of the container to put the legend in
        containerID: legendClassName,
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          ...(isFullStackedChart ? { display: false } : {}),
          lineWidth: 0, // <-- this removes vertical lines between bars
        },

        stacked: !!isStackedChart,

        // display: isFullStackedChart ? false : true,
        ticks: {
          color: '#000000',
          display: showAxisValue,
        },
        // offset: true,
        title: {
          color: '#000000',
          display: true,
          font: {
            lineHeight: '18px',
            size: '12px',
            weight: 700,
          },
          text: labelY,
        },
        ...(isFullStackedChart ? { max: 1000 } : {}),
      },
      y: {
        beginAtZero: true,
        grid: {
          ...(isFullStackedChart ? { display: false } : {}),

          // lineWidth: function (context) {
          //   return context?.index === 0 ? 0 : 1; // <-- this removes the base line
          // }
          lineWidth: 0,
        },
        stacked: !!isStackedChart,
        ticks: {
          color: '#000000',
          display: showAxisValue,
        },
        title: {
          color: '#000000',
          display: true,
          font: {
            lineHeight: '18px',
            size: '12px',
            weight: 700,
          },
          text: labelX,
        },
        ...(isFullStackedChart ? { max: 1500 } : {}),
      },
    },
    ...options,
  };
  const renderMain = useMemo(
    () => (
      <Box sx={{ height: '100%' }} className={className}>
        <Box
          sx={{
            height: '100%',
            maxHeight: '315px',
            width: '100%',
          }}
        >
          <Bar
            data={chartData}
            options={defaultOptions}
            // width={width}
            // height={height}
            plugins={[htmlLegendPlugin, ChartDataLabels]}
            ref={refChart}
          />
        </Box>
        <Box id={legendClassName} display="flex" justifyContent="center" sx={{ marginTop: '24px' }} />
      </Box>
    ),
    [
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
    ]
  );
  return renderMain;
};

export default BarChart;
