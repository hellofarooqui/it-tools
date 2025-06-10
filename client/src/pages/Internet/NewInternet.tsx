import React from 'react'



const defaultNewInternet: NewInternetType = {
  name: null,
  description: null,
  ipAddress: null,
  subnetMask: null,
  gateway: null,
  accountNumber: null,
  accountName: null,
  provider: null,
  bandwidth: 0,
  connectionType: null,
  accountUsername: null,
  accountPassword: null,
  supportContact: null,
  supportEmail: null,
  supportPhone: null
}

const NewInternet = () => {
    const [newInternet, setNewInternet] = React.useState<NewInternetType>(defaultNewInternet);
  return (
    <div>
        <form>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={newInternet.name || ''}
                    onChange={(e) => setNewInternet({ ...newInternet, name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={newInternet.description || ''}
                    onChange={(e) => setNewInternet({ ...newInternet, description: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            {/* Add more fields as needed */}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    </div>
  )
}

export default NewInternet