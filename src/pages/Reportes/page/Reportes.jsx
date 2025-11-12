import React, { useState, useEffect } from 'react';
import GraficoTendencia from '../components/Reportes/GraficoTendencia';
import GraficoDimension from '../components/Reportes/GraficoDimension';
import GraficoServicios from '../components/Reportes/GraficoServicios';
import TopProfesionales from '../components/Reportes/TopProfesionales';
import CriteriosEvaluados from '../components/Reportes/CriteriosEvaluados';
import { AuditoriaServices } from '../../../api/services/auditoriaServices';
import ResumenAuditoria from '../components/Reportes/ResumenAuditoria';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Reportes() {
  const auditoriaServices = new AuditoriaServices();
  const [filtroFecha, setFiltroFecha] = useState('30');
  const [datos, setDatos] = useState({
    tendencia: [],
    por_dimension: [],
    por_servicio: [],
    top_profesionales: [],
  });

  const [datosResumen, setDatosResumen] = useState({
    auditorias: { actual: 0, variacion: 0 },
    cumplimiento_promedio: { actual: 0, variacion: 0 },
    profesionales: { actual: 0, variacion: 0 },
    auditorias_mes: { actual: 0, variacion: 0, anterior: 0 }

  });


  useEffect(() => {
    obtenerReportes();
    obtenerReportesResumen();
  }, [filtroFecha]);

  const obtenerReportes = async () => {
    try {
      const res = await auditoriaServices.obtenerReportesAuditorias();
      console.log(res);
      setDatos(res.data);

    } catch (error) {
      console.error("Error obteniendo reportes:", error);
    }
  };

  const obtenerReportesResumen = async () => {
    try {
      const res = await auditoriaServices.obtenerResumenMensual(filtroFecha);
      console.log(res);
      setDatosResumen(res.data);
    } catch (error) {
      console.error("Error obteniendo reportes:", error);
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* FILTRO */}
      <div className="flex justify-end mb-6">
        <select
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="30">Último mes</option>
          <option value="60">Últimos 3 meses</option>
          <option value="90">Últimos 6 meses</option>
          <option value="180">Último año</option>
        </select>
      </div>

      <ResumenAuditoria data={datosResumen} />

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GraficoTendencia data={datos.tendencia} />
        <GraficoDimension data={datos.por_dimension} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GraficoServicios data={datos.por_servicio} />
        <TopProfesionales data={datos.top_profesionales} />
      </div>

      {/* <CriteriosEvaluados /> */}
    </div>
  );
}

export default Reportes;
