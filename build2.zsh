#!/bin/zsh
#
#

npm i ./client/
npm run build ./client/;
serve -s ./client/build &

if which xdg-open > /dev/null
then
  xdg-open localhost:5000
elif which gnome-open > /dev/null
then
  gnome-open localhost:5000
fi
