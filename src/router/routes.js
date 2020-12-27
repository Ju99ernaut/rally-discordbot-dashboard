const Landing = () => import('@/pages/Landing');
const Dashboard = () => import('@/components/Dashboard');
const DashboardHome = () => import('@/pages/Home');
const Commands = () => import('@/pages/Commands');
const FeatureRequest = () => import('@/pages/FeatureRequest');
const Logs = () => import('@/pages/Logs');
const Settings = () => import('@/pages/Settings');
const Setup = () => import('@/pages/Setup');
const NotFound = () => import('@/pages/NotFound');

export default [
    { path: '/', name: 'Homepage', component: Landing },
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