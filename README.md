# stars-from-star-wars
Star Wars character web app to demonstrate learning in Vue. Prior to creating this project, I had no experience with using Vue.

This project uses:
* Vue 3
* Pinia
* Vue Router
* Vuetify
* SASS

Images used in this project are listed as free for use under the Pixabay Content License (https://pixabay.com/service/license-summary/)

# Running the solution
To run the solution, please run 'npm run serve' inside the 'stars-of-star-wars' directory.

# Future considerations:
When more time is available, the following changes would improve this project:
* More sophisticated axios services with better error handling and removed duplicated code between services
* Improvements to the UI to improve UX (the given solution was created to demonstrate core Vue skills)
* Added feature to search for characters by name
* Use types on each API request, and wherever else applicable
* Add 404 page

## Test scenarios
Due to time constraints, unit testing has not been added to the project. 
Below are some examplles of testing that could be completed in the future:

* Assert that clicking the 'like' button results in the character being added to the 'liked characters' list, icon is updated to 'filled-in' heart
* Assert that all expected characters are displayed in the list
* Table pagination: buttons are enabled/disabled based on the current page, clicking on buttons results in the page either increasing or decreasing with the expected number of characters in the list (testing first and last page)
* All expected character details are visible when the character is clicked, and values respond to the correct character
* Expanding films/homeworld displays the expected data
* Selecting a second character closes the currently open films/homeworld list, and the details update accordingly
* Clicking review character navigates to the review form for the expected character
* Review character form - name and film fields are required, form is not submitted if these fields aren't present
* Date is formatted correctly in request
* Back link navigation returns to the correct page
* Returning to the character list page from the review page - the characters that I previously liked are still present in the 'liked characters' list
* Given I am a star wars fan named Bob, when I click on Darth Vader, then click to leave a review, then I can expand the films dropdown, and I see four films listed
