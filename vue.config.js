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
      }
    }
  }
}
