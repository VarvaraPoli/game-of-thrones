import React from 'react';
import {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import {withRouter} from 'react-router-dom';
import ErrorMessage from '../errorMessage';
import Service from '../../service';

class BooksPage extends Component {
  service = new Service();

  state = {
    error: false
  }


  componentDidCatch(){
    this.setState({error: true});
  }

  render(){
    if(this.state.error){
      return <ErrorMessage/>
    }


    return (
      <ItemList onItemSelected={(itemId)=> this.props.history.push(`/books/${itemId}`)}
                getData={this.service.getAllBooks}
                renderItem={({name}) => name}/>
    )    
  }
}

export default withRouter(BooksPage);