'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full backdrop-blur-md bg-black/30 border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform shadow-lg">
                    <span className="text-3xl">🐝</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  Hive
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white transition font-medium">Features</a>
                <a href="#community" className="text-gray-300 hover:text-white transition font-medium">Community</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition font-medium">Pricing</a>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/login')}
                  className="px-6 py-2.5 text-white hover:text-yellow-400 transition font-semibold"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-semibold backdrop-blur-sm">
                  🎉 Join 1M+ neighbors worldwide
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                  Your Neighborhood,
                </span>
                <br />
                <span className="text-white">Reimagined</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Connect with neighbors, trade skills, save money, and build the community you've always wanted.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <button
                  onClick={() => router.push('/signup')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl font-bold text-lg text-black shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transform hover:scale-105 transition-all"
                >
                  <span className="relative z-10">Start Free Today</span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition blur"></div>
                </button>
                
                <button
                  onClick={() => router.push('/login')}
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl font-bold text-lg text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  Watch Demo →
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">1M+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">50K+</div>
                  <div className="text-gray-400 text-sm">Communities</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">$2M+</div>
                  <div className="text-gray-400 text-sm">Money Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent mb-2">10K+</div>
                  <div className="text-gray-400 text-sm">Skills Shared</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-400">
                All the tools to build your dream neighborhood
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{ height: '500px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 transition-transform group-hover:scale-110 duration-700"></div>
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div>
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-4xl">🎓</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Skill Trading
                    </h3>
                    <p className="text-gray-200 text-lg leading-relaxed">
                      Learn guitar, get help with coding, or teach yoga. Exchange skills without spending a dime.
                    </p>
                  </div>
                  
                  <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Start Trading</span>
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {hoveredCard === 1 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent animate-pulse"></div>
                )}
              </div>

              {/* Card 2 */}
              <div
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{ height: '500px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 transition-transform group-hover:scale-110 duration-700"></div>
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div>
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-4xl">💰</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Group Buying
                    </h3>
                    <p className="text-gray-200 text-lg leading-relaxed">
                      Pool your buying power with neighbors and unlock massive discounts on everyday items.
                    </p>
                  </div>
                  
                  <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Browse Deals</span>
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {hoveredCard === 2 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/50 to-transparent animate-pulse"></div>
                )}
              </div>

              {/* Card 3 */}
              <div
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{ height: '500px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 transition-transform group-hover:scale-110 duration-700"></div>
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div>
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-4xl">🎉</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Local Events
                    </h3>
                    <p className="text-gray-200 text-lg leading-relaxed">
                      Join block parties, book clubs, sports leagues, and more. Make real friendships.
                    </p>
                  </div>
                  
                  <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Find Events</span>
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {hoveredCard === 3 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-16">
                <h2 className="text-5xl font-black text-black mb-6">
                  Ready to Transform Your Neighborhood?
                </h2>
                <p className="text-xl text-black/80 mb-8">
                  Join thousands of communities already thriving on Hive
                </p>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-10 py-5 bg-black text-white rounded-2xl font-bold text-xl hover:bg-gray-900 transform hover:scale-105 transition-all shadow-2xl"
                >
                  Get Started Free →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>&copy; 2025 Hive. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
