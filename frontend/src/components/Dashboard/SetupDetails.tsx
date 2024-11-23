// src/components/Dashboard/SetupDetails.tsx
import { useState } from 'react'
import { Setup } from '@/utils/types'
import ShareModal from './ShareModal'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

type SetupDetailsProps = {
  setup: Setup | null
  isEditable: boolean
  onEdit: (updatedSetup: Setup) => void
  onDelete: (setupId: number) => void
}

export default function SetupDetails({
  setup,
  isEditable,
  onEdit,
  onDelete,
}: SetupDetailsProps) {
  const [isShareModalOpen, setShareModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)

  if (!setup) {
    return (
      <main className="flex-1 flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-600">Select a setup to view details.</p>
      </main>
    )
  }

  return (
    <main className="relative flex-1 p-6 bg-white overflow-y-auto rounded-lg shadow">
      {/* Header avec Boutons */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">{setup.name}</h2>
        {isEditable && (
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              onClick={() => setShareModalOpen(true)}
            >
              Share
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
              onClick={() => setEditModalOpen(true)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Informations Générales */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Track</h3>
          <p className="text-gray-600">{setup.track}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Vehicle</h3>
          <p className="text-gray-600">{setup.vehicle.name}</p>
          <p className="text-sm text-gray-500">{setup.vehicle.type}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Weather</h3>
          <p className="text-gray-600">{setup.weather}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Date</h3>
          <p className="text-gray-600">{setup.date}</p>
        </div>
      </section>

      {/* Paramètres */}
      <section className="bg-gray-100 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Setup Parameters</h3>
        <div className="space-y-6">
          {setup.parameters.map((section, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">{section.section}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.settings.map((setting, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <span className="text-sm text-gray-600">{setting.name}</span>
                    <span className="font-semibold text-gray-800">{setting.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      {isShareModalOpen && (
        <ShareModal setup={setup} onClose={() => setShareModalOpen(false)} />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setup={setup}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            onDelete(setup.id)
            setDeleteModalOpen(false)
          }}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          setup={setup}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedSetup) => {
            onEdit(updatedSetup)
            setEditModalOpen(false)
          }}
        />
      )}
    </main>
  )
}
    