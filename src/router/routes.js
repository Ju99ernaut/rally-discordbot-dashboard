import Dashboard from '@/components/Dashboard';
import DashboardHome from '@/pages/Home';
import NotFound from '@/pages/NotFound';

export default [
    { path: '/', redirect: { name: 'DashboardHome' } },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            { path: '/', redirect: { name: 'DashboardHome' } },
            { path: 'home', name: 'DashboardHome', component: DashboardHome }
        ]
    },
    { path: "*", component: NotFound },
]