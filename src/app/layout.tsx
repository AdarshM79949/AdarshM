import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import StaggeredMenu from './components/StaggeredMenu';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  title: 'Adarsh M - Portfolio',
  description: 'AI & ML Student | Go Developer | System Design Enthusiast',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-blue-200/40 selection:text-black`} style={{ backgroundColor: "#F4F3F1", color: "#2D2D2D" }}>
        <StaggeredMenu
          position="right"
          items={[
            { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
            { label: 'Backend', ariaLabel: 'View Backend Portfolio', link: '/backend' },
            { label: 'Editor', ariaLabel: 'View Video Editor Portfolio', link: '/editor' },
            { label: 'About', ariaLabel: 'About Me', link: '/about' }
          ]}
          socialItems={[
            { label: 'GitHub', link: 'https://github.com/AdarshM79949' },
            { label: 'LinkedIn', link: 'https://www.linkedin.com/in/adarsh-m-b52ab13b5' }
          ]}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen={true}
          colors={['#00FF94', '#00ADD8']}
          accentColor="#00FF94"
        />
        {children}
      </body>
    </html>
  );
}
