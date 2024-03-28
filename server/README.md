
# Twitter Server

## Setup Instructions
1. **Clone the repository**
   ```sh
   git clone <repository_url>
   ```
2. **Install dependencies**
   ```sh
   yarn install
   ```
3. **Run the server**
   ```sh
   yarn dev
   ```

## Folder Structure
- `src`
  - `app`
    - `index.ts`: Express Middleware Server
    - `services`
      - `jwt.ts`
    - `user`: Contains user-related queries, mutations, types, etc.
    - `client`
      - `db`
        - `index.ts`: Prisma Client
  - `index.ts`: Entry point of the server
   

## Setup Steps
1. **Initialize project**
   ```sh
   yarn init
   ```
2. **Add TypeScript**
   ```sh
   yarn add typescript -D
   ```
3. **Initialize TypeScript configuration**
   ```sh
   tsc --init
   ```
   Uncomment the following lines in `tsconfig.json`:
   ```json
   "outDir": "./build",
   "rootDir": "./src"
   ```
4. **Add Express**
   ```sh
   yarn add express
   ```
5. **Update `package.json` with custom scripts**
   ```json
   "scripts": {
     "start": "node build/index",
     "build": "tsc -p .",
     "dev": "tsc-watch --onSuccess 'npm start'"
   }
   ```
   Add `yarn add tsc-watch -D` for the `dev` script.

## Tech Stack
- TypeScript
- [Express](https://www.apollographql.com/docs/apollo-server/api/express-middleware/)
- GraphQL
  - `yarn add @apollo/server graphql`
- Postgresql
- [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
  - `yarn add @prisma/client`
  - `npm install prisma --save-dev`
  - `npx prisma init --datasource-provider postgresql`
  - `npx prisma migrate dev --name init`
  - `npx prisma migrate dev --name add_user_model`
  - `npx prisma studio`
- [Supabase](https://supabase.com/dashboard/project/vhuiscyeoprhwbmegnvc) for Postgresql
- axios
- jsonwebtoken, @types/jsonwebtoken -D
- cors
