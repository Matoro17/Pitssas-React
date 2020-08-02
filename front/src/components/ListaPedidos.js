import React,{Component} from 'react';
import CardPedido from './CardPedido';


class ListaPedidos extends Component {
    

    constructor(){
        super();
        this.state ={
            isLoading: false,
        };
    };

    componentDidMount(){
        this.setState({isLoading: true})

        fetch('http://localhost:3000/api/pedidos')
        .then(response => response.json())
        .then(data => {
            
            this.setState({ dados: data, isLoading: false });
            
            const dadosComponent = this.state.dados.map(dado => 
                <CardPedido 
                    key={dado.pedidoid} 
                    pedido={dado.pedido}
                    subtotal={dado.subtotal}
                    clienteid={dado.clienteid}
                    entrega = {dado.entrega}
                    pagamento = {dado.pagamento}
                    troco = {dado.troco}
                    pronto = {dado.pronto}
                    enviado = {dado.enviado}
                    
                />
            );
            this.setState({dadosComponent: dadosComponent});
        })
        .catch(err =>{
            console.log("Error: "+err)
        }); 
        
        
        
    };

    render(){
        
        const {dadosComponent , isLoading} = this.state;

        if (isLoading){
            return <p>Loading ...</p>
        }
            return(
                <div>
                    {dadosComponent}
                </div>
            )
        
    };

};

export default ListaPedidos;