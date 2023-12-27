import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CropImage'; // Hàm này sẽ được định nghĩa sau để xử lý việc cắt ảnh
import '../../../../../css/BasicInformation/ImageCropModal/ImageCroper.scss'

const ImageCropper = ({ imageSrc, onImageCropped }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropChange = crop => {
        setCrop(crop);
    };

    const onZoomChange = zoom => {
        setZoom(zoom);
    };

    const onCropCompleteCallback = useCallback(async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onImageCropped(croppedImage); // Gọi callback này với hình ảnh đã cắt
    }, [imageSrc, onImageCropped]); // Đảm bảo sử dụng dependency list đúng


    return (
        <div>
            <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropCompleteCallback}
                className={'cropper'}
            />
        </div>
    );
};

export default ImageCropper;
