import React, { FC } from 'react';
import { CaseFile, Suspect } from '../types';
import { FingerprintIcon, WorldGlobe, WorldMap } from '../components/Icons';
import { Card, SectionTitle } from '../components/common';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- MOCK DATA ---
const caseFiles: CaseFile[] = [
  { caseNumber: "SF-2024-0815", crimeType: "Homicide", status: "Active", location: "Pier 39" },
  { caseNumber: "SF-2024-0814", crimeType: "Art Heist", status: "Active", location: "De Young Museum" },
  { caseNumber: "SF-2024-0722", crimeType: "Cybercrime", status: "Closed", location: "Financial District" },
  { caseNumber: "SF-2023-0105", crimeType: "Missing Person", status: "Cold Case", location: "Golden Gate Park" },
  { caseNumber: "SF-2024-0812", crimeType: "Armed Robbery", status: "Active", location: "Union Square" },
  { caseNumber: "SF-2024-0618", crimeType: "Arson", status: "Closed", location: "Dogpatch" },
  { caseNumber: "SF-2024-0530", crimeType: "Kidnapping", status: "Active", location: "Alcatraz Island" },
];

const barChartData = [
  { name: 'Mon', uv: 40 }, { name: 'Tue', uv: 30 }, { name: 'Wed', uv: 55 },
  { name: 'Thu', uv: 27 }, { name: 'Fri', uv: 68 }, { name: 'Sat', uv: 23 },
  { name: 'Sun', uv: 34 }, { name: 'Today', uv: 42 },
];


// --- UI COMPONENTS ---

const CaseBriefing: FC = () => (
    <Card className="flex flex-col h-full">
        <SectionTitle subtext="Summary of high-priority case">Case Briefing</SectionTitle>
        <div className="flex gap-4">
            <div className="w-24 h-24 border border-[#555] p-1">
                <div className="w-full h-full bg-[#222] flex items-center justify-center">
                    <FingerprintIcon />
                </div>
            </div>
            <div className="text-xs space-y-2 text-[#aaa]">
                <p>CASE SF-2024-0815</p>
                <p>> TYPE       : Homicide</p>
                <p>> LEAD       : DET. MILLER</p>
                <p>> FILED      : 28/07/2024</p>
            </div>
        </div>
    </Card>
);

const EvidenceStatus: FC = () => {
    return (
        <Card className="flex-grow">
            <h3 className="text-sm font-bold text-[#E0E0E0] mb-2">Evidence Status</h3>
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                    <p className="text-4xl font-light text-[#E0E0E0]">132</p>
                    <p className="text-xs text-[#777]">Total Items</p>
                </div>
                <div>
                    <p className="text-4xl font-light text-green-400">89</p>
                    <p className="text-xs text-[#777]">Analyzed</p>
                </div>
                <div>
                    <p className="text-4xl font-light text-yellow-400">43</p>
                    <p className="text-xs text-[#777]">Pending</p>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-orange-400 w-16">DNA</span>
                    <div className="flex-grow flex gap-1 h-3">
                        {[...Array(8)].map((_, i) => <div key={i} className="w-full bg-orange-400"></div>)}
                        {[...Array(4)].map((_, i) => <div key={i} className="w-full bg-[#333]"></div>)}
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-cyan-400 w-16">FIBER</span>
                    <div className="flex-grow flex gap-1 h-3">
                        {[...Array(6)].map((_, i) => <div key={i} className="w-full bg-cyan-400"></div>)}
                        {[...Array(6)].map((_, i) => <div key={i} className="w-full bg-[#333]"></div>)}
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-fuchsia-400 w-16">BALLISTICS</span>
                    <div className="flex-grow flex gap-1 h-3">
                        {[...Array(2)].map((_, i) => <div key={i} className="w-full bg-fuchsia-400"></div>)}
                        {[...Array(10)].map((_, i) => <div key={i} className="w-full bg-[#333]"></div>)}
                    </div>
                </div>
            </div>
        </Card>
    );
};

const PriorityAlert: FC = () => (
    <Card>
        <SectionTitle>Priority Alert</SectionTitle>
        <div className="w-full h-32 bg-[#0A0A0A] border border-[#333] flex items-center justify-center">
            <p className="text-xs text-[#666] whitespace-pre-wrap font-mono text-center">
{`   EVIDENCE-ID: 34B1..
   COORDS:
    37.8° N
    122.4° W
    ...
   POI-004
    SIGHTING
    CONFIRMED`}
            </p>
        </div>
    </Card>
);

const CaseFilesList: FC = () => {
    const getStatusColor = (status: CaseFile['status']) => {
        switch (status) {
            case 'Active': return 'border-red-500';
            case 'Cold Case': return 'border-blue-500';
            case 'Closed': return 'border-gray-500';
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <SectionTitle subtext="4 new cases in last 24 hours">Case Files ({caseFiles.length})</SectionTitle>
                <div className="flex text-xs border border-[#444]">
                    <button className="px-2 py-1 bg-[#444]">Active</button>
                    <button className="px-2 py-1">All</button>
                    <button className="px-2 py-1">Closed</button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                {caseFiles.map((file, index) => (
                    <div key={index} className={`bg-[#181818] p-3 border-l-2 ${getStatusColor(file.status)}`}>
                        <p className="text-xs text-[#777]">Case <span className="text-[#E0E0E0]">{file.caseNumber}</span> | Status: <span className="text-white">{file.status}</span></p>
                        <p className="text-sm text-[#ccc] my-1">{file.crimeType} @ {file.location}</p>
                        <div className="flex gap-2 mt-2">
                            <button className="text-xs bg-[#222] border border-[#444] px-3 py-1 hover:bg-[#333]">View Evidence</button>
                            <button className="text-xs bg-[#222] border border-[#444] px-3 py-1 hover:bg-[#333]">Assign Unit ></button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const CrimeHotspotMap: FC = () => (
    <Card className="h-full flex flex-col" noPadding>
        <div className="relative flex-grow flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <WorldGlobe />
            <div className="relative w-[500px] h-[250px]">
                <WorldMap />
            </div>

            <div className="absolute top-8 left-8 w-48 text-xs">
                 <p className="text-xl text-white font-bold">DOWNTOWN</p>
                 <p className="text-gray-400 mt-2">Spike in armed robberies reported in this district over the last 48 hours. Increased patrol presence advised.</p>
                 <div className="absolute -top-4 -left-4 w-40 h-24 border-2 border-red-500/50 rounded-full opacity-50 -z-10 animate-ping"></div>
            </div>
            <div className="absolute bottom-8 right-8 w-48 text-xs text-right">
                 <p className="text-xl text-white font-bold">BAY BRIDGE</p>
                 <p className="text-gray-400 mt-2">Vehicle matching description in Amber Alert was last seen heading east. Traffic cameras are being monitored.</p>
                 <div className="absolute -bottom-4 -right-4 w-40 h-24 border-2 border-yellow-500/50 rounded-full opacity-50 -z-10 animate-ping animation-delay-500"></div>
            </div>
        </div>
        <div className="h-32 border-t border-[#333] p-4">
            <SectionTitle subtext="City-wide incident reports last 7 days">Reported Incidents</SectionTitle>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#777' }} />
                    <Bar dataKey="uv" radius={[2, 2, 0, 0]}>
                        {barChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index > 4 ? '#A855F7' : '#6A6A6A'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </Card>
);

const CaseDashboardPage: FC = () => (
    <div className="w-full h-full p-4 grid grid-cols-12 grid-rows-6 gap-4">
        <div className="col-span-3 row-span-2">
            <CaseBriefing />
        </div>
        <div className="col-span-3 row-span-2">
            <EvidenceStatus />
        </div>
        <div className="col-span-3 row-span-2">
            <PriorityAlert />
        </div>
        <div className="col-span-6 row-span-6">
           <CrimeHotspotMap />
        </div>
        <div className="col-span-6 row-span-6">
            <CaseFilesList />
        </div>
    </div>
);

export default CaseDashboardPage;