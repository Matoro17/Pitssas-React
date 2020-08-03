import React,{Component} from "react";
import Paper from '@material-ui/core/Paper';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import url from '../env.json';

class CardPedido extends Component {
    constructor(){
        super();
        this.state ={
            isLoading: true,
        };
        this.updatePedidoPronto = this.updatePedidoPronto.bind(this)
        this.updatePedidoEnviado = this.updatePedidoEnviado.bind(this)
    };

    

    componentDidMount() {
        this.setState({isLoading: true})
        fetch(url.url+'/clientes/'+this.props.clienteid)
          .then(response => response.json())
          .then(data => this.setState({ dados: data, isLoading: false }));
      }

    updatePedidoPronto(id){
        fetch(url.url+'/pedidos/pronto/'+id,{method:"put"})
          .then(response => response.json())
          .then(response => {
              console.log(response)
              this.setState({response: response, isLoading: false })});
              this.props.rerenderParentCallback()
              this.forceUpdate()
    }

    updatePedidoEnviado(id){
        fetch(url.url+'/pedidos/enviado/'+id,{method:"put"})
          .then(response => response.json())
          .then(response => {
              console.log(response)
              this.setState({response: response, isLoading: false })});
        this.props.rerenderParentCallback()
        this.forceUpdate()
    }

    updatePedidoArquivar(id){
        fetch(url.url+'/pedidos/arquivar/'+id,{method:"put"})
        .then(response => response.json())
        .then(response => {
            console.log(response)
            this.setState({response: response, isLoading: false })});
      this.props.rerenderParentCallback()
      this.forceUpdate()
    }
        
    render(){
        let renderStatus,button,status;
        if(this.state.isLoading){
            return <p>Loading</p>
        }
        if(!this.props.pronto && !this.props.enviado){
            renderStatus= <AccessAlarmIcon fontSize={"large"}></AccessAlarmIcon>  
            button = <Button onClick={()=>this.updatePedidoPronto(this.props.pedidoid)} variant="contained" color='primary'>Pedido Pronto</Button> 
            status ="novo pedido"                     
        }else if(this.props.pronto && !this.props.enviado){
            renderStatus=<CheckIcon fontSize={"large"}></CheckIcon>  
            button = <Button onClick={()=>this.updatePedidoEnviado(this.props.pedidoid)} variant="contained" color='primary'>Pedido Enviado</Button>  
            status="Pedido Pronto"
        }else if(this.props.pronto && this.props.enviado && !this.props.arquivado){
            console.log(this.props.arquivado)
            renderStatus=<SendIcon fontSize={"large"}></SendIcon>   
            button = <Button onClick={()=>this.updatePedidoArquivar(this.props.pedidoid)} variant="contained" color='primary'>Arquivar Pedido</Button> 
            status="Pedido Enviado"
        }else{
            renderStatus=<FolderIcon fontSize={"large"}></FolderIcon>
            status="Arquivado"
        }
        

        return(
            <Paper elevation={3} variant="outlined" square>
                <div style={{margin: '20px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <p>Pedido: {this.props.pedido}<br/>
                            Cliente: {this.state.dados[0].nome}<br/>
                            Bairro: {this.state.dados[0].bairro}<br/>
                            Entrega: {this.props.entrega}<br/>
                            Subtotal: {this.props.subtotal}<br/></p>
                        </Grid>
                        <Grid item xs={4}>
                            <div  style={{textAlign:'right'}}>
                                <div style={{align:'center'}}>
                                    {status}{renderStatus}
                                </div>
                                
                                <div>
                                    {button}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    
                </div>
            </Paper>
        )
    };

};

export default CardPedido;