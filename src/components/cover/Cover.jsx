import "./Cover.scss";
import Skeleton from "@mui/material/Skeleton";

import imageNotFound from "../../resources/img/image-not-found.png";

import { Link } from "react-router-dom";

const Cover = ({ title, image, loading, imagesUpdated }) => {
  const skeleton =
    loading || !imagesUpdated ? (
      <Skeleton
        sx={{ backgroundColor: "rgb(255 255 255 / 20%)" }}
        variant="rectangular"
      >
        <img
          className="container__poster"
          src={image ? image : imageNotFound}
          alt="Постер"
        />
      </Skeleton>
    ) : null;
  const poster =
    image && !loading && imagesUpdated ? (
      <img className="container__poster" src={image} alt="Постер" />
    ) : null;
  const notFound =
    !image && !loading && imagesUpdated ? (
      <img className="container__poster" src={imageNotFound} alt="Постер" />
    ) : null;

  return (
    <section className="cover">
      <div className="container">
        <div className="container__poster-wrapper">
          {skeleton}
          {poster}
          {notFound}
        </div>
        <div className="cover__title-wrapper">
          <div className="cover__breadcrumbs">
            <Link to="/" className="cover__breadcrumb">
              Movie List
            </Link>
            <span> / </span>
            <Link to="/" className="cover__breadcrumb">
              Movies
            </Link>
          </div>
          <h1 className="cover__title">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Cover;
