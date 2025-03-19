import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph() {
  const { preferences, updatePreferences } = useAuth();
  const [graphType, setGraphType] = useState(preferences.selectedGraphType);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMetric, setSelectedMetric] = useState<'sales' | 'inventory'>('sales');

  const years = Array.from({ length: 5 }, (_, i) => selectedYear - i);

  const getData = (year: number, metric: 'sales' | 'inventory') => {
    const datasets = {
      sales: {
        [selectedYear]: [12, 19, 3, 5, 2, 3, 8, 15, 9, 6, 4, 7],
        [selectedYear - 1]: [10, 15, 8, 12, 6, 9, 11, 13, 7, 5, 8, 10],
        [selectedYear - 2]: [8, 12, 5, 9, 4, 7, 10, 11, 6, 3, 5, 8],
        [selectedYear - 3]: [6, 9, 4, 7, 3, 5, 8, 10, 5, 2, 4, 6],
        [selectedYear - 4]: [5, 7, 3, 6, 2, 4, 7, 9, 4, 1, 3, 5],
      },
      inventory: {
        [selectedYear]: [100, 85, 90, 75, 80, 70, 65, 85, 95, 88, 92, 87],
        [selectedYear - 1]: [90, 80, 85, 70, 75, 65, 60, 80, 90, 83, 87, 82],
        [selectedYear - 2]: [85, 75, 80, 65, 70, 60, 55, 75, 85, 78, 82, 77],
        [selectedYear - 3]: [80, 70, 75, 60, 65, 55, 50, 70, 80, 73, 77, 72],
        [selectedYear - 4]: [75, 65, 70, 55, 60, 50, 45, 65, 75, 68, 72, 67],
      }
    };

    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: `${metric === 'sales' ? 'Sales' : 'Inventory'} Data ${year}`,
        data: datasets[metric][year],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  };

  useEffect(() => {
    updatePreferences({ lastVisitedMenu: 'graph' });
  }, []);

  const handleGraphTypeChange = (type: 'bar' | 'line') => {
    setGraphType(type);
    updatePreferences({ selectedGraphType: type });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
        <div className="flex gap-4">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as 'sales' | 'inventory')}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="sales">Buy</option>
            <option value="inventory">Inventory</option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={graphType}
            onChange={(e) => handleGraphTypeChange(e.target.value as 'bar' | 'line')}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="bar">Bar Graph</option>
            <option value="line">Line Graph</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        {graphType === 'bar' ? (
          <Bar 
            data={getData(selectedYear, selectedMetric)}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: selectedMetric === 'sales' ? 'Units Sold' : 'Units in Stock'
                  }
                }
              }
            }}
          />
        ) : (
          <Line 
            data={getData(selectedYear, selectedMetric)}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: selectedMetric === 'sales' ? 'Units Sold' : 'Units in Stock'
                  }
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
} 