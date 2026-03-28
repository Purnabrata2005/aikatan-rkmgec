'use client'

import { ChevronDown, Landmark, MoreHorizontal, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
}

const menuItems: MenuItem[] = [
  { id: '1', name: 'Sponsors', icon: <Landmark size={16} className="text-yellow-500" />, url: '/#sponsors' },
  { id: '2', name: 'Teams', icon: <Users size={16} className="text-blue-400" />, url: '/teams' },
];

export const MoreDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-500 ease-out group hover:bg-stone-500/20 text-gray-300 hover:text-white"
      >
        <MoreHorizontal size={18} />
        <span>More</span>
        <ChevronDown size={14} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 rounded-xl bg-stone-800/90 backdrop-blur-lg shadow-lg ring-1 ring-black ring-opacity-5 p-2 z-50">
          <div className="space-y-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setIsOpen(false);
                  navigate.push(item.url);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-stone-700/50 transition-colors duration-200"
              >
                {item.icon}
                <div className="font-medium">{item.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};