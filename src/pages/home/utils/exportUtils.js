/**
 * Utility functions for exporting charts and data
 */
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

/**
 * Downloads chart as PDF
 * @param {string} chartId - ID of the chart element
 * @param {string} fileName - Name for the downloaded file
 */
export const downloadChartAsPDF = async (chartId, fileName) => {
  try {
    const chart = document.getElementById(chartId);
    if (!chart) {
      console.error('Chart element not found');
      return;
    }

    const canvas = await html2canvas(chart, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4'); // Using lowercase is required by the library
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error downloading chart as PDF:', error);
  }
};

/**
 * Downloads data as Excel file
 * @param {Array} data - Data to be exported
 * @param {string} fileName - Name for the downloaded file
 */
export const downloadAsExcel = (data, fileName) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  } catch (error) {
    console.error('Error downloading as Excel:', error);
  }
};

/**
 * Prepares data for Excel export
 * @param {Object} chartData - Chart data to be exported
 * @returns {Array} - Formatted data for Excel export
 */
export const prepareDataForExcel = (chartData) => {
  if (!chartData || !chartData.labels || !chartData.datasets) {
    return [];
  }

  const { labels, datasets } = chartData;
  const result = [];

  // Create header row with empty first cell and dataset labels
  const headerRow = { '': '' };
  datasets.forEach((dataset) => {
    headerRow[dataset.label] = dataset.label;
  });
  result.push(headerRow);

  // Create data rows
  labels.forEach((label, labelIndex) => {
    const row = { '': label };
    datasets.forEach((dataset) => {
      row[dataset.label] = dataset.data[labelIndex];
    });
    result.push(row);
  });

  return result;
};

/**
 * Downloads chart as Excel using tabular data format
 * @param {Object} chartData - Chart data with tabular format
 * @param {string} fileName - Name for the downloaded file
 * @param {Function} setLoadingState - Optional callback to set loading state
 */
export const downloadChartAsExcelTabular = (chartData, fileName, setLoadingState) => {
  try {
    if (typeof setLoadingState === 'function') {
      setLoadingState(true);
    }

    if (!chartData || !chartData.tabular) {
      console.error('Invalid chart data format for Excel export');
      if (typeof setLoadingState === 'function') setLoadingState(false);
      return;
    }

    const mapData = chartData.tabular.labels?.map((el) => ({ test: el })) || [];

    chartData.tabular.datasets?.forEach((element) => {
      element.data.forEach((el, i) => {
        if (mapData[i]) {
          mapData[i][element.label] = el;
        }
      });
    });

    const header = ['', ...(chartData.tabular.datasets?.map((el) => el.label) || [])];
    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [header]);
    XLSX.utils.sheet_add_json(ws, mapData, { origin: 'A2', skipHeader: true });

    const wb = { SheetNames: ['data'], Sheets: { data: ws } };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    const finalData = new Blob([excelBuffer], { type: '.xlsx' });

    const url = window.URL.createObjectURL(finalData);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    a.click();
    a.remove();

    if (typeof setLoadingState === 'function') {
      setLoadingState(false);
    }
  } catch (error) {
    console.error('Error downloading chart as Excel:', error);
    if (typeof setLoadingState === 'function') {
      setLoadingState(false);
    }
  }
};

/**
 * Downloads all charts as PDF and Excel
 * @param {string} chartId - ID of the chart element
 * @param {string} fileName - Name for the downloaded file
 * @param {Function} setLoadingState - Function to set loading state
 * @param {Object} chartData - Chart data to be exported
 * @param {boolean} downloadExcelAfter - Whether to download Excel after PDF
 */
export const downloadAllCharts = async (chartId, fileName, setLoadingState, chartData, downloadExcelAfter = false) => {
  try {
    if (typeof setLoadingState !== 'function') {
      console.error('setLoadingState must be a function');
      return;
    }

    setLoadingState(true);
    const chart = document.getElementById(chartId);
    if (!chart) {
      console.error('Chart element not found');
      setLoadingState(false);
      return;
    }

    const button = chart.querySelector('button');
    if (button) {
      button.style.display = 'none';
    }

    const canvas = await html2canvas(chart, {
      allowTaint: true,
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4'); // Using lowercase is required by the library
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    // Determine height based on layout if available
    const layout = chartData?.layout;
    const pdfHeight = layout > 25 ? (imgProps.height * pdfWidth) / imgProps.width : chart.clientHeight;

    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);

    if (button) {
      button.style.display = 'block';
    }

    setLoadingState(false);

    if (downloadExcelAfter && chartData) {
      downloadChartAsExcelTabular(chartData, fileName, setLoadingState);
    }
  } catch (error) {
    console.error('Error downloading all charts:', error);
    if (typeof setLoadingState === 'function') {
      setLoadingState(false);
    }
  }
};
