import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import dellImage from "../../assets/pictures/dell.jpg";
import iphoneImage from "../../assets/pictures/iphone12.jpg";
import sonyImage from "../../assets/pictures/sony.jpg";
import galaxyWatchImage from "../../assets/pictures/samsung.jpg";
import canonImage from "../../assets/pictures/canon.jpg";

const usedElectronics = [
  {
    id: 1,
    name: "Dell Inspiron 15 Laptop",
    description:
      "Used Dell laptop, good performance, 80% battery life, suitable for study and office work.",
    image: dellImage,
    price: "$350",
    condition: "Good",
  },
  {
    id: 2,
    name: "iPhone 12 Pro Max",
    description:
      "Used blue iPhone 12 Pro Max, great camera, 90% battery life, no scratches.",
    image: iphoneImage,
    price: "$750",
    condition: "Very Good",
  },
  {
    id: 3,
    name: "Sony WH-1000XM4 Headphones",
    description:
      "Used Sony noise-canceling headphones, excellent sound quality, long battery life, includes carrying case.",
    image: sonyImage,
    price: "$200",
    condition: "Like New",
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch 4",
    description:
      "Used Samsung smartwatch, no scratches on the screen, many health tracking features.",
    image: galaxyWatchImage,
    price: "$180",
    condition: "Good",
  },
  {
    id: 5,
    name: "Canon EOS 90D Camera",
    description:
      "Used Canon DSLR camera, suitable for professional photography, high-quality sensor.",
    image: canonImage,
    price: "$900",
    condition: "Good",
  },
];

const ServicesSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Bật chế độ tự động
    autoplaySpeed: 3000, // Thời gian giữa các lần chuyển đổi
    cssEase: "linear",
  };

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <Slider {...settings}>
            {usedElectronics.map((product) => (
              <div key={product.id} className="p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {product.description}
                    </p>
                    <p className="text-gray-800 font-bold">{product.price}</p>
                    <p className="text-gray-500 text-sm">
                      Condition: {product.condition}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
