import React, { FC } from 'react';

// --- EXISTING ICONS ---

export const FingerprintIcon: FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M35,65 A15,15 0 1,1 50,80" stroke="#888" />
    <path d="M30,60 A20,20 0 1,1 50,80" stroke="#aaa" />
    <path d="M25,55 A25,25 0 1,1 50,80" stroke="#888" />
    <path d="M20,50 A30,30 0 1,1 50,80" stroke="#aaa" />
    <path d="M50,20 A30,30 0 0,1 80,50" stroke="#888" />
    <path d="M50,25 A25,25 0 0,1 75,50" stroke="#aaa" />
    <path d="M50,30 A20,20 0 0,1 70,50" stroke="#888" />
    <path d="M50,35 A15,15 0 0,1 65,50" stroke="#aaa" />
    <path d="M50,49 v-15" stroke="#666" />
    <path d="M40,55 A10,10 0 0,1 50,45" stroke="#666" />
  </svg>
);


export const WorldGlobe: FC = () => (
    <svg viewBox="0 0 1000 1000" className="w-full h-full absolute inset-0 opacity-50">
        <defs>
            <path id="globe" d="M500,1000A500,500 0 1,0 500,0a500,500 0 1,0 0,1000Z" />
            <clipPath id="clip"><use xlinkHref="#globe" /></clipPath>
        </defs>
        <use xlinkHref="#globe" fill="none" stroke="#444" strokeWidth="2" />
        <g clipPath="url(#clip)">
            {/* Longitude lines */}
            {[...Array(12)].map((_, i) => (
                <path
                    key={`lon-${i}`}
                    d={`M500,0V1000`}
                    transform={`rotate(${i * 15} 500 500)`}
                    stroke="#444" strokeWidth="1" />
            ))}
            {/* Latitude lines */}
            {[...Array(7)].map((_, i) => (
                <circle
                    key={`lat-${i}`}
                    cx="500"
                    cy="500"
                    r={((i + 1) * 500) / 8}
                    fill="none"
                    stroke="#444"
                    strokeWidth="1"
                />
            ))}
        </g>
    </svg>
);

export const WorldMap: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" className="w-full h-full absolute inset-0 opacity-80" fill="#333" stroke="#555">
    {/* Simplified world map path */}
    <path d="M499.9 428.1l-1-2.1-1.6-1-1.6.4-1.2.6-1 .9-1.3.4-1.2-.5-1.1-.9-1.2-1.3-.9-1.1-.7-1.4-.4-1.3v-1.2l.5-1 .7-1 .8-1.3.3-1.4-.2-1.2-.8-1.1-1-1-1.3-.6-1.4.1-1.3.7-1.2 1-1.2 1.3-1.1 1.4-1.1 1.3-.8 1.1-.6 1-.3 1 .1 1.2.6 1.1 1 1.1 1.1.8 1 .5 1 .1 1-.3.9-.7.8-1 .6-1.1.2-1.2-.3-1.2-.8-1.1-1.2-1-1.3-.6-1.4-.2-1.4.3-1.3.8-1.2 1.2-1.1 1.4-.8 1.5-.5 1.4-.1 1.3.4 1.2.8 1.1 1.1 1 1.3.7 1.4.4 1.4.1 1.3-.3.8-2 .9-2.3.1-2.6-.5-2.7-1.3-2.6-1.8-2.3-2.1-1.9-2.2-1.4-2.2-.8-2.1-.2-2 .4-1.8.9-1.6 1.3-1.4 1.7-1.1 1.9-.7 2-.3 2 .2 1.9.7 1.8 1.1 1.6 1.4 1.4 1.7 1.1 1.9.7 2 .3 2-.2 1.9-.7 1.8-1.1 1.6-1.4 1.4-1.7 1.1-1.9zm275.9-224.9c-2.8-.2-5.4.1-8.1.8-2.6.7-5.1 1.8-7.5 3.3-2.3 1.5-4.5 3.3-6.5 5.4-2 2.1-3.8 4.4-5.3 7-1.5 2.5-2.8 5.2-3.8 8-1 2.8-1.7 5.7-2.2 8.6-.5 3- G A Z I L L I O N S more path data... This is a placeholder for a real SVG path. z M363.3 123.1l-2.2-.1-2.1.2-2.1.5-1.9.8-1.7 1.1-1.5 1.3-1.3 1.5-1 1.6-.8 1.7-.6 1.7-.3 1.8-.1 1.8.2 1.7.4 1.7.7 1.6 1 1.5 1.2 1.4 1.5 1.2 1.7 1.1 1.9.9 2.1.7 2.2.5 2.3.2 2.4-.1 2.5-.3 2.5-.6 2.5-.9 2.4-1.2 2.3-1.5 2.2-1.8 2-2.1 1.8-2.3 1.6-2.5 1.3-2.7.9-2.8.5-2.9.1-3-.3-3-.7-2.9-1.1-2.8-1.5-2.6-1.9-2.4-2.3-2.1-2.6-1.8-2.8-1.5-3-.1z"/>
  </svg>
);


// --- NEW ICONS ---

export const GridIcon: FC<{className?: string}> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

export const LayoutIcon: FC<{className?: string}> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

export const TerminalIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);

export const WorkflowIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

export const SettingsIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

export const DnaIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.5A3.5 3.5 0 0 1 7.5 11H12"/><path d="M16.5 11A3.5 3.5 0 0 1 20 14.5"/>
        <path d="M12 11h4.5A3.5 3.5 0 0 0 20 7.5"/><path d="M4 7.5A3.5 3.5 0 0 0 7.5 11H12"/>
        <line x1="12" y1="11" x2="12" y2="22"/>
    </svg>
);

export const FileTextIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

export const UsersIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

export const SearchIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

export const GavelIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 10.5L6 19s-1.5 1.5-3 0-2-4 0-6l8.5-8.5c1.5-1.5 4-1.5 6 0 2 2 2 4.5 0 6z"></path>
        <path d="M12 12L6 18"></path><path d="m3 21 6-6"></path>
    </svg>
);

export const GlobeIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

export const BellIcon: FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);