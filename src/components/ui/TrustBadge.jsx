import React from 'react';

export const TrustBadge = ({ icon: Icon, title, description }) => (
  <div className="bg-beige-card p-5 rounded-md border-l-4 border-gold shadow-card hover:shadow-hover transition-all duration-300 flex items-start gap-4">
    {Icon && (
      <div className="text-gold p-2 bg-cream rounded-full border border-gold-pale flex-shrink-0">
        <Icon size={22} className="stroke-[1.5]" />
      </div>
    )}
    <div>
      <h4 className="font-display font-bold text-lg text-brown-deep mb-1">{title}</h4>
      <p className="text-brown-mid text-sm leading-relaxed font-body">{description}</p>
    </div>
  </div>
);
export default TrustBadge;
