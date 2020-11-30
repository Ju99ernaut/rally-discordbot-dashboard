import Dashboard from '@/components/Dashboard';
import DashboardHome from '@/pages/Home';

export default [
    { path: '/', redirect: { name: 'DashboardHome' } },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            { path: '/', redirect: { name: 'DashboardHome' } },
            { path: 'home', name: 'DashboardHome', component: DashboardHome }
        ]
    }
]