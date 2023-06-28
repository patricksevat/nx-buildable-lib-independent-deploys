rm -rf dist/apps/http-server

npx nx build host-app $1

mkdir dist/apps/http-server
cp -r dist/apps/host-app/* dist/apps/http-server
mkdir dist/apps/http-server/remote-app1 dist/apps/http-server/remote-app2
cp -r dist/apps/remote-app1/* dist/apps/http-server/remote-app1
cp -r dist/apps/remote-app2/* dist/apps/http-server/remote-app2

npx http-server dist/apps/http-server