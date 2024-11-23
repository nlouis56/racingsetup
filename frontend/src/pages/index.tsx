import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Racing Setup</h1>
          <p className="mt-4 text-gray-600">
            An easy-to-use setup sharing and archiving system for racers. Create setups,
            track changes, and share with your team!
          </p>
          <div className="mt-6">
            <a
              href="/register"
              className="px-6 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
