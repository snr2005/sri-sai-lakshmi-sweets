import React from 'react';

export const DashboardCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gold-pale shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-brown-light uppercase tracking-wider font-body">
          {title}
        </span>
        <span className="text-3xl md:text-4xl font-display font-bold text-gold">
          {value}
        </span>
      </div>
      {Icon && (
        <div className="text-gold bg-gold-pale/35 p-3 rounded-lg border border-gold-pale">
          <Icon size={24} className="stroke-[1.5]" />
        </div>
      )}
    </div>
  );
};
export default DashboardCard;
