export function getGreeting() {
	const hour = new Date().getHours();
  
	if (hour >= 5 && hour < 12) return "Buenos días";
	if (hour >= 12 && hour < 18) return "Buenas tardes";
	return "Buenas noches";
  }
  