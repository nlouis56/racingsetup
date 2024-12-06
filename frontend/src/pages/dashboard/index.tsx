import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/components/Dashboard/Sidebar';
import SetupDetails from '@/components/Dashboard/SetupDetails';
import { Setup } from '@/utils/types';
import { FaBars } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import router from 'next/router';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [setups, setSetups] = useState<Setup[]>([]);
  const [selectedSetup, setSelectedSetup] = useState<Setup | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Initialisation des setups avec des données simulées
  useEffect(() => {
    const mockSetups: Setup[] = [
      {
        id: 1,
        name: 'Rainy Day Setup',
        track: 'Silverstone',
        vehicle: {
          id: 1,
          name: 'GT3',
          type: 'track_car',
          description: 'High-performance GT3 racing car.',
        },
        user: {
          id: 1,
          displayName: 'John Doe',
          team: 'Rain Masters',
        },
        parameters: [],
        weather: 'Rainy',
        date: '2024-02-15',
        comments: 'Optimized for wet conditions.',
      },
    ];

    setSetups(mockSetups);
    setLoading(false);

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  // Gestion de la suppression d'un setup
  function handleDelete(setupId: number) {
    const toastId = 'delete-toast'; // ID unique pour les toasts de suppression
    toast.dismiss(toastId); // Supprime un éventuel toast actif avant d'en ajouter un nouveau
    toast.success('Setup deleted successfully!', { toastId });
  
    setSetups((prevSetups) =>
      prevSetups.filter((setup) => setup.id !== setupId)
    );
    setSelectedSetup(null);
  }
  
  function handleEdit(updatedSetup: Setup) {
    const toastId = 'edit-toast'; // ID unique pour les toasts de modification
    toast.dismiss(toastId); // Supprime un éventuel toast actif avant d'en ajouter un nouveau
    toast.info('Setup updated successfully!', { toastId });
  
    setSetups((prevSetups) =>
      prevSetups.map((setup) =>
        setup.id === updatedSetup.id ? updatedSetup : setup
      )
    );
    setSelectedSetup(updatedSetup);
  }
  

  // Filtrage des setups en fonction de la recherche
  const filteredSetups = setups.filter((setup) =>
    setup.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 shadow-md">
        <h1 className="text-lg font-bold">Racing Setup</h1>
        <button
          className="md:hidden p-2 bg-blue-600 rounded"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={20} />
        </button>
        <Navbar />
      </header>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden h-screen">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out w-64 md:relative md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar
            setups={filteredSetups}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSetup={selectedSetup}
            onSelectSetup={setSelectedSetup}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <SetupDetails
            setup={selectedSetup}
            isEditable={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {/* ToastContainer pour les pop-ups */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable
        closeButton
        theme="light"
      />
    </div>
  );
}
