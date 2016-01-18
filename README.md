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

## Useful Git Tricks
  see [GIT.md](https://github.com/fossasia/gci15.fossasia.org/blob/gh-pages/GIT.md) 

## Demo

You can see the current website [over here](http://gci15.fossasia.org).

##Special Note

Use the development version(the files present in the development folder) to develop the files present in that folder(index,css files and js files)[they are compressed and put in the site root to improve page speeds] If you modify them please compress the respective file and then override the file present in the site root and then put the compressed file in the development folder.