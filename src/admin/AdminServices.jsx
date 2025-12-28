import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Check } from 'lucide-react';

const AdminServices = () => {
    // ১. ডামি ডাটা (শুরুতে দেখানোর জন্য)
    const [services, setServices] = useState([
        { id: 1, name: "Web Development", price: "$500", desc: "MERN Stack website development" },
        { id: 2, name: "App Development", price: "$800", desc: "Android & iOS app using React Native" },
        { id: 3, name: "UI/UX Design", price: "$300", desc: "Modern user interface design" },
    ]);

    // ২. স্টেট ম্যানেজমেন্ট (ফর্ম এবং মডালের জন্য)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState({ id: null, name: '', price: '', desc: '' });
    const [isEditing, setIsEditing] = useState(false);

    // ৩. ইনপুট হ্যান্ডেল করা
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentService({ ...currentService, [name]: value });
    };

    // ৪. সার্ভিস অ্যাড অথবা আপডেট করা
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            // এডিট মুড
            setServices(services.map(service => (service.id === currentService.id ? currentService : service)));
        } else {
            // অ্যাড মুড
            setServices([...services, { ...currentService, id: Date.now() }]);
        }
        closeModal();
    };

    // ৫. এডিট বাটন ক্লিক করলে
    const handleEdit = (service) => {
        setCurrentService(service);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // ৬. ডিলিট করা
    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this service?")) {
            setServices(services.filter(service => service.id !== id));
        }
    };

    // ৭. মডাল ওপেন/ক্লোজ
    const openModal = () => {
        setCurrentService({ id: null, name: '', price: '', desc: '' });
        setIsEditing(false);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* --- Header Section --- */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Services</h2>
                <button 
                    onClick={openModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <Plus size={18} /> Add New Service
                </button>
            </div>

            {/* --- Search Bar (Optional UI) --- */}
            <div className="mb-6 relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search services..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-blue-500"
                />
            </div>

            {/* --- Services Table --- */}
            <div className="bg-white rounded-xl shadow border overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                        <tr>
                            <th className="p-4">Service Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Description</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <tr key={service.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium text-gray-800">{service.name}</td>
                                    <td className="p-4 text-green-600 font-bold">{service.price}</td>
                                    <td className="p-4 text-gray-500 text-sm truncate max-w-xs">{service.desc}</td>
                                    <td className="p-4 flex justify-center gap-3">
                                        <button 
                                            onClick={() => handleEdit(service)} 
                                            className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(service.id)} 
                                            className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-6 text-center text-gray-500">No services found. Add one!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- Modal (Pop-up Form) --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl relative animate-fadeIn">
                        <button 
                            onClick={closeModal} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>
                        
                        <h3 className="text-xl font-bold mb-4">
                            {isEditing ? 'Edit Service' : 'Add New Service'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={currentService.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border p-2 rounded focus:outline-blue-500" 
                                    placeholder="e.g. Graphic Design"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <input 
                                    type="text" 
                                    name="price"
                                    value={currentService.price}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border p-2 rounded focus:outline-blue-500" 
                                    placeholder="e.g. $100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    name="desc"
                                    value={currentService.desc}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full border p-2 rounded focus:outline-blue-500" 
                                    placeholder="Service details..."
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center gap-2"
                            >
                                <Check size={18} /> {isEditing ? 'Update Service' : 'Save Service'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminServices;