---
title: Netlify: Functions
author: Cesar
---

> In progress

Exploring Netlify Functions: Concepts and some examples to get started with serverless functions.

<!--truncate-->

## What is "Netlify Functions"?

Serverless functions on AWS Lambda, handled by Netlify. Create, build, deploy and test these serverless functions on Netlify and locally with some great tools that Netlify provides.

Currently, supported languages are:
- JavaScript
- Go

## Concepts

### netlify.toml

### event, context, callback

```js
exports.handler = function(event, context, callback) {
    // your server-side functionality
}
```

- `event`
- `context`
- `callback`

## Getting started (example step by step)

yarn add netlify-lambda

## Deploy on Netlify

## Deploy locally

## Logging

- `console.log()`

## Environment variables

### On Netlify

### Locally

## Ideas

## References

- Official docs: https://docs.netlify.com/functions/overview/
- Official docs (for testing): https://docs.netlify.com/functions/build-with-javascript/#tools
  - Netlify Dev
  - netlify-lambda
- netlify-lambda: https://www.npmjs.com/package/netlify-lambda
- Local environment variables https://github.com/netlify/netlify-lambda/issues/118#issuecomment-506973346
- Great article to get started: https://kentcdodds.com/blog/super-simple-start-to-serverless
