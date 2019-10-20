---
date: '2014-02-28 07:58:19'
title: Welcome to Monumentous
permalink: /2014/02/28/welcome-to-monumentous
description: Welcome to Monumentous
tags:
- getting-started
- technical
- dns
---

## The birth of a blog;

This is my first time running a blog, so stick with me while I get on my feet.

I'll be refining the content and the theme over the next few weeks or months.  You can expect to see posts ranging from work related triumphs, to  random thoughts on video games.  I may even make a post about this cool blog platform that I'm using.  I've certainly learned a few new things in the process of setting it up.

The first one that comes to mind is about DNS providers.  The mailing service I'm using requires a DKIM record (a particular type of TXT record) on the domain, and it turns out my domain provider (registrar) does not support TXT records on subdomains.

After a bit of research I thought I'd give Amazon's route 53 a try.  This service from amazon provides you with custom nameservers that you can point your domain at.  I've got to say that the route 53 interface is worlds better than the registrar's that I'm using.

Using route 53 I was able to stay with my current registrar, and also take advantage of the robust domain name system provided by amazon.  I was able to easily create all of the A, CNAME, MX, TXT, etc... records that I needed, including the troublesome TXT record for a subdomain.

Anyway, welcome to the new Monumentous.

Ps. The realtime chat/game experiment that was previously at this domain has been moved to [lab.umento.us](http://lab.umento.us)