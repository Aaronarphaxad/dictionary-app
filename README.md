# Dictionary App

This is a multi-language dictionary app used to search for words in various languages like English (US/UK), French, Spanish, Japanese, Hindu, German, e.t.c. I used the help of a free dictionary API.

#### Usage
To use the app, register to get access to the save word feature. Choose a language and enter a word in the corresponding language to get the meaning of words in that language. If the searched word is not available in the dictionary API database, it would display a message saying the word is not available.

YouTube link: https://youtu.be/TjQef6sSHng
Live preview: 


## Distinctiveness
This app is unique because it consumes a foreign API, which returns a rather complex data structure which was destructured and displayed. Unlike the other problem sets which we needed to build our own Fetch API using Django, and create tables to store and query data. It is also different from other dictionary web apps because users can search for words in over eight(8) languages and save for future reference. They also have the ability to delete saved words.

## Complexity
This app can be categorized as a web app and not a static website because it does not only comprise of html and css files. It is a Django app with so many files and folders. 
- This web app contains a javascript file which handles the multi-dict app's ability to communicate with a free, external API using AJAX (Asynchronous javascript). When a user enters a word, a function written to construct API end-point constructs the URL according to what language the user selects and the word entered, then a fetch request is sent to the dictionary API which returns json data. The data is then destructured and displayed intelligently for the user to see. It was hard to seperate some definitions without getting errors because some words do not have more than one definition. 
- Another feature of the app is also to save searched words when a user is registered. This was implemented using a tooltip for better UX(user experience) to let users know they can save words. 
- The save button only appears when a user is logged in. When a user searches for a word, an event listener is activated and a fetch request (POST) is sent to the profile route, which handles displaying the saved word by retrieving all the words saved in the saved words database on GET, and saves the word sent via POST request.
- There is an option to delete words a user saves. The word database is looped over and each word displays the word, a definition, phonetics, sound(if available), and a delete icon. When this button is clicked, the delete word route handles deletion by sending the post id to the route and querying for that word in the words database, and then deleting the word.

## Files contained in the app
- Static folder contains the favicon photos, the CSS file containing general styling, and the javascript file which handles all the event listeners and communicates with the dictionary API using Document Object Model (DOM) and AJAX.
- Templates folder contain all the rendered pages using Django templating language.
- Forms.py contains the register form, which collects user infomation for registration.
- Models.py contains the databases like user database and saved_words.
- Views.py handles the functions controlling routes.
- Requirements.txt contains all the apps used and dependencies.

