import React from 'react';
export default function Publicaciones() {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-blue-700">Firmas</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            {["Ledesma L.", "Ledesma, Leonardo", "Ledesma-Dominguez L."].map(firma => (
              <span key={firma} className="bg-gray-100 px-2 py-1 rounded">{firma}</span>
            ))}
          </div>
        </div>
  
        <div>
          <h3 className="font-semibold text-blue-700">IDs SCOPUS</h3>
          <ul className="list-disc list-inside text-sm">
            <li>58993330900</li>
            <li>57204166249</li>
          </ul>
        </div>
  
        <div>
          <h3 className="font-semibold text-blue-700">ORCID</h3>
          <p className="text-sm bg-green-50 px-3 py-1 inline-block rounded">
            0000-0002-5374-3954
          </p>
        </div>
      </div>
    );
  }
  