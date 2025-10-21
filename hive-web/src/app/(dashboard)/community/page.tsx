'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default function CommunityPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    setLoading(true);
    try {
      await apiClient.post('/posts', {
        content: newPost,
        type: 'post'
      });
      
      setNewPost('');
      await fetchPosts();
    } catch (error: any) {
      console.error('Failed to create post:', error);
      alert(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: number) => {
    try {
      await apiClient.post(`/posts/${postId}/like`);
      await fetchPosts();
    } catch (error) {
      console.error('Failed to like post:', error);
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
              <button onClick={() => router.push('/community')} className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg">Community</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🏘️ Community Feed</h1>

        {/* Create Post */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <form onSubmit={handleCreatePost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's happening in your neighborhood?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            <div className="flex justify-end mt-4">
              <button 
                type="submit"
                disabled={loading || !newPost.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {post.first_name?.[0]}{post.last_name?.[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{post.first_name} {post.last_name}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()} at {new Date(post.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

                  <div className="flex items-center space-x-6 text-gray-500">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 hover:text-red-500 transition"
                    >
                      <span>❤️</span>
                      <span>{post.likes_count || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-500 transition">
                      <span>💬</span>
                      <span>{post.comments_count || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-green-500 transition">
                      <span>🔄</span>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏘️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Be the first to share something!</p>
          </div>
        )}
      </div>
    </div>
  );
}
