# Nx buildable libs + independently deployable apps

## Deploy all apps & serve them

`sh tools/deploy.sh`

Note: `sh tools/deploy.sh --skip-nx-cache` also works. First argument is passed to `npx nx build host-app`

## Perform an independent deploy

You can update the version in `libs/buildable-lib/src/lib/buildable-lib.tsx`

And then run `sh tools/independent-deploy.sh <appName>`

E.g. `sh tools/independent-deploy.sh remote-app1`