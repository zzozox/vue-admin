import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '后台视频管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    redirect: '/video/index',
    name: 'Video',
    meta: { title: '视频管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'video',
        component: () => import('@/views/video/index'),
        meta: { title: '视频列表', icon: 'list' }
      }
    ]
  },
  // {
  //   path: '/addvideo',
  //   hidden: true,
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'addvideo',
  //       component: () => import('@/views/addvideo/index'),
  //       meta: { title: '添加视频', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/index',
    meta: { title: '分类管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'category',
        component: () => import('@/views/category/index'),
        meta: { title: '分类管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/addcategory',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'addcategory',
        component: () => import('@/views/addcategory/index'),
        meta: { title: '添加分类', icon: 'form' }
      }
    ]
  },
  {
    path: '/editcategory',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:id',
        name: 'editcategory',
        component: () => import('@/views/editcategory/index'),
        meta: { title: '编辑分类', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/adduser',
  //   hidden: true,
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'adduser',
  //       component: () => import('@/views/adduser/index'),
  //       meta: { title: '添加用户', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/edituser',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:id',
        name: 'edituser',
        component: () => import('@/views/edituser/index'),
        meta: { title: '编辑用户', icon: 'form' }
      }
    ]
  },
  {
    path: '/editvideo',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:id',
        name: 'editvideo',
        component: () => import('@/views/editvideo/index'),
        meta: { title: '编辑视频', icon: 'form' }
      }
    ]
  },
  {
    path: '/advertisement',
    component: Layout,
    redirect: '/advertisement/index',
    name: 'Advertisement',
    meta: { title: '广告管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'advertisement',
        component: () => import('@/views/advertisement/index'),
        meta: { title: '广告列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/addadvertisement',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'addadvertisement',
        component: () => import('@/views/addadvertisement/index'),
        meta: { title: '添加广告', icon: 'form' }
      }
    ]
  },
  {
    path: '/editadvertisement',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:id',
        name: 'editadvertisement',
        component: () => import('@/views/editadvertisement/index'),
        meta: { title: '编辑广告', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  // 重置当前路由器所有路由
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
