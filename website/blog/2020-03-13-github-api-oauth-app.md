---
title: Github API: OAuth tokens for apps
author: Cesar
---

> In progress

How to use OAuth tokens for apps with Github API to authorize the access of certain data on behalf of another user.

<!--truncate-->

## Web flow

Quoting Github docs:

> Tokens should be created via a [web flow](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/). An application sends users to GitHub to log in. GitHub then presents a dialog indicating the name of the app, as well as the level of access the app has once it's authorized by the user. After a user authorizes access, GitHub redirects the user back to the application.

## Example (Step by step)

curl -H "Authorization: token xyz" https://api.github.com/user

curl -i -H "Authorization: token xyz" https://api.github.com/user/repos

curl -i -H "Authorization: token xyz" https://api.github.com/repos/ckinan/ckinan.com/pulls/9/reviews

https://github.com/netlify/cli/blob/master/docs/netlify-dev.md#netlify-functions

netlify link

## Refs
- https://developer.github.com/v3/guides/getting-started/#using-oauth-tokens-for-apps
- https://developer.github.com/v3/guides/basics-of-authentication/