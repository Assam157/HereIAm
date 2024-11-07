import React from "react";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import { ItemProvider } from "./context/ItemContext"; // Import ItemProvider correctly
import "./App.css";

const App = () => {
  return (
    <ItemProvider> {/* Wrap the entire application */}
      <Header />
      <ProductList />
    </ItemProvider>
  );
};

export default App;