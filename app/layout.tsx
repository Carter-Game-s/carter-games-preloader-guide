import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import './global.css';

export const metadata: Metadata = {
  title: { default: 'Carter Game’s · Preloader Guide', template: '%s · Carter Game’s' },
  description: 'Build a verified game preloader with automatic publishing, secure administration, and reliable VPS delivery. A guide by Carter.',
};
export default function Layout({ children }: LayoutProps<'/'>) {
  return <html lang="en" suppressHydrationWarning><body className="flex min-h-screen flex-col"><Provider>{children}</Provider></body></html>;
}
