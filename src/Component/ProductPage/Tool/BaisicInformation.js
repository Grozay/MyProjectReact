const ValidateVideo = (file) => {
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
export default ValidateVideo
