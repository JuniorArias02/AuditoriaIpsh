// src/components/Dashboard.jsx
import React from 'react';
import { Header } from './components/Header';
import { AuditCardsContainer } from './components/AuditCardsContainer';
import { QuickActionsContainer } from './components/QuickActionsContainer';
import { AuditoriaRecientes } from './components/AuditoriaRecientes';
import { ResumenDiarioCards } from './components/ResumenDiarioCards';
import MetricaCalidad from './components/MetricaCalidad';
import AdministracionSistemas from './components/AdministracionSistemas';

export function Dashboard() {
	return (
		<>
			<main className="max-w-8xl mx-auto p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
				<Header />
				<AuditCardsContainer />
				<div className="pt-2"></div>
				<QuickActionsContainer />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<AuditoriaRecientes />
					<MetricaCalidad />
				</div>
				<ResumenDiarioCards />
				<AdministracionSistemas />
			</main>
		</>
	);
}