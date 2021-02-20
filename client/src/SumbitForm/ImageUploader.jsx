import { useRef, useState } from "react"
import { Button, Image, Loader } from "semantic-ui-react";
import { photo } from "./mocks";


const ImageUploader=({onChangedLink, imageLink})=>{
    const [isLoading, setLoading]=useState(false);
    const photoSrc=imageLink || photo;
    const fileInput = useRef(null)

    const onImageLoad=(e)=>{
        fetch()
    }

    return (
        <div className={'submit-form-upload-photo-wrapper'}>
            {isLoading?<Loader />:<div className={'submit-form-upload'}>
                <Image src={photoSrc} size='small' centered/>
                <input type="file" onChange={onImageLoad} hidden ref={fileInput}/>   
                <Button onClick={e => fileInput.current && fileInput.current.click()}>{imageLink?'Change photo':'Upload photo'}</Button>
            </div>}
        </div>
    )
}

export default ImageUploader;