import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";  // Adjust the import if needed
import NewsContent from "./components/NewsContent/NewsContent";
import Footer from "./components/Footer/footer";

function App() {
  const [category, setCategory] = useState("business");
  const [newsArray, setNewsArray] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use the category dynamically in the API URL
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=185a6808295f41b098f84ee73a9c3291`
        );
        setNewsArray(response.data.articles);
      } catch (error) {
        alert("Failed to fetch news. Please check your API key or network.");
      }
    };

    fetchNews();
  }, [category]); // Dependency on 'category' ensures it refetches when category changes

  return (
    <div>
      <Header setcategory={setCategory} />  {/* Pass the setCategory function to Header */}
      <NewsContent newsArray={newsArray} />
      <Footer />
    </div>
  );
}

export default App;
