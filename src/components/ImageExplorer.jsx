import { useEffect } from "react"
 
export default function ImageExplorer({ url }) {

    useEffect(() => {
        if (url) {
            // (pannellum);// eslint-disable-line
            pannellum.viewer('image-explorer', {// eslint-disable-line
                "type": "equirectangular",
                "panorama": url,
                autoLoad: true
            });
        }
    }, [url])
    return <div id="image-explorer"></div>
}