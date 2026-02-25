@echo off
node generate-index.js
git add .
set /p msg="Commit message: "
git commit -m "%msg%"
git push