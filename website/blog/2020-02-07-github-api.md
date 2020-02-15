---
title: Github API
author: Cesar
---

> In progress

Playing with Github API using plain javascript.

<!--truncate-->

## Ideas

- What can I do with Github API
- What is needed to use the API
- Entities / Objects
- Make calls using CURL
- Make calls using plan javascript
- Create simple app that lists repos and PRs of the authenticated user

## Basics

Link: https://developer.github.com/v3/guides/getting-started/

This guide has nice examples using cURL to get you started with the API, like this one that doesn't require any auth information and reads all public data from any github user:

```bash
$ curl https://api.github.com/users/ckinan
{
  "login": "ckinan",
  "id": 7999613,
  "node_id": "MDQ6VXNlcjc5OTk2MTM=",
  "avatar_url": "https://avatars1.githubusercontent.com/u/7999613?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/ckinan",
  "html_url": "https://github.com/ckinan",
  "followers_url": "https://api.github.com/users/ckinan/followers",
  "following_url": "https://api.github.com/users/ckinan/following{/other_user}",
  "gists_url": "https://api.github.com/users/ckinan/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/ckinan/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/ckinan/subscriptions",
  "organizations_url": "https://api.github.com/users/ckinan/orgs",
  "repos_url": "https://api.github.com/users/ckinan/repos",
  "events_url": "https://api.github.com/users/ckinan/events{/privacy}",
  "received_events_url": "https://api.github.com/users/ckinan/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Cesar Kina",
  "company": null,
  "blog": "https://ckinan.com/",
  "location": "Lima, Peru",
  "email": null,
  "hireable": null,
  "bio": "software developer",
  "public_repos": 22,
  "public_gists": 1,
  "followers": 3,
  "following": 7,
  "created_at": "2014-06-26T20:18:31Z",
  "updated_at": "2020-02-08T00:08:38Z"
}
```

There is a limited amount of requests that you can make to the API without being authenticated. Quoting:

> Unauthenticated clients can make 60 requests per hour. To get more requests per hour, we'll need to authenticate. In fact, doing anything interesting with the GitHub API requires authentication.

## Authentication types

For authentication, you have 2 options:

- Using personal access tokens : https://developer.github.com/v3/guides/getting-started/#using-personal-access-tokens

> The easiest and best way to authenticate with the GitHub API is by using Basic Authentication via OAuth tokens. OAuth tokens include personal access tokens.

Examples:

```bash
curl -i -u <your_username>:<your_access_token> https://api.github.com/user/repos
```

Provide privileges to your token to read your repos.

- Using OAuth tokens for apps : https://developer.github.com/v3/guides/getting-started/#using-oauth-tokens-for-apps

> Apps that need to read or write private information using the API on behalf of another user should use OAuth.

I would like to get further with the second option, since I can see some use cases for an app authenticating users through Github Login page.

## OAuth

Links:

- https://developer.github.com/apps/about-apps/
- https://developer.github.com/apps/building-oauth-apps/
