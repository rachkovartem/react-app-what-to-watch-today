import pageNotFound from '../../resources/img/404.png'

const Page404 = () => {

  return (
    <div style={{display: 'flex', marginTop: '100px', justifyContent: 'center'}}>
      <img className='image-404' src='https://http.cat/404' alt="Страница не найдена" />
    </div>
  )
}

export default Page404;