/* eslint no-undef: "error" */
/* global LineChart BarChart oboe */

$(() => {
  const openedIssuesGraph = new BarChart('opened-issues-chart', [], []);
  const closedIssuesGraph = new BarChart('closed-issues-chart', [], []);
  const allIssuesGraph = new LineChart('total-issues-chart', [], [], []);

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

        openedIssuesGraph.update(usersLabels, usersData);
      });
  });
});
