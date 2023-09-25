import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './components/store'; 
import Index from '../src/components/Index/Index';
import Recette from '../src/components/PageRecette/Recette';
import ListeCategory from '../src/components/ListeCategory/ListeCategory';
import Recipe from '../src/components/Recipe';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
     
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:categoryName" element={<ListeCategory />} />
            <Route path="/recipe/:recipeId" element={<Recette />} />
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
