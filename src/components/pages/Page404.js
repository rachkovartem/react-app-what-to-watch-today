import pageNotFound from '../../resources/img/404.png'
import { useLocation } from 'react-router';

const Page404 = (setCurrentLocation) => {
   const location = useLocation()
   setCurrentLocation(location.pathname) 

  return (
    <div>
      <img className='image-404' src={pageNotFound} alt="Страница не найдена" />
    </div>
  )
}

export default Page404;