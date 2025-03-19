import { Link, useLocation } from 'react-router-dom';

export default function SideMenu() {
  const location = useLocation();
  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/graph', name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 bg-[#232f3e]">
        <h2 className="text-white font-semibold text-lg">Menu</h2>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all transform hover:scale-105 ${
              location.pathname === item.path
                ? 'bg-[#ff9900] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#ff9900]'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={item.icon}
              />
            </svg>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="text-sm text-gray-300">
          {/* <p className="font-medium">Need Help?</p>
          <p className="mt-1 text-gray-400">Contact support</p> */}
        </div>
      </div>
    </div>
  );
} 