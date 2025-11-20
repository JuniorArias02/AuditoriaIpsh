import React, { useEffect, useState } from "react";
import { AuditCard } from "./AuditCard";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { AuditoriaServices } from "../../../api/services/auditoriaServices";

export function AuditCardsContainer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchInforme = async () => {
      try {
        const res = await AuditoriaServices.obtenerInformeAuditoria();
        setData(res);
      } catch (error) {
        console.error("Error al obtener informe de auditoría:", error);
      }
    };

    fetchInforme();
  }, []);

  if (!data) return <p className="text-gray-500 dark:text-gray-400">Cargando métricas...</p>;

  const metrics = [
    {
      title: "Auditorías Totales",
      value: data.total_auditorias,
      description: "Auditorías completadas",
      icon: <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: "border-blue-500 dark:border-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Satisfactorias",
      value: data.mayores_95,
      description: "> 95% cumplimiento",
      icon: <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />,
      color: "border-green-500 dark:border-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Aceptables",
      value: data.entre_85_94,
      description: "85-94% cumplimiento",
      icon: <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      color: "border-amber-500 dark:border-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Inaceptables",
      value: data.menores_85,
      description: "< 85% cumplimiento",
      icon: <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />,
      color: "border-red-500 dark:border-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <AuditCard
          key={index}
          title={metric.title}
          value={metric.value}
          description={metric.description}
          icon={metric.icon}
          color={metric.color}
          bgColor={metric.bgColor}
        />
      ))}
    </div>
  );
}