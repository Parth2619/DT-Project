import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LostAndFoundPage from './pages/LostAndFoundPage';
import ItemDetailPage from './pages/ItemDetailPage';
import NotesHomePage from './pages/NotesHomePage';
import NoteDetailPage from './pages/NoteDetailPage';
import SigninPage from './pages/SigninPage';
import { ToastProvider } from './hooks/useToast';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import ToastContainer from './components/Toast';
import PixelBlast from './components/PixelBlast';

const MainLayout = () => (
  <>
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <HashRouter>
            <PixelBlast />
            <div className="flex min-h-screen flex-col font-sans">
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/lost-and-found" element={<LostAndFoundPage />} />
                  <Route path="/item/:id" element={<ItemDetailPage />} />
                  <Route path="/notes" element={<NotesHomePage />} />
                  <Route path="/notes/:id" element={<NoteDetailPage />} />
                  <Route path="/admin" element={<div className="text-center p-8">Admin Dashboard Coming Soon!</div>} />
                </Route>
                <Route path="/signin" element={<SigninPage />} />
              </Routes>
              <ToastContainer />
            </div>
          </HashRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
