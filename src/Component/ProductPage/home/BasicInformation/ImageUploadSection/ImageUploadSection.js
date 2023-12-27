import React, { useState } from 'react';
import FileDropArea from '../Tool/FileDropArea';
import ImageCropModal from '../ImageCropModal/ImageCropModal';
import '../../../../../css/BasicInformation/ImageUploadSection/ImageUploadSection.scss'

const ImageUploadSection = ({
    selectedImages,
    setSelectedImages,
    handleDeleteImage,
    handleFileButtonClick,
    onDrop,
    onDragOver,
    handleFiles,
    handleDragStart,
    handleDrop
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const handleEditImage = (image) => {
        setCurrentImage(image);
        setIsModalOpen(true);
    };

    const handleImageCropped = (croppedImageUrl) => {
        const updatedImages = selectedImages.map((image) =>
            image === currentImage ? croppedImageUrl : image
        );
        setSelectedImages(updatedImages);
        setIsModalOpen(false);
    };

    return (
        <div className="image-upload-container">
            {selectedImages.map((image, index) => (
                <div
                    className="image-container move"
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                >
                    <img src={image} alt="Preview" className="file-preview" />
                    <div className='btn_container'>
                        <button onClick={() => handleEditImage(image)} className='edit-button'>
                            <i className="fa-solid fa-edit"></i>
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => handleDeleteImage(index)}
                        >
                            <i class="fa-regular fa-trash-can fa-lg"></i>
                        </button>
                    </div>
                </div>
            ))}
            {selectedImages.length < 9 && (
                <FileDropArea
                    type="image"
                    imageCount={selectedImages.length}
                    handleFileButtonClick={handleFileButtonClick}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    handleFiles={handleFiles}
                    iconClass="fa-solid fa-file-image fa-xl"
                />
            )}
            {isModalOpen && (
                <ImageCropModal
                    isOpen={isModalOpen}
                    imageSrc={currentImage}
                    onImageCropped={handleImageCropped}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ImageUploadSection;
