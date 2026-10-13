import Link from 'next/link';
import { ArrowRight, Database, RefreshCw, ShieldCheck, Terminal } from 'lucide-react';
import { gitConfig } from '@/lib/shared';

const chapters = [
  { title: 'Architecture', description: 'Validate every catalog entry. Verify every download. Cache atomically.', href: '/docs/build', icon: Database },
  { title: 'Automatic publishing', description: 'Discover newly published games and keep existing versions available.', href: '/docs/sync', icon: RefreshCw },
  { title: 'Secure administration', description: 'Protect asset delivery, sign-in, sessions, and state-changing controls.', href: '/docs/deploy', icon: ShieldCheck },
  { title: 'Testing & recovery', description: 'Prove the whole flow works, from pinned bytes to browser gameplay.', href: '/docs/testing', icon: Terminal },
];
export default function HomePage() {
  return <main className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
    <section className="max-w-3xl"><p className="mb-6 text-xs font-semibold tracking-[0.2em] text-fd-primary">CARTER GAME’S / BUILD GUIDE</p><h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">Fast games.<br /><span className="text-fd-primary">Verified assets.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-fd-muted-foreground">Build your own game preloader: a trusted catalog, a reliable disk cache, automatic discovery, and secure controls for your VPS.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/docs" className="inline-flex items-center gap-2 rounded-xl bg-fd-primary px-5 py-3 font-medium text-fd-primary-foreground">Read the guide <ArrowRight aria-hidden="true" className="size-4" /></Link><a href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`} className="rounded-xl border bg-fd-card px-5 py-3 font-medium">View source</a></div></section>
    <section className="mt-20 grid gap-4 md:grid-cols-2" aria-label="Guide chapters">{chapters.map(({ icon: Icon, ...chapter }) => <Link key={chapter.href} href={chapter.href} className="group rounded-2xl border bg-fd-card p-7 transition-colors hover:bg-fd-accent"><Icon aria-hidden="true" className="mb-5 size-6 text-fd-primary" /><h2 className="text-lg font-semibold">{chapter.title}</h2><p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{chapter.description}</p></Link>)}</section>
    <footer className="mt-14 border-t pt-7 text-sm leading-6 text-fd-muted-foreground">Created by Carter (carteraccs), with AI assistance for documentation. Carter's production preloader remains private; this guide helps you build your own.</footer>
  </main>;
}
