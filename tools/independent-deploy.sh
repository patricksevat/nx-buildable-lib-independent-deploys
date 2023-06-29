npx nx build $1 $2 $3
rm -rf dist/apps/http-server/$1
mkdir dist/apps/http-server/$1
cp -r dist/apps/$1/* dist/apps/http-server/$1