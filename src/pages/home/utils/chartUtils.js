/**
 * Utility functions for chart operations
 */

/**
 * Maps chart data to the format required by chart components
 * @param {Object} data - The chart data
 * @param {string} type - The chart type
 * @returns {Object} - Formatted chart data
 */
export const mappingDataChart = (data, type) => ({
  datasets:
    type === 'Pie Chart' || type === 'Donut Chart'
      ? data.tabular.datasets?.map((el) => ({
          backgroundColor: data.colorway[el.label]?.backgroundColor,
          borderColor: data.colorway[el.label]?.borderColor,
          data: el.data,
          label: el.label,
        }))
      : data.tabular.datasets?.map((el) => ({
          backgroundColor: data.colorway[el.label]?.backgroundColor,
          borderColor: data.colorway[el.label]?.borderColor,
          data: el.data,
          label: el.label,
          ...(type === 'Area Chart'
            ? {
                fill: {
                  above:
                    data.colorway[el.label]?.backgroundColor?.replace('1)', '0.3)') ||
                    data.colorway[el.label]?.backgroundColor,
                  target: 'origin',
                },
              }
            : {}),
        })),
  labels: typeof data?.tabular?.labels === 'string' ? JSON?.parse(data?.tabular?.labels) : data?.tabular?.labels,
});

/**
 * Converts layout percentage to grid number
 * @param {number} data - Layout percentage
 * @param {boolean} isMobile - Whether the device is mobile
 * @returns {number} - Grid number
 */
export const getGridNumber = (data, isMobile) => {
  if (isMobile) {
    return 12;
  }
  switch (data) {
    case 100:
      return 12;
    case 75:
      return 9;
    case 50:
      return 6;
    case 25:
      return 3;
    case 20:
      return 2.4;
    default:
      return 12;
  }
};

/**
 * Converts grid number to text layout
 * @param {number} data - Grid number
 * @returns {string} - Text layout
 */
export const getTextLayout = (data) => {
  switch (data) {
    case 12:
      return '100%';
    case 9:
      return '75%';
    case 6:
      return '50%';
    case 3:
      return '25%';
    case 2.4:
      return '20%';
    default:
      return '100%';
  }
};
