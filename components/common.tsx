import React, { FC, ReactNode } from 'react';

export const Card: FC<{ children: ReactNode; className?: string; noPadding?: boolean }> = ({ children, className = '', noPadding = false }) => (
  <div className={`relative bg-[#101010] border border-[#333] ${noPadding ? '' : 'p-4'} ${className}`}>
    <div className="absolute top-[-1px] left-[-1px] w-4 h-4 border-t border-l border-[#777]"></div>
    <div className="absolute top-[-1px] right-[-1px] w-4 h-4 border-t border-r border-[#777]"></div>
    <div className="absolute bottom-[-1px] left-[-1px] w-4 h-4 border-b border-l border-[#777]"></div>
    <div className="absolute bottom-[-1px] right-[-1px] w-4 h-4 border-b border-r border-[#777]"></div>
    {children}
  </div>
);

export const SectionTitle: FC<{ children: ReactNode; subtext?: string, rightContent?: ReactNode }> = ({ children, subtext, rightContent }) => (
  <div className="mb-4 flex justify-between items-start">
    <div>
        <h2 className="text-sm font-bold tracking-widest text-[#E0E0E0] uppercase">{children}</h2>
        {subtext && <p className="text-xs text-[#777]">{subtext}</p>}
    </div>
    {rightContent && <div>{rightContent}</div>}
  </div>
);