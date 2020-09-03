import React,{Component} from 'react'; 
import Cardpedido from './CardPedido'
import Grid from "@material-ui/core/Grid";

class ColunaPedidos extends Component{
    constructor() {
        super();
        this.state={
            dados : ""}
    }


    updateColuna(a){
        this.setState({dados:a})
    }

    render(){
        return(
        <Grid>
            {this.state.dados}
        </Grid>
    )}

}

export default ColunaPedidos