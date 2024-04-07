# Paytm Clone V4

- Clone the repo

```jsx
git clone https://github.com/100xdevs-cohort-2/week-17-final-code
```

- npm install
- Run postgres either locally or on the cloud (neon.tech)

```jsx
docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

- Copy over all .env.example files to .env
- Update .env files everywhere with the right db url
- Go to `packages/db`
    - npx prisma migrate dev
    - npx prisma db seed
- Go to `apps/user-app` , run `npm run dev`
- Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)



# Local Setup

A] Clone 

B] Install Dep
    Npm i in all Apps
        - user-app
        -merhcant-app
        -ui
        -root
C] Add Env Variables (.env in packages/db, user-app)

    1. packages/db
        DATABASE_URL="postgresql://postgres:Abhijeet@1710@localhost:5432/postgres"

    2. user-app
        JWT_SECRET=test
        NEXTAUTH_URL=http://localhost:3001

D] DB Setup

    password: Abhijeet@1710
    imageName: postgres (Not sure)

    1. Start Docker Image
    - docker run -e POSTGRES_PASSWORD=password -d -p 5432:5432 imageName
    - docker run -e POSTGRES_PASSWORD=Abhijeet@1710 -d -p 5432:5432 postgres
    - .env : DATABASE_URL="postgresql://postgres:Abhijeet@1710@localhost:5432/postgres"

    2. Migrate DB schema
    - npx prisma migrate dev --name init
    - npx prisma generate (Auto runs after first command)


# TODO :

A] UI Inhancement
    - Responsivness
    - Login/Auth Page UI change
    - Alerts on clicking any button (Messages from calls)
    - Logged in user details should be visible on Home Page., phone no should be seen on nav bar. (left of logout button)

B] Transfer : Recent Transactions
    - transaction status not showing (Should show status [Failed, Received, In-Progress])