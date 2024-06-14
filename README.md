📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

## Unit Assignment: Flixster

Submitted by: **Theo**

Estimated time spent: **30** hours spent in total

Deployed Application (optional): [Flixster Deployed Site](https://flixster-ctfr.onrender.com/)

### Application Features

#### CORE FEATURES


- [x] **Display Movies**
  - [x] Users can view a list of current movies from The Movie Database API.
  - [x] For each movie displayed, users can see its title, poster image, and votes.
  - [x] Users can load more current movies by clicking a button at the bottom of the list (page should not be reloaded).
- [x] **Search Functionality**
  - [x] Users can search for movies and view the results in a grid.
  - [x] Users can clear results and view previous current movies displayed.
- [x] **Accessibility Features**
  - [x] Website implements accessibility features (semantic HTML, color contrast, font sizing, alt text for images).
- [x] **Responsive Design**
  - [x] Website implements responsive web design.
- [x] **Movie Details**
  - [x] Users can view more details about a movie in a popup, such as runtime in minutes, backdrop poster, release date, genres, and/or an overview.
- [x] **Sorting Options**
  - [x] Users can click on a filter by drop down to sort product by type (alphabetic, release date, rating).
- [x] **Layout**
  - [x] Website displays header, banner, search, movie grid, about, contact, and footer section.

#### STRETCH FEATURES

- [x] **Deployment**
  - [x] Website is deployed via Render.
- [x] **Embedded Movie Trailers**
  - [x] Within the popup displaying a movie's details, users can play the movie trailer.
- [x] **Watched Checkbox**
  - [x] For each movie displayed, users can mark the movie as watched.
- [x] **Favorite Button**
  - [x] For each movie displayed, users can favorite the movie.
- [x] **Sidebar**
  - [x] Users can open a sidebar
  - [x] The sidebar displays the user's favorited and watched movies

### Walkthrough Video

`TODO://` Add the embedded URL code to your animated app walkthrough below, `ADD_EMBEDDED_CODE_HERE`. Make sure the video or gif actually renders and animates when viewing this README. (🚫 Remove this paragraph after adding walkthrough video)

`ADD_EMBEDDED_CODE_HERE`

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The topics discussed in our labs were a good starting point for the project. Specificly the discussion of useState proved very useful.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.

I would have integrated with the "themoviedb.org" auth system and allowed users to leave review on movies. I would have also spent time on a feature to find movies near you.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

n/a did not demo this week.

### Open-source libraries used

- Font Awesome
- telefunc (but only in the adding-cloud-functions branch)
- vite

### Shout out

Shout out to Paige Godfrey and the other cohort 2 instuctors for knowledgeably teaching react fundamentals


## Tasks
| task name| time estimation | start time| endtime|
|------|------|------|------|
|Set the favicon|15 min| 402pm 6/10|<6:00pm 6/10||
|Switching Between "Now Playing" and Search Results|1 hour| 6:34pm |eod 6/10|
|Switch from "next page" to load more" | 45 min | | <12pm 6/11|
|add header and footer| 30 min| 1:09pm 6/11| 2pm 6/11|
|revamp the difference between seach and explore|1 hour|4:13|5:06 6/11|
|Embedded Movie Trailer|30 min |5:30 6/11|6:37 |
|Watched Checkbox|1 hour|6:40 pm 6/11|8:25||
|Favorite Button|||see above|
|Sidebar|2 hours| 7:40am 6/12|1:39 pm 6/12|
|add filters|||Done|
|Use serverless functions to querry db|||Done - see adding cloud function branch|
|swithc like and watched buttons to imgs|||Done|
|only add modals to dom when needed|||Done|
|make iframe not take up space if no vid yet|||Done|
|invistagate why components folder is red in folder explore (vscode)||| No longer red, reason unknown|
| evaulate whether liked and watched should remain properties of Movie|||Done (removed from movie)|
|style filterAndSearch|||Done|
|replace setStates that use the state with fucitions that have prev|||Done|
|add images for null image|||Done|
|always show heart on mobile|||Done|
|make loading a gif|15 min|8:15am 6/14|8:25|
|reevaluate component file system organization||||
|move dialog close button and make bg clickable||||
|figure out why prettier doesn't work on code-fb||||
