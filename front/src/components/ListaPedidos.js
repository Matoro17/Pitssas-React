import React, { Component } from "react";
import CardPedido from "./CardPedido";
import ColunaPedidos from "./ColunaPedidos";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import url from "../env.json";


class ListaPedidos extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      colunaNew: new ColunaPedidos,
    };
  }

  checkChange() {
    //console.log(this.state);

    if (this.isLoading !== null) {
      const self = this;
      fetch(url.url + "/pedidos")
        .then((response) => response.json())
        .then((data) => {
          if (JSON.stringify(data) !== JSON.stringify(self.state.dados)) {
            self.loadPedidos();

          }
        });
    }
  }

  loadPedidos() {
    this.setState({ isLoading: true });
    fetch(url.url + "/pedidos")
      .then((response) => response.json())
      .then((data) => {
        const dadosComponentNew = [];
        const dadosComponentReady = [];
        const dadosComponentSent = [];
        const dadosComponentArquivado = [];
        this.setState({ dados: data, isLoading: false });

        for (const [index, value] of this.state.dados.entries()) {
          if (!value.pronto && !value.enviado) {
            dadosComponentNew.push(
              <CardPedido
                index={index}
                key={value.pedidoid}
                pedidoid={value.pedidoid}
                pedido={value.pedido}
                subtotal={value.subtotal}
                clienteid={value.clienteid}
                entrega={value.entrega}
                pagamento={value.pagamento}
                troco={value.troco}
                pronto={value.pronto}
                enviado={value.enviado}
                arquivado={value.arquivado}
                //rerenderParentCallback={this.rerenderParentCallback}
              />
            );
          } else if (value.pronto && !value.enviado) {
            dadosComponentReady.push(
              <CardPedido
                key={value.pedidoid}
                pedido={value.pedido}
                pedidoid={value.pedidoid}
                subtotal={value.subtotal}
                clienteid={value.clienteid}
                entrega={value.entrega}
                pagamento={value.pagamento}
                troco={value.troco}
                pronto={value.pronto}
                enviado={value.enviado}
                arquivado={value.arquivado}
                //rerenderParentCallback={this.rerenderParentCallback}
              />
            );
          } else if (value.pronto && value.enviado && !value.arquivado) {
            dadosComponentSent.push(
              <CardPedido
                key={value.pedidoid}
                pedido={value.pedido}
                pedidoid={value.pedidoid}
                subtotal={value.subtotal}
                clienteid={value.clienteid}
                entrega={value.entrega}
                pagamento={value.pagamento}
                troco={value.troco}
                pronto={value.pronto}
                enviado={value.enviado}
                arquivado={value.arquivado}
                //rerenderParentCallback={this.rerenderParentCallback}
              />
            );
          } else {
            dadosComponentArquivado.push(
              <CardPedido
                key={value.pedidoid}
                pedido={value.pedido}
                pedidoid={value.pedidoid}
                subtotal={value.subtotal}
                clienteid={value.clienteid}
                entrega={value.entrega}
                pagamento={value.pagamento}
                troco={value.troco}
                pronto={value.pronto}
                enviado={value.enviado}
                arquivado={value.arquivado}
                //rerenderParentCallback={this.rerenderParentCallback}
              />
            );
          }
        }
        



        const dadosComponent = this.state.dados.map((dado) => (
          <CardPedido
            key={dado.pedidoid}
            pedido={dado.pedido}
            subtotal={dado.subtotal}
            clienteid={dado.clienteid}
            entrega={dado.entrega}
            pagamento={dado.pagamento}
            troco={dado.troco}
            pronto={dado.pronto}
            enviado={dado.enviado}
          />
        ));
        //if(this.state.dadosComponentNew !== dadosComponentNew){
            //this.setState({dadosComponentNew: dadosComponentNew});
          //  this.state.colunaNew.updateColuna(dadosComponentNew)
        //}
        this.setState({
          dadosComponent: dadosComponent,
          dadosComponentNew: dadosComponentNew,
          dadosComponentReady: dadosComponentReady,
          dadosComponentSent: dadosComponentSent,
          dadosComponentArquivado: dadosComponentArquivado,
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }

  componentDidMount() {
    this.loadPedidos();
    const self = this;


    setInterval(() => {
      self.checkChange.call(self);
    }, 1000);
  }

  render() {
    const {
      isLoading,
      dadosComponentNew,
      dadosComponentReady,
      dadosComponentSent,
    } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper justify="center" spacing={2}>
            <p style={{ margin: "5px" }}>Novos Pedidos</p>
            <Grid>{dadosComponentNew}</Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper justify="center" spacing={2}>
            <p style={{ margin: "5px" }}>Pedidos Prontos</p>
            <Grid>{dadosComponentReady}</Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper justify="center" spacing={2}>
            <p style={{ margin: "5px" }}>Pedidos Enviados</p>
            <Grid>{dadosComponentSent}</Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default ListaPedidos;
