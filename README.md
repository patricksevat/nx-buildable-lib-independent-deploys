# Nx buildable libs + independently deployable apps

## Deploy all apps & serve them

`sh tools/deploy.sh`

Note: `sh tools/deploy.sh --skip-nx-cache` also works. First argument is passed to `npx nx build host-app`

## Perform an independent deploy

You can update `libs/buildable-lib/src/lib/buildable-lib.tsx`.
You **must** update the interface otherwise a new version does not get created
You *can* update the version, just for easier visual verification


Open up a second terminal & run `sh tools/independent-deploy.sh <appName>`

E.g. `sh tools/independent-deploy.sh remote-app1`

Refresh the page