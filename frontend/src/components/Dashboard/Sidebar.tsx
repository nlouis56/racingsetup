import SetupCard from './SetupCard'
import LoaderSkeleton from './LoaderSkeleton'
import { Setup } from '@/utils/types'

type SidebarProps = {
  setups: Setup[]
  loading: boolean
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedSetup: Setup | null
  onSelectSetup: (setup: Setup) => void
}

export default function Sidebar({
  setups,
  loading,
  searchQuery,
  setSearchQuery,
  selectedSetup,
  onSelectSetup,
}: SidebarProps) {
  return (
    <aside className="w-64 p-4 bg-gray-800 text-white border-r border-gray-700">
      <h2 className="mb-4 text-xl font-bold">Your Setups</h2>
    
      {/* Barre de recherche */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search setups..."
        className="w-full px-3 py-2 mb-4 text-sm text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    
      {/* Loader ou liste */}
      {loading ? (
        <LoaderSkeleton count={3} />
      ) : (
        <div className="space-y-4 mt-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)', scrollbarWidth: 'none' }}>
          {setups.map((setup) => (
            <SetupCard
              key={setup.id}
              setup={setup}
              isSelected={selectedSetup?.id === setup.id}
              onSelect={onSelectSetup}
            />
          ))}
        </div>
      )}
    </aside>

  )
}
