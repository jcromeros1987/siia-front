import React from 'react';

export function RevistasTab() {
  const publicaciones = [
    {
      titulo: "COMPUTER METHODS AND PROGRAMS IN BIOMEDICINE",
      pais: "Irlanda",
      año: "2021"
    },
    {
      titulo: "DATABASE–THE JOURNAL OF BIOLOGICAL DATABASES AND CURATION",
      pais: "Reino Unido",
      año: "2018"
    },
    {
      titulo: "Lecture Notes in Computer Science",
      pais: "Suiza",
      año: "2019"
    },
    {
      titulo: "Methods in Molecular Biology",
      pais: "Estados Unidos",
      año: "2022"
    },
    {
      titulo: "Nar Genomics And Bioinformatics",
      pais: "",
      año: "2024"
    },
    {
      titulo: "OPTICS, PHOTONICS, AND DIGITAL TECHNOLOGIES FOR IMAGING APPLICATIONS VIII",
      pais: "Estados Unidos",
      año: "2021"
    },
    {
      titulo: "SCIENTIFIC REPORTS",
      pais: "Reino Unido",
      año: "2024"
    }
  ];

  return (
    <div>
      <h4 className="text-xs text-[#082C3B] mb-3 uppercase tracking-wider">Publicaciones destacadas</h4>
      <ol className="space-y-4">
        {publicaciones.map((pub, index) => (
          <li key={index} className="text-sm pb-3 border-b border-gray-100 last:border-b-0">
            <p className="text-slate-800 font-medium">{pub.titulo}</p>
            <p className="text-xs text-[#082C3B] mt-1">
              {pub.pais && `${pub.pais} `}({pub.año})
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}