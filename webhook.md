Setting up a Webhook
==================

You can set up a webhook for so that each time a contributor opens or reopens a pull request on your repository/fork, a bot may comment a live version of the contributor's site on the pull request.

## Add webhook

First, you must add a webhook to your repository. To do this:

1) Go to your repository settings and select *Webhooks & Services*.
2) Click *add webhook*. You can make up a random payload URL for now. Your secret key can be anything (be sure to record this).
3) Click *let me select individual events* and only check the *pull request* checkbox.
4) Create the webhook

## Setting up your bot

You must first create a new github account to host the bot (or you can use your own if you want it to act as the bot).  Go to your [settings](https://github.com/settings/tokens) to create a new personal access token. Leave it on the default permissions.

1) Clone https://github.com/codethejason/autoprresponder to a public area on your server. Something like `http://example.com/fossasiaprbot/webhook.php` will be your webhook URL, so please edit that in the repository settings. On your server, be sure to have php and php5-curl installed for running the script.
2) Create a `secret.json` file like the following:

```
{
  "githubkey": "your secret key you recorded in part 1",
  "token": "your secret access token"
}
```

## Testing the webhook

You can now test your webhook by creating a pull request on your fork.

Sign into another account and make a file change in the *gh-pages* branch and make a pull request. Test that the bot now posts the link to the live website.
