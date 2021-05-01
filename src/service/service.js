import { CardGroup } from "reactstrap";

export default class Service {
  constructor(){
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

   getResource = async(url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if(!res.ok){
      throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }

    return await res.json();
  };
  
  getAllCharacters = async() => {
    const res = await this.getResource('/characters?page=5&&pageSize=10');
    return res.map(this._transformCharacter);
  }
  
  getCharacter = async(id) => {
    const res = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(res);
  }
  
  getAllHouses = async() => {
    const res = await this.getResource(`/houses`);
    return res.map(this._transformHouse);
  }

  getHouse = async(id) => {
    const res = await this.getResource(`/houses/${id}`);
    return this._transformHouse(res);
  }

  getAllBooks = async() => {
    const res = await this.getResource(`/books`);
    return res.map(this._ransformBook);
  }

  getBook = async (id) => {
    const res = await this.getResource(`/books/${id}`);
    return this._ransformBook(res);
  }
  
  _transformCharacter = (obj) => {
    return {
      id: obj.url.slice(49),
      name: obj.name || 'nothing :(',
      gender: obj.gender || 'nothing :(',
      born: obj.born || 'nothing :(',
      died: obj.died || 'nothing :(',
      culture: obj.culture || 'nothing :('
    }
  }

  _transformHouse = (house) => {
    let r = /\d+/;
    
    function checkEmpty(obj){

      if(obj[0] == ['']){
        return 'nothing :(';
      }
      return obj;
    }
    
    return {
      id: house.url.match(r)[0],
      name: house.name || 'nothing :(',
      region: house.region || 'nothing :(',
      words: house.words || 'nothing :(',
      titles: checkEmpty(house.titles),
      overlord: house.overlord || 'nothing :(',
      ancestralWeapons: checkEmpty(house.ancestralWeapons)
    }
  }

  _ransformBook = (book) => {
    let r = /\d+/;
    return {
      id: book.url.match(r)[0],
      name: book.name || 'nothing :(',
      numberOfPages: book.nomberOfPages || 'nothing :(',
      publisher: book.publisher || 'nothing :(',
      released: book.released || 'nothing :('
    }
  }
}

