 const getColorClasses = (color, isActive) => {
    const colorMap = {
      red: {
        bg: isActive ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-700/50',
        icon: isActive ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500',
        border: isActive ? 'border-red-200 dark:border-red-800' : 'border-gray-200 dark:border-gray-600'
      },
      blue: {
        bg: isActive ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-700/50',
        icon: isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500',
        border: isActive ? 'border-blue-200 dark:border-blue-800' : 'border-gray-200 dark:border-gray-600'
      },
      green: {
        bg: isActive ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700/50',
        icon: isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500',
        border: isActive ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-600'
      },
      purple: {
        bg: isActive ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-700/50',
        icon: isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-500',
        border: isActive ? 'border-purple-200 dark:border-purple-800' : 'border-gray-200 dark:border-gray-600'
      },
      yellow: {
        bg: isActive ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gray-50 dark:bg-gray-700/50',
        icon: isActive ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400 dark:text-gray-500',
        border: isActive ? 'border-yellow-200 dark:border-yellow-800' : 'border-gray-200 dark:border-gray-600'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  export default getColorClasses;