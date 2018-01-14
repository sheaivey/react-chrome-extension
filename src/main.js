/*
    If an id is also specified and a window with a matching id has been shown before, the remembered bounds of the window will be used instead.
*/
'use strict';
let rootWindow = false;

function startApplication() {
    var applicationStartTime = new Date().getTime();
    chrome.app.window.create('/src/main.html', {
        id: 'main-window',
        frame: 'chrome',
        innerBounds: {
            minWidth: 800,
            minHeight: 600
        }
    }, function (createdWindow) {
        rootWindow = createdWindow;
        createdWindow.onClosed.addListener(function () {
            // do something when the app closes?
        });
    });
}

chrome.app.runtime.onLaunched.addListener(startApplication);

chrome.management.getSelf (self => {
  if (self.installType === 'development') {
    // set up hot reloader to watch for file changes
    const filesInDirectory = dir => new Promise (resolve =>
      dir.createReader ().readEntries (entries =>
        Promise.all (entries.filter (e => e.name[0] !== '.').map (e =>
          e.isDirectory ? filesInDirectory (e) : new Promise (resolve => e.file (resolve))
        ))
        .then (files => [].concat (...files))
        .then (resolve)
      )
    );

    const timestampForFilesInDirectory = dir => filesInDirectory (dir).then (files => files.map (f => f.name + f.lastModifiedDate).join ());

    const reload = () => {
      if(rootWindow) {
        // reload the entire app
        // console.log('hot reloading app...');
        // chrome.runtime.reload();

        var frame = rootWindow.contentWindow.document.getElementById("rootWindow");
        if(frame) {
          console.log('hot reloading app...');
          frame.contentWindow.window.location.reload(true);
          // start watching for changes again.
          chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir));
        }
      }
    }

    const watchChanges = (dir, lastTimestamp) => {
      timestampForFilesInDirectory (dir).then (timestamp => {
        if (!lastTimestamp || (lastTimestamp === timestamp)) {
          setTimeout (() => watchChanges (dir, timestamp), 1000); // retry after 1s
        } else {
          reload ();
        }
      });
    }

    // start watching...
    chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir));
  }
});
