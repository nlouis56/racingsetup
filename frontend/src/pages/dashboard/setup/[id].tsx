// src/pages/setup/[id].tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SetupDetails from '@/components/Dashboard/SetupDetails';
import { Setup } from '@/utils/types';

export default function SharedSetupPage() {
  const router = useRouter();
  const { id } = router.query;

  const [setup, setSetup] = useState<Setup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Attend que `id` soit défini

    const mockSetups: Setup[] = [
      {
        id: 1,
        name: 'Monaco Setup',
        user: {
          id: 1,
          displayName: 'John Doe',
          team: 'Rain Masters',
        },
        track: 'Monaco Circuit',
        vehicle: {
          id: 1,
          name: 'Formula 1',
          type: 'open_wheel',
          description: 'High-speed circuit setup.',
        },
        parameters: [
          {
            section: 'Front Right',
            settings: [
              { name: 'Tire Pressure', value: '1.1 Bar' },
              { name: 'Camber Angle', value: '-1.5°' },
            ],
          },
        ],
        weather: 'Sunny',
        date: '2024-01-01',
        comments: 'Tight turns, ensure downforce is optimal.',
      },
      {
        id: 2,
        name: 'Silverstone Setup',
        user: {
          id: 2,
          displayName: 'Jane Smith',
          team: 'Speed Racers',
        },
        track: 'Silverstone',
        vehicle: {
          id: 2,
          name: 'GT3',
          type: 'track_car',
          description: 'GT3 setup optimized for rain.',
        },
        parameters: [
          {
            section: 'Rear Left',
            settings: [
              { name: 'Suspension Stiffness', value: 'Medium' },
              { name: 'Toe Angle', value: '0.5°' },
            ],
          },
        ],
        weather: 'Rainy',
        date: '2024-02-15',
        comments: 'Watch for aquaplaning.',
      },
      {
        id: 3,
        name: 'Spa Setup',
        user: {
          id: 3,
          displayName: 'Alice Johnson',
          team: 'Speed Demons',
        },
        track: 'Spa-Francorchamps',
        vehicle: {
          id: 3,
          name: 'Prototype',
          type: 'endurance',
          description: 'Endurance setup for Spa.',
        },
        parameters: [],
        weather: 'Cloudy',
        date: '2024-03-10',
        comments: 'Set up for high-speed corners.',
      },
    ];

    const selectedSetup = mockSetups.find((s) => s.id === Number(id));
    setSetup(selectedSetup || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!setup) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-red-500">Setup not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <SetupDetails setup={setup} isEditable={false} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </Layout>
  );
}
