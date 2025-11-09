import React from 'react';

interface HealthScoreIndicatorProps {
  score: number; // 0-100
}

const HealthScoreIndicator: React.FC<HealthScoreIndicatorProps> = ({ score }) => {
  const getColor = () => {
    if (score > 80) return 'bg-green-500';
    if (score > 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center" title={`Health Score: ${score}/100`}>
      <div className="w-20 h-2 bg-gray-200 rounded-full">
        <div
          className={`h-2 rounded-full ${getColor()}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <span className="ml-2 text-sm font-semibold text-gray-700">{score}</span>
    </div>
  );
};

export default HealthScoreIndicator;