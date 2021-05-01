import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Service from '../../service';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ItemDetailsDiv = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const Term = styled.span`
    font-weight: bold;
    span{
        color:white;
    }
`;

const Field  = ({item, field, label}) => {
  return (
    <ListGroupItem className="d-flex justify-content-between" role="button">
      <Term>{label}</Term>
      <span>{item[field]}</span>
    </ListGroupItem>
  )
}

export {Field}

export default class ItemDetails extends Component {

    service = new Service();

    state = {
        item: null,
        loading: false,
        error: false
    }

    onChangeLoading = (item) => {
        this.setState({loading: false, item})
    }

    componentDidMount() {
        this.updateItem();
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateItem();
        }
    }

    updateItem(){
        const{charId} = this.props;
        if(!charId){
            return;
        }

        this.setState({loading: true});

        charId.then(this.onChangeLoading).catch(() => this.err());
    }

    err(){
        this.setState({item: null, error: true})
    }

    render() {
        if(this.state.err && !this.state.item){
            return <ErrorMessage/>
        } else if(!this.state.item){
           return (
               <>
                 <Term><span>Please select a character</span></Term> 
               </>
           ) 
        }
        
        if(this.state.loading){
            return (
                <ItemDetailsDiv className='rounded'>
                    <Spinner/>
                </ItemDetailsDiv>
            )
        }
        
        const {item} = this.state;
        const {name} = item;

        return (
            <ItemDetailsDiv className='rounded'>
                <h4>{name}</h4>
                <ListGroup flush>
                   {React.Children.map(this.props.children, (child) => {
                      return React.cloneElement(child, {item});
                     } 
                   )}
                </ListGroup>
            </ItemDetailsDiv>
        );
    }
}