'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Ultra-Modern Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all transform group-hover:rotate-12">
                  <span className="text-2xl">🐝</span>
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
                Hive
              </span>
            </div>

            {/* Center Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              <a href="#features" className="px-5 py-2 text-gray-700 hover:text-orange-600 font-semibold transition rounded-xl hover:bg-orange-50">
                Features
              </a>
              <a href="#how-it-works" className="px-5 py-2 text-gray-700 hover:text-orange-600 font-semibold transition rounded-xl hover:bg-orange-50">
                How It Works
              </a>
              <a href="#community" className="px-5 py-2 text-gray-700 hover:text-orange-600 font-semibold transition rounded-xl hover:bg-orange-50">
                Community
              </a>
              <a href="#pricing" className="px-5 py-2 text-gray-700 hover:text-orange-600 font-semibold transition rounded-xl hover:bg-orange-50">
                Pricing
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push('/login')}
                className="hidden sm:block px-6 py-2.5 text-gray-700 font-semibold hover:text-orange-600 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Absolutely Stunning */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50"></div>
        
        {/* Animated Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-gray-700">1M+ neighbors connected</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Your Dream
                </span>
                <br />
                <span className="text-gray-900">Neighborhood</span>
                <br />
                <span className="text-gray-900">Starts Here</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Connect with neighbors, exchange skills, save money through group buying, and build the vibrant community you've always wanted.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/signup')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Free Today
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button className="px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-bold text-lg text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-all">
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★★★★★</span>
                    </div>
                    <p className="text-sm text-gray-600 font-semibold">1000+ reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                  <div className="space-y-6">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Your Dashboard</h3>
                          <p className="text-sm text-gray-500">October 2025</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4">
                        <div className="text-3xl font-black text-blue-600">24</div>
                        <div className="text-sm text-blue-800 font-semibold">Skills Traded</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4">
                        <div className="text-3xl font-black text-green-600">$127</div>
                        <div className="text-sm text-green-800 font-semibold">Money Saved</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4">
                        <div className="text-3xl font-black text-purple-600">47</div>
                        <div className="text-sm text-purple-800 font-semibold">Connections</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4">
                        <div className="text-3xl font-black text-orange-600">4.9</div>
                        <div className="text-sm text-orange-800 font-semibold">Your Rating</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">New group deal available</p>
                          <p className="text-xs text-gray-500">Save 40% on organic produce</p>
                        </div>
                        <div className="text-green-500 font-bold text-sm">Join</div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">Sarah wants to trade skills</p>
                          <p className="text-xs text-gray-500">Yoga for guitar lessons</p>
                        </div>
                        <div className="text-blue-500 font-bold text-sm">View</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform">
                  <span className="text-5xl">🎓</span>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform">
                  <span className="text-5xl">💰</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Ultra Modern */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-orange-100 rounded-full text-orange-600 font-bold text-sm mb-4">
              FEATURES
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Thrive Together
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All the tools to build stronger connections and save money in your neighborhood
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-blue-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 rounded-3xl transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Skill Exchange</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Learn guitar, get coding help, or master a new language. Trade skills with neighbors without spending a cent.
                </p>
                <a href="#" className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-green-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 rounded-3xl transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Group Buying</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Pool your purchasing power with neighbors to unlock wholesale prices on groceries, supplies, and more.
                </p>
                <a href="#" className="inline-flex items-center text-green-600 font-semibold group-hover:text-green-700">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-purple-100">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-3xl transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Local Events</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Discover block parties, sports leagues, book clubs, and meetups. Make genuine friendships close to home.
                </p>
                <a href="#" className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-orange-100">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 rounded-3xl transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">🏘️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Neighborhood Hub</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Stay updated with community news, lost & found, recommendations, and important local announcements.
                </p>
                <a href="#" className="inline-flex items-center text-orange-600 font-semibold group-hover:text-orange-700">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-yellow-100">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/5 group-hover:to-orange-500/5 rounded-3xl transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Trust & Safety</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Verified profiles, ratings, and reviews ensure you connect with genuine neighbors you can trust.
                </p>
                <a href="#" className="inline-flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="group relative bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-teal-100">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 rounded-3xl transition-all"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Mobile App</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Stay connected on the go with our iOS and Android apps. Get instant notifications and chat with neighbors.
                </p>
                <a href="#" className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-700">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Ready to Transform Your
            <br />
            Neighborhood Experience?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join over 1 million neighbors who are already building stronger, more connected communities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push('/signup')}
              className="px-10 py-5 bg-white text-orange-600 rounded-2xl font-black text-lg shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all"
            >
              Start Free Today →
            </button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
              Watch Demo
            </button>
          </div>
          <p className="mt-6 text-white/80 text-sm">
            ✨ No credit card required • 🎉 Free forever for essential features
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">��</span>
                </div>
                <span className="text-xl font-bold">Hive</span>
              </div>
              <p className="text-gray-400">
                Building stronger neighborhoods, one connection at a time.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Hive. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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
