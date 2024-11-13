import React from "react";
import "./FooterComponent.css";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer_title">
            <p className="footer__desc">
              Discover VietNam được phát triển bởi nhóm Capstone1_C1SE37, là một
              trang web giới thiệu địa điểm du lịch cho Thành phố Đà Nẵng.
            </p>

            <div className="footer__inner-contact">
              <a href="#" className="footer__contact-logo fab fa-twitter"></a>
              <a href="#" className="footer__contact-logo fab fa-youtube"></a>
              <a
                href="#"
                className="footer__contact-logo fab fa-facebook-square"
              ></a>
              <a
                href="#"
                className="footer__contact-logo fab fa-instagram-square"
              ></a>
            </div>
          </div>

          <div className="footer__allInfo">
            <ul className="footer__list">
              <h3 className="footer__list-heading">Hỗ trợ</h3>

              <li className="footer__item">
                <i className="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" className="footer__item-link">
                  Quản lí các chuyến đi của bạn
                </a>
              </li>

              <li className="footer__item">
                <i className="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" className="footer__item-link">
                  Liên hệ Dịch vụ Khách hàng
                </a>
              </li>

              <li className="footer__item">
                <i className="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" className="footer__item-link">
                  Trung tâm thông tin bảo mật
                </a>
              </li>

              <li className="footer__item">
                <i className="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" className="footer__item-link">
                  Cho thuê xe hơi
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__allInfo">
            <ul className="footer__list">
              <h3 className="footer__list-heading">Khám phá thêm</h3>

              <li className="footer__item">
                <i className="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" className="footer__item-link">
                  Chương trình khách hàng thân thiết
                </a>
              </li>

              <li className="footer__item">
                <i className="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" className="footer__item-link">
                  Ưu đãi theo mùa và dịp lễ
                </a>
              </li>

              <li className="footer__item">
                <i className="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" className="footer__item-link">
                  Bài viết về du lịch
                </a>
              </li>
            </ul>
          </div>

          <div class="footer__allInfo">
            <ul class="footer__list">
              <h3 class="footer__list-heading">Về chúng tôi</h3>

              <li class="footer__item">
                <i class="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" class="footer__item-link">
                  Chúng tôi hoạt động như thế nào
                </a>
              </li>

              <li class="footer__item">
                <i class="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" class="footer__item-link">
                  Truyền thông
                </a>
              </li>

              <li class="footer__item">
                <i class="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" class="footer__item-link">
                  Liên hệ công ty
                </a>
              </li>

              <li class="footer__item">
                <i class="footer__item-icon fas fa-chevron-right"></i>
                <a href="#" class="footer__item-link">
                  Du lịch bền vững
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
