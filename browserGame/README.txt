the 'actual' folder contains the react version of the app. It uses classes rather than hooks.

The 'early' folder contains the plain javascript version - i.e. not using react. This folder has two subfolders. the 'origin' folder contains the actual app. both folders have several other folders which are initial forays into javascript and postgresql. 

The index is found within /early/origin/ftd/static_content/index.html. This will not work unless a database conenction is setup.

This is what the 'fake' folder is for. The index found within /early/fake/ftd/static_content/index.html will work WITHOUT a proper database setup. This is because controller.js has modified code (line 230) that allows a login bypass - allowing you to go into the website without login credentials. This will cause issues, but it allows you to explore the project without a full setup - a 'fake set up' if you will, hence the name of the folder.

Notably among the issues is that all features related to user information will not work. This includes database display and the 'class ability' gameplay feature - it will be stuck on the "Tricky" class unless the 'playerClass' around line 235 of controller.js is modified to one of the other player classes.

