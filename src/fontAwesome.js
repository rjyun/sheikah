import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faCircle,
  faCode,
  faCoffee,
  faCog,
  faEye,
  faShoppingBag,
  faSortDown,
  faUsers,
  faWallet,
  faTrash,
  faInfoCircle,
  faLongArrowAltRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faCoffee,
  faWallet,
  faEye,
  faCode,
  faShoppingBag,
  faUsers,
  faCog,
  faAngleRight,
  faAngleLeft,
  faCircle,
  faSortDown,
  faAngleUp,
  faTrash,
  faInfoCircle,
  faLongArrowAltRight,
  faTimes
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
