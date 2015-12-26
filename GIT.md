Conflict resolving
==================

This little website is built with a collection of work from different contributors.

A conflict arises when the same line of a file is changed by different contributors. If you are asked to resolve conflicts this little guide should help.

## Add upstream remote

There are two important git remote repos.

1) Your fork. It would look like this : https://github.com/<username>/gci15.fossasia.org. We call it the `origin`

2) The original https://github.com/fossasia/gci15.fossasia.org. We call it the `upstream`

## Getting started with Contribution

Follow these steps if you are starting working on this repo : 

1) Fork it.

2) Clone the repo to your machine using : 
`git clone https://github.com/<username>/gci15.fossasia.org`

3) Add another remote that signifies the upstream repo (as explained above). To do this, use : 
`git remote add upstream https://github.com/fossasia/gci15.fossasia.org`

4) Check if everything is okay. Use : 
`git remote -v`

Expected output : 

```shell
origin	https://github.com/<username>/gci15.fossasia.org (fetch)
origin	https://github.com/<username>/gci15.fossasia.org (push)
upstream	https://github.com/fossasia/gci15.fossasia.org (fetch)
upstream	https://github.com/fossasia/gci15.fossasia.org (push)
```

If you get the expected output, everything is good, Happy contributing!!

## Resetting everything

**Beware**: This will erase your changes.

Sometimes you feel the easiest solution would be just deleting your fork and forking again. And if your change is small this indeed could be the simplest solution.
But going through the process of forking and cloning again is just painful! And there is a much easier solution!

Just make sure you copy your changes to a file so you can add them back after resetting.

`git reset --hard upstream/gh-pages`

This makes your local branch exactly like the one on `upstream` repo. Now add the changes again and make a pull request.

## Updating your fork

You can bring the changes others make by,

`git pull --rebase upstream/gh-pages`

Then you can push to your fork (`origin`) by

`git push origin`

##Squashing Commits

There are times when you have multiple commits that are related, you have to make them into one and then file a pull request. For this, we use squashing mode of `git rebase`.
For this we follow these steps : 

1) `git rebase -i HEAD~x`, where x is the number of commits to be squashed into one. 

2) This will open you default text editor with an output like :

```shell
pick 4cc1a7 First commit
pick cc57f7 Second commit
pick cc57f1 Third commit


# Rebase fd165f..fa142e onto fd165f3 (2 command(s))
#
// VARIOUS METHODS OF REBASE
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```
Here you change the `pick` keyboard in front of the commits to `squash` expect for the oldest commit of the lot (For example Commit named `First commit` here)

3) Quit the editor. 

4)The default editor will open again, this time with an option to select commit messages. The expected output is something like this :

```shell
# This is a combination of x commits.
# The first commit's message is:

First Commit

# This is the 2nd commit message:

Second Commit 

# This is the 3nd commit message:

Third Commit 

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Author:    abc
# Date:      Mon Dec 21 12:09:48 2015 +0800
#
# rebase in progress; onto fd165f
# You are currently editing a commit while rebasing branch 'master' on 'fd165f'.
#
# Changes to be committed:
#       modified:   README.md
#
```                     
Here you have to write your desired commit message and comment all other lines using `#`. After this rebasing will start and you're done.

##Pushing commits after Squashing

If you try to perform `git push` after squashing commits, it will be rejected. So, to overcome this issue , we use force push. 

Force push is done using the command :
`git push -f origin gh-pages`
