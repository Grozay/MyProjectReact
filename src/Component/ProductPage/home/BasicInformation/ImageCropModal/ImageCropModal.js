import React, { useState } from 'react';
import ImageCropper from './ImageCropper';
import '../../../../../css/BasicInformation/ImageCropModal/ImageCropModal.scss';
import Swal from 'sweetalert2';

const ImageCropModal = ({ isOpen, imageSrc, onImageCropped, onClose }) => {
    const [croppedImage, setCroppedImage] = useState(null);

    const handleImageCropped = (image) => {
        setCroppedImage(image);
    };

    const handleSave = () => {
        if (croppedImage) {
            onImageCropped(croppedImage);
        } else {
            console.error('Không có hình ảnh nào được cắt.');
        }
        onClose();
    };
    const handleclose = () => {
        Swal.fire({
            title: 'Xác nhận !',
            text: "Bạn chưa lưu những thay đổi. Bạn có chắc muốn thoát khỏi phần chỉnh sửa?",
            showCancelButton: true,
            confirmButtonColor: 'rgb(255, 0, 0)',
            confirmButtonText: 'Xác Nhận',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                onClose();
            }
        });
    };
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="image-cropper-container">
                    <ImageCropper imageSrc={imageSrc} onImageCropped={handleImageCropped} />
                </div>
                <div className="modal-controls">
                    <button onClick={handleclose} className='btn_close'>Đóng</button>
                    <button onClick={handleSave} className='btn_save'>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropModal;
