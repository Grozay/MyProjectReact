import '../../../css/UnderNav/UnderNav.scss'

const UnderNav = () => {
    return (
        <div className="undernav_container">
            <div className="undernav_list">
                <div className="undernav_list_btn">
                    <button>
                        Hủy
                    </button>
                </div>
                <div className="undernav_list_btn">
                    <button>
                        Lưu & Ẩn
                    </button>
                </div>
                <div className="undernav_list_btn">
                    <button>
                        Lưu & Hiển thị
                    </button>
                </div>
            </div>
        </div>
    )
}
export default UnderNav;