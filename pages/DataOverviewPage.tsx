import React, { FC, useState, useRef, useEffect } from 'react';
import { Suspect } from '../types';
import { Card, SectionTitle } from '../components/common';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA ---
const suspects: Suspect[] = [
    { id: 'POI-001', name: 'John "The Ghost" Doe', status: 'At Large' },
    { id: 'POI-002', name: 'Jane "Shadow" Smith', status: 'Under Surveillance' },
    { id: 'POI-003', name: 'Marcus "Cipher" Kane', status: 'In Custody' },
    { id: 'POI-004', name: 'Elena "Viper" Petrova', status: 'At Large' },
    { id: 'POI-005', name: 'Anonymous', status: 'Unknown' },
    { id: 'POI-006', name: 'Silas "The Collector" Vance', status: 'Under Surveillance' },
    { id: 'POI-007', name: 'Isabella "Nightshade" Rossi', status: 'At Large' },
    { id: 'POI-008', name: 'Former Accomplice', status: 'Deceased' },
    { id: 'POI-009', name: '"The Puppeteer"', status: 'Unknown' },
    { id: 'POI-010', name: 'Leo "The Lock" Martinez', status: 'In Custody' },
    { id: 'POI-011', name: 'Sofia "Domino" Garcia', status: 'Under Surveillance' },
    { id: 'POI-012', name: 'Driver', status: 'At Large' },
    { id: 'POI-013', name: 'The Fence', status: 'Unknown' },
    { id: 'POI-014', name: 'Witness X', status: 'Protected Custody' },
];

const lineChartData = [
    { name: 'Jan', uv: 40, pv: 24 },
    { name: 'Feb', uv: 30, pv: 13 },
    { name: 'Mar', uv: 20, pv: 48 },
    { name: 'Apr', uv: 27, pv: 39 },
    { name: 'May', uv: 18, pv: 48 },
    { name: 'Jun', uv: 23, pv: 38 },
    { name: 'Jul', uv: 34, pv: 43 },
];

const forensicLog = [
    '# 2025-05-17 14:23 UTC',
    '> [DRIVE_IMAGE.hda1] :: INIT >>> MFT scan started',
    '> auth... complete',
    '> SCAN | 1.2M records @CLUSTER 500...x03',
    '> HASH: MD5 OK',
    '> LOG >>> "...deleted partition found...',
    '> attempting file carve"',
    '# 2025-05-17 14:34 UTC',
    '> [RECOVERY.eng] :: RESP >> ... ACK ...syncing',
    '> #546..#',
    '> FRAGMENT-4: 87867 .............. loading',
    '> DATA/DECRYPT :: ...4.. %complete',
    '> "found text fragment > coords % receiving',
    '> logs"',
    '# 2025-05-17 14:37 UTC',
    '> [NETWORK.cap] :: relay @ packet',
    '> 8.2...xAB',
    '> COMM STATUS: PARTIAL',
    '> DECRYPT LOG: "requesting key for IP 192.168.1.41',
    '> - tracing route..."',
    '# 2025-05-17 14:39 UTC',
    '> SYSTEM WARNING :: *** ANOMALOUS ENCRYPTION',
    '> LAYER-6 DETECTED',
    '> attempting brute force ::: [ACCESS CODE',
    '> 48ET.. $?]',
    '> process suspended :: manual auth required',
];


// --- UI COMPONENTS ---

const PersonnelStatus: FC = () => (
    <Card className="h-full">
        <SectionTitle>Personnel Status</SectionTitle>
        <div className="flex justify-around text-center h-full items-center">
            <div>
                <p className="text-4xl text-white">48</p>
                <p className="text-xs text-[#777]">Detectives</p>
            </div>
             <div>
                <p className="text-4xl text-white">22</p>
                <p className="text-xs text-[#777]">Forensics</p>
            </div>
             <div>
                <p className="text-4xl text-white">120</p>
                <p className="text-xs text-[#777]">Patrol Units</p>
            </div>
        </div>
    </Card>
);

const RecentActivityLog: FC = () => (
    <Card className="h-full">
        <SectionTitle>Recent Activity Log</SectionTitle>
        <div className="text-xs space-y-3 text-[#ccc]">
            <p><span className="text-[#777]">09:29 : </span>Warrant issued for <span className="text-white">POI-004</span> in connection to case <span className="text-white">SF-2024-0812</span></p>
             <p><span className="text-[#777]">08:12 : </span>Forensics lab confirms DNA match for <span className="text-white">EVIDENCE-34B1</span></p>
             <p><span className="text-[#777]">22:55 : </span>Anonymous tip received regarding <span className="text-white">SF-2023-0105</span></p>
        </div>
    </Card>
);

const DigitalForensicsTerminal: FC = () => {
    const [log, setLog] = useState<string[]>([]);
    const lineIndex = useRef(0);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (lineIndex.current < forensicLog.length) {
                setLog(prev => [...prev, forensicLog[lineIndex.current]]);
                lineIndex.current++;
            } else {
                clearInterval(interval);
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [log]);


    return (
        <Card className="h-full flex flex-col">
            <SectionTitle>Digital Forensics Terminal</SectionTitle>
            <div className="relative w-full aspect-square mb-4">
                 <div className="absolute inset-0 border border-[#333] rounded-full"></div>
                 <div className="absolute inset-4 border border-[#333] rounded-full"></div>
                 <div className="absolute inset-8 border border-[#333] rounded-full"></div>
                 <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 opacity-20">
                    <path d="M50 0 A 50 50 0 0 1 100 50" stroke="white" strokeWidth="1" fill="none" strokeDasharray="2 4"/>
                    <path d="M50 0 A 50 50 0 0 0 0 50" stroke="white" strokeWidth="1" fill="none" strokeDasharray="2 4"/>
                 </svg>
            </div>
            <div ref={chatBoxRef} className="flex-grow bg-[#0A0A0A] p-2 text-xs font-mono overflow-y-auto border border-[#333]">
                {log.map((line, i) => (
                    <p key={i} className={line.startsWith('#') ? 'text-[#777]' : 'text-amber-400'}>{line}</p>
                ))}
                 <div className="w-2 h-3 bg-amber-400 animate-pulse"></div>
            </div>
        </Card>
    );
};

const SuspectsList: FC = () => (
    <Card className="h-full flex flex-col">
        <SectionTitle>Persons of Interest</SectionTitle>
        <div className="grid grid-cols-2 text-xs font-bold text-[#777] border-b border-[#333] pb-2 mb-2">
            <p>ID / ALIAS</p>
            <p>STATUS</p>
        </div>
        <div className="flex-grow overflow-y-auto pr-2">
            {suspects.map((suspect, i) => (
                <div key={suspect.id} className={`grid grid-cols-2 text-sm py-1.5 ${i % 2 === 0 ? 'bg-[#181818]' : ''}`}>
                    <p className="text-[#ccc]">{suspect.name}</p>
                    <p className="text-cyan-300">{suspect.status}</p>
                </div>
            ))}
        </div>
    </Card>
);

const CaseLoadOverview: FC = () => (
    <Card className="h-full flex flex-col">
        <SectionTitle>Case Load Overview (YTD)</SectionTitle>
        <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#777' }} axisLine={{ stroke: '#333' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#777' }} axisLine={{ stroke: '#333' }} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                    <Line type="monotone" dataKey="pv" name="Closed" stroke="#555" strokeDasharray="3 3" dot={false} />
                    <Line type="monotone" dataKey="uv" name="New" stroke="#E0E0E0" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </Card>
);

const CaseStatistics: FC = () => {
    const Stat: FC<{ title: string, value: number, color: string }> = ({ title, value, color }) => (
        <div className="flex justify-between items-baseline">
            <p className="text-sm text-[#ccc]">{title}</p>
            <p className={`text-2xl font-light ${color}`}>{value}</p>
        </div>
    );
    
    return (
    <Card className="h-full">
        <SectionTitle>Case Statistics</SectionTitle>
        <div className="grid grid-cols-2 gap-8 h-full">
            <div className="border-r border-[#333] pr-4">
                <h3 className="text-green-400 font-bold mb-4">> Cases by Type</h3>
                <div className="space-y-3">
                    <Stat title="Homicide" value={24} color="text-white" />
                    <Stat title="Robbery" value={129} color="text-white" />
                    <Stat title="Theft" value={340} color="text-white" />
                </div>
            </div>
            <div>
                 <h3 className="text-yellow-400 font-bold mb-4">> Cases by Status</h3>
                <div className="space-y-3">
                    <Stat title="Active" value={88} color="text-white" />
                    <Stat title="Cold Cases" value={210} color="text-white" />
                    <Stat title="Closed" value={195} color="text-white" />
                </div>
            </div>
        </div>
    </Card>
)};

const DataOverviewPage: FC = () => (
    <div className="w-full h-full p-4 grid grid-cols-12 grid-rows-10 gap-4">
        <div className="col-span-4 row-span-2"><PersonnelStatus /></div>
        <div className="col-span-5 row-span-2"><RecentActivityLog /></div>
        <div className="col-span-3 row-span-10"><DigitalForensicsTerminal /></div>
        
        <div className="col-span-3 row-span-8"><SuspectsList /></div>
        <div className="col-span-6 row-span-5"><CaseLoadOverview /></div>
        <div className="col-span-6 row-span-3"><CaseStatistics /></div>
    </div>
);

export default DataOverviewPage;