
import Header from './Header';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState ,useEffect } from 'react';
import AddItem from './AddItem';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items'

  const [items,setItems] = useState([]);
  const [newItem,setNewItem] =useState('')
  const [search, setSearch] = useState('')
  const [fetchError,setFetchError] = useState(null)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Did not receive response")
        const listItems = await response.json();
        setItems(listItems);
        console.log(listItems);
        setFetchError(null);
      }catch (err){
        console.log(err.stack)
      }finally{
        setIsLoading(false)
      }
      
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    },2000)
    
  },[])

  // const setAndSaveItems = (newItems) => {
  //   setItems(newItems);
  //   localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  // }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const MyNewItem = { id, checked: false,item};
    const listItems = [...items, MyNewItem] 
    setItems(listItems);

    const postOptions = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(myNewItem)
    }
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id?{...item,checked: !item.checked}:item)
    setItems(listItems);
  }
  const handleDelete = (id) => {
    const listItems = items.filter((item => item.id !==id))
    setItems(listItems);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header />
      <SearchItem 
      search={search}
      setSearch={setSearch}
      />
      <AddItem 
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
      <main>
        {isLoading && <p>Loading Items..</p>}
      {fetchError && <p style={{color:"red"}}>{`Error: ${fetchError}`}</p>}
      {!fetchError &&<Content 
      items={items.filter(item => ((item.item).toLowerCase()).includes
      (search.toLowerCase()))}
      handleCheck={handleCheck}
      handleDelete={handleDelete} 
      
      />}
      </main>
      <Footer
      length={items.length}/>
    </div>
  );
}

export default App;

