import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {ListGroup, ListGroupItem} from 'reactstrap';
import Service from '../../service';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Term = styled.span`
    font-weight: bold;
`;
const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

function RandomChar (){
    const [char, setCharacter] = useState({});
    const [loading, onCharLoaded] = useState(true);
    const [error, onError] = useState(false);

    useEffect(() => {
      setInterval(updateCharacter, 1500);   
    },[])
   
    
    const service = new Service();

    function updateCharacter(){
        let id = Math.floor(Math.random() * 145 + 25);

        service.getCharacter(id)
        .then(char => {
           onCharLoaded(false);
            setCharacter(char);
        })
        .catch(()=>{
            onError(true);
            onCharLoaded(false);
        })
    }

        const errorMessage = error ? <ErrorMessage/> : null;

        if(loading){
            return <Spinner/>
        }

        const content = loading ? <Spinner/> : <View char={char}/>;

        return (
            <RandomBlock className="rounded">
              {errorMessage}
              {content}
            </RandomBlock>
        );
    
}

export default RandomChar;

const View = ({char}) => {
   const {name, gender, born, died, culture} = char;

   return (
       <>
        <h4>Random Character: {name}</h4>
        <ListGroup flush>
            <ListGroupItem className="d-flex justify-content-between" role="button">
                <Term>Gender</Term>
                <span>{gender}</span>
             </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between" role="button">
                <Term>Born </Term>
                <span>{born}</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between" role="button">
                <Term>Died </Term>
                <span>{died}</span>
             </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between" role="button">
                <Term>Culture </Term>
                <span>{culture}</span>
               </ListGroupItem>
         </ListGroup>
       </>
   )
}