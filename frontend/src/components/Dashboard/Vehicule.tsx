import { Vehicule } from "@/utils/types";

type VehiculeProps = {
  vehicule: Vehicule;
  isSelected: boolean;
  onSelect: (vehicule: Vehicule) => void;
};

export default function VehiculeCard({
  vehicule,
  isSelected,
  onSelect,
}: VehiculeProps) {
  return (
    <div
      onClick={() => onSelect(vehicule)}
      className={`cursor-pointer p-4 rounded-md shadow-md transition-all duration-200 ${
        isSelected
          ? "bg-blue-700 text-white border border-blue-500"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">{vehicule.name}</h3>
      <div className="text-sm">
        <p className="mb-1">
          <strong>Description:</strong> {vehicule.description}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-2">{vehicule.createdAt.toUTCString()}</p>
    </div>
  );
}