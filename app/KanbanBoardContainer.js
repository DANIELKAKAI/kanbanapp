import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type':'application/json',
    Authorization: 'geoffreygicheha@gmail.com'
};

class KanbanBoardContainer extends Component{
    constructor(){
        super(...arguments);
        this.state ={
            cards:[],
        };
    }

    componentDidMount(){
        fetch(API_URL+'/cards',{headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards : responseData})
            })
            .catch((error)=>{
                console.log('Error fetching and parsing data', error)
            });
    }

    addTask(cardId, taskName){
        //find the index of the card
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

        //Create a new task with the given name and Temporary ID
        let newTask = {id:Date.now(), name:taskName, done:false};

        //Create a new Object and push the new task to the array of tasks
        let nextState = update(this.state.cards,{
            [cardIndex]: {
                tasks:{$push:[newTask]}
            }
        });

        //Set the Component state to the mutated object
        this.setState({cards:nextState});

        //Call the API to add the task on the Server
        fetch('${API_URL}/cards/${cardId}/tasks',{
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
            .then((response) => response.json())
            .then((responseData) => {
                //When the server returns the definitive ID
                //used for the new Task on the Server, update it on React
                newTask.id = responseData.id;
                this.setState({cards:nextState});
            })
            .catch((error) =>{
                this.setState(prevState);
            });
    }

    deleteTask(cardId, taskId, taskIndex){
        //find the index of the card
        let cardIndex = this.state.cards.findIndex((card)=> card.id == cardId);

        //create a nw object without the task
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{$splice:[[taskIndex,1]]}
            }
        });

        //Set the Component State to the mutated Object
        this.setState({cards:nextState});

        //Call the API to remove the task on the server
        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}',{
            method:'put',
            headers: API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        });
    }

    toggleTask(cardId, taskId,taskIndex){
        //Keep a reference to the original state prior to the mutations
        //in case we need to revert the optimistic changes in the UI
        let prevState = this.state;

        //find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        //Save a reference to the task's 'done' value
        let newDoneValue;

        //Using the $apply command, we will change the done value to its opposite
        let nextState = update(
            this.state.cards, {
                tasks: {
                    [taskIndex]: {
                        done: {$apply: (done) => {
                            newDoneValue = !done
                            return newDoneValue;
                            }
                        }
                    }
                }
            });

            // set the component state to the mutated object
            this.setState({cards:nextState});

            // Call the API to toggle the task on the server
            fetch('${API_URL}/cards/${cardId}/tasks/${taskId}',{
                method: 'put',
                headers: API_HEADERS,
                body: JSON.stringify({done:newDoneValue})
            })
                .then((response) =>{
                    if(!response.ok){
                        // Throw an error if server response wasn't 'ok'
                        // so we can revert back the optimistic changes
                        // made to the UI.
                        throw new Error("Server Response wasn't OK")
                    }
                })
                .catch((error)=>{
                    console.error("Fetch error:", error)
                    this.setState(prevState);
                });
    }

    render(){
        return (<KanbanBoard cards={this.state.cards}
                            taskCallbacks={{
                                toggle: this.toggleTask.bind(this),
                                delete: this.deleteTask.bind(this),
                                add: this.addTask.bind(this)
                            }} />
        )
    }
}
export default KanbanBoardContainer;