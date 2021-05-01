import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
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

function ItemDetails ({itemId, children}) {
  

    const [item, setItem] = useState([]);
    const [loading, onChangeLoading] = useState(true);
    const [error, err] = useState(false);


    useEffect(()=>{
        updateItem()
    }, [itemId])
    

     function updateItem(){

        if(!itemId){
            return;
        }

        onChangeLoading(true);

        return itemId.then((i)=>{
        onChangeLoading(false);
        setItem(i);
       }).catch(() => err(true));
    }

  
    if(error && !item){
        return <ErrorMessage/>
    } else if(!item){
        return (
           <>
             <Term><span>Please select a character</span></Term> 
           </>
        ) 
    }
        
    if(loading){
        return (
            <ItemDetailsDiv className='rounded'>
                <Spinner/>
            </ItemDetailsDiv>
        )
    }
        
    const {name} = item;

    return (
        <ItemDetailsDiv className='rounded'>
            <h4>{name}</h4>
            <ListGroup flush>
               {React.Children.map(children, (child) => {
                  return React.cloneElement(child, {item});
                 } 
               )}
            </ListGroup>
        </ItemDetailsDiv>
        );
    
}

export default ItemDetails;