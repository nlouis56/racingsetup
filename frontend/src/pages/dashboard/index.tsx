import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Setup, Vehicule } from '@/utils/types';
import 'tailwindcss/tailwind.css';
import Navbar from '@/components/Navbar';
import { backendUrl } from '@/data/callServer';
import { db } from '@/utils/db';
import { fetchWithOfflineSupport, syncOfflineRequests } from '@/utils/syncRequests';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicule[]>([]);
  const [setups, setSetups] = useState<Setup[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicule | null>(null);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [vehiculeType, setVehiculeType] = useState<string>("");

  const { register, handleSubmit, reset } = useForm<Vehicule>();
  const { register: setupRegister, handleSubmit: handleSetupSubmit, reset: resetSetup } = useForm<Setup>();

  useEffect(() => {
    if (navigator.onLine) {
      syncOfflineRequests();
    }
    window.addEventListener("online", syncOfflineRequests);
    return () => window.removeEventListener("online", syncOfflineRequests);
  }, []);

  // Add a new vehicle
  const addVehicle = async (data: Vehicule) => {

    const bodyData = {
      name: data.name,
      description: data.description,
      vehicleType: vehiculeType,
    };

    try {
      
    const token = localStorage.getItem('token');
    const response = await fetchWithOfflineSupport(`http://${backendUrl}/api/user/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error(responseData);
      alert('Failed to add vehicle. Please try again.');
      return;
    }

    const newVehicle = { id: responseData.vehicleId, name: data.name, description: data.description, createdAt: new Date() };
    setVehicles((prev) => [...prev, newVehicle]);
    await db.vehicles.put(newVehicle); // Save to IndexedDB
    setVehiculeType('');
    reset();
    setShowVehicleForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new setup
  const addSetup = async (data: Setup) => {

    const bodyData = {
      name: data.name,
      track: data.track,
      description: data.description,
      vehicleId: selectedVehicle!.id,
    };

    try {
    const response = await fetchWithOfflineSupport(`http://${backendUrl}/api/user/setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(bodyData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error(responseData);
      alert('Failed to add setup. Please try again.');
      return;
    }

    const newSetup = {
      ...data,
      id: responseData.id,
      vehicle: selectedVehicle!,
      createdAt: new Date(),
    };
    setSetups((prev) => [...prev, newSetup]);
    await db.setups.put(newSetup); // Save to IndexedDB
    resetSetup();
    setShowSetupForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter setups by the selected vehicle
  const getSetupsByVehicle = (vehicleId: number) => {
    return setups.filter((setup) => setup.vehicle.id === vehicleId);
  };

  const handleDeleteSetup = async (setup: Setup) => {
    const confirmDelete = confirm(`Are you sure you want to delete ${setup.name}?`);
    if (confirmDelete) {
      try {
      const response = await fetchWithOfflineSupport(`http://${backendUrl}/api/user/setup/${setup.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert('Failed to delete setup. Please try again.');
        return;
      }

      await db.setups.delete(setup.id); // Remove from IndexedDB
      setSetups(setups.filter((s) => s.id !== setup.id));
      } catch (error) {
        console.error(error);
        alert('Failed to delete setup. Please try again.');
        return;
      }
    }
  };

  const handleDeleteVehicle = async (vehicle: Vehicule) => {
    const confirmDelete = confirm(`Are you sure you want to delete ${vehicle.name}?`);
    if (confirmDelete) {
      try {
      const response = await fetchWithOfflineSupport(`http://${backendUrl}/api/user/vehicles/${vehicle.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert('Failed to delete vehicle. Please try again.');
        return;
      }

      setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
      await db.vehicles.delete(vehicle.id); // Remove from IndexedDB
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getAllVehicules = async () => {
    try {
    const response = await fetchWithOfflineSupport(`http://${backendUrl}/api/user/vehicles/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedData: Vehicule[] = data.map((vehicle: any) => {
      return {
        id: vehicle.vehicleId,
        name: vehicle.name,
        description: vehicle.description,
        createdAt: new Date(vehicle.createdAt),
      };
    });
    return parsedData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getAllSetups = async () => {
    try {
    const response = await fetchWithOfflineSupport(`http://${backendUrl}/api/user/setup/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return [];
    }

    return data;
    }
    catch (error) {
      console.error(error);
      return [];
    }
  };

  const downloadSetup = (setup: Setup) => {
    const setupData = {
      name: setup.name,
      track: setup.track,
      description: setup.description,
      createdAt: setup.createdAt,
      vehicle: {
        id: setup.vehicle.id,
        name: setup.vehicle.name,
      },
    };
    // Convert the setup data to a JSON Blob
    const jsonBlob = new Blob([JSON.stringify(setupData, null, 2)], { type: 'application/json' });

    // Generate a URL for the Blob and create a download link
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${setup.name.replace(/\s+/g, '_')}_setup.json`; // File name
    link.click();

    // Cleanup the object URL
    URL.revokeObjectURL(url);
  };

  const handleImportSetup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);

        // Validate JSON structure
        if (!data.name || !data.track || !data.description || !data.createdAt || !data.vehicle) {
          alert("Invalid file structure. Please provide a valid JSON file.");
          return;
        }

        // Check if the vehicle already exists
        let vehicle = vehicles.find((v) => v.id === data.vehicle.id);
        if (!vehicle) {
          // If the vehicle does not exist, create it
          vehicle = {
            id: data.vehicle.id,
            name: data.vehicle.name,
            description: "Imported vehicle", // Default description if not provided in the file
            createdAt: new Date(),
          };
        }
        setVehicles((prev) => [...prev, vehicle]);

        // Create the setup
        const newSetup = {
          id: Date.now(),
          name: data.name,
          track: data.track,
          description: data.description,
          createdAt: new Date(data.createdAt),
          vehicle,
          values: [], // Add default or appropriate values here
        };

        setSetups((prev) => [...prev, newSetup]);

        alert("Setup and associated vehicle imported successfully!");
      } catch (error) {
        console.error("Error parsing the JSON file:", error);
        alert("Failed to import setup. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const fetchFromCache = async () => {
      // Récupère les données depuis IndexedDB
      const cachedVehicles = await db.vehicles.toArray();
      const cachedSetups = await db.setups.toArray();
  
      if (cachedVehicles.length > 0) setVehicles(cachedVehicles);
      if (cachedSetups.length > 0) setSetups(cachedSetups);
  
      // Si online, synchronise les données depuis l'API
      if (navigator.onLine) {
        const apiVehicles = await getAllVehicules();
        setVehicles(apiVehicles);
        await db.vehicles.bulkPut(apiVehicles); // Met à jour IndexedDB
  
        const apiSetups = await getAllSetups();
        setSetups(apiSetups);
        await db.setups.bulkPut(apiSetups); // Met à jour IndexedDB
      }
    };
  
    fetchFromCache();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-80 bg-gray-800 text-white p-4 overflow-y-auto">
          {/* Add Vehicle and Import Setup Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              className="flex-1 bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => setShowVehicleForm(true)}
            >
              + Add Vehicle
            </button>
            <input
              type="file"
              accept="application/json"
              id="import-setup"
              className="hidden"
              onChange={handleImportSetup}
            />
            <label
              htmlFor="import-setup"
              className="flex-1 bg-green-500 text-center py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
            >
              Import Setup
            </label>
          </div>

          {/* Vehicle Form */}
          {showVehicleForm && (
            <div className="bg-gray-700 p-4 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-2">Add New Vehicle</h2>
              <form onSubmit={handleSubmit(addVehicle)} className="grid gap-2">
                <input
                  placeholder="Name"
                  {...register('name')}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-gray-200 bg-gray-800 placeholder-gray-400"
                  required
                />
                <textarea
                  placeholder="Description"
                  {...register('description')}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-gray-200 bg-gray-800 placeholder-gray-400"
                  required
                />
                  <label htmlFor="vehicle-type" className="block text-sm font-semibold text-gray-200 mb-2">
                    Select Vehicle Type:
                  </label>
                  <select
                    id="vehicle-type"
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-700"
                    defaultValue=""
                    required
                    onChange={(e) => setVehiculeType(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose a type
                    </option>
                    <option value="kart">Kart</option>
                    <option value="track_car">Track Car</option>
                    <option value="road_car">Road Car</option>
                    <option value="rally_car">Rally Car</option>
                  </select>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save Vehicle
                </button>
              </form>
            </div>
          )}

          {/* Vehicle Cards */}
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`bg-gray-700 p-4 rounded shadow-md ${
                  selectedVehicle?.id === vehicle.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                  <p className="text-sm text-gray-300">{vehicle.description}</p>
                  <p className="text-xs text-gray-500">
                    Created on {new Date(vehicle.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  className="bg-red-500 text-white text-sm mt-2 py-1 px-3 rounded hover:bg-red-600"
                  onClick={() => handleDeleteVehicle(vehicle) }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
          {selectedVehicle ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Setups for {selectedVehicle.name}
              </h2>

              {/* Button to open form to create a setup */}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
                onClick={() => setShowSetupForm(!showSetupForm)}
              >
                {showSetupForm ? 'Close Setup Form' : 'Create New Setup'}
              </button>

              {/* Setup Creation Form */}
              {showSetupForm && (
                <div className="bg-white p-4 rounded shadow-md mb-4">
                  <h3 className="text-lg font-semibold mb-2">Add New Setup</h3>
                  <form onSubmit={handleSetupSubmit(addSetup)} className="grid gap-2">
                    <input
                      placeholder="Setup Name"
                      {...setupRegister('name')}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      required
                    />
                    <input
                      placeholder="Track"
                      {...setupRegister('track')}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      required
                    />
                    <textarea
                      placeholder="Description"
                      {...setupRegister('description')}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Save Setup
                    </button>
                  </form>
                </div>
              )}

              {/* List of Setups */}
              {getSetupsByVehicle(selectedVehicle.id).length > 0 ? (
                <div className="grid gap-4">
                  {getSetupsByVehicle(selectedVehicle.id).map((setup) => (
                    <div
                      key={setup.id}
                      className="bg-white p-4 rounded shadow-md flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">{setup.name}</h3>
                        <p className="text-sm text-gray-500">Track: {setup.track}</p>
                        <p className="text-sm text-gray-500">
                          Created on {new Date(setup.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                          Open
                        </button>
                        <button
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                          onClick={() => downloadSetup(setup) }
                        >
                          Download
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handleDeleteSetup(setup) }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No setups found for this vehicle.</p>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center">
              Click on a vehicle to view and edit its setups.
            </p>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        racingsetup - 2024
      </footer>
    </div>
  );
};

export default Dashboard;
