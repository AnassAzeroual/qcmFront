import { MenuItem } from '../models/menu.model';

export const MENU: MenuItem[] = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'dashboards', label: 'Dashboards', isTitle: false, icon: 'uil-home-alt', collapsed: false, badge: { variant: 'success', text: '4' },
        children: [
            { key: 'ds-list-candidat', label: 'list candidat', link: '/qcm/list-candidat', parentKey: 'dashboards' },
            { key: 'ds-list-qcm', label: 'list qcm', link: '/qcm/list-qcm', parentKey: 'dashboards' },
            { key: 'ds-list-qcm', label: 'list qcm Candaidat', link: '/qcm/qcm-candidat', parentKey: 'dashboards' },
            // { key: 'ds-gestion-candidat', label: 'gestion candidat', link: '/qcm/gestion-candidat', parentKey: 'dashboards' },
            // { key: 'ds-gestion-qcm', label: 'gestion qcm', link: '/qcm/gestion-qcm', parentKey: 'dashboards' },
        ]
    },
]

