import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { site } from '@/config/site'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: site.name },
  },
  {
    path: '/area-games-2026',
    name: 'Games',
    component: () => import('@/views/GamesView.vue'),
    meta: { title: 'AREA Games 2026' },
  },
  {
    path: '/galeria',
    name: 'Gallery',
    component: () => import('@/views/GalleryView.vue'),
    meta: { title: 'Galería' },
  },
  {
    path: '/galeria/:slug',
    name: 'Album',
    component: () => import('@/views/AlbumView.vue'),
    meta: { title: 'Galería' },
  },
  {
    path: '/primer-dia-gratis',
    name: 'FirstDay',
    component: () => import('@/views/FirstDayView.vue'),
    meta: { title: 'Primer día gratis' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Ingresar', guestOnly: true },
  },
  {
    path: '/cuenta',
    redirect: { name: 'AdminDashboard' },
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'admin' },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/AdminDashboardView.vue'),
        meta: { title: 'Panel' },
      },
      {
        path: 'leads',
        name: 'AdminLeads',
        component: () => import('@/views/admin/AdminLeadsView.vue'),
        meta: { title: 'Interesados' },
      },
      {
        path: 'galeria',
        name: 'AdminAlbums',
        component: () => import('@/views/admin/AdminAlbumsView.vue'),
        meta: { title: 'Galería' },
      },
      {
        path: 'galeria/:id',
        name: 'AdminAlbum',
        component: () => import('@/views/admin/AdminAlbumView.vue'),
        meta: { title: 'Álbum' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página no encontrada' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Con "atrás" el navegador devuelve la posición guardada; con un hash se
  // baja a la sección; si no, arriba.
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    // El header es fijo: se deja aire para que no tape el título de la sección.
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 }
    return { left: 0, top: 0 }
  },
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth || to.meta.guestOnly) {
    // La sesión se verifica contra el API una sola vez por carga.
    await userStore.restore()
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return { name: 'Login', query: { next: to.fullPath }, replace: true }
  }

  if (to.meta.requiresAdmin && userStore.user?.accountType !== 'admin') {
    return { name: 'Home', replace: true }
  }

  if (to.meta.guestOnly && userStore.isAuthenticated) {
    return { name: 'AdminDashboard', replace: true }
  }
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title && title !== site.name ? `${title} — ${site.name}` : site.name
})

export default router
