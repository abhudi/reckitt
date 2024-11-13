#!/bin/bash
set -e 
# Change to your application directory
cd /home/ubuntu/erp_frontend

# Pull the latest changes from the Git repository
/usr/bin/git pull origin dev

# Install dependencies, build your application, etc.
/usr/bin/npm install

/usr/bin/npm run build

/usr/local/bin/pm2 stop "erp-web" || true
/usr/local/bin/pm2 delete "erp-web" || true
/usr/local/bin/pm2 start npm --name "erp-web" -- start -- -p 4000

echo "Deployment to dev server complete."
