import React from 'react';
import {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage,BooksPage, HousesPage, BooksItem} from '../pages';
import Service from '../../service';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import logo from './got.jpeg';

const Back = styled.div `
    background: black url(${logo}) center center no-repeat;
    background-size: cover;
    height: 1000px;	
`

const Button = styled.button`
  background-color: LightSteelBlue;
  color: white;
  width: 200px;
  height: 50px;
  margin: 0 auto 40px auto;
  border-radius: 5px;
  border: 2px solid gray;
  &:hover {
      border:2px solid white;
  }
  &:active, &:focus{
      outline:none;
  }
`;

const FirstPage = styled.h1`
  color: white;
  width:100%;
  text-align:center;
`
 
export default class App extends Component {
    service = new Service();

  state = {
      btnToggle: true,
      error: false,
    }

  componentDidCatch(){
      this.setState({error: true});
  }

  getButtonToggle = () =>{
    const {btnToggle} = this.state;
    this.setState({btnToggle: !btnToggle});
  }
  

  toggleChar(){
     return this.state.btnToggle ? <RandomChar/> : null; 
  }   

   render(){
       if(this.state.error){
           return <ErrorMessage/>
       }
     
       return (
        <Router>  
          <Back>
            <Container>
                <Header />
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        {this.toggleChar()}
                        <Button onClick={this.getButtonToggle}>Toggle random character</Button>
                    </Col>
                </Row>
            <>
               <Route path='/' exact  render={()=> <FirstPage>Welcome to medieval Europe!</FirstPage>}/>
               <Route path='/characters' component={CharacterPage}/>
               <Route path='/houses' component={HousesPage}/>
               <Route path='/books' exact component={BooksPage}/>
               <Route path='/books/:id' render={
                   ({match}) => {
                    const {id} = match.params; 

                    return <BooksItem bookId={id}/>
                  }
                }/>
            </>     
            </Container>
          </Back>  

        </Router>

    );
   }    
}

