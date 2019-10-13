---
layout: post
section-type: post
title: Isomorphic React Dockerized
permalink: 2015/12/30/dockerized-isomorphic-react
date: '2015-12-30 18:13:49'
description: Isomorphic React Dockerized
tags:
- docker
- react
- isomorphic
- ssr
- docker-compose
---

## What is Isomorphic

It's a fancy way of saying that the application is one where the client and server share components and rendering can be done on the server as well as on the client.

**Why do it?**

The reasons commonly cited for writing isomorphic apps are

**Faster initial loads**

Single page app frameworks tend to start by serving an empty html document and then fetching the content to display asynchronously.  This can mean the user is looking at loading indicators or blank pages in the mean time.  Sometimes, as a workaround, the server will pass along the first set of data, and the app will check for this data before making the calls.

With an isomorphic app, the initial request will handle fetching all of the data needed for display, and additionally will render the markup for that data and send the whole thing down (server side rendering).

**Reusing code**

The best aspect, in my opinion is getting to use the same libraries and components on the server as on the client.  It is a very alluring prospect.  This can ease maintenance and testing, make it easier to onboard to team members, and provide a more consistent development experience across the project.

**SEO**

This point is related to the first one.  Having the full content rendered on the initial request means that web crawlers will be able to index your page appropriately.

## Docker

Docker allows you to encapsulate your application with its dependencies.  Docker is a large topic and will be the subject of other posts, so I won't get into it right now but it is a great way to develop and deploy applications.  In this demo we'll use a dockerfile to build our application image.

## The App

React is a library for rendering markup.  One of the cool things that react can do is render markup on the server, just as well as it can on the client.  The markup that is generated on the server is keyed with special markers that the client can use to pick up where the server left off.

As long as the client is rendering the same components, with same data it will be smart enough to not redraw the page, and instead will start up the library and hook into all of the events, as if it had been used from the start.

Let's walk through the demo app that I've created at  https://github.com/code-vicar/IsomorphicReactBase

The app is split into 3 pieces

**client/index.js**

This is the bootstrap file for the react app that will be given to the browser

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import rootRoute from '../shared/routes/root'
import history from '../shared/services/history'

render(
  <Router history={history} routes={rootRoute} />,
  document.getElementById('app')
)
```
<p></p>

**server/index.js**

This is the express server that will be doing the server side rendering.

```javascript
// handle react routes
app.get('*', (req, res, next) => {
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    match({ routes: rootRoute, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            res.render('index', {
                content: renderToString(<RoutingContext {...renderProps} />)
            })
        } else {
            res.status(404).send('Not found')
        }
    })
})
```
<p></p>

It also serves the client javascript bundle.  In production the bundle is served statically from the file system.

```javascript
if (isProdEnv) {
	// in production, serve the bundled client statically
	app.use('/static', express.static(path.join(__dirname, '../client')))
}
```
<p></p>

In development the bundle is served from memory using webpack dev middleware and hot reloading middleware.

```
else {
	// in development, serve the bundle dynamically with webpack hot reloader

	// Step 1: Create & configure a webpack compiler
	const webpack = require('webpack')
	const webpackConfig = require(process.env.WEBPACK_CONFIG || '../../webpack.middleware.config')
	const compiler = webpack(webpackConfig)

	// Step 2: Attach the dev middleware to the compiler & the server
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}))

	// Step 3: Attach the hot middleware to the compiler & the server
	app.use(require('webpack-hot-middleware')(compiler))
}
```
<p></p>

**shared**

This folder contains code that is not strictly intended for the client or the server, it is used in either context.  For example, the root route

```
import React from 'react'
import history from '../services/history'
import App from '../components/App.js'
import About from '../components/About.js'
import Inbox from '../components/Inbox.js'

export default {
    path: '/',
    component: App,
    childRoutes: [
        {
            path: "/about",
            component: About
        },
        {
            path: "/inbox",
            component: Inbox
        }
    ]
}
```
<p></p>

The other react components, and the history service

```javascript
import { createHistory } from 'history'
import { createMemoryHistory } from 'history'

let history

if (typeof IS_CLIENT_BUNDLE !== 'undefined' && IS_CLIENT_BUNDLE) {
	history = createHistory()
} else {
	history = createMemoryHistory()
}

export default history
```
<p></p>

The history service is interesting because we're using a webpack defined global to identify if we're on the client or the server.  The server cannot use the browser history that is the default for react router.  When doing the server side rendering we must use memory history.

The express server has just a single view that is rendered for all requests.  The result of the react server side rendering is passed to the view as content

```html
<html>
  <head>
    <title>Isomorphic React Base</title>

    <meta charset='utf-8' />
    <meta http-equiv='X-UA-Compatible', content='IE=edge' />

    <meta name='description', content='' />
    <meta name='viewport', content='width=device-width, initial-scale=1' />
  </head>
  <body>
    <div id="app">{{{content}}}</div>
    <script src="static/index.js"></script>
  </body>
</html>
```
<p></p>

This is a handlebar template, notice the triple bracket notation around the content, this means it will be rendered unescaped since we're getting back an html string from the react-dom/server.

At this point you can run

```bash
$ npm install
$ npm run build
$ npm run start
```
<p></p>

and you'll have an isomorphic react app with hot module reloading.

In your browser, navigate to the about page.  Open your browsers development tools and watch the console.  Edit the about component and add a letter to the text that is rendered.  When you save the file you should see some messages show up in the javascript console in your browser indicating that it picked up the changes and used hot module reloading to update the webpack bundle.  You should also notice that the text in the browser updated to match without needing a refresh.

---

### So far so good, but what about docker?

The dockerfile describes how to build an image for running this react server

First it uses the official node base image

```bash
FROM node:5-slim

MAINTAINER Scott Vickers <scott.w.vickers@gmail.com>
```
<p></p>

Then it downloads gosu, which will be used later to run the container as the correct user

```bash
ENV GOSU_DOWNLOAD_SHA256 6f9a6f5d75e25ba3b5ec690a5c601140c43929c3fe565cea2687cc284a8aacc8
RUN wget -O gosu -nv --ca-directory=/etc/ssl/certs "https://github.com/tianon/gosu/releases/download/1.5/gosu-amd64" \
&& echo "$GOSU_DOWNLOAD_SHA256 *gosu" | sha256sum -c - \
&& chmod +x gosu
```
<p></p>

Then it will create a directory to hold the react server.  Before copying the full application in it will first start with the package.json file so that it can create a cache layer of the npm dependencies

```bash
# create a layer for dependencies so they're cached
RUN mkdir -p /isomorphic_react
WORKDIR /isomorphic_react
COPY package.json package.json
RUN npm install
```
<p></p>

Then the rest of the application is copied in

```bash
# copy the source and build
COPY . /isomorphic_react
RUN NODE_ENV=production npm run build

```
<p></p>

Here we create a user to run this container as

```bash
# add user and transfer ownership
RUN useradd -d /isomorphic_react scott \
	&& chown -R scott:scott /isomorphic_react \
	&& chmod -R g+rw /isomorphic_react
```
<p></p>

Choose the port that we'll expose the server on and copy in the entrypoint.

```bash
EXPOSE 7777

COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["npm", "start"]
```
<p></p>

The entrypoint script will always be the thing that executes whenever this container is run.  It inspects the command that is passed to the container and if it is an npm command it runs it as the 'scott' user, otherwise it lets the command pass through and execute in the container environment.

```bash
#!/bin/bash
set -e

if [ "$1" = 'npm' ]; then
  echo "Starting Isomorphic React Base"
  exec /gosu scott "$@"
fi

echo "Passthrough command"
exec "$@"
```
<p></p>

Now that we have a dockerfile we can specify images to be built from it using docker-compose.

For each image that we want to describe we can create a docker compose file.  For example, the docker-compose-dev.yml file

```bash
web:
    build: .
    ports:
        - "7777:7777"
    environment:
        COMPOSE_PROJECT_NAME: isomorphic_react_dev
        NODE_ENV: development
```
<p></p>

This compose file lets us say what port to map the container to in the host, as well as specify environment setting, and much more which we aren't using in this demo app.

With this dockerfile and docker-compose file we have everything we need to 'dockerize' the server.  If you have a docker host already, you could clone this repo to the host and run the docker compose file.

Alternatively, I've included a vagrantfile that will start and provision a VM with docker server and docker-compose installed.  It also has provisioning scripts to build the images from the docker compose files.

```bash
# -*- mode: ruby -*-
# vi: set ft=ruby :

$bootstrap_docker = <<SCRIPT
  bail() {
      echo Error executing command, exiting
      exit 1
  }

  exec_cmd() {
      if ! [[ "$2" == "-q" ]]
          then echo "Executing $1"
      fi

      sudo -n bash -c "$1" || bail
  }

  print_header() {
      echo ""
      echo "## $1 ##"
      echo ""
  }

  print_banner() {
      echo "############################################"
      echo "##            Install docker              ##"
      echo "##           and docker-compose           ##"
      echo "############################################"
  }

  # main
  print_banner

  print_header "Add docker PPA"
  exec_cmd "wget -qO- https://get.docker.io/gpg | apt-key add -"
  exec_cmd "echo deb http://get.docker.io/ubuntu docker main | tee /etc/apt/sources.list.d/docker.list"

  print_header "Install docker"
  exec_cmd "apt-get -q update && apt-get -qy install lxc-docker"

  print_header "Add vagrant user to docker group"
  exec_cmd "usermod -aG docker vagrant"

  print_header "Install docker-compose"
  exec_cmd "curl -sL https://github.com/docker/compose/releases/download/1.5.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
  exec_cmd "chmod +x /usr/local/bin/docker-compose"
SCRIPT

$build_dev = <<SCRIPT
  mkdir -p /isomorphic_react_dev
  cp -rf /vagrant/** /isomorphic_react_dev
  cd /isomorphic_react_dev
  docker-compose -f docker-compose-dev.yml build
  docker-compose -f docker-compose-dev.yml stop
  docker-compose -f docker-compose-dev.yml rm --force
  docker-compose -f docker-compose-dev.yml up -d
SCRIPT

$build_prod = <<SCRIPT
  mkdir -p /isomorphic_react_prod
  cp -rf /vagrant/** /isomorphic_react_prod
  cd /isomorphic_react_prod
  docker-compose -f docker-compose-prod.yml build
  docker-compose -f docker-compose-prod.yml stop
  docker-compose -f docker-compose-prod.yml rm --force
  docker-compose -f docker-compose-prod.yml up -d
SCRIPT

Vagrant.configure(2) do |config|
  config.vm.box = "phusion/ubuntu-14.04-amd64"

  config.vm.network "forwarded_port", guest: 7777, host: 8777
  config.vm.network "forwarded_port", guest: 7999, host: 8999

  config.vm.provision "bootstrap_docker", inline: $bootstrap_docker, type: "shell"
  config.vm.provision "build_dev",        inline: $build_dev,        type: "shell"
  config.vm.provision "build_prod",       inline: $build_prod,       type: "shell"
end
```
<p></p>

Now to get a dockerized isomorphic react app it's as simple as
```bash
vagrant up
```
<p></p>
Assuming vagrant is installed of course.

I hope this walkthrough has been helpful and inspires you to try out react and docker.

Setting up tests for react components and es6 code can be fairly complicated, so it wan't covered here, but it is certainly doable, and encouraged.

Some gotchas to be careful of

React server side rendering is synchronous, so if you have asynchronous code running in the componentWillMount lifecycle event that updates the state it won't work on the server.  Also, the componentDidMount lifecycle event only gets executed on the client, not the server. https://github.com/facebook/react/issues/1739

The react transform hot module reloader does not work with the pure function syntax for defining react components. https://github.com/gaearon/babel-plugin-react-transform/issues/57

If your build requires authorization (such as private npm modules, private github, etc...) then you're likely to run into problems while building the docker container. Build time secrets, an issue that is frustrating many docker users, is ongoing and you can follow it here https://github.com/docker/docker/issues/13490.

Feel free to leave questions in the comments below