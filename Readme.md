## Project Explanation

This project demonstrates a basic integration of GitHub OAuth for user authentication in a React application using Vite, with a Node.js Express backend.

### GitHub OAuth Implementation Details (Backend)

The `backend/index.js` file handles the server-side logic for GitHub OAuth authentication. Here's a breakdown of how it's implemented:

1.  **Initiating OAuth (`/auth/github`):**
    *   When a user clicks "Login with GitHub" on the frontend, the browser is redirected to `http://localhost:9000/auth/github`.
    *   The backend then constructs a GitHub authorization URL using the `GITHUB_CLIENT_ID` from environment variables and a hardcoded `scope=user:email` to request user profile and email access.
    *   The user's browser is then redirected to this GitHub authorization URL.

2.  **OAuth Callback (`/auth/github/callback`):**
    *   After the user authorizes the application on GitHub, GitHub redirects the user back to `http://localhost:9000/auth/github/callback` with a `code` in the URL query parameters.
    *   The backend uses this `code`, along with `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (also from environment variables), to make a POST request to GitHub's token endpoint (`https://github.com/login/oauth/access_token`). This exchanges the temporary `code` for a permanent `AccessToken`.
    *   With the `AccessToken`, the backend makes two more API calls to GitHub:
        *   One to `https://api.github.com/user` to fetch the user's public profile data.
        *   Another to `https://api.github.com/user/emails` to retrieve the user's email addresses.
    *   It then finds the primary, verified email from the list.
    *   Finally, it combines the user's profile data and their primary email into a `userData` object.
    *   This `userData` object is then **hardcoded** to be redirected back to the frontend at `http://localhost:5173` as a URL query parameter, encoded as a JSON string.

