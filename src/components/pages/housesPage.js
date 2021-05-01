import React from 'react';
import {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import Service from '../../service';
import styled from 'styled-components';

export default class HousesPage extends Component {
  service = new Service();

  state = {
    selectedHouse: 12,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({selectedHouse: id})
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
                      getData={this.service.getAllHouses}
                      renderItem={({name}) => name}/>
    )

    const houseDetails = (
      <ItemDetails itemId={this.service.getHouse(this.state.selectedHouse)}>
        <Field field='region' label='Region'/>
        <Field field='words' label='Words'/>
        <Field field='titles' label='Titles'/>
        <Field field='ancestralWeapons' label='Ancestral Weapons'/>
      </ItemDetails>
    )
    return (
      <RowBlock left={itemList} right={houseDetails} />
    ) 
  }
}