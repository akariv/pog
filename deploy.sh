#!/bin/sh
git checkout master && \
rm .gitignore && \
ng build --prod && \
cp CNAME dist/pog && \
git add dist/pog && \
git commit -m dist && \
(git branch -D gh-pages || true) && \
git subtree split --prefix dist/pog -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout master && \
git branch -D gh-pages && \
git checkout . && \
git push
