import React, { useState } from "react";
import "./Lightbox.css";

const Lightbox = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Hiển thị danh sách ảnh, giới hạn tối đa 5 ảnh */}
      <section className="grid_img_destination_detail">
        {images.slice(0, 5).map((image, index) => (
          <div
            key={index}
            className={`grid-item ${index === 0 ? "large" : ""}`}
            onClick={() => openLightbox(index)}
          >
            <img src={image} alt={`Image ${index + 1}`} />
            {index === 4 && images.length > 5 && (
              <div className="more-button" onClick={() => openLightbox(4)}>
                <span>+{images.length }</span>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Lightbox */}
      {isOpen && (
        <div id="lightbox" className={`lightbox ${isOpen ? "show" : ""}`}>
          <div className="overlay" onClick={closeLightbox}></div>
          <div className="lightbox-content">
            <span className="close-btn" onClick={closeLightbox}>
              &times;
            </span>
            <img id="lightboxImage" className="show" src={images[currentIndex]} alt="Lightbox" />
            <div className="navigation prev" onClick={prevImage}>
              &lt;
            </div>
            <div className="navigation next_lightboxImage" onClick={nextImage}>
              &gt;
            </div>
            <span id="imageIndex" className="image-index">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Lightbox;
