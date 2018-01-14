# React Chrome Extension
This is meant to be a starting point for ReactJS chrome extensions.



## Installations
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

## directory structor
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
