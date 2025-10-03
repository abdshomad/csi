import React, { FC, useState, lazy, Suspense, ReactNode } from 'react';
import { Page } from './types';
import { LayoutIcon, GridIcon, TerminalIcon, WorkflowIcon, SettingsIcon, FingerprintIcon } from './components/Icons';

// Lazy load pages for better initial load time
const CaseDashboardPage = lazy(() => import('./pages/CaseDashboardPage'));
const DataOverviewPage = lazy(() => import('./pages/DataOverviewPage'));
const InvestigationDashboardPage = lazy(() => import('./pages/InvestigationDashboardPage'));
const WorkflowBuilderPage = lazy(() => import('./pages/WorkflowBuilderPage'));


const NavItem: FC<{
    label: string;
    page: Page;
    currentPage: Page;
    setPage: (page: Page) => void;
    children: ReactNode;
}> = ({ label, page, currentPage, setPage, children }) => (
    <button
        onClick={() => setPage(page)}
        className={`flex flex-col items-center justify-center gap-1 w-full aspect-square p-2 rounded-lg transition-colors ${
            currentPage === page ? 'bg-green-500/20 text-green-400' : 'text-gray-500 hover:bg-gray-700/30 hover:text-gray-300'
        }`}
        aria-label={label}
        aria-current={currentPage === page}
    >
        {children}
        <span className="text-[10px] tracking-wider font-bold">{label}</span>
    </button>
);


const AppSidebar: FC<{ currentPage: Page; setPage: (page: Page) => void }> = ({ currentPage, setPage }) => (
    <aside className="w-24 h-full bg-[#101010] border-r border-[#333] flex flex-col items-center justify-between p-4">
        <div className="w-12 h-12 text-green-500">
            <FingerprintIcon />
        </div>
        <nav className="w-full flex flex-col gap-4">
            <NavItem label="Cases" page={Page.CaseDashboard} currentPage={currentPage} setPage={setPage}>
                <LayoutIcon className="w-6 h-6" />
            </NavItem>
            <NavItem label="Stats" page={Page.DataOverview} currentPage={currentPage} setPage={setPage}>
                <GridIcon className="w-6 h-6" />
            </NavItem>
            <NavItem label="Live" page={Page.InvestigationDashboard} currentPage={currentPage} setPage={setPage}>
                 <TerminalIcon className="w-6 h-6" />
            </NavItem>
            <NavItem label="Builder" page={Page.WorkflowBuilder} currentPage={currentPage} setPage={setPage}>
                 <WorkflowIcon className="w-6 h-6" />
            </NavItem>
        </nav>
        <div className="w-full">
             <button className="flex flex-col items-center justify-center gap-1 w-full aspect-square p-2 rounded-lg transition-colors text-gray-500 hover:bg-gray-700/30 hover:text-gray-300">
                 <SettingsIcon className="w-6 h-6" />
                 <span className="text-[10px] tracking-wider font-bold">Settings</span>
             </button>
        </div>
    </aside>
);


const App: FC = () => {
    const [page, setPage] = useState<Page>(Page.InvestigationDashboard);

    const renderPage = () => {
        switch (page) {
            case Page.CaseDashboard:
                return <CaseDashboardPage />;
            case Page.DataOverview:
                return <DataOverviewPage />;
            case Page.InvestigationDashboard:
                return <InvestigationDashboardPage />;
             case Page.WorkflowBuilder:
                return <WorkflowBuilderPage />;
            default:
                return <InvestigationDashboardPage />;
        }
    };

    return (
        <main className="w-screen h-screen bg-[#0A0A0A] text-[#E0E0E0] flex overflow-hidden">
             <style>{`
                @keyframes ping {
                    75%, 100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }
                .animation-delay-500 { animation-delay: 0.5s; }
                .bg-grid-pattern {
                    background-image:
                        linear-gradient(to right, #181818 1px, transparent 1px),
                        linear-gradient(to bottom, #181818 1px, transparent 1px);
                    background-size: 2rem 2rem;
                }
            `}</style>

            <AppSidebar currentPage={page} setPage={setPage} />
            
            <div className="flex-grow h-full">
                 <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-500">LOADING INTERFACE...</div>}>
                    {renderPage()}
                </Suspense>
            </div>
        </main>
    );
};

export default App;