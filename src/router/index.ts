import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/find-bus-route',
    name: '',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "findBus" */ '../views/bus-route/FindBus.vue'),
    children:[
      {
        path: ':city',
        name: 'FindBusNumber',
        component: () => import(/* webpackChunkName: "findBusNumber" */ '../views/bus-route/FindBusNumber.vue'),   
      },
      {
        path: ':city/:busName',
        name: 'BusRouteStatusInfo',
        component: () => import(/* webpackChunkName: "busRouteInfo" */ '../views/bus-route/BusRouteStatusInfo.vue'),
      },
    ]
  },
  {
    path: '/other-city',
    name: 'FindBusOtherCity',
    component: () => import(/* webpackChunkName: "findOtherBus" */ '../views/bus-route/FindBusOtherCity.vue'),        
  },
  {
    path: '/stop-info/:city/:stopName',
    name: 'BusStopInfo',
    component: () => import(/* webpackChunkName: "busStopInfp" */ '../views/bus-stop/BusStopInfo.vue'),
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
