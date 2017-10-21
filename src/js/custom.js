/* eslint no-undef: "error" */
/* global LineChart BarChart oboe */

$(() => {
  const openedIssuesGraph = new BarChart('opened-issues-chart', [], []);
  const closedIssuesGraph = new BarChart('closed-issues-chart', [], []);
  const allIssuesGraph = new LineChart('total-issues-chart', [], [], []);

  const tableTotal = new Table('total-issues-table', ['Date', 'Issues Opened', 'Date', 'Issues Closed'], []);
  const rowsOpened = [];
  const tableOpened = new Table('opened-issues-table', ['User', 'Issues Opened'], []);
  const tableClosed = new Table('closed-issues-table', ['User', 'Issues Closed'], []);

  const url = 'http://localhost:5050'; // 'https://evening-garden-52901.herokuapp.com';
  $('#search-button').click(() => {
    const input = $('#search-input').val();

    const request = input.replace('https://github.com/', '');

    const infos = request.split('/');

    const owner = infos[0];
    const repo = infos[1];

    oboe(`${url}/api/opened-issues/${owner}/${repo}`)
      .node('dates', (element) => {
        const dates = new Map(element);

        const datesLabels = Array.from(dates.keys());
        const datesData = [];

        dates.forEach((value, key) => {
          datesData.push({
            x: key,
            y: value,
          });
        });

        allIssuesGraph.updateClosedIssues(datesLabels, datesData);
      })
      .node('users', (element) => {
        const users = new Map(element);

        const usersLabels = Array.from(users.keys());
        const usersData = Array.from(users.values());

        closedIssuesGraph.update(usersLabels, usersData);
      });

    oboe(`${url}/api/closed-issues/${owner}/${repo}`)
      .node('dates', (element) => {
        const dates = new Map(element);

        const datesLabels = Array.from(dates.keys());
        const datesData = [];

        dates.forEach((value, key) => {
          datesData.push({
            x: key,
            y: value,
          });
        });

        allIssuesGraph.updateOpenedIssues(datesLabels, datesData);
      })
      .node('users', (element) => {
        const users = new Map(element);

        const usersLabels = Array.from(users.keys());
        const usersData = Array.from(users.values());

        
        for (let index = 0; index < usersLabels.length; index++) {
          const user = usersLabels[index];
          const data = usersData[index];
          rowsOpened[index] = [user, data];
        }

        openedIssuesGraph.update(usersLabels, usersData);
        tableOpened.setBody(rowsOpened);
      });
  });

  // Test jeux de données fictifs

  const rows = [];
  rows[0] = ['10 oct 2017', 1, '2 octobre 2017', 2.218];
  rows[1] = ['10 oct 2017', 1, '2 octobre 2017', 2.218];
  rows[2] = ['10 oct 2017', 1, '2 octobre 2017', 2.218];
  rows[3] = ['10 oct 2017', 1, '2 octobre 2017', 2.218];
  rows[4] = ['10 oct 2017', 1, '2 octobre 2017', 2.218];

  tableTotal.setBody(rows);
});
