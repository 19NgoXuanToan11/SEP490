import React from "react";
import blog1 from "../../assets/pictures/blog1.jpg"
import blog2 from "../../assets/pictures/blog2.jpg"
import blog3 from "../../assets/pictures/blog3.jpg"

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "5 Tips for Buying Used Electronics",
      content: "When buying used electronics, always check the condition, ask for a warranty, and research the seller.",
      date: "2023-10-01",
      image: blog1, 
    },
    {
      id: 2,
      title: "How to Sell Your Old Devices Safely",
      content: "Ensure your data is wiped, take quality photos, and provide accurate descriptions to attract buyers.",
      date: "2023-09-25",
      image: blog2, // Add image path
    },
    {
      id: 3,
      title: "The Benefits of Trading Electronics",
      content: "Trading electronics can save you money and help you upgrade to newer models without breaking the bank.",
      date: "2023-09-15",
      image: blog3, // Add image path
    },
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
              <img src={article.image} alt={article.title} className="mb-4 rounded" /> {/* Add image element */}
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{article.date}</p>
              <p className="text-gray-700">{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
