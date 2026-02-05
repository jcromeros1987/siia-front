// src/components/ProfileView/ProfileView.jsx
import React from 'react';
import PerfilHeader from './PerfilHeader';
import DataTabs from './DataTabs';

// Si los datos están en src/data/
import { publications } from './data/publications';
import { teaching }    from './data/teaching';

export default function ProfileView() {
  return (
    <div className="py-8 space-y-8">
      {/* Data Tabs con tablas y gráficos */}
      <DataTabs
        publications={publications}
        teaching={teaching}
      />
    </div>
  );
}
