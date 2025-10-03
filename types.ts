import type { FC } from 'react';

export enum Page {
  CaseDashboard,
  DataOverview,
  InvestigationDashboard,
  WorkflowBuilder,
}

export interface CaseFile {
  caseNumber: string;
  crimeType: string;
  status: 'Active' | 'Cold Case' | 'Closed';
  location: string;
}

export interface Suspect {
    id: string;
    name: string;
    status: string;
}

// Types for Investigation Dashboard
export interface NetworkNode {
  id: string;
  label: string;
  type: 'suspect' | 'evidence' | 'location' | 'vehicle';
  x: number;
  y: number;
}

export interface NetworkEdge {
  from: string;
  to: string;
}

// Types for Workflow Builder
export interface WorkflowBlock {
  id: number;
  name: string;
  category: 'Analysis' | 'Field Work' | 'Legal' | 'Intel';
  icon: FC<{className?: string}>;
}

export interface CanvasNode {
  id: string;
  blockId: number;
  x: number;
  y: number;
  title: string;
  status: 'complete' | 'active' | 'pending';
  connections: string[];
}