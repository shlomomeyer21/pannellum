import { useEffect,useRef, useReducer } from "react"
import NavigateBar from "../NavigateBar/NavigateBar";
import ImageExplorer from "../ImageExplorer";
import './Explorer.css';

import {getLatestImageUrl} from '../../helpers';
import { useState } from "react";


function Explorer() {

    const [imageUrl, setImageUrl] = useState();

    const [apartments, setApartments] = useState(null);

    const handleImageChange = (selectedImageValue, apartmentSelected) => {
        if (selectedImageValue === '') {
           setImageUrl(null);
        } else if (selectedImageValue === 'latest') {
            setImageUrl(getLatestImageUrl(apartmentSelected));
        } else {
            const {url} = apartmentSelected.images.find(({id})=> id === selectedImageValue);
            setImageUrl(url);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://gj4qt4qphvfglkrxutvh57jrlm0ryrqx.lambda-url.eu-west-1.on.aws/');
            const data = await response.json();
            setApartments(data.apartments);
        };

        fetchData();

        setInterval(() => {
            fetchData()
        }, 5000);
    }, [])
    return <>
        {apartments &&
            <>
                <NavigateBar
                    apartments={apartments}
                    handleImageChange={handleImageChange}
                >
                </NavigateBar>
                {imageUrl && <ImageExplorer url={imageUrl}></ImageExplorer>}
            </>
        }
    </>
}

export default Explorer;