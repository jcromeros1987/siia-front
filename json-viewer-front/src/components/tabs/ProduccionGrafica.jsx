import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Line, ResponsiveContainer
  } from 'recharts';
  
  const dataGrafica = [
    { año: 2018, wos: 1, scopus: 1 },
    { año: 2019, wos: 1, scopus: 1 },
    { año: 2021, wos: 2, scopus: 2 },
    { año: 2022, wos: 0, scopus: 4 },
    { año: 2024, wos: 2, scopus: 2 }
  ];
  
  const publicaciones = [
    {
      titulo: "CDBProm: the Comprehensive Directory of Bacterial Promoters",
      autores: "Coautor: Ledesma-Dominguez L., Martínez G.S., Perez-Rueda E., Dutt M., et al.",
      año: 2024,
      revista: "Nar Genomics And Bioinformatics",
      fuente: "WoS-id: 001169137700001 · Scopus-id: 2-s2.0-85185968074",
      citasWos: 2,
      citasScopus: 2
    },
    {
      titulo: "DeepReg: a deep learning hybrid model...",
      autores: "1er autor: Ledesma-Dominguez L., Carbajal-Degante E., Perez-Rueda E.",
      año: 2024,
      revista: "SCIENTIFIC REPORTS",
      fuente: "WoS-id: 001207003700015 · Scopus-id: 2-s2.0-85190824879",
      citasWos: 2,
      citasScopus: 3
    },
    {
      titulo: "Prediction of DNA-Binding Transcription Factors...",
      autores: "1er autor: Ledesma L., Hernandez-Guerrero R., Perez-Rueda E.",
      año: 2022,
      revista: "Methods in Molecular Biology",
      fuente: "Scopus-id: 2-s2.0-85135500848",
      citasWos: 0,
      citasScopus: 4
    },
    {
      titulo: "Active Contours for Multi-Region Segmentation...",
      autores: "Coautor: Ledesma L., Carbajal-Degante E., Olveres J., et al.",
      año: 2021,
      revista: "OPTICS, PHOTONICS, AND DIGITAL TECHNOLOGIES...",
      fuente: "Scopus-id: 2-s2.0-85092726643",
      citasWos: 3,
      citasScopus: 3
    },
    {
      titulo: "A multiphase texture-based model...",
      autores: "Coautor: Ledesma, Leonardo, Carbajal-Degante, Erik, Olveres, Jimena, et al.",
      año: 2021,
      revista: "COMPUTER METHODS AND PROGRAMS IN BIOMEDICINE",
      fuente: "Scopus-id: 2-s2.0-85115395830",
      citasWos: 5,
      citasScopus: 5
    }
  ];
  
  export default function ProduccionGrafica() {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Documentos indexados (WoS y Scopus)</h3>
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataGrafica}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="año" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="wos" fill="#1d4ed8" name="WoS" />
                <Bar dataKey="scopus" fill="#3b82f6" name="Scopus" />
                <Line type="monotone" dataKey={(d) => d.wos + d.scopus} stroke="#06b6d4" name="Total" dot />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
  
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Lista de publicaciones</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-xl shadow">
              <thead className="bg-gray-100 text-slate-800">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2 text-left">Título</th>
                  <th className="p-2 text-left">Autores</th>
                  <th className="p-2">Año</th>
                  <th className="p-2">Revista</th>
                  <th className="p-2 text-left">Fuente</th>
                  <th className="p-2">WoS</th>
                  <th className="p-2">Scopus</th>
                </tr>
              </thead>
              <tbody>
                {publicaciones.map((pub, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 text-center">{i + 1}</td>
                    <td className="p-2">{pub.titulo}</td>
                    <td className="p-2">{pub.autores}</td>
                    <td className="p-2 text-center">{pub.año}</td>
                    <td className="p-2">{pub.revista}</td>
                    <td className="p-2 text-xs">{pub.fuente}</td>
                    <td className="p-2 text-center">{pub.citasWos}</td>
                    <td className="p-2 text-center">{pub.citasScopus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  