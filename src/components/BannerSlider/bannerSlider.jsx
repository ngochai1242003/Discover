import React, { useEffect } from "react";
import "./bannerSlider.css";
import imgSlider from "../../assets/img/danang.jpg";
import imgSlider1 from "../../assets/img/hue.jpg";
import imgSlider2 from "../../assets/img/hoian.jpeg";
import imgSlider3 from "../../assets/img/cuulong.jpg";
import imgSlider4 from "../../assets/img/bana.jpg";


const BannerSlider = () => {
  useEffect(() => {
    let slider = document.querySelector(".slider .list");
    let items = document.querySelectorAll(".slider .list .item");
    let next = document.getElementById("next");
    let prev = document.getElementById("prev");
    let dots = document.querySelectorAll(".slider .dots li");

    let lengthItems = items.length - 1;
    let active = 0;

    const reloadSlider = () => {
      slider.style.left = -items[active].offsetLeft + "px";
      let lastActiveDot = document.querySelector(".slider .dots li.active");
      if (lastActiveDot) lastActiveDot.classList.remove("active");
      dots[active].classList.add("active");
      clearInterval(refreshInterval);
      refreshInterval = setInterval(() => {
        next.click();
      }, 5000);
    };

    next.onclick = () => {
      active = active + 1 <= lengthItems ? active + 1 : 0;
      reloadSlider();
    };

    prev.onclick = () => {
      active = active - 1 >= 0 ? active - 1 : lengthItems;
      reloadSlider();
    };

    let refreshInterval = setInterval(() => {
      next.click();
    }, 3000);

    dots.forEach((li, key) => {
      li.addEventListener("click", () => {
        active = key;
        reloadSlider();
      });
    });

    window.onresize = () => {
      reloadSlider();
    };

    return () => {
      clearInterval(refreshInterval);
      next.onclick = null;
      prev.onclick = null;
      window.onresize = null;
    };
  }, []);

  return (
    <div className="container">
      <div className="main_title">
        <h1>Các điểm đến thu hút nhất</h1>
        <p>Nhanh chân đến ngay. Để mai sẽ lỡ!</p>
      </div>
      <div className="slider">
        <div className="list">
          <a className="item" href="#">
            <img src={imgSlider} alt="" />
          </a>
          <a class="item" href="#">
            <img src={imgSlider1} alt="" />
          </a>
          <a class="item" href="#">
            <img src={imgSlider2} alt="" />
          </a>
          <a class="item" href="#">
            <img src={imgSlider3} alt="" />
          </a>
          <a class="item" href="#">
            <img src={imgSlider4} alt="" />
          </a>
        </div>
        <div className="buttons">
          <button id="prev">&lt;</button>
          <button id="next">&gt;</button>
        </div>
        <ul className="dots">
          <li className="active"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default BannerSlider;
