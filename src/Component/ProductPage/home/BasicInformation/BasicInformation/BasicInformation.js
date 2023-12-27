import React, { useState } from 'react';
import '../../../../../css/BasicInformation/BasicInformation.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'react-image-crop/dist/ReactCrop.css';
import VideoUploadSection from '../VideoUploadSection/VideoUploadSection';
import ImageUploadSection from '../ImageUploadSection/ImageUploadSection';


const AddProduct = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [isVideoEditModalOpen, setVideoEditModalOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [productNameError, setProductNameError] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');




    const handleProductNameChange = (event) => {
        const value = event.target.value;
        setProductName(value);

        if (value.trim() === '') {
            setProductNameError('Không được để trống ô');
        } else if (value.length < 10) {
            setProductNameError('Tên sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí tự.');
        } else {
            setProductNameError('');
        }
    };

    const handleProductCategoryChange = (event) => {
        setProductCategory(event.target.value);
    };

    const handleProductDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

    const onValidVideoSelected = () => {
        setVideoEditModalOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý submit tại đây
    };
    const handleImageCropped = (croppedImageUrl) => {
        const updatedImages = selectedImages.map((image) => {
            if (image === currentImage) {
                return croppedImageUrl; // Sử dụng URL của hình ảnh đã cắt
            }
            return image;
        });
        setSelectedImages(updatedImages);
        setIsModalOpen(false); // Đóng modal sau khi cắt xong
        setCurrentImage(null); // Xóa hình ảnh hiện tại khỏi state
    };



    // Giả sử đây là hàm để mở modal và thiết lập src của ảnh
    const openCropModal = (imageSrc) => {
        setImageSrc(imageSrc); // Thiết lập đường dẫn ảnh
        setIsModalOpen(true);  // Mở modal
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e, type) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFiles(files, type);
        }
    };

    //phần xử lí ảnh và video
    const handleFiles = async (files, type) => {
        if (files.length === 0) return;

        if (type === 'image') {
            const newImages = Array.from(files).map(file => {
                if (!file.type.startsWith('image/')) return null;
                const url = URL.createObjectURL(file);
                if (selectedImages.includes(url)) return null; // Ngăn chặn thêm ảnh trùng lặp
                return url;
            }).filter(url => url != null);
            setSelectedImages(prevImages => [...new Set([...prevImages, ...newImages])].slice(0, 9));
        } else if (type === 'video') {
            const file = files[0];
            if (file.type === 'video/mp4') {
                try {
                    await validateVideo(file); // Giả sử bạn có hàm validateVideo
                    const url = URL.createObjectURL(file);
                    if (selectedVideo !== url) { // Ngăn chặn thêm video trùng lặp
                        setSelectedVideo(url);
                        setVideoEditModalOpen(true)
                    }
                } catch (error) {
                    alert(error);
                }
            } else {
                Swal.fire({
                    title: "Thông báo",
                    text: "Chỉ có thể nhập vào file MP4",
                    confirmButtonText: "Đóng",
                    confirmButtonColor: 'red',
                });
            }
        }
    };


    //đây là phần cắt ảnh
    const handleEditImage = (image) => {
        setCurrentImage(image); // Cập nhật trạng thái currentImage với đường dẫn ảnh được chọn
        setIsModalOpen(true); // Mở modal
    };

    const handleFileButtonClick = (type) => {
        document.getElementById(`product-${type}`).click();
    };
    //phần này là delete ảnh và video
    const handleDeleteImage = (index) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };
    const removeVideo = () => {
        setSelectedVideo(null);
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('imageIndex', index);
    };

    const handleDrop = (e, dropIndex) => {
        const dragIndex = parseInt(e.dataTransfer.getData('imageIndex'), 10);
        if (dragIndex !== dropIndex) {
            let newImages = [...selectedImages];
            const draggedImage = newImages[dragIndex];
            newImages.splice(dragIndex, 1);
            newImages.splice(dropIndex, 0, draggedImage);
            setSelectedImages(newImages);
        }
    };

    //phần video
    const validateVideo = (file) => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = function () {
                window.URL.revokeObjectURL(video.src);
                if (video.duration < 10 || video.duration > 60) {
                    reject('Độ dài video không phù hợp (10s-60s).');
                } else if (video.videoWidth > 1280 || video.videoHeight > 1280) {
                    reject('Độ phân giải video không phù hợp (tối đa 1280x1280px).');
                } else {
                    resolve(true);
                }
            };
            video.onerror = () => {
                reject('Không thể tải video để kiểm tra.');
            };
            video.src = URL.createObjectURL(file);
        });
    };

    const MySwal = withReactContent(Swal);

    const showCroppedImage = (imageUrl) => {
        console.log("showCroppedImage called with URL:", imageUrl); // Thêm dòng này để debug
        MySwal.fire({
            imageUrl: imageUrl,
            imageAlt: 'Cropped Image',
            showConfirmButton: false,
            width: 'auto',
            backdrop: true,
        });
    };




    return (
        <div className="BasicInformation_container">
            <h1>Thêm sản phẩm</h1>
            <form action="/" method="post" onSubmit={handleSubmit}>
                <p>Hình ảnh sản phẩm___
                    *Hình ảnh tỷ lệ 1:1</p>
                <ImageUploadSection
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    handleDeleteImage={handleDeleteImage}
                    handleEditImage={handleEditImage}
                    handleFileButtonClick={handleFileButtonClick}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    handleFiles={handleFiles}
                    handleDragStart={handleDragStart}
                    handleDrop={handleDrop}
                />

                {/* đây là phần cắt ảnh */}

                {/* phần này là video */}
                <p>Video sản phẩm</p>
                <div className="video-upload-container">
                    <VideoUploadSection
                        selectedVideo={selectedVideo}
                        handleFileButtonClick={handleFileButtonClick}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        handleFiles={handleFiles}
                        removeVideo={removeVideo}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="product-name">Tên sản Phẩm</label>
                    <input
                        name="product-name"
                        id="product-name"
                        className={`form-control ${productNameError ? 'error' : ''}`}
                        placeholder="Nhập tên sản phẩm"
                        maxLength="120"
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                    {productNameError && <div className="error-message">{productNameError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="product-category">Ngành hàng</label>
                    <select
                        name="product-category"
                        id="product-category"
                        className="form-control"
                        value={productCategory}
                        onChange={handleProductCategoryChange}>
                        <option value="">Chọn ngành hàng</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="product-description">Mô tả sản phẩm</label>
                    <textarea
                        name="product-description"
                        id="product-description"
                        className="form-control"
                        placeholder="Nhập mô tả sản phẩm"
                        maxLength="3000"
                        value={productDescription}
                        onChange={handleProductDescriptionChange}
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;