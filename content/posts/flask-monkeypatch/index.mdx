---
title: Monkeypatching flask for sessions
date: 2020-05-19
slug: monkeypatching-flask-for-sessions
---

I am working on a personal application that has a single purpose: track habits. It's not a big deal, just one single page with one single button to store a counter and the timestamp of the event. For X, Y and Z reasons I am doing it with this stack:

- ReactJS
- Python + Flask
- Postgres
- Redis to store session information

After building the skeleton of this project and starting using it for some weeks, I noticed something very weird in my redis instance: there were quite a lot of entries (where 1 entry = 1 session), more than the number of sessions I would have expected to have at that point (and I'm the only person using it, btw).

First thing I thought was: "OK, maybe it's because I'm doing a lot of tests, lets flush". Once I logged in again, I noticed that multiple entries were saved with only 1 single login. So there was definitely something wrong.

Once I got tired googling it, reading a lot of stackoverflow questions, github issues, and some blog posts (and of course some official documentation from Flask), I decided to do some debug and see what's happening behind the scenes, and maybe I'm doing my research using the wrong "keywords".

Thanks to my IDE and the Network tab of my browser, found out some requests that later on I learned they are called as "[preflight requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)", which are requests sent by the browser using the `OPTION` method before the real request (like before the whole headers and body of a `POST` request) to enforce some CORS restrictions.

The problem with these "preflight requests" and my backend was that the `OPTION` requests were not sending the credentials (aka: the session id from the cookies), and the backend (flask) once receives the request and doesn't find any session id, then it creates another one and stores this in redis. Later, the "actual" request (the `POST` one), sends the session id (which is different than the id of the `OPTION` request one) in the cookies and the backend is then able to read it and check if it has a valid session in redis.

But... what will happen with the session id that was created by the `OPTION` requests? Well, nothing. They will be there until redis decides to clean them up, or if someone manually flush the data. And that is what was causing the multiple entries/session in redis in my poor solution.

I did some debug and found out that Flask was saving these new sessions here:

```python
# {dependencies-directory}/flask/app.py
    def process_response(self, response):
        """Can be overridden in order to modify the response object
        before it's sent to the WSGI server.  By default this will
        call all the :meth:`after_request` decorated functions.

        .. versionchanged:: 0.5
           As of Flask 0.5 the functions registered for after request
           execution are called in reverse order of registration.

        :param response: a :attr:`response_class` object.
        :return: a new response object or the same, has to be an
                 instance of :attr:`response_class`.
        """
        ctx = _request_ctx_stack.top
        bp = ctx.request.blueprint
        funcs = ctx._after_request_functions
        if bp is not None and bp in self.after_request_funcs:
            funcs = chain(funcs, reversed(self.after_request_funcs[bp]))
        if None in self.after_request_funcs:
            funcs = chain(funcs, reversed(self.after_request_funcs[None]))
        for handler in funcs:
            response = handler(response)
        if not self.session_interface.is_null_session(ctx.session):
            self.session_interface.save_session(self, ctx.session, response)
        return response
```

So this line: `self.session_interface.save_session(self, ctx.session, response)` was doing it. I couldn't really find a way to avoid that behavior by changing a configuration in my Flask-app. Also I went all the way up of the whole call hierarchy to see if there is a missing configuration and/or piece of code that was sending me directly to that situation at runtime, but no luck.

I decided to override that method to ONLY save the sessions whenever the request method is different to `OPTIONS`. That way, more than likely it would only save sessions in Redis for those coming with a valid credential and the preflight checks would also be done. I know that's not clean, I am monkeypatching this thing, but this is the only solution I could find.

```python
# ./monkeypatch.py
from flask import Flask
from itertools import chain
from flask.globals import _request_ctx_stack


class MyFlask(Flask):

    def process_response(self, response):
        ctx = _request_ctx_stack.top
        bp = ctx.request.blueprint
        funcs = ctx._after_request_functions
        if bp is not None and bp in self.after_request_funcs:
            funcs = chain(funcs, reversed(self.after_request_funcs[bp]))
        if None in self.after_request_funcs:
            funcs = chain(funcs, reversed(self.after_request_funcs[None]))
        for handler in funcs:
            response = handler(response)
        if not self.session_interface.is_null_session(ctx.session) and ctx.request.method != 'OPTIONS':
            # Overriding this to avoid creation of new sessions for preflight requests
            self.session_interface.save_session(self, ctx.session, response)
        return response

```

And then, use `MyFlask` in the main class.

```python
# ./__init__.py
from . import monkeypatch
from flask import Flask
Flask = monkeypatch.MyFlask
# ... more imports ...


def create_app():
    app = Flask(__name__, instance_relative_config=False)
    # ... more code to initialize my components ...
    with app.app_context():
        return app

```

Note: If someone is ever reading this article, DO NOT USE THIS CODE in your project, I am not giving any suggestions about how this needs to be done to fix the issue (if this is actually an issue, at least it prevent my application to save multiple sessions when were not necessary).

Finally, my app started to save only the sessions into Redis for any requests with method different than `OPTIONS`, which was fine for me.

## Final thoughts

First, I don't know why I couldn't find more cases like mine reported in the whole internet. It made me think that maybe I am doing something wrong in the whole flow. I only have few months with Python, and less than 1 month using Flask, so might be missing something here.

Second, the "solution" of preventing requests coming with `OPTIONS` method didn't convince me. It's so hardcoded. But anyways, it worked.

Third, found something interesting in [`express-session`](https://www.npmjs.com/package/express-session#saveuninitialized) package. They have the option `saveuninitialized` which kind of work for what I wanted to accomplish here, but couldn't find any similar thing in Flask.
