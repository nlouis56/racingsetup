import { Setup } from '@/utils/types'
import { useState } from 'react'

type ShareModalProps = {
  setup: Setup
  onClose: () => void
}

export default function ShareModal({ setup, onClose }: ShareModalProps) {
  const shareLink = `${window.location.origin}/setup/${setup.id}`
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-6 bg-white rounded shadow-lg relative">
        <h2 className="text-xl font-bold">Share Setup</h2>
        <p className="mt-4">Copy this link to share the setup:</p>

        <div className="flex items-center mt-4">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
          />

          <button
            className={`ml-2 px-4 py-2 text-sm text-white rounded ${
              copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <button
          className="mt-6 px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
