import React, { useEffect, useState } from 'react';
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  Settings, 
  Search,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    fetch('https://backend.jswebdevs.com/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  const length = projects.length;

  const stats = [
    { title: "Total Projects", count: length, icon: <Briefcase size={24} />, color: "bg-blue-500" },
    { title: "Active Services", count: 8, icon: <Settings size={24} />, color: "bg-purple-500" },
    { title: "Team Members", count: 3, icon: <Users size={24} />, color: "bg-green-500" },
    { title: "Unread Messages", count: 15, icon: <MessageSquare size={24} />, color: "bg-orange-500" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans w-full dark:bg-gray-700">
      
      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Header */}
        <header className="bg-white dark:bg-gray-700 p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 w-64 relative border-1">
            <Search size={18} className="text-gray-500 dark:text-white absolute" />
            <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-full ms-5" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Overview</h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stat.count}</h3>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg text-white shadow-lg shadow-opacity-30`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Chat & Projects Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Project List (Takes up 2 columns) */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg mb-4">Recent Projects</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-gray-500 text-sm border-b">
                    <tr>
                      <th className="pb-3">Project Name</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Client</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 font-medium">E-commerce App</td>
                      <td className="py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Completed</span></td>
                      <td className="py-3">John Doe</td>
                    </tr>
                    <tr className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 font-medium">Portfolio Website</td>
                      <td className="py-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">In Progress</span></td>
                      <td className="py-3">Sarah Smith</td>
                    </tr>
                    <tr className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 font-medium">Admin Dashboard</td>
                      <td className="py-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Pending</span></td>
                      <td className="py-3">Tech Corp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chat Widget (Takes up 1 column) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-[400px]">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MessageSquare size={18} /> Team Chat
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 custom-scrollbar">
                <ChatMessage name="Alex" msg="Project update is ready." time="10:30 AM" isMe={false} />
                <ChatMessage name="You" msg="Great! Send me the link." time="10:32 AM" isMe={true} />
                <ChatMessage name="Sarah" msg="Design files uploaded." time="11:00 AM" isMe={false} />
              </div>

              <div className="mt-auto flex gap-2">
                <input type="text" placeholder="Type message..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500" />
                <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

// --- Helper Components ---



const ChatMessage = ({ name, msg, time, isMe }) => (
  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
      <p>{msg}</p>
    </div>
    <span className="text-xs text-gray-400 mt-1">{time}</span>
  </div>
);

export default AdminDashboard;