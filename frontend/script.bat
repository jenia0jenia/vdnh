echo on

call npm run build
echo coping...
copy README.md .\build
copy x86_64-linux-musl-simple-http-server .\build
copy x86_64-windows-msvc-simple-http-server.exe .\build
echo Done!

Echo zipping...

"C:\Program Files\7-Zip\7z.exe" a -tzip "build.zip" "build\*"

echo Done!

echo adding to github...

git add .
git commit -m"last fixes"
git push 
git push j
