const { execSync } = require('child_process')

const appName = process.env.APP_NAME || 'D3Ledger'

module.exports = {
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        config.plugin('define').tap(args => {
          args[0]['process.env.APP_NAME'] = JSON.stringify(appName)
          args[0]['process.env.COMMIT_HASH'] = JSON.stringify(execSync('git rev-parse HEAD').toString().trim())
          args[0]['process.env.COMMIT_HASH_SHORT'] = JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim())
          return args
        })
        return config
      },
      builderOptions: {
        productName: `${appName} OTS`,
        mac: {
          icon: appName === 'D3Ledger' ? 'build/logo' : 'build/logo-sora'
        },
        win: {
          icon: appName === 'D3Ledger' ? 'build/logo' : 'build/logo-sora'
        },
        linux: {
          icon: appName === 'D3Ledger' ? 'build/logo' : 'build/logo-sora'
        }
      }
    }
  }
}
