import 'tailwindcss/tailwind.css'

export default function NewSetup() {
    return (
      <div className="flex justify-center min-h-screen bg-gray-100">
        <form className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Create a New Setup</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Name</label>
              <input
                type="text"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="e.g., Formula 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Track Name</label>
              <input
                type="text"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="e.g., Monaco Circuit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weather</label>
              <select className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md">
                <option>Sunny</option>
                <option>Rainy</option>
                <option>Cloudy</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save Setup
            </button>
          </div>
        </form>
      </div>
    )
  }
  