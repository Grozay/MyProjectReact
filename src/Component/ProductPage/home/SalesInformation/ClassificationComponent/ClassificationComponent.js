import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import ClassificationInput from '../ClassificationInput/ClassificationInput';
import '../../../../../css/SalesInformation/ClassificationComponent/ClassificationComponent.scss'
import ClassificationInput2 from '../ClassificationInput/ClassificationInput2';


function ClassificationComponent() {
    const [classifications, setClassifications] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [classifications2, setClassifications2] = useState([]);
    const [draggedIndex2, setDraggedIndex2] = useState(null);


    const addClassification = () => {
        if (classifications.length === 0) {
            setClassifications(['', '']);
        } else {
            setClassifications([...classifications, '']);
        }
    };

    const handleClassificationChange = (index, event) => {
        const newClassifications = [...classifications];
        newClassifications[index] = event.target.value;
        setClassifications(newClassifications);

        if (index === classifications.length - 1 && event.target.value !== '') {
            setClassifications([...newClassifications, '']);
        }
    };

    const handleRemoveClassification = (index) => {
        const newClassifications = classifications.filter((_, i) => i !== index);
        setClassifications(newClassifications);
    };

    const handleRemoveAllClassifications = () => {
        setClassifications([]);
        if (classifications2.length > 0) {
            setClassifications(classifications2);
            setClassifications2([]);
        }
    };

    const onDragStart = (e, index) => {
        // e.preventDefault();
        setDraggedIndex(index);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            const draggedItem = classifications[draggedIndex];
            let updatedClassifications = [...classifications];

            // Remove item from the original list
            updatedClassifications.splice(draggedIndex, 1);

            // Insert the item into the new list at the dropIndex
            if (dropIndex === undefined) {
                // Do nothing if dropped outside the list
                setDraggedIndex(null);
                return;
            }

            updatedClassifications.splice(dropIndex, 0, draggedItem);

            setClassifications(updatedClassifications);
            setDraggedIndex(null);
        }
    };




    //phần input 2


    const addClassification2 = () => {
        if (classifications2.length === 0) {
            setClassifications2(['', '']);
        } else {
            setClassifications2([...classifications2, '', '']);
        }
    };

    const handleRemoveAllClassifications2 = () => {
        setClassifications2([]);
    };

    const handleClassificationChange2 = (index2, event) => {
        const newClassifications2 = [...classifications2];
        newClassifications2[index2] = event.target.value;
        setClassifications2(newClassifications2);

        if (index2 === classifications2.length - 1 && event.target.value !== '') {
            setClassifications2([...newClassifications2, '']);
        }
    };

    const handleRemoveClassification2 = (index2) => {
        const newClassifications2 = classifications2.filter((_, i) => i !== index2);
        setClassifications2(newClassifications2);
    };

    const onDragStart2 = (e, index2) => {
        // e.preventDefault();
        setDraggedIndex2(index2);
    };

    const onDragOver2 = (e) => {
        e.preventDefault();
    };

    const onDrop2 = (e, dropIndex2) => {
        e.preventDefault();
        if (draggedIndex2 !== null && draggedIndex2 !== dropIndex2) {
            const draggedItem2 = classifications2[draggedIndex2];
            let updatedClassifications2 = [...classifications2];

            // Remove item from the original list
            updatedClassifications2.splice(draggedIndex2, 1);

            // Insert the item into the new list at the dropIndex
            if (dropIndex2 === 0) {
                updatedClassifications2 = [draggedItem2, ...updatedClassifications2];
            } else {
                updatedClassifications2.splice(dropIndex2, 0, draggedItem2);
            }

            setClassifications2(updatedClassifications2);
            setDraggedIndex2(null);
        }
    };

    const transitions2 = useTransition(classifications2, {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        leave: { opacity: 0, transform: 'translateY(-10px)' },
        keys: classifications2.map((_, index2) => index2),
    });


    const transitions = useTransition(classifications, {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        leave: { opacity: 0, transform: 'translateY(-10px)' },
        keys: classifications.map((_, index) => index),
    });

    return (
        <div className='input_container'>
            <label htmlFor="classify" className='title_inputcontainer'>Phân loại hàng</label>
            <div className='input_container_list1'>
                {(classifications.length === 0 && classifications2.length === 0) && (
                    <button onClick={addClassification} className='add_classify'>
                        <i className="fa-solid fa-plus"></i>
                        Thêm phân loại
                    </button>
                )}
                {classifications.length > 0 && (
                    <div onClick={handleRemoveAllClassifications}><i className="fa-solid fa-xmark fa-xl delete_input_all1"></i></div>
                )}
                {transitions((style, classification, _, index) => (
                    <animated.div style={style}
                        className={index === 0 ? 'first-classification' : ''}>
                        <ClassificationInput
                            key={index}
                            index={index}
                            name={classification}
                            classifications={classifications}
                            totalClassifications={classifications.length}
                            onChange={(e) => handleClassificationChange(index, e)}
                            onRemove={handleRemoveClassification}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            canRemoveAndDrag={classifications.length > 2 || index !== 1}
                            shouldShowButtons={index === 1 || (index >= 2 && classification)}
                            onRemoveAll={handleRemoveAllClassifications}
                        />
                    </animated.div>
                ))}
            </div>
            <div className='between'></div>
            <div className='input_container_list1'>
                {classifications2.length === 0 && classifications.length > 0 && (
                    <button onClick={addClassification2} className='add_classify2'> <i className="fa-solid fa-plus"></i>Thêm phân loại 2</button>
                )}

                {classifications2.length > 0 && (
                    <div onClick={handleRemoveAllClassifications2}><i className="fa-solid fa-xmark fa-xl delete_input_all2"></i></div>
                )}
                {transitions2((style, classification2, _, index2) => (
                    <animated.div style={style}
                        className={index2 === 0 ? 'first-classification' : ''}>
                        <ClassificationInput2
                            key={index2}
                            index={index2}
                            name={classification2}
                            classifications2={classifications2}
                            totalClassifications2={classifications2.length}
                            onChange={(e) => handleClassificationChange2(index2, e)}
                            onRemove={handleRemoveClassification2}
                            onDragStart2={onDragStart2}
                            onDragOver2={onDragOver2}
                            onDrop2={onDrop2}
                            canRemoveAndDrag={classifications2.length > 2 || index2 !== 1}
                            shouldShowButtons={index2 === 1 || (index2 >= 2 && classification2)}
                            onRemoveAll={handleRemoveAllClassifications2}
                        />
                    </animated.div>
                ))}
            </div>
        </div>
    );
}

export default ClassificationComponent;
