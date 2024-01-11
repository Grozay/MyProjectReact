// import React, { useState } from "react";

// const DetailForm = () => {
//     const [data, setData] = useState({
//         brand: "",
//         origin: "",
//         material: "",
//         manufacturer: "",
//         address: "",
//     });

//     const handleChange = (e) => {
//         setData({
//             ...data,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Gửi dữ liệu lên server
//     };

//     return (
//         <div>
//             <h2>Thông tin chi tiết</h2>
//             <p>Hoàn thành: 0 / 5 Điền thông tin thuộc tính để tăng mức độ hiển thị cho sản phẩm Xem hướng dẫn bổ sung thuộc tính.</p>
//             <div className="form-group">
//                 <label htmlFor="product-category">Thương hiệu
//                 </label>
//                 <select
//                     name="product-category"
//                     id="product-category"
//                     className="form-control"
//                     value={productCategory}
//                     onChange={handleProductCategoryChange}>
//                     <option value="">Chọn ngành hàng</option>
//                     <option value="Khác">Khác</option>
//                 </select>
//             </div>
//             <div className="form-group">
//                 <label htmlFor="product-category">Xuất xứ</label>
//                 <select
//                     name="product-category"
//                     id="product-category"
//                     className="form-control"
//                     value={productCategory}
//                     onChange={handleProductCategoryChange}>
//                     <option value="">Chọn ngành hàng</option>
//                     <option value="Khác">Khác</option>
//                 </select>
//             </div>
//             <div className="form-group">
//                 <label htmlFor="product-category">Chất liệu</label>
//                 <select
//                     name="product-category"
//                     id="product-category"
//                     className="form-control"
//                     value={productCategory}
//                     onChange={handleProductCategoryChange}>
//                     <option value="">Chọn ngành hàng</option>
//                     <option value="Khác">Khác</option>
//                 </select>
//             </div>
//             <div className="form-group">
//                 <label htmlFor="product-category">Tên tổ chức chịu trách nhiệm sản xuất</label>
//                 <select
//                     name="product-category"
//                     id="product-category"
//                     className="form-control"
//                     value={productCategory}
//                     onChange={handleProductCategoryChange}>
//                     <option value="">Chọn ngành hàng</option>
//                     <option value="Khác">Khác</option>
//                 </select>
//             </div>
//             <div className="form-group">
//                 <label htmlFor="product-category">Địa chỉ tổ chức chịu trách nhiệm sản xuất</label>
//                 <select
//                     name="product-category"
//                     id="product-category"
//                     className="form-control"
//                     value={productCategory}
//                     onChange={handleProductCategoryChange}>
//                     <option value="">Chọn ngành hàng</option>
//                     <option value="Khác">Khác</option>
//                 </select>
//             </div>
//         </div>
//     );
// };

// export default DetailForm;
