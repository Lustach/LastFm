//Vuetify.ts should be just like this, in main.ts we must import vuetify and use it..
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
