# FOSSASIA GCI Site 2015/16

[![Build Status](https://travis-ci.org/fossasia/gci15.fossasia.org.svg)](https://travis-ci.org/fossasia/gci15.fossasia.org)


## Run this website on Github
Fork this repo, and it should be on `http://<username>.github.io/gci15.fossasia.org` now.

## Running the website on Local Machine
### Clone Repo

    git clone https://github.com/fossasia/gci15.fossasia.org.git

or own fork version

    git clone https://github.com/<username>/gci15.fossasia.org.git

### Install Jekyll

    gem install bundler
    gem install github-pages

*Use sudo if there is any permission issue*

### Running website

    cd gci15.fossasia.org
    jekyll serve
    
### Go to

    http://0.0.0.0:4000/ or http://localhost:4000/

## About modyfying code

For the following files please modyfy the file with the same name but with [dev] prefix and then copy the whole code to the respective the online compressors compress the code and put it in the file [the file withou the [dev] prefix]{This is done to improve page load time and speed}
     
    index.html
    stylesheets/components.css
    stylesheets/hover.css
    stylesheets/loklak.css
    stylesheets/scroll.css
    stylesheets/stylesheet.css
    js/classie.js
    js/index.js
    js/photostack.js
    js/scroll.js

Compressors:
CSS        {.css}  files - https://cssminifier.com/
HTML       {.html} files - http://www.willpeavy.com/minifier/
JAVASCRIPT {.js}   files - https://javascript-minifier.com/

NB: You may also use any compressor of your choice

## About Adding images

Please add only compressed images to the images folder and never mention online image links

Here's the link to PNGgaunlet a free software to optimize most image files : http://pnggauntlet.com/

## Useful Git Tricks
  see [GIT.md](https://github.com/fossasia/gci15.fossasia.org/blob/gh-pages/GIT.md) 

## Demo

You can see the current website [over here](http://gci15.fossasia.org).