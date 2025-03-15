import React from 'react';

interface Certificate {
  id: number;
  imageUrl: string;
  title: string;
}

interface CertificatesProps {
  certificates: Certificate[];
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Chứng nhận</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-center">{cert.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;