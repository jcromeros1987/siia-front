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

export default function ProfileView({ perfil = {} }) {
  return (
    <div className="w-full mx-auto p-6 space-y-8">
      <ProfileHeader data={perfil} />
      <div className="border-t border-gray-200"></div>
      <PersonalInfo data={perfil} />
      <ContactInfo data={perfil} />
      <div className="border-t border-gray-200"></div>
      <FormationList items={perfil.formacion} />
      <ProfessionalTrayectoria items={perfil.trayectoria_profesional} />
      <PublicationsList items={perfil.publicaciones_cientificas} />
      <ChapterList items={perfil.capitulos_cientificos} />
      <TechDevelopments items={perfil.desarrollos_tecnologicos} />
      <IntellectualProperty items={perfil.propiedad_intelectual} />
      <TaughtCourses items={perfil.cursos_impartidos} />
      <CongressParticipation items={perfil.participacion_congresos} />
      <ContinuingEducation items={perfil.formacion_continua} />
      <Evaluations items={perfil.evaluaciones} />
      <AcademicStays items={perfil.estancias} />
      <AchievementsList items={perfil.logros} />
      <LanguagesList items={perfil.idiomas} />
    </div>
  );
}