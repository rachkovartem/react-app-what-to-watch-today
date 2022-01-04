import { useState } from 'react-dom';
import { useParams, Link } from 'react-router-dom';

const AboutFilm = () => {
    const {id} = useParams()

    return (
        <div>{id}</div>
    )
}

export default AboutFilm;