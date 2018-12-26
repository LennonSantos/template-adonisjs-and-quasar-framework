const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/admin/Login.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/admin/Dashboard.vue'),
        meta: {
          requiresAuth: true,
          permisions: ['page_dashboard_view', 'administrator']
        }
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('pages/admin/Roles.vue'),
        meta: {requiresAuth: true}
      }
    ]
  },
  {
    path: '/',
    redirect: '/website'
  },
  {
    path: '/website',
    component: () => import('layouts/WebsiteLayout.vue'),
    children: [
      { path: '', component: () => import('pages/website/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
