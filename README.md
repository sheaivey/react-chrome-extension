# React Chrome Extension
This is meant to be a starting point for ReactJS chrome extensions.

## Installation
You will need the latest yarn

```
brew update
brew install yarn
```

you will also need to globally install webpack (^3.10.0).
```
yarn global add webpack
```

Next install the react/babel dependencies.

```
yarn install
```

## Developing
```
yarn run dev
```

## Production
```
yarn run build
```

## Add Extension to Chrome
1. In chrome navigate to `chrome://extensions/`
2. Enable developer mode by checking the checkbox on the top right labeled `Developer Mode`.
3. Click `Load unpacked extension...` and navigate to the project directory.
4. Once added to the extensions list the app will watch for changes and reload the iframe in development.
5. Have fun!

## Directory Structor
```
/dist (compiled react app)
/public (static assets)
  /img
  /css
  /js
  /vendor
/src
  /app (react app source)
    index.js (react entry point for webpack)
  main.js (chrome extension entry point)
  main.html (base html)
manifest.json (chrome extension definitions)
```
