'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    skills: 24,
    connections: 47,
    saved: 127,
    rating: 4.9
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🐝</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Hive
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => router.push('/home')}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => router.push('/skills')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Skills
              </button>
              <button
                onClick={() => router.push('/deals')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Deals
              </button>
              <button
                onClick={() => router.push('/events')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Events
              </button>
              <button
                onClick={() => router.push('/community')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Community
              </button>
              <button
                onClick={() => router.push('/discover')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Discover
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </div>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2">
                    <button
                      onClick={() => router.push('/profile')}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => router.push('/settings')}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                    >
                      Settings
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.first_name || 'Friend'}! 👋
          </h1>
          <p className="text-xl text-blue-100">Here's what's happening in your neighborhood</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition cursor-pointer">
              <div className="text-3xl mb-2">🎓</div>
              <div className="text-3xl font-bold">{stats.skills}</div>
              <div className="text-sm text-blue-100">Skills</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition cursor-pointer">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-3xl font-bold">{stats.connections}</div>
              <div className="text-sm text-blue-100">Connections</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition cursor-pointer">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-3xl font-bold">${stats.saved}</div>
              <div className="text-sm text-blue-100">Saved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition cursor-pointer">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-3xl font-bold">{stats.rating}</div>
              <div className="text-sm text-blue-100">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Access</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div
            onClick={() => router.push('/skills')}
            className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer h-80"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-end p-8 transform group-hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-3xl font-bold text-white mb-3">Skills</h3>
              <p className="text-white/90 mb-4">Trade skills with neighbors</p>
              <div className="flex items-center text-white font-semibold">
                <span>Explore</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          <div
            onClick={() => router.push('/deals')}
            className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer h-80"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-end p-8 transform group-hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-3xl font-bold text-white mb-3">Deals</h3>
              <p className="text-white/90 mb-4">Save money together</p>
              <div className="flex items-center text-white font-semibold">
                <span>Browse</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          <div
            onClick={() => router.push('/events')}
            className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer h-80"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-end p-8 transform group-hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-white mb-3">Events</h3>
              <p className="text-white/90 mb-4">Join local gatherings</p>
              <div className="flex items-center text-white font-semibold">
                <span>Find</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* More Links */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div
            onClick={() => router.push('/community')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🏘️</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Community Feed</h3>
                <p className="text-gray-600">See what's happening</p>
              </div>
            </div>
          </div>

          <div
            onClick={() => router.push('/discover')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🔍</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Discover</h3>
                <p className="text-gray-600">Find neighbors near you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
