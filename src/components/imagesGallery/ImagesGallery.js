import ImageGallery from 'react-image-gallery';
import { useState, useEffect } from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Spinner from '../spinner/Spinner';

import './ImageGallery.scss'
import KinopoiskServices from '../../services/KinopoiskServices';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });
  
const ImagesGallery = (props) => {
    

    const { id } = props;
    const { loading, error, clearError, getImagesById } = KinopoiskServices();
    const [ images, setImages ] = useState({});
    const [countsOfImages, setCountsOfImages] = useState([]);
    const [imagesUpdated, setImagesUpdated] = useState(false)
    const [countsOfImagesUpdated, setCountsOfImagesUpdated] = useState(false)


   const typeValues = ['STILL', 'SHOOTING', 'POSTER', 'FAN_ART', 'PROMO', 'CONCEPT', 'WALLPAPER', 'COVER', 'SCREENSHOT'];
    useEffect(() => {
        updateImages()
        updateImagesCount()

    }, [])

    const countsLoaded = (counts) => {
        setCountsOfImages(counts);
        setCountsOfImagesUpdated(true)
    }


    const updateImages = async (type = 'STILL') => {
        setImagesUpdated(false);
        const initRes = await getImagesById(id, type);
        let images = initRes.items
        for (let i = 2; i < initRes.totalPages; i++) {
            const res = await getImagesById(id, type, i);
            images.concat(res.items);
        }
        setImages({total: initRes.total, items: images})
        setImagesUpdated(true);
        
    }

    const updateImagesCount = async () => {
        const delay = 100
        let counts = []
        typeValues.forEach((value, i) => {
            let obj
            setTimeout(async() => {
                const response = await getImagesById(id, value);
                obj = {type: value, count: response.total}
                counts.push(obj)

            }, delay * ++i)
            
        });
        
        const check = () => {
            if (error) {return}
            console.log(counts)
            countsLoaded(counts) 
            if (counts.length < 9) {
                setTimeout(() => check(), delay)
            }
        }
        setTimeout(() => check(), delay*typeValues.length + 50)   
    }


    const imagesForGallery = (images) => {
        return images.items.map(item => {
            return {
                original: item.imageUrl,
                thumbnail: item.previewUrl
            }
        })
    }
  
   

    function handleClickBreadcrumb(event, type) {
        event.preventDefault();
        updateImages(type);
        }
       
    const breadcrumbs = countsOfImagesUpdated ? breadcrumbsView(typeValues, handleClickBreadcrumb, countsOfImages) : null;
    const gallery = countsOfImagesUpdated && imagesUpdated && !loading ? <ImageGallery lazyLoad={true} items={imagesForGallery(images)} /> : null;
    const spinner = !countsOfImagesUpdated || !imagesUpdated || loading ? <Spinner/> : null;
    return (
    <>
        {breadcrumbs}
        {gallery}
        {spinner}
    
    </>)

}

const breadcrumbsView = (typeValues, handleClickBreadcrumb, countsOfImages) => {
    const renderImageCount = (type) => {
        let count = 0
        countsOfImages.forEach(item => {
            if (item.type === type && item.count && item.count > 0) {
                count = item.count
            }
        })
        return count
    }

   

    let el = (label, type) => {
        const count = renderImageCount(type);
        return count > 0 ? (
            <StyledBreadcrumb 
                key={type} 
                onClick={(event) => handleClickBreadcrumb(event, type)} 
                value={type} 
                component="button" 
                label={`${label} (${count})`}
            />
        ) : null
    }

    return <Breadcrumbs sx={{padding: '5px'}} aria-label="breadcrumb" maxItems={9} separator="">
            {typeValues.map((value) => {
                    switch (value) {
                        case 'STILL': return el('Кадры', value)
                        case 'SHOOTING': return el('Изображения со съемок', value)
                        case 'POSTER': return el('Постеры', value)
                        case 'FAN_ART': return el('Фан-арты', value)
                        case 'PROMO': return el('Промо', value)
                        case 'CONCEPT': return el('Концепт-арты', value)
                        case 'WALLPAPER': return el('Обои', value)
                        case 'COVER': return el('Обложки', value)
                        case 'SCREENSHOT': return el('Скриншоты', value)
                    }
                })
            }
            
    </Breadcrumbs>
}

export default ImagesGallery;
