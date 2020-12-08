import Dashboard from '@/components/Dashboard';
import DashboardHome from '@/pages/Home';
import Commands from '@/pages/Commands';
import FeatureRequest from '@/pages/FeatureRequest';
import Logs from '@/pages/Logs';
import Settings from '@/pages/Settings';
import Setup from '@/pages/Setup';
import NotFound from '@/pages/NotFound';

export default [
    { path: '/', redirect: { name: 'DashboardHome' } },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            { path: '/', redirect: { name: 'DashboardHome' } },
            { path: 'home', name: 'DashboardHome', component: DashboardHome },
            { path: 'commands', name: 'Commands', component: Commands },
            { path: 'features', name: 'FeatureRequest', component: FeatureRequest },
            { path: 'logs', name: 'Logs', component: Logs },
            { path: 'settings', name: 'Settings', component: Settings },
            { path: 'setup', name: 'Setup', component: Setup },
        ]
    },
    { path: "*", component: NotFound },
]