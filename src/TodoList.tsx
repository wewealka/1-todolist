
import { InitialTasks } from './data/DataAppBLL-1-todolist';
import { ConceptWindows } from './layout/ConceptWindows';




export const TodoList = () => {


    return (
        <div style={{ display: 'flex' }}>
            <div className="Todolist" style={{ marginRight: '20px' }} >
                <ConceptWindows title={InitialTasks[0].title} tasks={InitialTasks[0].tasks} />
            </div>
            <div className="Todolist" style={{ marginRight: '20px' }}>
                <ConceptWindows title={InitialTasks[0].title} tasks={InitialTasks[1].tasks} />
            </div>
            <div className="Todolist" style={{ marginRight: '20px' }}>
                <ConceptWindows title={InitialTasks[0].title} tasks={InitialTasks[2].tasks} />
            </div>
        </div>
    )
}