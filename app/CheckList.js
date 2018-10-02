import React, {Component, PropTypes} from 'react';

class CheckList extends Component{
    render(){
        /*Iteratively creating the cheklists using props*/
        let tasks = this.props.tasks.map((task) => (
            <li key={task.id} className="checklist__task">
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href="#" className="checklist_task--remove" />
            </li>
        ));
        
        return(
            <div className="checklist">
                <ul>{tasks}</ul>
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;