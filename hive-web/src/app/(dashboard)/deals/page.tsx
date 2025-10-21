'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default function DealsPage() {
  const router = useRouter();
  const [deals, setDeals] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    product: '',
    original_price: '',
    group_price: '',
    minimum_people: '',
    deadline: '',
    category: ''
  });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await apiClient.get('/deals');
      setDeals(response.data);
    } catch (error) {
      console.error('Failed to fetch deals:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post('/deals', {
        ...formData,
        original_price: parseFloat(formData.original_price),
        group_price: parseFloat(formData.group_price),
        minimum_people: parseInt(formData.minimum_people)
      });
      
      setFormData({
        title: '',
        description: '',
        product: '',
        original_price: '',
        group_price: '',
        minimum_people: '',
        deadline: '',
        category: ''
      });
      
      setShowModal(false);
      await fetchDeals();
      alert('Deal created successfully!');
    } catch (error: any) {
      console.error('Failed to create deal:', error);
      alert(error.response?.data?.message || 'Failed to create deal');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinDeal = async (dealId: number) => {
    try {
      await apiClient.post(`/deals/${dealId}/join`);
      await fetchDeals();
      alert('Successfully joined deal!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to join deal');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center cursor-pointer" onClick={() => router.push('/home')}>
                <span className="text-2xl">🐝</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <button onClick={() => router.push('/home')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Home</button>
              <button onClick={() => router.push('/skills')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Skills</button>
              <button onClick={() => router.push('/deals')} className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg">Deals</button>
              <button onClick={() => router.push('/events')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Events</button>
              <button onClick={() => router.push('/community')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Community</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">💰 Group Deals</h1>
              <p className="text-xl text-green-100">Save money by buying together</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:shadow-lg transition"
            >
              + Create Deal
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-green-600">{deals.length}</div>
            <div className="text-gray-600">Active Deals</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-blue-600">$2.5K</div>
            <div className="text-gray-600">Total Savings</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-purple-600">127</div>
            <div className="text-gray-600">Participants</div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <span className="text-6xl">🛒</span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {deal.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {deal.current_people || 0}/{deal.minimum_people} joined
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{deal.description}</p>

                <div className="flex items-end space-x-2 mb-4">
                  <div className="text-3xl font-black text-green-600">
                    ${deal.group_price}
                  </div>
                  <div className="text-lg text-gray-400 line-through mb-1">
                    ${deal.original_price}
                  </div>
                  <div className="text-sm font-bold text-green-600 mb-1">
                    {Math.round((1 - deal.group_price / deal.original_price) * 100)}% OFF
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(((deal.current_people || 0) / deal.minimum_people) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  onClick={() => handleJoinDeal(deal.id)}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition"
                >
                  Join Deal
                </button>
              </div>
            </div>
          ))}
        </div>

        {deals.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No deals available</h3>
            <p className="text-gray-600 mb-6">Be the first to create a deal!</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Create Deal
            </button>
          </div>
        )}
      </div>

      {/* Create Deal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full my-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6">Create Group Deal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deal Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Bulk Organic Produce"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  placeholder="What are you buying?"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the deal..."
                  rows={3}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.original_price}
                    onChange={(e) => setFormData({...formData, original_price: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.group_price}
                    onChange={(e) => setFormData({...formData, group_price: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum People</label>
                <input
                  type="number"
                  value={formData.minimum_people}
                  onChange={(e) => setFormData({...formData, minimum_people: e.target.value})}
                  placeholder="How many people needed?"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Household">Household</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Services">Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Deal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
