import React from 'react';

interface Partner {
  id: number;
  logoUrl: string;
  name: string;
}

interface PartnersProps {
  partners: Partner[];
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Đối tác</h2>
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {partners.map((partner) => (
              <img
                key={partner.id}
                src={partner.logoUrl}
                alt={partner.name}
                className="h-16 mx-4 object-contain"
              />
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((partner) => (
              <img
                key={`duplicate-${partner.id}`}
                src={partner.logoUrl}
                alt={partner.name}
                className="h-16 mx-4 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;