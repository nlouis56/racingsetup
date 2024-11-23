import { Setup } from '@/utils/types';
import { useState } from 'react';

type EditModalProps = {
  setup: Setup;
  onClose: () => void;
  onSave: (updatedSetup: Setup) => void;
};

export default function EditModal({ setup, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<Setup>({ ...setup });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Retourne le setup modifié
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-6 bg-white rounded shadow-lg">
        <h2 className="text-xl font-bold">Edit Setup</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block mb-1 text-sm">Track Name</label>
            <input
              type="text"
              name="track" // Correspond à la propriété "track" de l'objet `Setup`
              value={formData.track}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">Setup Name</label>
            <input
              type="text"
              name="name" // Correspond à la propriété "name" de l'objet `Setup`
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Ajouter d'autres champs ici */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
