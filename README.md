# sendperson

More to see soon!

## Development

To start the app:
```
yarn install
yarn watch
yarn start # in another tab
```

To recompile automatically, run `yarn watch` as well

## Planned features

#### 1.0 Release
1. ~~App scaffolding~~
   1. ~~Show a window~~
   1. ~~Save preferences~~
1. ~~Request UI~~
   1. ~~Query params~~
   1. ~~Headers~~
   1. ~~Request bodies~~
   1. ~~Make it pretty~~
   1. Replace 'description' field with query/path parameter dropdown
1. ~~Show multiple requests in different tabs~~
1. Response UI
   1. ~~Horizontal split pane UI~~
   1. Response body
   1. Headers
   1. Status and time
1. Actually send responses and show results
   1. Show generated headers, allow override
1. Save responses and requests

1. Missed requirements
   1. Handle more tabs than width of window
   1. Figure out why monaco isn't highlighting syntax errors
   1. Split pane
      1. Make split pane UI automatically resize when window resizes
      1. Save split pane position to preferences
      1. Maybe rewrite or fix the split pane component as it seems to be jank

1. Package for distribution: npm
#### 1.1 Release   
1. Collections
1. Default headers
1. Import/export collections
1. Import collections from postman
1. File uploads
1. Package for distribution: brew, MacOS DMG, Windows
#### 1.2 Release
1. Scan for secrets
1. Cookies
