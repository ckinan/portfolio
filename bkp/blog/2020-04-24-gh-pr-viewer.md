---
title: Project: Github Pull Request Viewer
author: Cesar
---

> In progress

How I built a pull request viewer using Github API. What I learned and what I failed.

<!--truncate-->

![Post pic](assets/img/github.png)

Tried to clone https://github.com/pulls page plus some variations using the following:

1. ReactJS
2. Github API
3. Netlify Functions

Variations are:

1. Last updated date-time
2. Counts for current reviewer who: approved, requested changes, commented, awaiting within each pull request
3. Events in a timeline

Official Github View looks like this:

![Github view](assets/img/gh-pr-viewer-1.png)

Mine looks like this:

![My view](assets/img/gh-pr-viewer-2.png)

If they look very similar in terms of styles, it's because I am using [Primer CSS](https://primer.style/css/), no way I can do these styles by hand. So I had to study a little bit how to use these styles in my project, I didn't have any problems with it, actually the documentation is pretty good and simple to understand.

I even created two ways to authenticate the clients for the API:

1. By personal access token
2. By web application flow [OAuth](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow)

So far so good. I have a web application, running in my local machine, reading pull requests information directly from the API. I actually use this daily to see what I have in my queue to do code review.

However, I found some things I consider there is a big room for improvement:

PENDING.........
