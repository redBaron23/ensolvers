#!/bin/zsh
#
#


npm install @material-ui/lab
npm i
npm run build;
serve -s build &

if which xdg-open > /dev/null
then
  xdg-open localhost:5000
elif which gnome-open > /dev/null
then
  gnome-open localhost:5000
fi
