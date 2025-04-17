import { useEffect, useState } from "react";
const url = import.meta.env.VITE_API_BASE_URL

export default function CarImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [selectedImage]);

  return (
    <div className=" grid md:grid-cols-9 gap-6">
      <div className="w-full flex items-center justify-center h-80 md:col-span-6 border overflow-hidden bg-gray-50 dark:bg-zinc-800 rounded-lg">
        <img
          src={url+images[selectedImage]}
          className="object-contain h-full"
          alt="Car preview"
        />
      </div>
      
      <div className="w-full h-full max-h-80 flex md:col-span-3 md:flex-col justify-center gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className={` w-full h-full max-h-28  border rounded-lg overflow-hidden transition-all ${
              selectedImage === index ? "ring-2 ring-primary" : ""
            }`}
          >
            <img src={url+img} className="object-cover w-full h-full" alt="Thumbnail" />
          </div>
        ))}
      </div>
    </div>
  );
}