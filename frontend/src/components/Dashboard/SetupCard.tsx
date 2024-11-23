import { Setup } from "@/utils/types"

type SetupCardProps = {
  setup: Setup
  isSelected: boolean
  onSelect: (setup: Setup) => void
}

export default function SetupCard({
  setup,
  isSelected,
  onSelect,
}: SetupCardProps) {
  return (
    <div
      onClick={() => onSelect(setup)}
      className={`cursor-pointer p-4 rounded-md shadow-md transition-all duration-200 ${
        isSelected
          ? 'bg-blue-700 text-white border border-blue-500'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">{setup.name}</h3>
      <div className="text-sm">
        <p className="mb-1">
          <strong>Track:</strong> {setup.track}
        </p>
        <p className="mb-1">
          <strong>Vehicle:</strong> {setup.vehicle.name}
        </p>
        <p>
          <strong>Weather:</strong> {setup.weather}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-2">{setup.date}</p>
    </div>
  )
}
