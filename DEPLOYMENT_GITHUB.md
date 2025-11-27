# Deploying to Vercel via GitHub

Since you prefer the GitHub method, here are the exact steps to follow.

## Step 1: Push your code to GitHub

You currently have some uncommitted changes. Run these commands in your terminal to save everything and push it to GitHub:

```bash
git add .
git commit -m "Add OCR endpoint and image upload support"
git push origin main
```

> **Note**: If `git push origin main` fails because you haven't connected a remote repository yet, create a new repository on [GitHub.com](https://github.com/new) and follow the instructions there to "push an existing repository from the command line".

## Step 2: Connect Vercel to GitHub

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  You should see your GitHub repository listed there. Click **Import** next to it.
4.  **Configure Project**:
    *   **Framework Preset**: Other (or Express if available, but "Other" works fine for Node.js).
    *   **Root Directory**: `./` (default).
5.  **Environment Variables** (Crucial!):
    *   Expand the **Environment Variables** section.
    *   Add `MONGO_URI`: Copy the value from your `.env` file.
    *   Add `JWT_SECRET`: Copy the value from your `.env` file.
6.  Click **Deploy**.

## Step 3: Get your URL

Once the deployment finishes (it takes about a minute), Vercel will show you a "Congratulations!" screen.
*   Click **Go to Dashboard**.
*   You will see a **Domains** section with a URL like `https://shopsync-backend.vercel.app`.
*   **Copy this URL**. This is what you give to your friend!

## Step 4: Send to your Friend

Send your friend the following details:

*   **URL**: `[YOUR_VERCEL_URL]/api/ocr`
*   **Method**: `POST`
*   **Body**: JSON data (e.g., `{"text": "..."}`)
