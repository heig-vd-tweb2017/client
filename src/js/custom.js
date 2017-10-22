/* eslint no-undef: "error" */
/* global LineChart BarChart Table oboe */

$(() => {
  // Define the API's URL
  const url = 'http://localhost:5050'; // 'https://evening-garden-52901.herokuapp.com';

  // UI
  const searchButton = document.getElementById('search-button');
  const alertMessage = document.getElementById('alert');

  // Functions
  function enableButton(nbRequests) {
    if (nbRequests - 1 <= 0) {
      searchButton.disabled = false;
    }
  }

  function error(nbRequests) {
    if (nbRequests <= 0) {
      const alert = '<div class="alert alert-danger">A problem encoured. Please try again later.</div>';

      alertMessage.innerHTML = alert;

      searchButton.disabled = false;
    }
  }

  // Create all the objects
  const allIssuesGraph = new LineChart('total-issues-chart', [], [], []);
  const labelKeyOpened = '# Total issues opened';
  const labelKeyClosed = '# Total issues closed';
  const allIssuesTable = new Table('total-issues-table', [labelKeyOpened, labelKeyClosed], []);

  const openedIssuesGraph = new BarChart('opened-issues-chart', [], []);
  const openedIssuesTable = new Table('opened-issues-table', ['User', '# issues opened'], []);

  const closedIssuesGraph = new BarChart('closed-issues-chart', [], []);
  const closedIssuesTable = new Table('closed-issues-table', ['User', '# issues closed'], []);

  $('#search-button').click(() => {
    // Number of asynchronous requests
    let nbRequests = 2;

    // Reset the alert message
    document.getElementById('alert').innerHTML = '';

    // Disable the button until the end
    searchButton.disabled = true;

    // Reset the graphs and tables
    allIssuesGraph.reset();
    allIssuesTable.reset();

    openedIssuesGraph.reset();
    openedIssuesTable.reset();

    closedIssuesGraph.reset();
    closedIssuesTable.reset();

    // Get the informations from the repository
    const input = $('#search-input').val();

    const request = input.replace('https', 'http').replace('http://github.com/', '');

    const infos = request.split('/');

    const owner = infos[0];
    const repo = infos[1];

    const mapTotalRows = new Map();
    mapTotalRows.set(labelKeyOpened, 0);
    mapTotalRows.set(labelKeyClosed, 0);

    // Get opened issues
    oboe(`${url}/api/opened-issues/${owner}/${repo}`)
      .node('dates', (element) => {
        const dates = new Map(element);

        const datesLabels = Array.from(dates.keys());
        const datesData = [];

        dates.forEach((value, key) => {
          datesData.push({
            t: key,
            y: value,
          });

          mapTotalRows.set(labelKeyOpened, mapTotalRows.get(labelKeyOpened) + value);
        });

        allIssuesGraph.updateOpenedIssues(datesLabels, datesData);
        allIssuesTable.setBody([[mapTotalRows.get(labelKeyOpened), mapTotalRows.get(labelKeyClosed)]]);
      })
      .node('users', (element) => {
        const users = new Map(element);

        const usersTableRows = Array.from(users).sort((a, b) => b[1] - a[1]);

        const bestUser = ['no one', 'no one', 'no one'];
        const bestIssues = [0, 0, 0];
        const size = usersTableRows.length;
        const max = Math.min(15, size);

        if (size > 0) {
          bestUser[0] = usersTableRows[1][0];
          bestIssues[0] = usersTableRows[1][1];
        }
        if (size > 1) {
          bestUser[1] = usersTableRows[0][0];
          bestIssues[1] = usersTableRows[0][1];
        }
        if (size > 2) {
          bestUser[2] = usersTableRows[2][0];
          bestIssues[2] = usersTableRows[2][1];
        }

        openedIssuesGraph.update(bestUser, bestIssues);
        openedIssuesTable.setBody(usersTableRows.slice(0, max));
      })
      .done(() => {
        nbRequests -= 1;

        enableButton(nbRequests);
      })
      .fail(() => {
        nbRequests -= 1;

        error(nbRequests);
      });

    // Get closed issues
    oboe(`${url}/api/closed-issues/${owner}/${repo}`)
      .node('dates', (element) => {
        const dates = new Map(element);

        const datesLabels = Array.from(dates.keys());
        const datesData = [];

        dates.forEach((value, key) => {
          datesData.push({
            t: key,
            y: value,
          });
          mapTotalRows.set(labelKeyClosed, mapTotalRows.get(labelKeyClosed) + value);
        });

        allIssuesGraph.updateClosedIssues(datesLabels, datesData);
        allIssuesTable.setBody([[mapTotalRows.get(labelKeyOpened), mapTotalRows.get(labelKeyClosed)]]);
      })
      .node('users', (element) => {
        const users = new Map(element);

        const usersTableRows = Array.from(users).sort((a, b) => b[1] - a[1]);
        const bestUser = ['no one', 'no one', 'no one'];
        const bestIssues = [0, 0, 0];
        const size = usersTableRows.length;
        const max = Math.min(15, size);


        if (size > 0) {
          bestUser[0] = usersTableRows[1][0];
          bestIssues[0] = usersTableRows[1][1];
        }
        if (size > 1) {
          bestUser[1] = usersTableRows[0][0];
          bestIssues[1] = usersTableRows[0][1];
        }
        if (size > 2) {
          bestUser[2] = usersTableRows[2][0];
          bestIssues[2] = usersTableRows[2][1];
        }

        closedIssuesGraph.update(bestUser, bestIssues);
        closedIssuesTable.setBody(usersTableRows.slice(0, max));
      })
      .done(() => {
        nbRequests -= 1;

        enableButton(nbRequests);
      })
      .fail(() => {
        nbRequests -= 1;

        error(nbRequests);
      });
  });
});
