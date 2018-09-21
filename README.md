# WiredScrape

## Purpose: ##

Using Cheerio create an application to scrape a news source. Display the articles and allow the user to add/view comments.

## Description ##

The WiredScrape application will automatically scrape https://www.wired.com/most-popular/ website. The scraped articles will be displayed in cards. The user can save selected cards by clicking on the "+" icon. By navigating to the 'Saved Articles' page, the user can then view the the save articles.

On the Saved Articles page:
* The user can view the notes associated with the selected article by clicking on the note icon. Any notes associated with the article will be displayed in a modal. The user may delete a note or add a new note.
* The user can delete an article by clicking on the trash icon. Deleting an article will delete all associated article notes.
* If the article already exists in the database, the app will not store another entry into the database and display an alert that the article already exists in the database.

When adding/deleting an article or note, the app will display an alert. The alert will display for 2 seconds or can be manually dismissed by the user.

Link to app deployed on Heroku: [boiling-fortress-69679](https://boiling-fortress-69679.herokuapp.com/)

## Tools ##

**NPM Libraries**
* express
* body-parser
* mongoose
* express-handlebars
* cheerio
* axios - used instead of request

**Frameworks**
* Bootstrap

## Developer's Notes: ##
* On the first attempt at this assignment, I scraped the Medium website. This proved to be very challenging since the html elements on this site use vague class names that change daily. The website also uses 'lazy loading' so that not all elements are available at the time of scraping. I was successful in scraping this website after spending quite a bit of time, but was not able to get the article images. I even considered performing a 'double' scraping of the article page in order to get the image, but this would have created a long load time. I chose to select another news source for this assignment. You can see these efforts in the [MediumScrape](https://github.com/vdelariva/MediumScrape) repository.
* Used Bootstrap Alert to display status of saving/deleting a note or article. Used the scrollTop method to determine the current location in the window to then adjust the Alert position for the user.
* In setting up the Article and Note models, added Article id to the Note. This made it simple to search and delete all notes associated with an article by simply searching for all notes with the desired article id.
