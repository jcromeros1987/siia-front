import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LabelList,
} from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';

export function PublicationsChart({ citationData, colors }) {
  return (
    <div className="w-full h-[300px] mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={citationData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }} barSize={36}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="WoS" name="Citas WoS" fill={colors.WoS} radius={[4,4,0,0]}>  
            {citationData.map((_, i) => (<Cell key={i} fill={colors.WoS}/>))}
          </Bar>
          <Bar dataKey="Scopus" name="Citas Scopus" fill={colors.Scopus} radius={[4,4,0,0]}>  
            {citationData.map((_, i) => (<Cell key={i} fill={colors.Scopus}/>))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

PublicationsChart.propTypes = {
  citationData: PropTypes.array.isRequired,
  colors: PropTypes.shape({ WoS: PropTypes.string, Scopus: PropTypes.string }).isRequired,
};

export function TeachingChart({ teachChartData, color }) {
  return (
    <div className="w-full h-[300px] mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={teachChartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }} barSize={48}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="year" axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="count" name="Cursos" fill={color} radius={[4,4,0,0]}>  
            {teachChartData.map((_, i) => (<Cell key={i} fill={color}/>))}
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

TeachingChart.propTypes = {
  teachChartData: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
};

