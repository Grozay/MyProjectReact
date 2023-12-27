import Swal from "sweetalert2";

const FileDropArea = ({ type, handleFileButtonClick, onDrop, onDragOver, handleFiles, iconClass, imageCount }) => {
    // Hàm onDrop đã được sửa đổi để kiểm tra nguồn gốc của file
    const modifiedOnDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const items = e.dataTransfer.items;

        if (items) {
            // Sử dụng DataTransferItemList để kiểm tra xem các mục có phải là tệp
            for (let i = 0; i < items.length; i++) {
                // Nếu mục không phải là loại 'file', không xử lý nó
                if (items[i].kind !== 'file') {
                    Swal.fire({
                        title: "Thông báo",
                        text: "Bạn chỉ có thể cho ảnh vào từ thư mục cục bộ!",
                        confirmButtonText: "Đóng",
                        confirmButtonColor: 'red',
                    });
                    return;
                }
            }

            const files = e.dataTransfer.files;
            handleFiles(files, type);
        }
    };

    return (
        <div
            className="drop-area"
            onDragOver={onDragOver}
            onDrop={(e) => modifiedOnDrop(e)}
            onClick={() => handleFileButtonClick(type)}
        >
            <i className={iconClass}></i>
            {type === 'image' && imageCount !== undefined && (
                <div className="image-count">{imageCount}/9</div>
            )}
            <p className='name_choosefile'>Thêm {type}</p>

            <input
                type="file"
                name={`product-${type}`}
                id={`product-${type}`}
                className="form-control"
                accept={type === 'image' ? 'image/*' : 'video/*'}
                style={{ display: 'none' }}
                onChange={(e) => handleFiles(e.target.files, type)}
                multiple={type === 'image'}
            />
        </div>
    );
};

export default FileDropArea;
