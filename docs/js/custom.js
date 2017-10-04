$(() => {
  $('#search-button').click(() => {
    const input = $('#search-input').val();

    const request = $.ajax({
      url: 'http://localhost:8080/test.php',
      method: 'POST',
      data: {
        targetUrl: input,
      },
      dataType: 'json',
    });

    request.done((msg) => {
      console.log(msg);
    });

    request.fail((jqXHR, textStatus) => {
      console.log(`Request failed: ${textStatus}`);

      $('#total-issues-table').text('Coucou, je suis content ^_^');
    });
  });
});
