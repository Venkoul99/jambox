import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { ArticlePage } from './pages/Articles/Article.page';
import { Navbar } from './components/Navbar/Navbar';
import { CreateArticleTablePage } from './pages/Articles/CreateArticleTable.page';
import Login from './components/Login/Login';
import SingleArticlePage from './pages/Articles/SingleArticle.page';
import { CreateArtistTablePage } from './pages/Artists/CreateArtistTable.page';
import { ArtistsPage } from './pages/Artists/Artists.page';
import SingleArtistPage from './pages/Artists/SingleArtist.page';
import { Footer } from './components/Footer/Footer';
import { TermsAndConditions } from './components/Information/TermsAndConditions';
import { LegalInformation } from './components/Information/LegalInformation';
import { PrivacyProtection } from './components/Information/PrivacyProtection';

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ArticlePage />,
      },
      {
        path: '/artists',
        element: <ArtistsPage />,
      },
      {
        path: '/admin/create-new-article',
        element: <CreateArticleTablePage />,
      },
      {
        path: '/admin/create-new-artist',
        element: <CreateArtistTablePage />,
      },
      {
        path: '/admin',
        element: <Login />,
      },
      {
        path: '/article/:id',
        element: <SingleArticlePage />,
      },
      {
        path: '/artists/:id',
        element: <SingleArtistPage />,
      },
      {
        path: '/terms-and-conditions',
        element: <TermsAndConditions />
      },
      {
        path: '/legal-information',
        element: <LegalInformation />
      },
      {
        path: '/privacy',
        element: <PrivacyProtection />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }

    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
