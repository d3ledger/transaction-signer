[![npm version](https://img.shields.io/npm/v/iroha-helpers.svg)](https://www.npmjs.com/package/iroha-helpers)

# D3 Offline transaction signer

This is application based on Electron.js for generating key pairs and transactions offline. Application requires user to be offline, if user have connected to the Internet, he will receive a notification about it.

### Features
1. Creating key-pairs
2. Creating transactions
3. Signing transactions

## Project setup
This command will install all required dependencies for application
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn electron:serve
```

### Compiles and build for current OS
```
yarn run electron:build
```

### Compiles and build for different OS
```
yarn run electron:build-all
```
