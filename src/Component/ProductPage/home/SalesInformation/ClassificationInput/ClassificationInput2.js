import React, { useEffect, useState } from 'react';
import '../../../../../css/SalesInformation/ClassificationInput/ClassificationInput.scss';

const ClassificationInput2 = ({
    index,
    name,
    onRemove,
    onChange,
    totalClassifications2,
    onDragStart2,
    onDragOver2,
    onDrop2,
    classifications2 = [],
    ...restProps
}) => {
    const [hasInput, setHasInput] = useState(name !== '');
    const [error, setError] = useState(null);

    useEffect(() => {
        setHasInput(name !== '');
    }, [name]);

    const handleMouseDown = (e) => {
        if (e.target.closest('.classification-drag-icon')) {
            e.stopPropagation();
            onDragStart2(e, index);
        }
    };

    const handleDragOver = (e) => {
        if (index !== 0 && index !== totalClassifications2 - 1) {
            onDragOver2(e);
        }
    };

    const handleDrop = (e) => {
        if (index !== 0 && index !== totalClassifications2 - 1) {
            onDrop2(e, index);
        }
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setError(null);
        const isDuplicate = classifications2.some((item, idx) => item === newValue && idx !== index);
        const normalizedValue = newValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        if (normalizedValue.length > 20) {
            e.preventDefault();
            return;
        }

        if (classifications2.some((item, idx) => item === newValue && idx !== index)) {
            setError(isDuplicate ? 'Giá trị này đã tồn tại.' : null);
        }

        if (!hasInput && newValue !== '') {
            setHasInput(true);
        }

        setHasInput(newValue !== '');
        onChange(e);
    };

    const isButtonDisabled = index <= 2 && totalClassifications2 <= 3;
    const shouldShowButtons = (
        index === 1 ||
        (index === 2 && hasInput) ||
        (index > 2 && hasInput && totalClassifications2 > 3)
    );



    return (
        <>
            <label className='label_classification'>
                {index === 0 ? 'Nhóm phân loại 2:' : (index === 1 ? 'Phân loại hàng:' : '')}
            </label>
            <div
                className="classification_input"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragStart={handleMouseDown}
            >
                <div className='classification_input_list'>
                    <div className={index === 2 ? 'classification_input_2' : 'classification_input_contaier'}

                    >
                        <input
                            className={error ? 'input-error' : ''}
                            type="text"
                            value={name}
                            onChange={handleChange}
                            placeholder='nhóm phân loại'
                        />
                        {(index > 0) ? (
                            <div className="character-count">{name.length}/20</div>
                        ) : (
                            <div className="character-count1">{name.length}/14</div>
                        )}
                    </div>
                    {shouldShowButtons && (
                        <div className="classification_btn_contaier">
                            <button
                                onMouseDown={!isButtonDisabled ? handleMouseDown : null}
                                className={`classification-button ${isButtonDisabled ? "button-disabled" : ""}`}
                                draggable={!isButtonDisabled}
                            >
                                <i className="fa-solid fa-up-down-left-right classification-drag-icon"></i>
                            </button>
                            <button
                                onClick={!isButtonDisabled ? () => onRemove(index) : null}
                                className={`classification-button ${isButtonDisabled ? "button-disabled" : ""}`}
                            >
                                <i className="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    )}
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>
        </>
    );
};

export default ClassificationInput2;
