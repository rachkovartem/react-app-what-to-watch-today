import { useState, useEffect } from 'react';



export const useDomLoading = () => {

    const [domLoaded, setDomLoaded] = useState(false);

    const onWindowLoaded = () => {
    setDomLoaded(true)
    }

    const onWindowUnload = () => {
    setDomLoaded(false)
    }

    useEffect(() => {
    window.addEventListener('DOMContentLoaded', onWindowLoaded)
    return (window.removeEventListener('DOMContentLoaded', onWindowUnload))
    }, [])

    return domLoaded

}

