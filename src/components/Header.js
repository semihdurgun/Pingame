import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { language, render } from "../stores/Site"
import dictionary from "../dictionary.json";

function Header() {
    const selector = useSelector(state=>state)
    const dispatch = useDispatch()
    console.log(selector)
    
    const changeLanguage = (lg) => {
        dispatch(language(lg))
        document.getElementById("myDropdown").classList.toggle("show");
    }
    async function lang() {
        await dispatch(render("rendered"))
        document.getElementById("myDropdown").classList.toggle("show");
    }
    async function  help() {
        await dispatch(render("rendered"))
        document.getElementById("helpdown").classList.toggle("show");
    }

  return (
    <header>
        <div>
            <a style={{display:"none"}}>{selector.site.language}</a>
        </div>
        <div>
            <h1>p-i-n-g-a-m-e</h1>
        </div>
        <div>
         
         <button onClick={() => help()} className='icon'>
            <svg height="19" fill='gray' viewBox="0 0 91.999 92" width="19" xmlns="http://www.w3.org/2000/svg" ><path d="M45.385,0.004C19.982,0.344-0.334,21.215,0.004,46.619c0.34,25.393,21.209,45.715,46.611,45.377  c25.398-0.342,45.718-21.213,45.38-46.615C91.655,19.986,70.785-0.335,45.385,0.004z M45.249,74l-0.254-0.004  c-3.912-0.116-6.67-2.998-6.559-6.852c0.109-3.788,2.934-6.538,6.717-6.538l0.227,0.004c4.021,0.119,6.748,2.972,6.635,6.937  C51.903,71.346,49.122,74,45.249,74z M61.704,41.341c-0.92,1.307-2.943,2.93-5.492,4.916l-2.807,1.938  c-1.541,1.198-2.471,2.325-2.82,3.434c-0.275,0.873-0.41,1.104-0.434,2.88l-0.004,0.451H39.429l0.031-0.907  c0.131-3.728,0.223-5.921,1.768-7.733c2.424-2.846,7.771-6.289,7.998-6.435c0.766-0.577,1.412-1.234,1.893-1.936  c1.125-1.551,1.623-2.772,1.623-3.972c0-1.665-0.494-3.205-1.471-4.576c-0.939-1.323-2.723-1.993-5.303-1.993  c-2.559,0-4.311,0.812-5.359,2.478c-1.078,1.713-1.623,3.512-1.623,5.35v0.457H27.935l0.02-0.477  c0.285-6.769,2.701-11.643,7.178-14.487C37.946,18.918,41.446,18,45.53,18c5.346,0,9.859,1.299,13.412,3.861  c3.6,2.596,5.426,6.484,5.426,11.556C64.368,36.254,63.472,38.919,61.704,41.341z"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
         </button>
         <div id="helpdown" className="overlay">
            <div className="helpdown-content">
                <header style={{height:50,marginTop:10}}>
                    <h2>{dictionary[selector.site.language].how}</h2>
                    <button className='icon' style={{background:"transparent",border:"none",padding:5}} onClick={help}>
                    <svg height="30" fill='gray' viewBox="0 0 30 25" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="m12,0c-6.62736,0 -12,5.3724 -12,12c0,6.62763 5.37264,12 12,12c6.62763,0 12,-5.37237 12,-12c0,-6.6276 -5.37237,-12 -12,-12zm-3.6,7.2c0.30698,0 0.62819,0.1032 0.86255,0.33723l2.73745,2.73717l2.73717,-2.73717c0.2352,-0.23403 0.55563,-0.33723 0.86283,-0.33723c0.3072,0 0.62763,0.1032 0.86283,0.33723c0.468,0.46917 0.468,1.25637 0,1.72554l-2.73723,2.73723l2.73723,2.73723c0.468,0.46917 0.468,1.25637 0,1.72554c-0.46923,0.468 -1.25643,0.468 -1.72565,0l-2.73717,-2.73717l-2.73745,2.73717c-0.46856,0.468 -1.25637,0.468 -1.7251,0c-0.46861,-0.46917 -0.46861,-1.25637 0,-1.72554l2.73695,-2.73723l-2.73695,-2.73723c-0.46861,-0.46917 -0.46861,-1.25637 0,-1.72554c0.23447,-0.23403 0.55546,-0.33723 0.86255,-0.33723z"/></svg>
                    </button>
                </header>
                <div  style={{textAlign:"left"}} dangerouslySetInnerHTML={ {__html: dictionary[selector.site.language].howTo} } ></div>

            </div>
         </div>
         <button onClick={() =>lang()} className='icon'>
            <svg height="20" fill='gray' viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="M23.99 4c-11.05 0-19.99 8.95-19.99 20s8.94 20 19.99 20c11.05 0 20.01-8.95 20.01-20s-8.96-20-20.01-20zm13.85 12h-5.9c-.65-2.5-1.56-4.9-2.76-7.12 3.68 1.26 6.74 3.81 8.66 7.12zm-13.84-7.93c1.67 2.4 2.97 5.07 3.82 7.93h-7.64c.85-2.86 2.15-5.53 3.82-7.93zm-15.48 19.93c-.33-1.28-.52-2.62-.52-4s.19-2.72.52-4h6.75c-.16 1.31-.27 2.64-.27 4 0 1.36.11 2.69.28 4h-6.76zm1.63 4h5.9c.65 2.5 1.56 4.9 2.76 7.13-3.68-1.26-6.74-3.82-8.66-7.13zm5.9-16h-5.9c1.92-3.31 4.98-5.87 8.66-7.13-1.2 2.23-2.11 4.63-2.76 7.13zm7.95 23.93c-1.66-2.4-2.96-5.07-3.82-7.93h7.64c-.86 2.86-2.16 5.53-3.82 7.93zm4.68-11.93h-9.36c-.19-1.31-.32-2.64-.32-4 0-1.36.13-2.69.32-4h9.36c.19 1.31.32 2.64.32 4 0 1.36-.13 2.69-.32 4zm.51 11.12c1.2-2.23 2.11-4.62 2.76-7.12h5.9c-1.93 3.31-4.99 5.86-8.66 7.12zm3.53-11.12c.16-1.31.28-2.64.28-4 0-1.36-.11-2.69-.28-4h6.75c.33 1.28.53 2.62.53 4s-.19 2.72-.53 4h-6.75z"/></svg>
         </button>
         <div style={{background:"transparent"}} id="myDropdown" className="dropdown-content">
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('tr')}>TR</button>
         </div>
        
        </div>
    </header>
  )
}

export default Header