import React,{Component} from 'react';
import './App.css';

class App extends React.Component {
 
  constructor(props) {
    super(props);
    
   
    this.state = {};
    this.state.filterText = "";
    this.state.products = [ {
      id:'1' ,
      price: '',
      manufacturer:'',
      fabric:'',
      model:'',
      date :''  ,
      name: ''

    }

    ];

  }
  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };


  
  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product;
     product = {
        id: id,
        price: '',
        manufacturer:'',
        fabric:'',
        model:'',
        date :''  ,
        name: ''
    }


    this.state.products.push(product);
    this.setState(this.state.products);

  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
var products = this.state.products.slice();
  var newProducts = products.map(function(product) {

    for (var key in product) {
      if (key == item.name && product.id == item.id) {
        product[key] = item.value;

      }
    }
    return product;
  });
    this.setState({products:newProducts});
 
  };
  render() {

    return (
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} 
        onRowAdd={this.handleAddEvent.bind(this)} 
        onRowDel={this.handleRowDel.bind(this)} 
        products={this.state.products} 
        filterText={this.state.filterText}/>
      </div>
    );

  }

}
class SearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      

      <div>
         <center> <h3>Clothing Inventory </h3> </center> 
        <input type="text" placeholder="Find product by name..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
      </div>

    );
  }

}

class ProductTable extends React.Component {

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.model.indexOf(filterText) === -1 && product.name.indexOf(filterText)===-1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
    });
    return (
       <form> 
        <table >
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Fabric</th>
              <th>Price</th>
              <th>Manufacturer</th>
              <th>Date of Manufacture</th>
            </tr>
          </thead>

          <tbody>
            {product}

          </tbody>

        </table>
        <button type="button" onClick={this.props.onRowAdd}>Add Product</button>
        </form>
      
   
     

       );

  }

}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  render() {

    return (
      <tr >
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "name",
          value: this.props.product.name,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "model",
          value: this.props.product.model,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "fabric",
          value: this.props.product.fabric,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "price",
          value: this.props.product.price,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "manufacturer",
          value: this.props.product.manufacturer,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "date",
          value: this.props.product.date,
  
          id: this.props.product.id
        }}/>


        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="delete"/>
        </td>
      </tr>
    );

  }

}

class EditableCell extends React.Component {


  render() {
    let inputType;
    if (this.props.cellData.type === 'date') {
      inputType = 'date';
    } else {
      inputType = 'text';
    }

    return (
      
      <td>
        <input type={inputType} name={this.props.cellData.type} id={this.props.cellData.id} 
        value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}
export default App;


