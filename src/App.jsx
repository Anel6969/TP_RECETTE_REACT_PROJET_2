import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importez BrowserRouter
import Index from '../src/components/Index/Index';
import Recette from '../src/components/PageRecette/Recette';
import ListeCategory from '../src/components/ListeCategory/ListeCategory';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router> {/* Enveloppez votre application avec le Router */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryName" element={<ListeCategory />} />
          <Route path="/recipe/:recipeId" element={<Recette />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
