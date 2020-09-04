import React, {Component} from 'react'
import url from "../env.json";
import TextField from '@material-ui/core/TextField';
class PedidoForm extends Component{

    constructor(){
        super()
        this.state ={
            
        }
    }

    loadClientesByIdentificador(iden){
        if(iden.target.value === ""){
            this.setState({findClient:0})
            return
        }
        this.setState({ isLoading: true });
        fetch(url.url + "/clientes/identificador/"+iden.target.value)
          .then((response) => response.json())
          .then((data) => {
              if(data[0] == undefined){
                  this.setState({findClient:0})
              }else{
                
                this.setState({atualCliente:data[0]})
                this.setState({findClient:1})
              }
            
            console.log(data[0])
          })
      }


    render(){
        const inputIden = this.state.inputIden;
        var er = this.state.findClient;
        if(!this.state.findClient){
            er = "error"
        }else{
            er = null
        }

        return(
            <div style={{backgroundColor:"white"}}>
                <TextField error={er} helperText={er === "error" ? 'Usuário não encontrado!' : ' '} inputMode="tel" variant="filled" placeholder="Identificador de Usuário" onChange={(e)=> this.loadClientesByIdentificador(e)}>
                </TextField>
                {this.state.findClient ? (
                    <p>
                        {this.state.atualCliente.nome}
                    </p>
                ):null}
            </div>
            

        )
    }
}

export default PedidoForm