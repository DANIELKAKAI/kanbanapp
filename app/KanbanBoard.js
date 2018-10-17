import React, {Component, PropTypes} from 'react';
import List from './List';

class KanbanBoard extends Component{
    render(){
        //Calling the List compenents and passing props using a Filter to the API-->
        return(
            <div className="app">
                <List id='todo' title="To Do" taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card) => card.status == "todo")
                } />
                <List id='in-progress' taskCallbacks={this.props.taskCallbacks} title="In Progress" cards={
                    this.props.cards.filter((card) => card.status == "in-progress")
                } />
                <List id='done' title='Done' taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card) => card.status == "done")
                } />
            </div>
        );
    }
}

KanbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
};

export default KanbanBoard;