---
date: '2015-03-18 16:42:19'
title: Bash script "run as" user
permalink: /2015/03/18/bash-script-run-as-user
description: Bash script "run as" user
tags:
- scripting-bash-sudo
---

Having been hosting my web sites from a server out of my house I have had the displeasure of dealing with issues like hardware failure and ISP port blocking (Comcast, bleh).  Well, recently I decided I'd had enough with that and chose to migrate my web sites to the cloud.

This isn't the first time I've had to setup a new environment for my sites, but this time I decided to do things a little differently.  Instead of performing each step manually I would create a nice shiny bash script to do my work for me.

The script does many things, but for this post I want to show one of the pieces that I think is pretty neat and may prove useful to others.

During the server setup process the script will clone and install the website code from github, and it will do this as a dedicated user.

    sudo -H -n -u "deployer"

The previous command will switch context to the 'deployer' user.

* -u the name of the user to run commands as
* -H update the home path to reflect the switched to user's home path
* -n fail with exit code 1 if a prompt is required

I plan to execute the script as a sudo user, so I include the -n flag here to suppress any prompts while the script is running.  If you would rather allow a prompt during the script execution you should omit the -n flag.

So far this isn't anything too fancy, but now we need to tell sudo what command to execute.

    # run a command directly
	sudo -H -n -u "deployer" whoami

What about running multiple commands?  Start a sub shell as the user and pass the commands via -c

    sudo -H -n -u "deployer" bash -c "whoami; echo \"hi\";"

This may be sufficient if you only have one or two commands to run, but quickly becomes unmanageable when running multiple complicated commands.

[Heredocs](http://en.wikipedia.org/wiki/Here_document) to the rescue

    sudo -H -n -u "deployer" bash << depl
    	ls ~
    depl

Great, so now we are pretty much there.  We can switch to a new user and execute commands as that user in a natural way.

If you want, you can take it a step further and turn this into a reusable function

    #!/bin/bash

    bail() {
        echo 'Error executing command, exiting'
        exit 1
    }

    exec_cmds_as() {
        sudo -H -n -u "deployer" bash $1 || bail
    }

    exec_cmds_as << depl
    	echo ~
    depl

What about variable expansion?  This script will expand the global variables before executing the sub shell described in the heredoc

    #!/bin/bash

    bail() {
        echo 'Error executing command, exiting'
        exit 1
    }

    exec_cmds_as() {
        sudo -H -n -u "deployer" bash $1 || bail
    }

    TEST="Hello"

    exec_cmds_as << depl
    	echo "$TEST"
    depl

If you're declaring variables in the sub shell you can expand them by escaping the first variable expansion


	#!/bin/bash

    bail() {
        echo 'Error executing command, exiting'
        exit 1
    }

    exec_cmds_as() {
        sudo -H -n -u "deployer" bash $1 || bail
    }

    TEST="Hello"

    exec_cmds_as << depl
    	TEST="World"
    	echo "$TEST \$TEST"
    depl