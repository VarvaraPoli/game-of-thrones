import React, {Component} from 'react';
import Service from '../../service';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
  service = new Service();

  render(){
    return (
      <ItemDetails itemId={this.service.getBook(this.props.bookId)}>
        <Field field='numberOfPages' label='Number of pages'/>
        <Field field='publisher' label='Publisher'/>
        <Field field='released' label='Released'/>
      </ItemDetails>
    )
  }
}