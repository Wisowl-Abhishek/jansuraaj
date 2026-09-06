# WisOwl - Static Site + pSEO pages
## Pull & install 
    git pull origin pSEO-engine
    npm install
## Environment Setup: Ensure your .env.local has these two new variables added for the redirection logic and DB credentials
    NEXT_PUBLIC_APP_URL="http://jansuraajapp.wisowl.com"
    NEXT_PUBLIC_COOKIE_DOMAIN=".wisowl.com"
    Read Replica: " REPLACE WITH READ REPLICA "
## Generate Search Index: This is a critical step I restored to ensure the semantic search functionality works on the pSEO routes:
    node scripts/generate-search-index.mjs
## Run Dev:
    npm run dev
