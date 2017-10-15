const red = 'rgb(255, 99, 132)';
const orange = 'rgb(255, 159, 64)';
const yellow = 'rgb(255, 205, 86)';
const green = 'rgb(75, 192, 192)';
const blue = 'rgb(54, 162, 235)';
const purple = 'rgb(153, 102, 255)';
const grey = 'rgb(201, 203, 207)';

const timeFormat = 'MM/DD/YYYY HH:mm';

function newDate(days) {
  return moment().add(days, 'd').toDate();
}
/*
function newDateString(days) {
  return moment().add(days, 'd').format(timeFormat);
}

function newTimestamp(days) {
  return moment().add(days, 'd').unix();
} */

const config = {
  type: 'line',
  data: {
    labels: [ // Date Objects
      newDate(0), newDate(1), newDate(2), newDate(3), newDate(4), newDate(5), newDate(6)],
    datasets: [{
      label: 'Issues Opened',
      backgroundColor: red,
      borderColor: red,
      fill: false,
      data: [30, 14, 6, 24, 70, 28, 92],
    }, {
      label: 'Issues Closed',
      backgroundColor: blue,
      borderColor: blue,
      fill: false,
      data: [5, 9, 13, 8, 14, 23, 5],
    }],
  },
  options: {
    title: {
      text: 'Total issues opened and closed',
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          format: timeFormat,
          // round: 'day'
          tooltipFormat: 'll HH:mm',
        },
        scaleLabel: {
          display: true,
          labelString: 'Date',
        },
      }],
    },
  },
};

const ctx = document.getElementById('total-issues-chart').getContext('2d');
const totalChart = new Chart(ctx, config);