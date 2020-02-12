/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


window.Vue = require('vue');
window.Fire = new Vue();
window.Form = Form;
import { Form, HasError, AlertError } from 'vform'
import moment from 'moment'

/* Sweet alert */
import Swal from 'sweetalert2'
window.Swal = Swal

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Toast =Toast


Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);
Vue.filter('upText',function(text){
  return text.charAt(0).toUpperCase()+text.slice(1);
});

Vue.filter('upDate',function(myDate){
  return moment(myDate).format('MMMM Do YYYY');
})

Vue.filter('time',function(time){
  return moment(time).calendar()
});




import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
import VueRouter from 'vue-router'
Vue.use(VueRouter)



const routes = [
    { path: '/home', component: require('./components/Home.vue').default },
     { path: '/example', component: require('./components/ExampleComponent.vue').default } ,
     /* Users */
     {path: '/manageusers',component: require('./components/User/manageUsers.vue').default },
     {path: '/users',component: require('./components/User/users.vue').default },
        /* =========Account============ */
     {path: '/accounts',component: require('./components/Account/accounts.vue').default },
     {path: '/topup',component: require('./components/Account/deposit.vue').default },
     {path: '/withdraw',component: require('./components/Account/withdraw.vue').default },

     {path: '/profile',component: require('./components/Profile/profile.vue').default },

     /* transcation */
     {path: '/transactions',component: require('./components/Transaction/transactions.vue').default },
     {path: '/statement',component: require('./components/Transaction/statement.vue').default },

     /* LOans */
     {path: '/loans',component: require('./components/Loan/loans.vue').default },
     {path: '/activeloans',component: require('./components/Loan/activeLoans.vue').default },
     {path: '/graph',component: require('./components/graph.vue').default },

    

  ]


  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  })

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
});
