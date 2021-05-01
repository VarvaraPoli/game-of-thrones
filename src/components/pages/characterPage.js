import React from 'react';
import {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import Service from '../../service';
import styled from 'styled-components';

export default class CharacterPage extends Component {
  service = new Service();

  state = {
    selectedChar: 130,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({selectedChar: id})
  }

  componentDidCatch(){
    this.setState({error: true});
  }

  render(){
    if(this.state.error){
      return <ErrorMessage/>
    }

  const itemList = (
    <ItemList onItemSelected={this.onItemSelected}
                      getData={this.service.getAllCharacters}
                      renderItem={({name,gender}) => `${name} (${gender})`}/>
  )

  const charDetails = (
    <ItemDetails itemId={this.service.getCharacter(this.state.selectedChar)}>
      <Field field='gender' label='Gender'/>
      <Field field='born' label='Born'/>
      <Field field='died' label='Died'/>
      <Field field='culture' label='Culture'/>
    </ItemDetails>
  )
    return (
      <RowBlock left={itemList} right={charDetails} />
    )
  }
}