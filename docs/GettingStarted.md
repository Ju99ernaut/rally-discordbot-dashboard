# Getting Started

This page is going to give a few pointers about the UI and how to navigate around.

## Homepage

The dashboard homepage is available at `rallybot.app` which should look like the image below:

![homepage](https://i.imgur.com/J3jvVd0.png)

The following buttons should be available:

* `Add` - for adding the bot to discord, logging in is not required to add the bot to a server, if all you want is to add the bot to your server simply click this button.
* `Login` - clicking this will redirect you to discord where you'll be required to authorize the app, the app only requires the `identify` and `guild` scope. After authorization you will be redirected back to the homepage.
* `Dashboard` - this takes you to the bot dashboard, if all you want is to view some general stats, you can still visit this even if you're not logged in. 

## Dashboard 

The dashboard itself is available from `rallybot.app/dashboard/home`. When logged out it should look something like this:

![homepage](https://i.imgur.com/Jr9wQAw.png)

You'll have to login in order to customize the bot on your server

## Using the dashboard

First you'll have to login, then navigate to dashboard home, select a guild from the sidebar then you can start customization. Below we'll go through actions available in each dashboard page.

`/dashboard/home`

![home](https://i.imgur.com/LEsCqIa.png)

* Edit default creator coin for the server.
* View creator coin stats.
* View rally market info charts.

Clicking `default` will set the selected creator coin as default for that server.

`/dashboard/setup`

![setup](https://i.imgur.com/oy2cWB2.png)

* Add and delete role->coin mappings for a server
* Add and delete channel->coin mappings for a server

To add a role or channel mapping fill in the respective fields, click add then confirm.
To delete a role or channel mapping click the delete icon the confirm.

`/dashboard/commands`

![commands](https://i.imgur.com/1q2ZaVN.png)

* View available text commands for discord

`/dashboard/features`

![features](https://i.imgur.com/IlJ7Pr7.png)

* Create a feature request

Fill in the form the submit the feature request, you can also add it as an issue on github

`dashboard/logs`

![logs](https://i.imgur.com/RBjnwAn.png)

* View log of network activity for a creator coin

`dashboard/settings`

![settings](https://i.imgur.com/i49L7sP.png)

* Change bot prefix for a server
* Disable bot in a server

That's it you can now visit https://rallybot.app to get started!