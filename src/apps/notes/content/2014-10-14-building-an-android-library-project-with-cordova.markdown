---
date: '2014-10-14 00:34:21'
title: Building an android library project with cordova
permalink: /2014/10/14/building-an-android-library-project-with-cordova
description: Building an android library project with cordova
tags:
- cordova
- android
- javascript
---

Recently I was tasked with integrating an android library project into a cordova plugin for use in our cordova application at work.  It seemed like a fairly straightforward thing to do at first, but I ran into some gotchas that ended up costing an unfortunate amount of time.

An easy scenario would be to just drop in the library jar files into the cordova plugin and make sure they are copied to the "libs" folder.  However, this won't work for library projects that have resources in them (like layouts, strings, and images).  This is a known limitation.  See here https://developer.android.com/tools/projects/index.html.

The bottom line is that you need to utilize the "android" command line tool to update your project so it is aware of the library that it will need to compile.  Problem is, cordova plugins don't support this out of the box.

So my solution was twofold.
1.  Include the library project source code in the cordova plugin and have it copied over to a specific folder (lets say "linkedlibraries") using the "src-file" feature of cordova plugins.
2.  Write a script that can be used in cordova before_build hook to scan the "linkedlibraries" folder and execute the correct android commands to setup the project and library projects.

Here is the hook that I wrote to accomplish #2

    #!/usr/bin/env node

    'use strict';

    var fs = require('fs');
    var path = require('path');
    var rootdir = process.argv[2];
    var exec = require('child_process').exec;

    var linkedLibsPath, projectPropertiesPath, projDir;

    if (rootdir) {
        linkedLibsPath = path.join(rootdir, 'platforms', 'android', 'linkedlibraries');
        projectPropertiesPath = path.join(rootdir, 'platforms', 'android', 'project.properties');
        projDir = path.join(rootdir, 'platforms', 'android');

        fs.readdir(linkedLibsPath, function(err, files) {
            if (err) {
                console.log('Error reading directory ' + linkedLibsPath);
                console.log(err);
                return;
            }

            var linkedLibs = files.map(function(file) {
                return {
                    name: file,
                    relativeDir: 'linkedlibraries/' + file
                };
            });


            linkedLibs.forEach(function(lib) {
                console.log('executing "android update project --path . --library ' + lib.relativeDir + '"');
                (function(lib) {
                    var fullLibDir = path.join(linkedLibsPath, lib.name);
                    exec('android update project --path . --library ' + lib.relativeDir, {
                            'cwd': projDir
                        },
                        function(error, stdout, stderr) {
                            if (stdout) {
                                console.log('stdout: ' + stdout);
                            }
                            if (stderr) {
                                console.log('stderr: ' + stderr);
                            }
                            if (error !== null) {
                                console.log('exec error: ' + error);
                                return;
                            }
                            console.log('executing "android update lib-project --path ."');
                            exec('android update lib-project --path .', {
                                    'cwd': fullLibDir
                                },
                                function(error, stdout, stderr) {
                                    if (stdout) {
                                        console.log('stdout: ' + stdout);
                                    }
                                    if (stderr) {
                                        console.log('stderr: ' + stderr);
                                    }
                                    if (error !== null) {
                                        console.log('exec error: ' + error);
                                        return;
                                    }
                                }
                            );
                        }
                    );
                }(lib));
            });

            console.log('hook before_build.androidLinkedLibs modified ' + projectPropertiesPath);
        });
    }

Also, one last thing to note. When building cordova-android projects using the "cordova" command line tool, the cordova build script will change the default output directory for "ant" to "ant-build" instead of "bin" and "ant-gen" instead of "gen".

From what I could gather this is to prevent conflicts when also building from an IDE like eclipse.  Unfortunately, for some library projects this causes a problem.  Specifically for the project I was trying to integrate this caused it to crash the app citing a missing $R.drawable class.

I only discovered this after many frustrating hours of debugging.  In case you have a similar issue here is what I used to prevent the custom output directory behavior of cordova-android.

Another before_build hook

    #!/usr/bin/env node

    'use strict';

    var fs = require('fs');
    var path = require('path');
    var rootdir = process.argv[2];

    var projDir;

    if (rootdir) {
        projDir = path.join(rootdir, 'platforms', 'android');

        fs.unlink(path.join(projDir, 'custom_rules.xml'), function(err) {
            if (err) {
                console.log('Error deleting custom_rules.xml');
                console.log(err);
                return;
            }
            console.log('successfully deleted custom_rules.xml');
        });
    }


Hope that helps someone...