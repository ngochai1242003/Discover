import React from "react";
import "./NotFoundPage.css";
import Airplane from "../../assets/img/plane_image.png"
import Grass from "../../assets/img/grass_image.png"
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="error">
        <div className="sky">
          <h2>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h2>
          <div className="grass">
            <img src={Grass} alt="" />
          </div>
          <img src={Airplane} className="plane" />
        </div>
        <div className="field">
          <h2>Opps...looks like you got lost.</h2>
          <a onClick={() => navigate('/')}>Go home</a>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
