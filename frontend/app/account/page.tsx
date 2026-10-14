'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { usersApi, authApi } from '@/lib/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  country: string;
  timezone: string;
  isEmailVerified: boolean;
  createdAt: string;
}

const COUNTRIES = [
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'IN', name: 'India' },
  { code: 'SG', name: 'Singapore' },
];

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile form state
  const [profile, setProfile] = useState({ firstName: '', lastName: '', country: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password form state
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) { router.push('/login?redirect=/account'); return; }

    usersApi.getMe()
      .then(({ data }) => {
        setUser(data);
        setProfile({ firstName: data.firstName, lastName: data.lastName, country: data.country ?? 'GB' });
      })
      .catch(() => router.push('/login?redirect=/account'))
      .finally(() => setLoading(false));
  }, [router]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      const { data } = await usersApi.updateMe({
        firstName: profile.firstName,
        lastName: profile.lastName,
        country: profile.country,
      });
      setUser((u) => u ? { ...u, ...data } : u);
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err?.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setProfileSaving(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPwMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (passwords.newPassword.length < 8) {
      setPwMsg({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwords.newPassword)) {
      setPwMsg({ type: 'error', text: 'Password must contain uppercase, lowercase, and a number.' });
      return;
    }

    setPwSaving(true);
    try {
      await usersApi.updateMe({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPwMsg({ type: 'success', text: 'Password changed successfully.' });
    } catch (err: any) {
      setPwMsg({ type: 'error', text: err?.response?.data?.message || 'Failed to change password.' });
    } finally {
      setPwSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0d2233] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">Dashboard</Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium">Account Settings</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h1>
      <p className="text-gray-500 mb-8">Manage your profile and security settings.</p>

      {/* Account info bar */}
      <div className="card p-5 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0d2233] to-[#1a4a6e] flex items-center justify-center shrink-0">
          <span className="text-cyan-300 font-extrabold text-lg">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="badge badge-blue capitalize">{user.role.toLowerCase().replace('_', ' ')}</span>
          <span className="text-xs text-gray-400">
            Member since {new Date(user.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* ── Profile Details ── */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 mb-5 text-base">Profile Details</h2>
          <form onSubmit={saveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                <input
                  type="text"
                  required
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d2233]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input
                  type="text"
                  required
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d2233]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed. Contact support if you need to update it.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d2233]"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            {profileMsg && (
              <div className={`rounded-lg px-4 py-3 text-sm ${
                profileMsg.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {profileMsg.text}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={profileSaving}
                className="bg-[#0d2233] hover:bg-[#1a3a5c] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
              >
                {profileSaving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* ── Change Password ── */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 mb-1 text-base">Change Password</h2>
          <p className="text-sm text-gray-500 mb-5">Choose a strong password with at least 8 characters including uppercase, lowercase, and a number.</p>

          <form onSubmit={changePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
              <input
                type="password"
                required
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d2233]"
                placeholder="••••••••"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
                <input
                  type="password"
                  required
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d2233]"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm new password</label>
                <input
                  type="password"
                  required
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d2233]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {pwMsg && (
              <div className={`rounded-lg px-4 py-3 text-sm ${
                pwMsg.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {pwMsg.text}
              </div>
            )}

            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                Forgot your current password?
              </Link>
              <button
                type="submit"
                disabled={pwSaving}
                className="bg-[#0d2233] hover:bg-[#1a3a5c] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
              >
                {pwSaving ? 'Updating…' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>

        {/* ── Danger Zone ── */}
        <div className="card p-6 border-red-100">
          <h2 className="font-bold text-gray-900 mb-1 text-base">Account</h2>
          <p className="text-sm text-gray-500 mb-4">Need to delete your account or have a billing issue?</p>
          <a
            href="mailto:support@clinicalresearchnexus.co.uk?subject=Account%20Deletion%20Request"
            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Request account deletion →
          </a>
        </div>
      </div>
    </main>
  );
}
