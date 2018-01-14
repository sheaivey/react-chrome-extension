'use strict';

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
        createdWindow.onClosed.addListener(function () {
            // do something when the app closes?
        });

        // Start hot reload when the app is open.
        startHotReload();
    });
}

chrome.app.runtime.onLaunched.addListener(startApplication);

function startHotReload() {
  chrome.management.getSelf(self => {
    if (self.installType === 'development') {
      // set up hot reloader to watch for file changes
      const filesInDirectory = dir => new Promise(resolve =>
        dir.createReader().readEntries(entries =>
          Promise.all(entries.filter(e => e.name[0] !== '.').map(e =>
            e.isDirectory ? filesInDirectory(e) : new Promise(resolve => e.file(resolve))
          ))
          .then(files => [].concat(...files))
          .then(resolve)
        )
      );

      const timestampForFilesInDirectory = dir => filesInDirectory(dir).then(files => files.map(f => f.name + f.lastModifiedDate).join());

      const reload = () => {
        const rootWindow = chrome.app.window.getAll()[0];
        if(rootWindow) {
          //reload the entire app
          console.log('hot reloading app...');
          chrome.runtime.reload();
        }
      }

      const watchChanges = (dir, lastTimestamp) => {
        const rootWindow = chrome.app.window.getAll()[0];
        if(rootWindow) {
          timestampForFilesInDirectory(dir).then (timestamp => {
            if (!lastTimestamp || (lastTimestamp === timestamp)) {
              setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
            } else {
              reload();
            }
          });
        }
      }

      // start watching...
      chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
    }
  });
};
