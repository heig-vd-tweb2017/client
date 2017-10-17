/* eslint no-undef: "error" */
/* global LineChart BarChart oboe */

$(() => {
  const openedIssuesGraph = new BarChart('opened-issues-chart', [], []);
  const closedIssuesGraph = new BarChart('closed-issues-chart', [], []);
  const allIssuesGraph = new LineChart('total-issues-chart', [], [], []);

  const url = 'localhost:5050'; // 'https://evening-garden-52901.herokuapp.com';
  $('#search-button').click(() => {
    const input = $('#search-input').val();

    const request = input.replace('https://github.com/', '');

    const infos = request.split('/');

    const owner = infos[0];
    const repo = infos[1];

    const target = `${url}/api/opened-issues/${owner}/${repo}`;

    oboe('/data-opened.json')
      .node('!.*', (node) => {
        const dates = new Map(node.dates);
        const users = new Map(node.users);

        const datesLabels = Array.from(dates.keys());
        const datesData = [];

        dates.forEach((value, key) => {
          datesData.push({
            x: key,
            y: value,
          });
        });

        const usersLabels = Array.from(users.keys());
        const usersData = Array.from(users.values());

        allIssuesGraph.updateOpenedIssues(datesLabels, datesData);
        openedIssuesGraph.update(usersLabels, usersData);
      });

    oboe('/data-closed.json')
      .node('!.*', (node) => {
        const dates = new Map(node.dates);
        const users = new Map(node.users);

        const datesLabels = Array.from(dates.keys());
        const datesData = [];

        dates.forEach((value, key) => {
          datesData.push({
            x: key,
            y: value,
          });
        });

        const usersLabels = Array.from(users.keys());
        const usersData = Array.from(users.values());

        allIssuesGraph.updateClosedIssues(datesLabels, datesData);
        closedIssuesGraph.update(usersLabels, usersData);
      });
  });
});
