const { execSync } = require('child_process')

module.exports = {
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        config.plugin('define').tap(args => {
          args[0]['process.env.COMMIT_HASH'] = JSON.stringify(execSync('git rev-parse HEAD').toString().trim())
          args[0]['process.env.COMMIT_HASH_SHORT'] = JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim())
          return args
        })
        return config
      },
      builderOptions: {
        productName: 'D3 OTS',
        mac: {
          icon: 'build/logo'
        },
        win: {
          icon: 'build/logo'
        },
        linux: {
          icon: 'build/logo'
        }
      }
    }
  }
}
