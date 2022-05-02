import React, { useEffect, useState } from 'react';
import './App.css';
import Advisors from './serviceApi';

const url = 'http://localhost:3000/';

function App() {
  const [load, setLoad] = useState(10);
  const [data, setData] = useState([]);
  const [all, setAll] = useState(true);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState(true);
  const [lang, setLang] = useState('Filter By Language');

  // const call =  async (n: number) =>{
  //   let resJson;
  //   try {
  //      let response = await fetch(url + 'advisors?count=' + n);;
  //       resJson = await response.json();
  //       await new Promise((resolve, reject) => {
  //                 if(resolve) {    
  //                     setTimeout(resolve, 1000); 
  //                     console.log('1 seconds  to load')        
  //                 } else {    
  //                     reject('Promise is rejected');  
  //                 }
  //             });
  //   } catch(err) {
  //     console.log(err);
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //      setData(resJson);
  //   }
  // }

  const loadMoreAdvisors = () => {
   setLoad(load + 10);
  };

  const sortByReviews = (tf:boolean) => data.sort( (a: Advisors, b:Advisors) =>  {
    let asce  = a.reviews - b.reviews;
    let desc  = b.reviews - a.reviews;
    let ascDecr = tf ? asce : desc;
    return ascDecr;
  });
  const filterBylang = ( lang: string) =>  data.filter( (l: Advisors) => l.language === lang);

  const onChangeValue = (value: any) => {
    setLang(value);
    if(lang) setAll(false);
    console.log('lang', lang);
  }
  const buttonLang = () => {
    let dataMap = data.map((m: Advisors) => m.language)
    let removeDuplicatedLang = dataMap.filter((lang, index) => dataMap.indexOf(lang) === index);  
    const dropdown = Object.keys(removeDuplicatedLang).map((m:any) => <option key={m} value={removeDuplicatedLang[m]}>{removeDuplicatedLang[m]}</option>)
  
    return (<form>
        <select 
          onChange={(e) => onChangeValue(e.target.value)}
          placeholder="Filter by language"
          value={lang}
        >
            {dropdown}
  
        </select>
      </form>);
  }
  useEffect(() => {
    async function call(n: number) {
      let resJson;
      try {
         let response = await fetch(url + 'advisors?count=' + n);;
          resJson = await response.json();
          await new Promise((resolve, reject) => {
                    if(resolve) {    
                        setTimeout(resolve, 1000); 
                        console.log('1 seconds  to load')        
                    } else {    
                        reject('Promise is rejected');  
                    }
                });
      } catch(err) {
        console.log(err);
        throw err;
      } finally {
        setLoading(false);
        setData(resJson);
      }
    }
    call(load);
      console.log('data', data)

  }, [load, loading]);

  let mapList = (list: any) => list.map( (m: Advisors) => (
    <p>{m.firstName} - {m.language} - {m.reviews}</p>
  ))
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {!loading ? 
        <div> 
           {all ? mapList(data && sortByReviews(review)) : mapList(sortByReviews(review) && filterBylang(lang)) }
        </div>
        : <p> Loading...</p>}

      <button type="button" onClick={loadMoreAdvisors}>Load More</button>
      <button type="button" onClick={() => setAll(true)}>All Advisors</button>
       <button type="button" onClick={() => setReview(true)}>Best Reviews</button>
       <button type="button" onClick={() => setReview(false)}>Worst Reviews</button>
<>{buttonLang()}</>


      </header>
    </div>
  );
}

export default App;

