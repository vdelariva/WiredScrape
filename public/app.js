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
    // console.log(`article: ${JSON.stringify(article)}`)
    $.ajax({
      method: "POST",
      url: "/saveArticle",
      data: article
    })
    .then ((data) => {
      // Display modal with 'article saved
      $(".modal-title").text("Article Saved!")
    })
  })

  $(".delete-article").on("click", function(event) {
    event.preventDefault();

    const id = $(this).attr("data-id")
    $.ajax({
      method: "DELETE",
      url: `/deleteArticle/${id}`
    })
    .then ((data) => {
      console.log("article deleted")
      location.reload();
    })
  })

  // Add note to article
  $(".add-note").on("click", function (event) {
    event.preventDefault();

    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    const id = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: `/articles/${id}`
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.headline + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
})
