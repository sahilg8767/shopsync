# Deploying ShopSync Backend to Vercel

You can deploy your Express backend to Vercel using either the Vercel CLI or via GitHub integration.

## Prerequisites
- A [Vercel Account](https://vercel.com/signup)
- Your MongoDB Atlas Connection String (`MONGO_URI`)
- Your JWT Secret (`JWT_SECRET`)

---

## Method 1: Using Vercel CLI (Recommended for quick testing)

1.  **Install Vercel CLI** (if you haven't already):
    ```bash
    npm install -g vercel
    ```

2.  **Login to Vercel**:
    ```bash
    vercel login
    ```
    Follow the prompts to authenticate with your email or GitHub.

3.  **Deploy**:
    Run the following command in your project root (`d:\shopsync`):
    ```bash
    vercel
    ```

4.  **Configure Project**:
    Follow the interactive prompts:
    - Set up and deploy? **Y**
    - Which scope? (Select your account)
    - Link to existing project? **N**
    - Project name? (Press Enter for default or type a name like `shopsync-backend`)
    - In which directory is your code located? **./** (Press Enter)
    - Want to modify these settings? **N**

5.  **Set Environment Variables**:
    After the initial build (which might fail if it tries to connect to DB without vars), go to your Vercel Dashboard for this project.
    - Go to **Settings** > **Environment Variables**.
    - Add `MONGO_URI` with your Atlas connection string.
    - Add `JWT_SECRET` with your secret key.
    - **Redeploy**: Run `vercel --prod` in your terminal to trigger a new deployment with the variables.

---

## Method 2: Using GitHub (Recommended for production)

1.  **Push your code to GitHub**:
    - Initialize git: `git init`
    - Add files: `git add .`
    - Commit: `git commit -m "Initial commit"`
    - Create a repo on GitHub and push your code.

2.  **Import to Vercel**:
    - Go to the [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **Add New...** > **Project**.
    - Select your GitHub repository and click **Import**.

3.  **Configure Environment Variables**:
    - In the "Environment Variables" section of the import screen:
        - Add `MONGO_URI`
        - Add `JWT_SECRET`
    - Click **Deploy**.

## Verification
Once deployed, Vercel will give you a URL (e.g., `https://shopsync-backend.vercel.app`).
You can test it using your `manual_test.js` by updating the `BASE_URL` in that file to your new Vercel URL.
