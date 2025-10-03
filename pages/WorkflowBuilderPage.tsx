import React, { FC, useState } from 'react';
import { Card, SectionTitle } from '../components/common';
import { DnaIcon, FileTextIcon, UsersIcon, SearchIcon, GavelIcon, GlobeIcon, BellIcon } from '../components/Icons';
import { WorkflowBlock, CanvasNode } from '../types';

// --- MOCK DATA ---
const blocks: WorkflowBlock[] = [
    { id: 1, name: 'Analyze DNA', category: 'Analysis', icon: DnaIcon },
    { id: 2, name: 'Review Case File', category: 'Intel', icon: FileTextIcon },
    { id: 3, name: 'Interview Witness', category: 'Field Work', icon: UsersIcon },
    { id: 4, name: 'Background Check', category: 'Intel', icon: SearchIcon },
    { id: 5, name: 'Request Warrant', category: 'Legal', icon: GavelIcon },
    { id: 6, name: 'Track Geodata', category: 'Analysis', icon: GlobeIcon },
    { id: 7, name: 'Send Notification', category: 'Field Work', icon: BellIcon },
];

const initialNodes: CanvasNode[] = [
    { id: 'node-1', blockId: 2, x: 50, y: 150, title: 'REVIEW CASE FILE', status: 'complete', connections: ['node-2'] },
    { id: 'node-2', blockId: 3, x: 300, y: 150, title: 'INTERVIEW WITNESS', status: 'active', connections: ['node-3', 'node-4'] },
    { id: 'node-3', blockId: 1, x: 550, y: 50, title: 'ANALYZE DNA', status: 'pending', connections: [] },
    { id: 'node-4', blockId: 4, x: 550, y: 250, title: 'BACKGROUND CHECK', status: 'pending', connections: ['node-5'] },
    { id: 'node-5', blockId: 5, x: 800, y: 250, title: 'REQUEST WARRANT', status: 'pending', connections: [] },
];


// --- UI COMPONENTS ---

const Toolbox: FC = () => {
    const categories = ['Analysis', 'Intel', 'Field Work', 'Legal'];
    
    return (
        <div className="h-full bg-[#101010] border-r border-[#333] p-4 flex flex-col">
            <SectionTitle>Toolbox</SectionTitle>
            <div className="flex-grow overflow-y-auto pr-2">
                {categories.map(cat => (
                    <div key={cat} className="mb-6">
                        <h3 className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">{cat}</h3>
                        <div className="grid grid-cols-2 gap-2">
                        {blocks.filter(b => b.category === cat).map(block => (
                            <div key={block.id} className="bg-[#181818] border border-[#333] p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#222]">
                                <block.icon className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-xs text-gray-300">{block.name}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Canvas: FC = () => {
    const [nodes, setNodes] = useState(initialNodes);
    
    const getNodeStatusColor = (status: CanvasNode['status']) => {
        if(status === 'complete') return 'border-green-500 text-green-500';
        if(status === 'active') return 'border-yellow-500 text-yellow-500 animate-pulse';
        return 'border-gray-600 text-gray-600';
    }

    const getConnectorStatusColor = (fromNode: CanvasNode) => {
        if(fromNode.status === 'complete') return 'stroke-green-500';
        if(fromNode.status === 'active') return 'stroke-yellow-500';
        return 'stroke-gray-600';
    }
    
    return (
        <div className="relative h-full w-full bg-[#0A0A0A] bg-grid-pattern overflow-hidden">
             <svg className="absolute inset-0 w-full h-full" strokeDasharray="5 5">
                {nodes.map(fromNode => {
                    return fromNode.connections.map(toId => {
                        const toNode = nodes.find(n => n.id === toId);
                        if (!toNode) return null;
                        const startX = fromNode.x + 180; // middle right of node
                        const startY = fromNode.y + 30; // middle of node
                        const endX = toNode.x; // middle left of node
                        const endY = toNode.y + 30; // middle of node
                        const c1X = startX + 50;
                        const c1Y = startY;
                        const c2X = endX - 50;
                        const c2Y = endY;

                        return (
                            <path
                                key={`${fromNode.id}-${toNode.id}`}
                                d={`M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${endX} ${endY}`}
                                strokeWidth="1"
                                fill="none"
                                className={getConnectorStatusColor(fromNode)}
                            />
                        )
                    })
                })}
            </svg>
            {nodes.map(node => {
                const block = blocks.find(b => b.id === node.blockId);
                if (!block) return null;
                return (
                    <div
                        key={node.id}
                        className="absolute w-48 h-16 bg-[#181818] border-2 flex items-center p-3"
                        style={{ left: node.x, top: node.y,
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5), 0 4px 6px -2px rgba(0,0,0,0.5)'
                         }}
                    >
                        <div className={`w-12 h-12 flex-shrink-0 border-r-2 mr-3 flex items-center justify-center ${getNodeStatusColor(node.status)}`}>
                             <block.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">
                                {node.status === 'active' ? 'IN PROGRESS' : `STATUS: ${node.status.toUpperCase()}`}
                            </p>
                            <p className="text-sm font-bold text-gray-200">{node.title}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};


const WorkflowBuilderPage: FC = () => (
    <div className="w-full h-full flex flex-col bg-[#0A0A0A]">
        <header className="flex-shrink-0 h-16 flex justify-between items-center border-b border-[#333] px-4">
            <div>
                <p className="text-xs text-gray-500">WORKFLOW TEMPLATE / HOMICIDE</p>
                <p className="text-lg text-gray-200">Standard Investigation Procedure</p>
            </div>
            <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-[#333] hover:bg-[#222]">CANCEL</button>
                <button className="px-4 py-2 text-sm bg-green-600 text-white border border-green-600 hover:bg-green-700">SAVE</button>
            </div>
        </header>
        <div className="flex-grow flex">
            <div className="w-80 flex-shrink-0">
                <Toolbox />
            </div>
            <div className="flex-grow">
                <Canvas />
            </div>
        </div>
    </div>
);

export default WorkflowBuilderPage;