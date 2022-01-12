import { useHttp } from '../hooks/hook.http';

console.log(process.env.REACT_APP_SERVER_URL)

const URL = process.env.REACT_APP_SERVER_URL

const PantryServices = () => {
    const {loading, error, request, clearError} = useHttp();
    const loadingPantry = loading;
    const errorPantry = error;
    const clearErrorPantry = clearError;

    const getData = async () => {
        let response = await request(`${URL}api/getData`);
        return response.json()
    }

    const postData = async (data) => {
        console.log(data)
        const newData = {
            'timestamp': Date.now(),
            data
        }
        let response = await request(`${URL}api/postData`, 'POST', {'Content-Type': 'application/json'}, JSON.stringify(newData))
        return response;
    }

    return {loadingPantry, errorPantry, clearErrorPantry, getData, postData}
}

export default PantryServices;