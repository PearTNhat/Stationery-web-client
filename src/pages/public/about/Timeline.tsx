import React from 'react';

interface TimelineItem {
  year: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <section className="py-12 container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Hành trình phát triển</h2>
      <div className="relative">
        <div className="absolute h-full w-1 bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-center mb-8 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className="w-1/2 px-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{item.year}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
            <div className="w-1/2"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;