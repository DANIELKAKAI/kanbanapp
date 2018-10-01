import React, {Component} from 'react';
import Checklist from './Checklist';

class Card extends Component{
    constructor(){
        super(...arguments);
        this.state ={
            showDetails:false
        };
    }

    toggleDetails(){
        this.setState({showDetails: !this.state.showDetails});
    }

    render(){
        let cardDetails;
        if(this.state.showDetails){
            cardDetails =(
                <div className="card">
                    <div className="card_title">{this.props.title}</div>
                    <div className="card_details">
                        {this.props.description}
                        <Checklist cardId={this.props.id} tasks={this.props.tasks} />
                    </div>
                </div>    
            );
        };
        
        return(
            <div className="card">
                <div className="card_title" onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
                    {cardDetails}
            </div>
        );
    }
}

export default Card;