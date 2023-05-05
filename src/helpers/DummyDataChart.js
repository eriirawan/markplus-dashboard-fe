export const LineData = [
  {
    id: 0,
    category: 'Title',
    value: 23,
  },
  {
    id: 1,
    category: 'Title',
    value: 40,
  },
  {
    id: 2,
    category: 'Title',
    value: 32,
  },
  {
    id: 3,
    category: 'Title',
    value: 180,
  },
  {
    id: 4,
    category: 'Title',
    value: 180,
  },
];

export const BarData = [
  {
    id: 0,
    category: 'Title',
    value: Math.floor(Math.random() * 100),
  },
  {
    id: 1,
    category: 'Title',
    value: Math.floor(Math.random() * 100),
  },
  {
    id: 2,
    category: 'Title',
    value: Math.floor(Math.random() * 100),
  },
  {
    id: 3,
    category: 'Title',
    value: Math.floor(Math.random() * 100),
  },
  {
    id: 4,
    category: 'Title',
    value: Math.floor(Math.random() * 100),
  },
];

export const defaultColorChart = [
  'rgba(236, 159, 159, 0.5)',
  'rgba(161, 159, 236, 0.5)',
  'rgba(174, 236, 159, 0.5)',
  'rgba(236, 219, 159, 0.5)',
  'rgba(236, 219, 159, 0.5)',
  'rgba(159, 190, 236, 0.5)',
];

export const defaultDataChartLine = Array.from(new Array(100)).map((_) =>
  Array.from(new Array(10)).map((_) => Math.floor(Math.random() * 140))
);
export const defaultDataChartBar = Array.from(new Array(100)).map((_) => Math.floor(Math.random() * 140));
