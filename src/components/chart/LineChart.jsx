import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const LineChart = ({
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
    // Return early if legendContainer doesn't exist
    if (!legendContainer) {
      return null;
    }

    let listContainer = legendContainer.querySelector('ul');

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
  const defaultOptions = {
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

    layout: {
      padding: {
        // Adjust this value as needed
        right: 30,
        top: 30,
      },
    },

    maintainAspectRatio: options?.maintainAspectRatio || true,

    plugins: {
      datalabels: {
        align: 'end',

        // formatter:  function (value, context) {
        //     return context.chart.data.labels[context.dataIndex];
        // },
        anchor: 'end',
        backgroundColor: null,
        color: 'rgba(0, 0, 0, 1.0)',
        display: true,
        font: {
          lineHeight: '15px',
          size: 10,
          weight: '700',
          // family: 'Poppins',
        },
        offset: showAxisValue ? -2 : -8,
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
        display: true,
        grid: {
          lineWidth: 0, // <-- this removes vertical lines between bars
        },
        offset: !isAreaChart,
        ticks: {
          // borderColor: '1px solid #000000',
          color: '#000000',

          // padding: 20,
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
      },
      y: {
        beginAtZero: true,
        grid: {
          // lineWidth: function (context) {
          //   return context?.index === 0 ? 0 : 1; // <-- this removes the base line
          // }
          lineWidth: 0,
        },
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
          text: labelY,
        },
      },
    },
    ...options,
  };
  // useEffect(() => {

  // })
  const renderMain = useMemo(
    () => (
      <Box
        sx={{
          height: '100%',
        }}
        className={className}
      >
        <Box
          sx={{
            height: '100%',
            maxHeight: '315px',
            width: '100%',
          }}
        >
          <Line
            ref={refChart}
            // width={'100%'}
            // height={'100%'}
            data={{
              datasets: isAreaChart ? chartData.datasets.map((el) => ({ ...el, fill: true })) : [...chartData.datasets],
              labels: [...chartData.labels],
            }}
            options={defaultOptions}
            plugins={[htmlLegendPlugin, ChartDataLabels]}
          />
        </Box>
        <Box id={legendClassName} display="flex" justifyContent="center" sx={{ marginTop: '16px' }} />
        {/* <Box id="subLabels" /> */}
      </Box>
    ),
    [chartData, refChart, width, height, labelX, labelY, isAreaChart, options, defaultOptions, showAxisValue, className]
  );
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

export default LineChart;
