import React, {Component} from 'react';

class SingleProperty extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <img src={this.props.}/>
                <div>{this.props.title}</div>
                <div>baths</div>
            </div>
        )
    }
}





export default SingleProperty;