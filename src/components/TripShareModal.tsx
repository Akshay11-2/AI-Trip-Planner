import React, { useState } from 'react';
import { X, Share2, Copy, Mail, Globe, Lock, Users, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TripShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  tripName: string;
  isPublic: boolean;
  onUpdateVisibility: (isPublic: boolean) => void;
}

export default function TripShareModal({ 
  isOpen, 
  onClose, 
  tripId, 
  tripName, 
  isPublic, 
  onUpdateVisibility 
}: TripShareModalProps) {
  const [shareEmail, setShareEmail] = useState('');
  const [permission, setPermission] = useState<'view' | 'edit'>('view');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/trip/${tripId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShareByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user exists
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', shareEmail)
        .single();

      if (!profiles) {
        alert('User not found. They need to create an account first.');
        return;
      }

      // Create share record
      const { error } = await supabase
        .from('trip_shares')
        .insert({
          trip_id: tripId,
          shared_by: (await supabase.auth.getUser()).data.user!.id,
          shared_with: profiles.id,
          permission
        });

      if (error) throw error;

      setShareSuccess(true);
      setShareEmail('');
      setTimeout(() => setShareSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error sharing trip:', err);
      alert('Failed to share trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVisibilityToggle = async () => {
    try {
      const { error } = await supabase
        .from('trips')
        .update({ is_public: !isPublic })
        .eq('id', tripId);

      if (error) throw error;
      onUpdateVisibility(!isPublic);
    } catch (err) {
      console.error('Error updating trip visibility:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Share2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Trip</h2>
          <p className="text-gray-600">Share "{tripName}" with others</p>
        </div>

        {/* Public/Private Toggle */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isPublic ? (
                <Globe className="h-6 w-6 text-green-600" />
              ) : (
                <Lock className="h-6 w-6 text-gray-600" />
              )}
              <div>
                <h3 className="font-semibold text-gray-800">
                  {isPublic ? 'Public Trip' : 'Private Trip'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isPublic 
                    ? 'Anyone with the link can view this trip'
                    : 'Only you and people you share with can view this trip'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleVisibilityToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isPublic ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isPublic ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Copy Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share Link
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
            />
            <button
              onClick={handleCopyLink}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share by Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share with Specific People
          </label>
          
          {shareSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Trip shared successfully!</span>
            </div>
          )}

          <form onSubmit={handleShareByEmail} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setPermission('view')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  permission === 'view'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>View Only</span>
              </button>
              <button
                type="button"
                onClick={() => setPermission('edit')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  permission === 'edit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Share2 className="h-4 w-4" />
                <span>Can Edit</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !shareEmail}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Sharing...' : 'Share Trip'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}