$(document).ready(() => {
  // Click on Scrape button
  // $("#scrape").on("click", function (event) {
  //   event.preventDefault();

  //   $.ajax({
  //     method: "GET",
  //     url: "/search"
  //   })
  //   .then ((data) => {
  //     window.location.replace("/search")
  //     console.log("scraped")
  //   })
  // })

  $(".add-article").on("click", function(event) {
    event.preventDefault();

    // Save the article to the data base
    const article = {
        headline: $(this).attr("data-headline"),
        link: $(this).attr("data-link"),
        summary: $(this).attr("data-summary"),
        imageURL: $(this).attr("data-imageURL"),
        articleDate: $(this).attr("data-articleDate")
    }
    $.ajax({
      method: "POST",
      url: "/saveArticle",
      data: article
    })
    .then ((data) => {
      // Display modal with 'article saved
      $("#alert-msg").text("Article Saved!")
      $(".alert").show();
    })
  })

  // Close alert
  $('.close').click(function() {
    $('.alert').hide();
  })

  $(".delete-article").on("click", function(event) {
    event.preventDefault();

    const id = $(this).attr("data-id")
    $.ajax({
      method: "DELETE",
      url: `/article/${id}`
    })
    .then ((data) => {
      console.log("article deleted")
      location.reload();
    })
  })

  // Show article note
  $(".show-note").on("click", function (event) {
    event.preventDefault();

    // Empty the notes from the note section
    $(".modal-body").empty();
    $(".modal-title").text($(this).attr("data-headline"))
    $("#savenote").attr("data-id",$(this).attr("data-id"))

    // Save the article id from note class
    const articleId = $(this).attr("data-id");


    // Now make an ajax call for the notes
    $.ajax({
      method: "GET",
      url: `/notes/${articleId}`
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(`get notes/id: ${JSON.stringify(data)}`);
        let notes = [];
        data.forEach((note) =>{
          console.log(`note: ${JSON.stringify(note)}`)
          console.log(note.article.headline)
          console.log(note.body)
          console.log(note.name)
          
          const n = `<div class="card shadow p-3 mb-5 bg-white rounded">`
            + `<div class="card-body">`
            + `<blockquote class="blockquote mb-0">`
            + `<p class="note-body">${note.body}</p>`
            + `<footer class="blockquote-footer">${note.name}<span style="float:right"><i class="far fa-trash-alt delete-note" data-id="${note._id}"></i></span></footer>`
            + `</blockquote></div></div>`

          notes.push(n);
        })
        
        $(".modal-body").append(notes);

        const addComment = `<form>
            <textarea id="bodyInput" class="form-control-sm" placeholder="Add comments..." rows="3"></textarea>
            <textarea id="nameInput" class="form-control-sm" placeholder="Your name"></textarea>
          </form>`

        $(".modal-body").append(addComment);
        

        // The title of the article
        // $("#notes").append("<h2>" + data.headline + "</h2>");
        // An input to enter a new title
        // $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        // $("#notes").append("<button data-id='" + articleId + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        // if (data.n) {
          // Place the title of the note in the title input
          // $("#titleinput").val(data[0].name);
          // Place the body of the note in the body textarea
          // $("#bodyinput").val(data[0].body);
        // }
      });
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var articleId = $(this).attr("data-id");
    console.log(`articleId: ${articleId}`)

    // Save note
    $.ajax({
      method: "POST",
      url: "/note",
      data: {
        name: $("#nameInput").val(),
        body: $("#bodyInput").val(),
        article: articleId
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#modal-body").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#nameInput").val("");
    $("#bodyInput").val("");
  });
})
