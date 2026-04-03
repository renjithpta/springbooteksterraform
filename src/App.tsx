import React, { useState, useEffect } from 'react';
import { 
  User, 
  Cloud, 
  MapPin, 
  Plus, 
  LogOut, 
  Shield, 
  Users, 
  Thermometer, 
  Wind,
  Search,
  LayoutDashboard,
  Settings,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface UserData {
  id: number;
  name: string;
  email: string;
  location: string;
}

interface WeatherData {
  location: string;
  temperature: string;
  condition: string;
  timestamp: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [users, setUsers] = useState<UserData[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  
  // New User Form
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const fetchWeather = async (location: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather/${encodeURIComponent(location)}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error('Failed to fetch weather', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Hint: admin / admin123');
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, email: newEmail, location: newLocation })
      });
      if (res.ok) {
        fetchUsers();
        setShowAddModal(false);
        setNewName('');
        setNewEmail('');
        setNewLocation('');
      }
    } catch (err) {
      console.error('Failed to add user', err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-500/10 rounded-full">
              <Shield className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">EKS Cloud Portal</h1>
          <p className="text-slate-400 text-center mb-8">Sign in to manage your microservices</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            {loginError && (
              <p className="text-red-400 text-sm text-center">{loginError}</p>
            )}
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
            >
              Access Dashboard
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center">
              AWS EKS • Spring Boot • Service Mesh • Postgres RDS
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">CloudOps</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-blue-600/10 text-blue-400 rounded-lg font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:bg-slate-800 rounded-lg transition-all">
            <Users size={20} /> User Service
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:bg-slate-800 rounded-lg transition-all">
            <Cloud size={20} /> Weather Service
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:bg-slate-800 rounded-lg transition-all">
            <Settings size={20} /> Infrastructure
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">System Overview</h2>
              <p className="text-slate-400 mt-1">Monitoring EKS cluster and microservices health</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-lg shadow-blue-900/20"
            >
              <Plus size={20} /> New User
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Service Card */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Users className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-lg">User Service</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20 uppercase tracking-wider">
                  Healthy
                </span>
              </div>
              <div className="p-0">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-800/30 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-800/20 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-medium text-slate-300">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-white">{user.name}</div>
                              <div className="text-xs text-slate-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-300">
                            <MapPin size={14} className="text-slate-500" />
                            {user.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => fetchWeather(user.location)}
                            className="text-blue-400 hover:text-blue-300 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all"
                          >
                            Check Weather
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weather Service Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Cloud className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-lg">Weather Service</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full border border-blue-500/20 uppercase tracking-wider">
                  Active
                </span>
              </div>
              <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto" />
                      <p className="text-slate-400 text-sm">Querying microservice...</p>
                    </motion.div>
                  ) : weather ? (
                    <motion.div 
                      key="data"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full space-y-6"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-5xl font-black text-white mb-2">{weather.temperature}</div>
                        <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs">
                          <Cloud size={16} /> {weather.condition}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                          <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Location</div>
                          <div className="text-sm font-medium text-white truncate">{weather.location}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                          <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Humidity</div>
                          <div className="text-sm font-medium text-white">42%</div>
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-slate-500">
                        Last updated: {new Date(weather.timestamp).toLocaleTimeString()}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/50 rounded-full inline-block">
                        <MapPin className="w-8 h-8 text-slate-600" />
                      </div>
                      <p className="text-slate-400 text-sm max-w-[200px]">
                        Select a user to view their local weather conditions
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Infrastructure Health */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'EKS Cluster', status: 'Running', icon: Shield, color: 'text-blue-500' },
              { label: 'RDS Postgres', status: 'Connected', icon: Settings, color: 'text-emerald-500' },
              { label: 'App Mesh', status: 'Active', icon: Wind, color: 'text-purple-500' },
              { label: 'API Gateway', status: 'Online', icon: Bell, color: 'text-orange-500' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                <div className={`p-2 bg-slate-800 rounded-lg ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</div>
                  <div className="text-sm font-semibold text-white">{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6">Register New User</h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Location</label>
                  <input 
                    required
                    type="text" 
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="San Francisco"
                  />
                </div>
                <div className="flex gap-3 mt-8">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
