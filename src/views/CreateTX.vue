<template>
  <div class="wrapper">
    <el-card>
      <div slot="header" class="clearfix">
        <span>Generate transaction</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">
          Back
        </el-button>
      </div>
      <div class="content">
        <el-form label-position="top" :model="info">
          <el-form-item label="Private key">
            <el-select @change="onChangeCommandType" v-model="info.commandType" placeholder="Select command">
              <el-option
                v-for="command in commands"
                :key="command.value"
                :label="command.label"
                :value="command.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <transition name="slide-fade" mode="out-in">
          <transferAsset
            v-if="info.commandType === 'transferAsset'"
            :params.sync="info.params"
          />
          <addSignatory
            v-if="info.commandType === 'addSignatory'"
            :params.sync="info.params"
          />
          <setAccountQuorum
            v-if="info.commandType === 'setAccountQuorum'"
            :params.sync="info.params"
          />
        </transition>
        <div class="actions">
          <el-button
            class="sora-button black"
            @click="onSaveTransaction"
          >
            Save
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { lazyComponent } from '@/router'

import isEmpty from 'lodash/isEmpty'

export default {
  name: 'create-tx',
  components: {
    transferAsset: lazyComponent('CreateTX/transferAsset'),
    addSignatory: lazyComponent('CreateTX/addSignatory'),
    setAccountQuorum: lazyComponent('CreateTX/setAccountQuorum')
  },
  data () {
    return {
      info: {
        commandType: undefined,
        params: {}
      },

      commands: [{
        label: 'Transfer assets',
        value: 'transferAsset'
      }, {
        label: 'Set account quorum',
        value: 'setAccountQuorum'
      }, {
        label: 'Add signatory',
        value: 'addSignatory'
      }]
    }
  },
  computed: {
    isParamsEmpty () {
      return Object.keys(this.info.params).length ? false : true
    }
  },
  methods: {
    ...mapActions([
      'saveTransaction'
    ]),
    goBack () {
      this.$router.push('/dashboard')
    },
    onReset () {
      this.info = {
        commandType: undefined,
        params: {}
      }
    },
    onChangeCommandType (type) {
      this.info.params = {}
    },
    onSaveTransaction () {
      console.log(isEmpty(this.info.params))
      if (isEmpty(this.info.params) || !this.info.commandType) {
        this.$message.error('Transaction has empty parameters!')
        return
      }

      const path = this.$electron.remote.app.getPath('downloads')
      this.saveTransaction({
        ...this.info,
        path
      })
        .then(() => {
          this.$message('Saved to download folder!')
          this.onReset()
        })
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 2rem
}
.actions {
  padding: 1rem 0;
  float: right;
}
.key {
  padding: 1rem;
}
.key_label {
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
}
</style>
