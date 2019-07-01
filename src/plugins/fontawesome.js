/*
 * Copyright D3 Ledger, Inc. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import Vue from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload'

library.add(
  faUpload
)

Vue.component('fa-icon', FontAwesomeIcon)
