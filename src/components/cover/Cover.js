import './Cover.scss';

import imageNotFound from '../../resources/img/image-not-found.png'

import { Link } from "react-router-dom";



const Cover = (props) => {
  const {title, image} = props;
    return (
        <section className="cover">
          <div className="container">
            <div className="container__poster-wrapper">
              <img className="container__poster" src={image ? image : imageNotFound} alt="Постер"/>
            </div>
            <div className="cover__title-wrapper">
              <div className="cover__breadcrumbs">
                <Link to='/'  className="cover__breadcrumb">Movie List</Link>
                <span> / </span>
                <a disabled className="cover__breadcrumb" href="#">Movies</a>
              </div>
              <h1 className="cover__title">{title}</h1>
            </div>
          </div>
        </section>
    )
}

export default Cover;