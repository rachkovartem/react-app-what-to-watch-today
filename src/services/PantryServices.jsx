import { useHttp } from '../hooks/hook.http';

const URL = process.env.REACT_APP_SERVER_URL


const PantryServices = () => {
    const {loading, error, request, clearError} = useHttp();
    const loadingPantry = loading;
    const errorPantry = error;
    const clearErrorPantry = clearError;

    const getData = async () => {
        let response = await request(`${URL}api/getData`);
        return response
    }

    const postData = async (data) => {
        let response = await request(`${URL}api/postData`, 'POST', {'Content-Type': 'application/json'}, JSON.stringify(data))
        return response;
    }

    const putData = async (data) => {
        let response = await request(`${URL}api/putData`, 'PUT', {'Content-Type': 'application/json'}, JSON.stringify(data))
        return response;
    }

    return {loadingPantry, errorPantry, clearErrorPantry, getData, postData, putData}
}

export default PantryServices;