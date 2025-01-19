import React from "react";
import person1 from "../../assets/pictures/person1.jpg";
import person2 from "../../assets/pictures/person2.jpg";
import person3 from "../../assets/pictures/person3.jpg";
import person4 from "../../assets/pictures/person4.jpg";
import { useState } from "react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const customerFeedbacks = [
    {
      id: 1,
      name: "Emily Johnson",
      avatar: person1,
      feedback:
        "This product exceeded my expectations! The quality is excellent, and the support team was very helpful.",
      rating: 5,
      location: "New York, USA",
    },
    {
      id: 2,
      name: "Pham Thi Ngoc Anh",
      avatar: person2,
      feedback:
        "Sản phẩm chất lượng tốt, giá cả hợp lý. Tôi rất hài lòng và sẽ giới thiệu cho bạn bè.",
      rating: 4,
      location: "Hà Nội, Việt Nam",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      avatar: person3,
      feedback:
        "The delivery was fast, and the product works perfectly. Great experience overall!",
      rating: 5,
      location: "Barcelona, Spain",
    },
    {
      id: 4,
      name: "Alex Nguyen",
      avatar: person4,
      feedback:
        "The product is great, but the delivery was a bit delayed. However, the support team was very responsive.",
      rating: 4,
      location: "Tokyo, Japan",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % customerFeedbacks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? customerFeedbacks.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-gradient-to-br from-blue-200 to-blue-100 via-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex justify-center items-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg p-6 max-w-md text-center"
          >
            <img
              src={customerFeedbacks[currentIndex].avatar}
              alt={customerFeedbacks[currentIndex].name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">
              {customerFeedbacks[currentIndex].name}
            </h2>
            <p className="text-gray-700 mt-4">
              {customerFeedbacks[currentIndex].feedback}
            </p>
          </motion.div>
          <button
            onClick={handleNext}
            className="absolute right-0 text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
