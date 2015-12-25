Conflict resolving
==================

This little website is built with a collection of work from different contributors.

When the same line of a file is editted by two different coders that results in a conflict. If you are asked to resolve conflicts this little guide should help.

## Add upstream remote

There are two important git remote repos.

1) Your fork. For example mine is at: https://github.com/roonyh/gci15.fossasia.org. We call it the `origin`
2) The original at: https://github.com/fossasia/gci15.fossasia.org. We call the `upstream`

First of all lets let git know about those remotes.

`git remote add upstream https://github.com/fossasia/gci15.fossasia.org`

The `origin` remote should already be there. Now check if it worked.

`git remote -v`

You should see the equivalent of following,

```shell
origin	https://github.com/roonyh/gci15.fossasia.org (fetch)
origin	https://github.com/roonyh/gci15.fossasia.org (push)
upstream	https://github.com/fossasia/gci15.fossasia.org (fetch)
upstream	https://github.com/fossasia/gci15.fossasia.org (push)
```

## Resetting everything

**Beware**: This will erase your changes.

Sometimes you feel the easiest solution would be just deleting your fork and forking again. And if your change is small this indeed could be the simplest solution.
But going through the process of forking and clonning again is just painful! And there is a much easier solution!

Just make sure you copy your changes to a file so you can add them back after resetting.

`git reset --hard upstream/gh-pages`

This makes your local branch exactly like the one on `upstream` repo. Now add the changes again and make a pull request.

## Updating your fork

You can bring the changes others make by,

`git pull --rebase upstream/gh-pages`

Then you can push to your fork (`origin`) by

`git push origin`
