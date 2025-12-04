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


  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

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
    if (!fechaInicio || !fechaFin) return;
    obtenerReportes();
    obtenerReportesResumen();
  }, [fechaInicio, fechaFin]);

  const obtenerReportes = async () => {
    try {
      const res = await auditoriaServices.obtenerReportesAuditorias({
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      });

      setDatos(res.data);
    } catch (error) {
      console.error("Error obteniendo reportes:", error);
    }
  };


  const obtenerReportesResumen = async () => {
    try {
      const res = await auditoriaServices.obtenerResumenMensual({
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      });

      setDatosResumen(res.data);
    } catch (error) {
      console.error("Error obteniendo resumen:", error);
    }
  };

  return (
    <div className="p-6 space-y-10">

      {/* 🔥 FILTROS DE FECHA */}
      <div className="flex items-center gap-4 mb-6">

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Fecha inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Fecha fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm"
          />
        </div>

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

    </div>
  );
}



export default Reportes;
