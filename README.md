# Project - Github Analytics
This project is conducted for the course "TWEB-2017", at HEIG-VD, Switzerland.

* Teacher: Olivier Liechti.
* Authors: Ludovic Delafontaine & Michela Zucca.

## What is this
This project proposes to analyze a GitHub repository, especially on issues management.
	
* Time analysis of opened and closed issues.
* Enhancement of the three most active users on closing issues.
* Enhancement of the three most active users on opening isusses.
	
The three aspects are represented throught graphics and tables.
	
The information about the users is deliberately hidden in parts to avoid any competition. The only objective is mutal help and encouragement.
	
## Why is this
We wanted to create this tool to encourage people to improve their product by the following points:

We think that issues are a good measure to the activity and the progress of a project.

* People who open issues want to see new features in the product they use. 
* People who close issues and add new features to the product.

We think that issues should be opened. This proves the activity and contininous integration of the product as people want to see new features and people implement them.

## How is this
For this project, we used several librairies and technologies.
 
Client side:
* [SB Admin 2](https://startbootstrap.com/template-overviews/sb-admin-2/) for the Bootstrap template.
* [Chart.js](http://www.chartjs.org/) to display the infomations with graphics.
* [Oboe.js](http://oboejs.com/) to retreive data from the server and display them as soon as new data are available.

Server side:
* [Node.js](https://nodejs.org/) for the server runtime engine.
* [Express](http://expressjs.com/) for the WEB server.
* [GitHub API](https://developer.github.com/v3/) to get the data from GitHub.
* [SuperAgent](https://github.com/visionmedia/superagent) to query GitHub's API easily.
* [Mocha](https://mochajs.org/) for the unit tests.
* [Chai](http://chaijs.com/) as an assertion library used with Mocha

On both side:
* [ESLint](https://eslint.org/) for quality code control.

## Live testing
You can test the entire application [here](https://heig-vd-tweb2017.github.io/client/). Feel free to test it !

## Client's aspects
The client side is the interface with the user.

The user is prompted to enter the name of a github repo to analyze and start the analysis. The results are presented in the form of tables and graphs updated as the analysis progresses.

### Sample result
* Time analysis

![](https://github.com/heig-vd-tweb2017/client/blob/master/images/totalIssues.PNG)

* Best users for opened issues

![](https://github.com/heig-vd-tweb2017/client/blob/master/images/openedIssue.PNG)

### Deployment
You only need to deploy the `src` directory on a WEB server. You might need to edit the file `src/js/custom.js` and edit the `url` constant to match your API's URL.

## Server's aspects
For server's aspects, we encourage you to visit the associated repository [here](https://github.com/heig-vd-tweb2017/server).
