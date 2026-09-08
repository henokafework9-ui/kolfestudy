import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthGate from '../components/AuthGate';

export const metadata = {
  title: 'Kolfe Study',
  description: 'A platform for past exams, student books, and school news.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthGate>
          <Navbar />
          {children}
          <Footer />
        </AuthGate>
      </body>
    </html>
  );
}
