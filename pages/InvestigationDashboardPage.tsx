import React, { FC, useState } from 'react';
import { Card, SectionTitle } from '../components/common';
import { SettingsIcon } from '../components/Icons';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { NetworkNode, NetworkEdge } from '../types';

// --- MOCK DATA & CONFIG ---
const CHART_DATA = Array.from({ length: 10 }, (_, i) => ({ name: i, uv: 18 + Math.random() * 25 }));
const NODE_COUNT = 12;

// --- DYNAMIC DATA GENERATION ---
const generateNetworkData = () => {
    const nodes: NetworkNode[] = [];
    const edges: NetworkEdge[] = [];
    const center = { x: 250, y: 250 };
    const radius = 200;

    for (let i = 0; i < NODE_COUNT; i++) {
        const angle = (i / NODE_COUNT) * 2 * Math.PI;
        const typeCycle = i % 4;
        let type: NetworkNode['type'] = 'suspect';
        if (typeCycle === 1) type = 'evidence';
        if (typeCycle === 2) type = 'location';
        if (typeCycle === 3) type = 'vehicle';
        
        nodes.push({
            id: `N-${i}`,
            label: `${type.substring(0,1).toUpperCase()}-${String(i).padStart(2,'0')}`,
            type,
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle),
        });
    }

    for (let i = 0; i < NODE_COUNT / 2; i++) {
        const from = `N-${Math.floor(Math.random() * NODE_COUNT)}`;
        let to = `N-${Math.floor(Math.random() * NODE_COUNT)}`;
        // Ensure 'to' is not the same as 'from'
        while(to === from) {
          to = `N-${Math.floor(Math.random() * NODE_COUNT)}`;
        }
        edges.push({ from, to });
    }
    
    // Add central node and connections
    nodes.push({ id: 'N-CENTER', label: 'E-5', type: 'evidence', x: center.x, y: center.y });
    edges.push({ from: 'N-CENTER', to: `N-1` });
    edges.push({ from: 'N-CENTER', to: `N-4` });
    edges.push({ from: 'N-CENTER', to: `N-8` });

    return { nodes, edges };
};


// --- UI COMPONENTS ---

const Header: FC = () => (
    <div className="col-span-12 h-16 flex items-center justify-between border-b-2 border-[#222] px-4">
        <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold tracking-widest text-gray-400">UNIT 731</h1>
            <div>
                <p className="text-xs text-gray-500">CASE DESCRIPTION</p>
                <p className="text-sm text-gray-200">SF-2024-0815 - Homicide investigation at Pier 39.</p>
            </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-green-400 tracking-widest">
            <p>STATUS: ACTIVE</p>
            <p className="animate-pulse">| REC</p>
        </div>
    </div>
);

const Metric: FC<{ title: string, value: string | number, subvalue?: string | number, highlight?: boolean }> = ({ title, value, subvalue, highlight }) => (
    <div className="border-r border-[#222] px-6">
        <p className="text-xs text-gray-500 mb-1">{title}</p>
        <p className={`text-3xl font-light ${highlight ? 'text-green-400' : 'text-gray-200'}`}>{value}</p>
        {subvalue && <p className="text-xs text-gray-400">{subvalue}</p>}
    </div>
);

const MetricsPanel: FC = () => (
    <div className="col-span-9 h-24 flex items-center border-b-2 border-[#222]">
        <Metric title="ACTIVE INVESTIGATORS" value={19} subvalue="5 UNITS" />
        <Metric title="LOGGED EVIDENCE" value={51} subvalue="+2 this hour" />
        <Metric title="LIVE INTEL FEEDS" value={1921} subvalue="PER MINUTE" highlight/>
        <Metric title="CASE PRIORITY" value={"HIGH"} highlight/>
    </div>
);

const CaseClosureChart: FC = () => (
    <div className="col-span-3 h-24 border-b-2 border-[#222] p-2">
        <div className="flex justify-between items-center px-2">
             <p className="text-xs text-gray-500">CASE CLOSURE PROBABILITY</p>
             <p className="text-lg text-green-400">41%</p>
        </div>
        <ResponsiveContainer width="100%" height="70%">
            <LineChart data={CHART_DATA} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <XAxis dataKey="name" hide />
                <Line type="monotone" dataKey="uv" stroke="#00ff00" strokeWidth={1} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

const PriorityAlerts: FC = () => (
    <div className="col-span-3 p-4 border-r-2 border-[#222] flex flex-col">
        <SectionTitle subtext="Urgent action required">High-Priority Alerts</SectionTitle>
        <div className="space-y-3 text-sm flex-grow overflow-y-auto">
            <div className="p-2 bg-red-900/50 border border-red-500">
                <p className="font-bold text-red-300">SUSPECT MATCH</p>
                <p className="text-xs text-gray-300">POI-004 vehicle spotted near Embarcadero.</p>
            </div>
             <div className="p-2 bg-yellow-900/50 border border-yellow-500">
                <p className="font-bold text-yellow-300">NEW EVIDENCE</p>
                <p className="text-xs text-gray-300">Encrypted drive recovered from scene.</p>
            </div>
             <div className="p-2 bg-gray-500/20 border border-gray-500">
                <p className="font-bold text-gray-300">WARRANT APPROVED</p>
                <p className="text-xs text-gray-300">Warrant for John Doe's residence is active.</p>
            </div>
        </div>
    </div>
);

const TaskQueue: FC = () => {
    const tasks = [
        { id: 'P-1', type: 'FORENSICS', desc: 'ANALYZE RECOVERED DRIVE' },
        { id: 'S-2', type: 'SURVEILLANCE', desc: 'TRACK POI-004 VEHICLE' },
        { id: 'L-1', type: 'LEGAL', desc: 'EXECUTE WARRANT ON DOE RESIDENCE' },
        { id: 'P-2', type: 'FORENSICS', desc: 'CROSS-REFERENCE FINGERPRINTS' },
        { id: 'S-3', type: 'SURVEILLANCE', desc: 'MONITOR FINANCIAL TRANSACTIONS' },
    ];

    return (
        <div className="col-span-3 p-4 border-r-2 border-[#222] flex flex-col">
            <SectionTitle subtext="Field & Lab Assignments">Task Queue</SectionTitle>
            <div className="text-xs font-mono flex-grow overflow-y-auto">
                <div className="grid grid-cols-6 sticky top-0 bg-[#0A0A0A]">
                    <p className="col-span-1 text-gray-500">ID</p>
                    <p className="col-span-2 text-gray-500">TYPE</p>
                    <p className="col-span-3 text-gray-500">DESCRIPTION</p>
                </div>
                <div className="space-y-2 mt-2">
                {tasks.map(task => (
                    <div key={task.id} className="grid grid-cols-6 items-center p-1 bg-[#111]">
                       <p className="col-span-1 text-gray-400">{task.id}</p>
                       <p className={`col-span-2 ${task.type === 'FORENSICS' ? 'text-green-400' : 'text-cyan-400'}`}>{task.type}</p>
                       <p className="col-span-3 text-gray-300">{task.desc}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

const NetworkGraph: FC = () => {
    const [network, setNetwork] = useState(generateNetworkData());
    
    const getNodeColor = (type: NetworkNode['type']) => {
        switch(type) {
            case 'suspect': return 'fill-red-500 stroke-red-300';
            case 'evidence': return 'fill-green-500 stroke-green-300';
            case 'location': return 'fill-blue-500 stroke-blue-300';
            case 'vehicle': return 'fill-yellow-500 stroke-yellow-300';
        }
    }
    
    return (
        <div className="col-span-6 p-4 flex flex-col">
            <SectionTitle subtext="Connections between evidence, locations & suspects">Link Analysis</SectionTitle>
            <div className="relative w-full flex-grow bg-black rounded-full border-2 border-green-900/50">
                <svg className="w-full h-full" viewBox="0 0 500 500">
                    <defs>
                        <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(0, 50, 0, 0.3)" />
                            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                        </radialGradient>
                    </defs>
                    <rect width="500" height="500" fill="url(#bgGradient)" rx="250" />
                    {/* Edges */}
                    <g>
                        {network.edges.map((edge, i) => {
                            const fromNode = network.nodes.find(n => n.id === edge.from);
                            const toNode = network.nodes.find(n => n.id === edge.to);
                            if (!fromNode || !toNode) return null;
                            return <line key={i} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke="#00ff00" strokeWidth="0.5" opacity="0.4" />
                        })}
                    </g>
                    {/* Nodes */}
                    <g>
                        {network.nodes.map(node => (
                            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                                <circle r="10" className={getNodeColor(node.type)} strokeWidth="1" />
                                <text textAnchor="middle" dy="4" className="text-[10px] fill-white font-mono">{node.label}</text>
                                {node.type === 'suspect' && <circle r="15" stroke="#ff0000" strokeWidth="1" fill="none" className="animate-ping" />}
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        </div>
    );
};

const TimelineControl: FC = () => (
    <div className="col-span-12 h-24 border-t-2 border-[#222] p-4 flex items-center justify-between">
        <div>
            <p className="text-xs text-gray-500">CHRONOLOGY CONTROL</p>
            <p className="text-sm text-gray-200">Running: 24/07/2024 14:00:00 UTC</p>
        </div>
        <div className="flex items-center gap-4">
            <button className="px-4 py-2 border border-[#333] bg-[#111]">RUN</button>
            <button className="px-4 py-2 border border-[#333] bg-[#111]">PAUSE</button>
            <button className="px-4 py-2 border border-[#333] bg-[#111]">STOP</button>
            <div className="w-64 h-1 bg-[#333]">
                <div className="w-1/2 h-full bg-green-500"></div>
            </div>
            <button className="px-4 py-2 border border-[#333] bg-[#111]">1X</button>
            <button className="px-4 py-2 border border-[#333] bg-[#222]">2X</button>
            <button className="px-4 py-2 border border-[#333] bg-[#111]">3X</button>
        </div>
        <div className="text-right">
             <p className="text-xs text-gray-500">FIELD AGENT LOG</p>
             <p className="text-sm text-green-300 font-mono">> Unit-3 approaching target location.</p>
        </div>
    </div>
);


const InvestigationDashboardPage: FC = () => (
    <div className="w-full h-full grid grid-cols-12 grid-rows-[auto_auto_1fr_auto] bg-[#0A0A0A]">
       <Header />
       <MetricsPanel />
       <CaseClosureChart />
       <PriorityAlerts />
       <TaskQueue />
       <NetworkGraph />
       <TimelineControl />
    </div>
);

export default InvestigationDashboardPage;