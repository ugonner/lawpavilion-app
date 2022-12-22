import React from 'react';
import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Layout} from './layouts/Layout';
import { AppContextProvider } from './contexts';
import { Products } from './pages/product/Products';
import { ProductDetail } from './pages/product/ProductDetail';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/product/:productId' element={<ProductDetail/>} />
            <Route path='/category/:categoryId' element={<Products/>} />
          </Route>
        </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
