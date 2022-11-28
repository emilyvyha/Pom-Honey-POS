# 315_Project3
CSCE 315 Project 3 repo




----------------------
GIT

Step 1: git clone

    git clone https://github.tamu.edu/davitasatr/315_Project3.git

Step 2 (Maybe optional?): Move to Develop and fetch branches (idk if this is necessary but do it anyways)

    git fetch
    
    git checkout develop

    git pull origin develop


Step 3: Make your own branch

    git checkout -u origin your_branch_name

    git push -u origin your_branch_name

----------------------
FRONTEND

First, navigate to /frontend (the folder), and in the terminal run

    npm install
    npm install @mui/x-data-grid

If this gives an error, you have to install node/npm (idk how to do that lol, you gotta google it, good luck)
If this works, in order to run the react app go back to terminal and type

    npm start

This will open a new tab in chrome and will have your app.
React updates itself immediately when you save, so no need to reload the page when you make changes (as long as you save)


----------------------
BACKEND

In order to run server.js, do

    node server.js

If it doesn't work, then try npm install. If it still doesn't work, suffer, idk