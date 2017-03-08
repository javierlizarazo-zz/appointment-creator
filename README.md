# Welcome to the Appointment Creator!

**_Created with yeoman, vanilla JS and sass using [flatpickr](https://chmln.github.io/flatpickr/)_**

## Features

* Pick any date from today to the future
* Sort by "any date", "weekdays" and "weekends" only
* Select any time from 00:00 AM to 11:45 PM with 15' intervals

## Getting Started

* **Requirements**: `Gulp, Bower and node version > 4`
  * Install Gulp: `npm install --global gulp-cli`
  * Install Bower: `npm install -g bower`
  * Update node Version: `sudo npm cache clean -f | sudo npm install -g n | sudo n stable`
* Run `npm install`
* Run `bower install`
* Run `gulp serve` to preview and watch for changes
  * **Note:** if you updated node version probably you need to run `npm rebuild node-sass` before running `gulp serve`
* Run `gulp serve:dist` to preview the production build
