---
title: Monkeypatching flask for sessions
date: 2020-05-19
slug: monkeypatching-flask-for-sessions
---

> In progress

I am working on a personal application that has (for now) a single purpose: track habits. It's not a big deal, just one single page in which I can click on a button to store a count and the timestamp of the event. For X, Y and Z reasons I am doing it with this stack:

- ReactJS for the frontend
- Python for the backend (flask)
- Postgres as my database
- Redis to store session information

After building the skeleton of this project and starting using it for some weeks, I noticed something very weird in my redis instance: there were quite a lot of entries (where 1 entry = 1 session), more than the number of sessions I would have expected to have at that point (and I'm the only person using it, btw).

First thing I thought was: "OK, maybe it's because I'm doing a lot of tests, lets flush". Once I logged in again, I noticed that multiple entries were saved with only 1 single login. So there was definitely something wrong.

Once I got tired googling it, reading a lot of stackoverflow questions, github issues, and some blog posts (and of course some official documentation from Flask), I decided to do some debug and see what's happening behind the scenes, and maybe I'm doing my research using the wrong "keywords".

Thanks to my IDE and the Network tab of my browser, found out some requests that later on I learned they are called as "[preflight requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)", which are requests sent by the browser using the `OPTION` method before the real request (like before the whole headers and body of a `POST` request) to enforce some CORS restrictions.

The problem with these "preflight requests" and my backend was that the `OPTION` requests were not sending the credentials (aka: the session id from the cookies), and the backend (flask) once receives the request and doesn't find any session id, then it creates another one and stores this in redis. Later, the "actual" request (the `POST` one), sends the session id (which is different than the id of the `OPTION` request one) in the cookies and the backend is then able to read it and check if it has a valid session in redis.

But... what will happen with the session id that was created by the `OPTION` requests? Well, nothing. They will be there until redis decides to clean them up, or if someone manually flush the data. And that is what was causing the multiple entries/session in redis in my poor solution.

WIP....
