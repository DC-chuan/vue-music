import Vue from "vue";
import { 
    Form,
    FormItem,
    Input,
    Menu,
    MenuItem,
    Carousel,
    CarouselItem,
    Loading, 
} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;