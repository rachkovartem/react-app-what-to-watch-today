import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useState, useEffect, Fragment } from 'react';
import KinopoiskServices from '../../services/KinopoiskServices';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AccordionAboutFilm = (props) => {
    const { id } = props;
    const [expanded, setExpanded] = useState('');
    const [videos, setVideos] = useState([]);
    const [youtubeVideoCount, setYoutubeVideoCount] = useState(0);
    const [videoChoise, setVideoChoise] = useState('');

    const handleChangeVideo = (event) => {
        setVideoChoise(event.target.value);
    };

    const {loading, error, clearError, getVideosById} = KinopoiskServices();


    // натсройки аккордиона
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
      ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
      }));
      
      const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
          {...props}
        />
      ))(({ theme }) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
          marginLeft: theme.spacing(1),
        },
      }));
      
      const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));
    
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    //настройки инпута в аккордионе 

   


    useEffect(async () => {
        const res = await getVideosById(id);
        setVideos(res.items);
    }, [])

    let newFilmsYoutube = 0;
    useEffect(() => {
        setYoutubeVideoCount(newFilmsYoutube.length)
    }, [videos])
    

    const renderCarosel = (videos, site) => {
        switch (site) {
            case 'youtube': 
                newFilmsYoutube = videos.filter(video => video.site === 'YOUTUBE').map(video => {
                    return {
                        key: video.url.includes('watch') ? video.url.slice(32) : video.url.slice(26),
                        name: video.name
                    }
                })
                
                return newFilmsYoutube.map(item => carouselYoutube(item.key, item.name))
            

            case 'kinopoisk': 
                const newFilmsKinopoisk = videos.filter(video => video.site === 'KINOPOISK_WIDGET').map(video => {
                    return {
                        url: video.url,
                        name:video.name
                    }
                })    
                return newFilmsKinopoisk.map(item => carouselKinopoisk(item.url, item.name))
        }
    }



    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Видео о фильме на Youtube</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    
                 
                        <FormControl variant="standard" sx={{ mb: 1, minWidth: '100%' }}>
                            <Select
                                labelId="video-choise-label"
                                id="video-choise"
                                value={videoChoise}
                                onChange={handleChangeVideo}
                                label="Video"
                                sx={{margin: '0 auto', width: '100%'}}
                                displayEmpty
                            >
                                <MenuItem disabled value="">
                                    {youtubeVideoCount > 0 ? <>Выберите ролик</> : <>Видео не найдены</>}
                                </MenuItem>
                                {renderCarosel(videos, 'youtube')}
                                
                            </Select>
                        </FormControl>
                        
                        {videoChoise ? iframe(videoChoise) : null }
                        {!videoChoise && youtubeVideoCount > 0 ? <IframeSkeleton/> : null}
                        {videoChoise && youtubeVideoCount > 0 ? <em>*Точная причина неизвестна - вероятнее всего ролик удалён с Youtube</em> : null}
                        
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Видео о фильме на Кинопоиске</Typography>
                </AccordionSummary>
                <AccordionDetails style={{display: 'flex', flexDirection: 'column', gap: '15px' }}>

                {renderCarosel(videos, 'kinopoisk')}
 
                </AccordionDetails>
            </Accordion>
        </div>
    )

}

const IframeSkeleton = () => {
    return <div style={{display: 'grid' , gridTemplateRows: 'repeat(2, 1fr)'}}>
        <div style={{gridArea: '1/1/2/2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', height: '100px'}}>
            <Skeleton  animation="wave" variant="circular" width={60} height={60} />
            <Skeleton variant="h3" width='90%' height={30}/>
        
        </div>
        
        <Skeleton sx={{gridArea: '1/1/5/2', height: 315}} animation="wave" variant="rectangular"/>
    </div>
    
}

const carouselYoutube = (videoKey, name) => {
    return <MenuItem value={videoKey} key={name}>
    {name}
    </MenuItem>        
}

const iframe = (videoKey) => {
    return <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${videoKey}`} title='YouTube video player' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
}

const carouselKinopoisk = (url, name) => {

    return <Button variant="outlined" size="small" key={name}>
    <a style={{textDecoration: 'none', color: 'inherit'}}  href={url} target='blank'>{name}</a>
  </Button>
     
    
}


export default AccordionAboutFilm


