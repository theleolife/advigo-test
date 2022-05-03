/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from 'react';
import './App.css';

const url = 'http://localhost:3001/';

export interface Advisors {
  firstName?: string,
  lastName?: string,
  jobTitle?: string,
  language?: string,
  reviews: number,
  status?: boolean,
}

function App() {
  const [load, setLoad] = useState(10);
  const [data, setData] = useState([]);
  const [all, setAll] = useState(true);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState(true);
  const [lang, setLang] = useState('en');

  const loadMoreAdvisors = () => {
   setLoad(load + 10);
  };

  // Sort by review
  const sortByReviews = (tf:boolean) => data.sort( (a: Advisors, b:Advisors) =>  {
    let asce  = a.reviews - b.reviews;
    let desc  = b.reviews - a.reviews;
    let ascDecr = tf ? asce : desc;
    return ascDecr;
  });

  // Filterering by language
  const filterBylang = ( lang: string) =>  data.filter( (l: Advisors) => l.language === lang);

  // const onlineOffLine = ( onOFF: boolean) =>  data.filter( (f: Advisors) => f.status === onOFF);

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
      <p>Language:</p>
        <select 
          onChange={(e) => onChangeValue(e.target.value)}
          value={lang}
        >
            {dropdown}
  
        </select>
      </form>);
  }
  const getNameAvatar = (n: any) => n.charAt(0).toUpperCase();

  const mapList = (list: any) => list.map( (m: Advisors) => (
    <div className="card">
      <div className={m.status ? "avatar online" : "avatar"}><span>{getNameAvatar(m.firstName)}</span></div>
       <p>{m.firstName} {m.lastName}</p>
       <p> Expert: {m.jobTitle} </p>
       <p> Language: {m.language} </p>
       <p> Review: {m.reviews} </p>
    </div>
  ))

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
    // console.log('status', onlineOffLine(true));
      // console.log('data', data)
  }, [load, loading]);


  return (
    <div className="App">
      <div className="main">
        {!loading ? 
        <div className="cards"> 
           {all ? mapList(data && sortByReviews(review)) : mapList(sortByReviews(review) && filterBylang(lang)) }
           <button type="button" className="block" onClick={loadMoreAdvisors}>Load more...</button>

        </div>
        : <div className="cards"> <p> Loading...</p></div>}
      </div>
      <div className="left"> 
              <button role="button" className="block" onClick={() => setReview(true)}>Best Reviews</button>
              <button role="button" className="block" onClick={() => setReview(false)}>Worst Reviews</button>
              <button role="button" className="block" onClick={() => setAll(true)}>All Advisors</button>
              <button role="button"  className="block" onClick={loadMoreAdvisors}>Load more...</button>

        <>{buttonLang()}</>
        </div>
    </div>
  );
}

export default App;

