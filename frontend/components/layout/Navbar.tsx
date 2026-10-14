'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Logo from './Logo';
import CartIcon from '@/components/cart/CartIcon';
import MyCoursesMenu from '@/components/course/MyCoursesMenu';

const ABOUT_LINKS = [
  { href: '/about',   label: 'About Us',    desc: 'Our mission and team' },
  { href: '/contact', label: 'Contact Us',  desc: 'Get in touch with us' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [aboutOpen, setAboutOpen]     = useState(false);
  const [user, setUser]               = useState<{ firstName: string; role: string } | null>(null);
  const [mounted, setMounted]         = useState(false);
  const pathname  = usePathname();
  const router    = useRouter();
  const aboutRef  = useRef<HTMLDivElement>(null);

  // Load user — only runs on client, after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  // Fetch user after mount — depends on `mounted` and `pathname`
  useEffect(() => {
    if (!mounted) return;
    const token = Cookies.get('access_token');
    if (!token) { setUser(null); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => data ? setUser({ firstName: data.firstName, role: data.role }) : setUser(null))
      .catch(() => setUser(null));
  }, [pathname, mounted]);

  // Close about dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function logout() {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/');
  }

  const isAdmin = user && ['ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR'].includes(user.role);
  const isAboutActive = pathname?.startsWith('/about') || pathname?.startsWith('/contact');

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header
      className="sticky top-0 z-50 shadow-lg h-[125px] md:h-[110px]"
      style={{ backgroundColor: '#055d69' }}
    >
      {/* Promo bar */}
      <div className="bg-cyan-700 text-white text-center text-xs py-1.5 px-4 font-medium">
        🎓 UK-accredited clinical research courses — ICH GCP · Pharmacovigilance · Regulatory Affairs
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Main nav row */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Logo variant="navbar" href="/" />

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">

            {/* All Courses */}
            <Link
              href="/courses"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/courses' || pathname?.startsWith('/courses/')
                  ? 'text-white bg-white/10'
                  : 'text-cyan-200 hover:text-white hover:bg-white/10'
              }`}
            >
              All Courses
            </Link>

            {/* Programmes */}
            <Link
              href="/programs"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/programs' || pathname?.startsWith('/programs/')
                  ? 'text-white bg-white/10'
                  : 'text-cyan-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Programmes
            </Link>

            {/* Library */}
            <Link
              href="/library"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/library'
                  ? 'text-white bg-white/10'
                  : 'text-cyan-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Library
            </Link>

            {/* Verify Certificate */}
            <Link
              href="/certificates/verify"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname?.startsWith('/certificates')
                  ? 'text-white bg-white/10'
                  : 'text-cyan-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Verify Certificate
            </Link>

            {/* About Us dropdown — rightmost nav item */}
            <div ref={aboutRef} className="relative">
              <button
                onClick={() => setAboutOpen((o) => !o)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isAboutActive || aboutOpen
                    ? 'text-white bg-white/10'
                    : 'text-cyan-200 hover:text-white hover:bg-white/10'
                }`}
              >
                About
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {aboutOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {ABOUT_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setAboutOpen(false)}
                      className="flex flex-col px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-900">{link.label}</span>
                      <span className="text-xs text-gray-400 mt-0.5">{link.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop right: cart + auth */}
          <div className="hidden md:flex items-center gap-3">
            <CartIcon />
            {mounted && user ? (
              <>
                <MyCoursesMenu />
                {isAdmin && (
                  <Link href="/admin"
                    className="text-xs text-cyan-300 hover:text-white px-3 py-1.5 rounded border border-cyan-800 hover:border-cyan-500 transition-colors">
                    Admin
                  </Link>
                )}
                <Link
                  href="/certificates"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    pathname?.startsWith('/certificates')
                      ? 'text-white bg-white/10'
                      : 'text-cyan-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  My Certificates
                </Link>
                <Link href="/dashboard" className="text-sm text-cyan-200 hover:text-white transition-colors">
                  Hi, {user.firstName}
                </Link>
                <button onClick={logout} className="text-xs text-cyan-400 hover:text-white transition-colors">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-cyan-200 hover:text-white px-4 py-2 transition-colors">
                  Login
                </Link>
                <Link href="/register"
                  className="text-sm bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-2 rounded-lg font-semibold transition-colors shadow-sm">
                  Enrol Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile right: cart + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <CartIcon />
            <button
              className="text-cyan-200 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile full-screen overlay menu ── */}
      {menuOpen && (
        <>
          {/* Backdrop — clicks outside the drawer close it */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel — slides in from the left */}
          <div className="fixed top-0 left-0 h-full w-72 max-w-[85vw] z-50 md:hidden flex flex-col"
            style={{ backgroundColor: '#055d69' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10"
              style={{ backgroundColor: '#044f5a' }}>
              <Logo variant="navbar" href="/" />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-cyan-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

              {/* About section */}
              <p className="px-3 pb-1 text-[10px] font-bold text-cyan-500 uppercase tracking-widest">About</p>
              {ABOUT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-sm text-cyan-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  {link.label}
                </Link>
              ))}

              <div className="my-2 border-t border-white/10" />

              {/* Main nav links */}
              <p className="px-3 pb-1 text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Browse</p>
              {[
                { href: '/courses',             label: 'All Courses',        icon: '📚' },
                { href: '/programs',            label: 'Programmes',         icon: '🎓' },
                { href: '/library',             label: 'Library',            icon: '📖' },
                { href: '/certificates/verify', label: 'Verify Certificate', icon: '✅' },
              ].map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 text-sm rounded-lg transition-colors ${
                    pathname === link.href || pathname?.startsWith(link.href + '/')
                      ? 'text-white bg-white/15 font-semibold'
                      : 'text-cyan-200 hover:text-white hover:bg-white/10'
                  }`}>
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              ))}

              {/* Account section */}
              {mounted && (
                <>
                  <div className="my-2 border-t border-white/10" />
                  <p className="px-3 pb-1 text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Account</p>

                  {user ? (
                    <>
                      <div className="px-3 py-2 mb-1">
                        <p className="text-xs text-cyan-400">Signed in as</p>
                        <p className="text-sm text-white font-semibold">{user.firstName}</p>
                      </div>
                      {[
                        { href: '/dashboard',    label: 'My Dashboard',    icon: '🏠' },
                        { href: '/certificates', label: 'My Certificates', icon: '🏅' },
                        { href: '/account',      label: 'Account Settings', icon: '⚙️' },
                      ].map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 text-sm rounded-lg transition-colors ${
                            pathname === link.href
                              ? 'text-white bg-white/15 font-semibold'
                              : 'text-cyan-200 hover:text-white hover:bg-white/10'
                          }`}>
                          <span className="text-base">{link.icon}</span>
                          {link.label}
                        </Link>
                      ))}
                      {isAdmin && (
                        <Link href="/admin" onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 text-sm text-cyan-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                          <span className="text-base">🔧</span>
                          Admin Panel
                        </Link>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </nav>

            {/* Drawer footer — auth buttons */}
            <div className="px-4 py-4 border-t border-white/10 space-y-2"
              style={{ backgroundColor: '#044f5a' }}>
              {mounted && user ? (
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="w-full py-2.5 text-sm text-center text-cyan-200 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)}
                    className="block w-full py-2.5 text-sm text-center text-cyan-200 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)}
                    className="block w-full py-2.5 text-sm text-center bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-semibold transition-colors">
                    Enrol Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
