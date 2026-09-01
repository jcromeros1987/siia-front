import React from 'react';
import ProfileHeader from './ProfileHeader';
import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import FormationList from './FormationList';
import ProfessionalTrayectoria from './ProfessionalTrayectoria';
import AchievementsList from './AchievementsList';
import PublicationsList from './PublicationsList';
import ChapterList from './ChaptersList';
import LanguagesList from './LanguagesList';
import TechDevelopments from './TechDevelopments';
import IntellectualProperty from './IntellectualProperty';
import TaughtCourses from './TaughtCourses';
import CongressParticipation from './CongressParticipation';
import ContinuingEducation from './ContinuingEducation';
import Evaluations from './Evaluations';
import AcademicStays from './AcademicStays';
import ProjectsList from './ProjectsList';

const hasItems = (items) => Array.isArray(items) && items.length > 0;

export default function ProfileView({ perfil = {} }) {
  return (
    <div className="w-full mx-auto p-6 space-y-8">
      <ProfileHeader data={perfil} />
      <div className="border-t border-gray-200"></div>
      <PersonalInfo data={perfil} />
      <ContactInfo data={perfil} />
      <div className="border-t border-gray-200"></div>
      {hasItems(perfil.formacion) && <FormationList items={perfil.formacion} />}
      {hasItems(perfil.trayectoria_profesional) && (
        <ProfessionalTrayectoria items={perfil.trayectoria_profesional} />
      )}
      {hasItems(perfil.proyectos_investigacion) && (
        <ProjectsList items={perfil.proyectos_investigacion} />
      )}
      {hasItems(perfil.publicaciones_cientificas) && (
        <PublicationsList items={perfil.publicaciones_cientificas} />
      )}
      {hasItems(perfil.capitulos_cientificos) && (
        <ChapterList items={perfil.capitulos_cientificos} />
      )}
      {hasItems(perfil.desarrollos_tecnologicos) && (
        <TechDevelopments items={perfil.desarrollos_tecnologicos} />
      )}
      {hasItems(perfil.propiedad_intelectual) && (
        <IntellectualProperty items={perfil.propiedad_intelectual} />
      )}
      {hasItems(perfil.cursos_impartidos) && (
        <TaughtCourses items={perfil.cursos_impartidos} />
      )}
      {hasItems(perfil.participacion_congresos) && (
        <CongressParticipation items={perfil.participacion_congresos} />
      )}
      {hasItems(perfil.formacion_continua) && (
        <ContinuingEducation items={perfil.formacion_continua} />
      )}
      {hasItems(perfil.evaluaciones) && <Evaluations items={perfil.evaluaciones} />}
      {hasItems(perfil.estancias) && <AcademicStays items={perfil.estancias} />}
      {hasItems(perfil.logros) && <AchievementsList items={perfil.logros} />}
      {hasItems(perfil.idiomas) && <LanguagesList items={perfil.idiomas} />}
    </div>
  );
}
