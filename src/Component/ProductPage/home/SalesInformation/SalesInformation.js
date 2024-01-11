import React, { useState } from 'react';
import '../../../../css/SalesInformation/SalesInformation.scss';
import ClassificationComponent from './ClassificationComponent/ClassificationComponent';

const SalesInformation = () => {

    return (
        <div className="salesinformation_container">
            <h1>Thông tin bán hàng</h1>
            <div className='salesinformation_list'>
                <div className='salesinformation_classify'>
                    <ClassificationComponent />
                </div>
                <div>
                    <div className="classification_table">
                        <h2>Bảng Phân Loại</h2>
                        {/* <table>
                            <thead>
                                <tr>
                                    <th>{classifications[0]}</th>
                                    <th>{classifications2[0]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classifications.map((classification, index) => {
                                    if (index === 0) return null; // Skip the first element as it's already used in thead
                                    return (
                                        <tr key={index}>
                                            <td>{classification}</td>
                                            <td>{classifications2[index]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table> */}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default SalesInformation;