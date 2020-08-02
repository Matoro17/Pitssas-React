import React,{Component} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class CardPedido extends Component {
        

    render(){
        
        return(
            <div>
                <p>Pedido: {this.props.pedido}</p>
                <p>Cliente: {this.props.clienteid}</p>
                
            </div>
        )
    };

};

export default CardPedido;