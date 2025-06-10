import { Box } from '@mui/system';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const DonutChart = ({
  chartData,
  width,
  height,
  maxWidthLegend,
  options,
  refChart,
  legendClassName,
  isWidth25,
  className,
  layoutWidth = 100,
}) => {
  const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);

    let listContainer = legendContainer?.querySelector('div');

    if (!listContainer) {
      listContainer = document.createElement('div');
      listContainer.style.display = 'flex';
      // listContainer.style.gridTemplateColumns = 'auto';
      listContainer.style.justifyContent = 'center';
      if (isWidth25) {
        listContainer.style.flexDirection = 'row';
        listContainer.style.flexWrap = 'wrap';
      } else {
        listContainer.style.flexDirection = 'column';
      }

      listContainer.style.gap = '16px';
      // listContainer.style.rowGap = '17px';
      // listContainer.style.columnGap = '0px';

      // listContainer.style.maxWidth = maxWidthLegend;
      listContainer.style.margin = 0;
      listContainer.style.padding = 0;

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
        const li = document.createElement('div');
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
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        top: 30, // Adjust this value as needed
      },
    },
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
        anchor: 'center',
        align: 'center',
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
    ...options,
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //     grid: {
    //       // lineWidth: function (context) {
    //       //   return context?.index === 0 ? 0 : 1; // <-- this removes the base line
    //       // }
    //       lineWidth: 0,
    //     },
    //   },
    //   x: {
    //     // offset: true,
    //     display: true,
    //     tick: {
    //       display: false,
    //     },
    //     grid: {
    //       lineWidth: 0, // <-- this removes vertical lines between bars
    //     },
    //   },
    // },
  };
  return (
    <Box
      // {...(
      //   layoutWidth > 20 ? {
      //     display={'flex'}
      //     justifyContent={'center'}
      //     flexWrap={isWidth25 ? 'wrap' : 'nowrap'}
      //     gap={'40px'}

      //   } : {}
      // )}
      sx={{
        ...(layoutWidth > 20
          ? {
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '40px',
            }
          : {}),
      }}
      className={className}
    >
      <Box
        sx={{
          ...(layoutWidth !== 20
            ? {
                height: '100vh',
                maxHeight: '315px',
                display: 'flex',
                alignItems: 'center',
              }
            : {}),
        }}
        //  display="flex" alignItems="center"
      >
        <Doughnut
          ref={refChart}
          width={width}
          height={height}
          data={chartData}
          options={defaultOptions}
          plugins={[htmlLegendPlugin, ChartDataLabels]}
        />
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        id={legendClassName}
        sx={{
          ...(layoutWidth === 20 ? { marginTop: '32px' } : {}),
        }}
      ></Box>
    </Box>
  );
};

export default DonutChart;
