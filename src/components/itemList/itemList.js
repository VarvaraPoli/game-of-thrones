import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner';

function ItemList ({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
      getData().then(itemList => updateList(itemList));   
    }, [])


    function renderItems(arr){
         return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
    
            return (
                <ListGroupItem 
                  key={id} 
                  role="button"
                  onClick={() => onItemSelected(id)}
                >
                   {label}
                </ListGroupItem>
            )
        })
    }



       
    if(itemList.length < 1){
        return (
          <ListGroupItem>
            <Spinner/>
          </ListGroupItem>
        )   
    }

    const items = renderItems(itemList);

    return (
       <ListGroup>
          {items}
      </ListGroup>
    );   
}

export default ItemList;