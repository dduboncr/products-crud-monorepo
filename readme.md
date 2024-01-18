# Multi-App Setup with Next.js and Nest.js

This repository contains two applications: one built with Next.js and the other with Nest.js. Follow the instructions
below to set up and run both apps.

## Prerequisites

- Node.js (v14 or higher)
- pnpm (install using `npm install -g pnpm`)

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

## Step 2: Install Dependencies and Generate Prisma bash Copy code

# Install dependencies for both Next.js and Nest.js apps

pnpm install

# Navigate to the Nest.js app

cd nestjs-app

# Generate Prisma client

```bash
pnpx prisma generate
```

## Step 3: Run the App

# Start both Next.js and Nest.js apps concurrently

- Run this command on the root of the folder

```sh
pnpm dev
```

# Additional Commands Run Only Next.js App

# Navigate to the Next.js app

```bash
cd apps/web
```

# Start Next.js app in development mode

```bash
pnpm dev
```

# Run Only Nest.js App

## Navigate to the Nest.js app

```bash
cd apps/server
```

# Start Nest.js app in development mode

```bash
pnpm dev
```
