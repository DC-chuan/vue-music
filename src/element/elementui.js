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
    Table,
    TableColumn,
    Slider
} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Slider)
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;