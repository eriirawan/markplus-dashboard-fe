import React, { useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const AreaChart = ({
  chartData,
  width,
  height,
  maxWidthLegend,
  labelX,
  labelY,
  options,
  refChart,
  isAreaChart,
  legendClassName,
  showAxisValue = true,
  className,
}) => {
  const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);

    let listContainer = legendContainer?.querySelector('ul');

    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'grid';
      listContainer.style.gridTemplateColumns = 'auto auto auto auto';
      listContainer.style.rowGap = '17px';
      listContainer.style.columnGap = '0px';
      listContainer.style.width = '100%';
      // listContainer.style.marginLeft = '50px';
      // listContainer.style.maxWidth = maxWidthLegend;
      listContainer.style.margin = '0 0 0 50px';
      listContainer.style.padding = 0;

      legendContainer.appendChild(listContainer);
    }

    return listContainer;
  };

  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      // var dataset = chart.config.data.datasets[0];
      // var offset = 0;

      // for (var i = 0; i < dataset._meta[0].data.length; i++) {
      //   var model = dataset._meta[0].data[i]._model;
      //   model.x += offset;
      //   model.controlPointNextX += offset;
      //   model.controlPointPreviousX += offset;
      // }
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
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: options?.maintainAspectRatio || true,
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
        // formatter:  function (value, context) {
        //     return context.chart.data.labels[context.dataIndex];
        // },
        anchor: 'end',
        align: 'end',
        offset: -2,
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

    scales: {
      y: {
        beginAtZero: true,
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
        grid: {
          // lineWidth: function (context) {
          //   return context?.index === 0 ? 0 : 1; // <-- this removes the base line
          // }
          lineWidth: 0,
          // borderDash: [8, 4],
        },
        ticks: {
          color: '#000000',
          display: showAxisValue,

          // display: false,
        },
      },
      x: {
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
        offset: true,
        display: true,
        ticks: {
          // padding: 20,
          beginAtZero: true,
          // display: false,
          display: showAxisValue,
          color: '#000000',
          font: {
            weight: 400,
            size: '14px',
          },
          // display: false,
        },
        grid: {
          borderDash: [8, 4],
          // lineWidth: 0, // <-- this removes vertical lines between bars
        },
      },
    },
    // radius: 10,
    // interaction: {
    //   intersect: false,
    // },
    elements: {
      line: {
        // tension: 0.5,
      },
      point: {
        radius: 4,
      },
    },
    ...options,
  };
  // useEffect(() => {

  // })
  const renderMain = useMemo(() => {
    return (
      <Box
        sx={{
          height: '100%',
        }}
        className={className}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            maxHeight: '315px',
          }}
        >
          <Line
            ref={refChart}
            // width={'100%'}
            // height={'100%'}
            data={chartData}
            options={defaultOptions}
            plugins={[htmlLegendPlugin, ChartDataLabels]}
          />
        </Box>
        <Box id={legendClassName} display={'flex'} justifyContent={'center'} sx={{ marginTop: '16px' }} />
        {/* <Box id="subLabels" /> */}
      </Box>
    );
  }, [chartData, refChart, width, height, labelX, labelY, isAreaChart, options, defaultOptions, className]);
  return renderMain;
  // return (
  //   <Box sx={{ maxWidth: '1173px' }}>
  //     <Line
  //       ref={refChart}
  //       width={width}
  //       height={height}
  //       data={chartData}
  //       options={defaultOptions}
  //       plugins={[htmlLegendPlugin]}
  //     />
  //     <Box id="legend-container" display={'flex'} justifyContent={'center'} sx={{ marginTop: '24px' }} />
  //   </Box>
  // );
};

export default AreaChart;
