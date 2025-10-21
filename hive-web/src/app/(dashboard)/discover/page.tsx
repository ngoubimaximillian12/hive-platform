'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default function DiscoverPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>({
    users: [],
    skills: [],
    deals: [],
    events: []
  });
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    category: '',
    distance: '5',
    type: 'all'
  });

  useEffect(() => {
    if (searchQuery.length > 0) {
      performSearch();
    } else {
      fetchNearby();
    }
  }, [searchQuery, filters]);

  const performSearch = async () => {
    try {
      const response = await apiClient.get('/search', {
        params: {
          q: searchQuery,
          category: filters.category,
          type: filters.type
        }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const fetchNearby = async () => {
    try {
      const [users, skills, deals, events] = await Promise.all([
        apiClient.get('/users/nearby'),
        apiClient.get('/skills'),
        apiClient.get('/deals'),
        apiClient.get('/events')
      ]);

      setSearchResults({
        users: users.data.slice(0, 6) || [],
        skills: skills.data.slice(0, 6) || [],
        deals: deals.data.slice(0, 6) || [],
        events: events.data.slice(0, 6) || []
      });
    } catch (error) {
      console.error('Failed to fetch nearby:', error);
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
              <button onClick={() => router.push('/deals')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Deals</button>
              <button onClick={() => router.push('/events')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Events</button>
              <button onClick={() => router.push('/community')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Community</button>
              <button onClick={() => router.push('/discover')} className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">Discover</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🔍 Discover</h1>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search neighbors, skills, events, deals..."
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="flex space-x-4 mt-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Arts">Arts</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
              <option value="Food">Food</option>
            </select>

            <select
              value={filters.distance}
              onChange={(e) => setFilters({...filters, distance: e.target.value})}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="1">Within 1 mile</option>
              <option value="5">Within 5 miles</option>
              <option value="10">Within 10 miles</option>
              <option value="25">Within 25 miles</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Types</option>
              <option value="users">People</option>
              <option value="skills">Skills</option>
              <option value="deals">Deals</option>
              <option value="events">Events</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <div className="border-b">
            <div className="flex">
              {['all', 'users', 'skills', 'deals', 'events'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold capitalize ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                  {tab === 'all' ? ` (${Object.values(searchResults).flat().length})` : ` (${searchResults[tab]?.length || 0})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {/* Users */}
          {(activeTab === 'all' || activeTab === 'users') && searchResults.users?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">👥 People</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {searchResults.users.map((user: any) => (
                  <div key={user.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {user.first_name?.[0]}{user.last_name?.[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{user.first_name} {user.last_name}</h3>
                        <p className="text-sm text-gray-500">0.5 miles away</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm">{user.rating || '5.0'}</span>
                        </div>
                      </div>
                    </div>
                    {user.bio && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{user.bio}</p>}
                    <button 
                      onClick={() => router.push(`/messages?user=${user.id}`)}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {(activeTab === 'all' || activeTab === 'skills') && searchResults.skills?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎓 Skills</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {searchResults.skills.slice(0, 6).map((skill: any) => (
                  <div key={skill.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{skill.description}</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                        {skill.category}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deals */}
          {(activeTab === 'all' || activeTab === 'deals') && searchResults.deals?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💰 Deals</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {searchResults.deals.slice(0, 6).map((deal: any) => (
                  <div key={deal.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{deal.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{deal.description}</p>
                    <div className="flex items-end space-x-2">
                      <div className="text-2xl font-black text-green-600">${deal.group_price}</div>
                      <div className="text-gray-400 line-through mb-1">${deal.original_price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {(activeTab === 'all' || activeTab === 'events') && searchResults.events?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Events</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {searchResults.events.slice(0, 4).map((event: any) => (
                  <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {event.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(event.event_date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>📍 {event.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Trending Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">🔥 Trending Skills</h3>
            <ul className="space-y-2">
              <li>• Web Development</li>
              <li>• Cooking</li>
              <li>• Guitar Lessons</li>
              <li>• Yoga</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">💎 Best Deals</h3>
            <ul className="space-y-2">
              <li>• Organic Produce - 40% OFF</li>
              <li>• Bulk Paper Goods - 35% OFF</li>
              <li>• Local Honey - 50% OFF</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">📍 Nearby</h3>
            <p className="text-lg font-semibold mb-2">47 neighbors</p>
            <p className="text-sm opacity-90">within 1 mile</p>
          </div>
        </div>
      </div>
    </div>
  );
}
