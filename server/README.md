# Twitter Server

## Want to run this server?
1. Clone this repository
2. Run `yarn install`
3. Run `yarn dev`

## Setup to make this server

1. yarn init
2. yarn add typescript -D
3. tsc --init
    - Uncomment the following lines in tsconfig.json:
      - "outDir": "./build",
      - "rootDir": "./src",
4. yarn add express
5. Add Custom Scripts in package.json:
  ```javascript
   "scripts": {
    "start": "node build/index",
    "build":"tsc -p .",
    "dev": "tsc-watch --onSuccess \"npm start\""
  }
  ```
    - Add yarn add tsc-watch -D for dev script


## Tech-Stack
- TypeScript
- [Express](https://www.apollographql.com/docs/apollo-server/api/express-middleware/)
- GraphQL
  - yarn add @apollo/server graphql

- Postgresql
- [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
   - yarn add @prisma/client 
   - npm install prisma --save-dev
   - npx prisma init --datasource-provider postgresql
   - npx prisma migrate dev --name init
    - npx prisma migrate dev --name add_user_model

- [Supabase](https://supabase.com/dashboard/project/vhuiscyeoprhwbmegnvc) for Postgresql 