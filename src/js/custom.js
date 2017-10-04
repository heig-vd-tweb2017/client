$(() => {
  $('#search-button').click(() => {
    const input = $('#search-input').val();

    const request = input.replace('https://github.com/', '');

    const infos = request.split('/');

    const owner = infos[0];

    const repo = infos[1];

    const allIssuesRequest = $.ajax({
      url: `/api/${owner}/${repo}/all-issues`,
      method: 'POST',
      data: {
        targetUrl: input,
      },
      dataType: 'json',
    });

    allIssuesRequest.done((msg) => {
      console.log(msg);
    });

    allIssuesRequest.fail((jqXHR, textStatus) => {
      console.log(`Request failed: ${textStatus}`);

      $('#total-issues-table').text('Coucou, je suis content ^_^');
    });
  });
});
