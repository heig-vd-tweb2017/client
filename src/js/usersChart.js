Chart.defaults.global.legend.display = false; // Permet de retirer les labels des dataset

const place = ['Second', 'First', 'Third'];

const barCharDataOpened = {
  labels: place,
  datasets: [{
    backgroundColor: [orange, green, yellow],
    borderColor: [orange, green, yellow],
    borderWidth: 1,
    data: [
      ('Second', 12),
      ('First', 17),
      ('Third', 8),
    ],
  }],
};

const barCharDataClosed = {
  labels: place,
  datasets: [{
    backgroundColor: [orange, green, yellow],
    borderColor: [orange, green, yellow],
    borderWidth: 1,
    data: [
      ('Second', 25),
      ('First', 32),
      ('Third', 8),
    ],
  }],

};

const options = {
  options: {
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true,
      }],

    },
  },
};

const configOpened = {
  type: 'bar',
  data: barCharDataOpened,
  options,
};

const configClosed = {
  type: 'bar',
  data: barCharDataClosed,
  options,
};

const ctxOpened = document.getElementById('opened-issues-chart').getContext('2d');
const barOpened = new Chart(ctxOpened, configOpened);

const ctxClosed = document.getElementById('closed-issues-chart').getContext('2d');
const barClosed = new Chart(ctxClosed, configClosed);
