#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'yuicer.com' > CNAME

git config user.name yuicer --locak
git config user.name yuicer1@gmail.com --locak
git init
git checkout -b main
git add -A
git commit -m 'deploy'
 

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:yuicer/klotski.git main:gh-pages

cd -