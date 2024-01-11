import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BasicInformation from '../home/BasicInformation/BasicInformation/BasicInformation.js'
import SalesInformation from '../home/SalesInformation/SalesInformation.js';
import UnderNav from '../UnderNav/UnderNav.js';

const Synthetic = () => {
    return (
        <div>
            <BasicInformation />
            <DndProvider backend={HTML5Backend}>
                <SalesInformation />
            </DndProvider>
            <UnderNav />
        </div>
    )
}
export default Synthetic