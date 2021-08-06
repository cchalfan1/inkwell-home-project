This is an example project made by Christopher Chalfant for BCBS's Inkwell project, in my consideration for filling a developer role.

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```

## API
`curl --location --request GET 'http://localhost:3000/api/media'`

- No query parameters
- No authentication key
- Returns 10 Media items in the following structure:

```
{
"Page": {
    "media": [
      {
        "title": {
          "romaji":  string,
          "english": string,
          "native":  string
        },
        "description": string,
        "coverImage": {
          "medium": string
        }
      },
      ...
      ]
   }
}
```

## Redux Configuration
The React app state is kept in a global store.

```
store
│   index.ts        # Creates store for redux provider
│
└───actions
│   │   home.ts     # "home" state specific actions for dispatch
│   │
│   
└───middlewares
│   │   home.ts     # "home" state middleware
│   
└───reducers
    │   home.ts     # Configures the global "home" state and mutations
│   
└───types
│   │   index.ts    # Holds all primary types
│   
```

## Todo:
1. Find a better way to resolve the data fetch in front end instead of mapping it.
2. As project grows create more granular type files.
3. Add caching of redux state inside store configuration.
4. Build in a more dynamic fetch using query parameters on the REST API.
5. Add authentication and log in page.
6. Add coverage testing for REST API and react components.
6. etc.
