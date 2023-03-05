import { Outlet } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export function Layout({ isAuthenticated, username, handleSignOut }) {
  return (
    <>
      <Header
      isAuthenticated={isAuthenticated}
      username={username}
      handleSignOut={handleSignOut}
      />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}
