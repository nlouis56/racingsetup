// src/components/Dashboard/DeleteModal.tsx
import { Setup } from '@/utils/types'

type DeleteModalProps = {
  setup: Setup
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteModal({
  setup,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-6 bg-white rounded shadow-lg">
        <h2 className="text-xl font-bold">Confirm Delete</h2>
        <p className="mt-4">
          Are you sure you want to delete the setup &quot;{setup.name}&quot;?
        </p>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
