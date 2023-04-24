// necessary imports
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import {BsSearch} from 'react-icons/bs';
import Weather from "../../components/Weather";
import Spinner from "../../components/spinner";
import sunny from '../../public/sunny.jpg';
import cloudy from '../../public/cloudy.jpg';
import foggy from '../../public/foggy.jpg';
import thunder from '../../public/thunder.jpg';
import defaultimg from '../../public/default.jpg';
import rain from '../../public/rain.jpg';
import snowy from '../../public/snowy.jpg';
const Weatherapp = () =>{
  // States used in the whole project
  // used for query in the url string to fetch the weather data of that city 
  const [city, setCity] = useState('');
  // the data which we get from the api
  const [weather, setWeather] = useState({});
  // to change the main page to loading page
  const [loading, setLoading] = useState(false);
  // state used to change background images according to the weather data
  const [bgimg, setBGimg] = useState([defaultimg]);
  // url for the api call
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  // auto focus for the search bar
  const inputRef = useRef();
  useEffect(()=>{
    inputRef.current.focus()
  },[]);
  // function used to fetch the weather data
  const fetchWeatherData = (e) =>{
    e.preventDefault(); //prevents the page from refresh
    setLoading(true);
    axios.get(url).then(response =>{
      setWeather(response.data); //chaning the weather data according to the latest request
      wallpaperChange(response.data)//chaning the background of the web page according to the latest request
    })
    setCity('');
    setLoading(false);
    
  }
  // function to change background of the web page
  const wallpaperChange= (data) =>{
    console.log(data.weather[0].main)
    if(data.weather[0].main === 'Clouds'){
      setBGimg(bgimg =>[...bgimg,cloudy])
    }
    else if(data.weather[0].main === 'Clear'){
      setBGimg(bgimg =>[...bgimg,sunny]);
    }
    else if(data.weather[0].main === 'Thunder'){
      setBGimg(bgimg =>[...bgimg,thunder])
    }
    else if(data.weather[0].main === 'Rain' || data.weather[0].main ==='Drizzle'){
      setBGimg(bgimg =>[...bgimg,rain]);
    }
    else if(data.weather[0].main === 'Mist'){
      setBGimg(bgimg =>[...bgimg,foggy])
    }
    else if(data.weather[0].main === 'Snow'){
      setBGimg(bgimg =>[...bgimg,snowy]);
    }
    else{
      setBGimg(bgimg =>[...bgimg,defaultimg]);
    }

  }

  if(loading){// if loading is true it presents the loading animation on the screen if not renders the main web page
    return <Spinner/>
  } else{
    return(
      <div>
        {/* Head information */}
        <Head>
          {/* Title of the web page */}
          <title>Next.js weather App</title> 
          <meta name="description" content="next weather app" />
        </Head>
        {/* overlay */}
        <div className=" absolute left-0 right-0 top-0 bottom-0 bg-black/40 z-[1]" />
        {/* Background img */}
        <Image src={bgimg[bgimg.length-1]} layout="fill" className="object-cover " />
        <div className="flex relative justify-between items-center max-w-[500px] w-full m-auto pt-4 z-10 text-white">
          <form onSubmit={fetchWeatherData} className="flex justify-between items-center w-full m-auto p-3 bg-transparent border-2 border-blue-500 text-white rounded-2xl">
            <div>
              <input type="text" placeholder="Enter the city name" 
              className="bg-transparent border-none text-white focus:outline-none text-2xl placeholder-white" //css
              ref={inputRef}
              onChange={(e) =>{
                // updating the latest request 
                setCity(e.target.value);
              }}
              />
            </div>
            <button onClick={fetchWeatherData}><BsSearch size={25} /></button>
          </form>
        </div>
        
        {/* Weather display */}
        {weather.main && <Weather data={weather}/>}
      </div>
      
    )
  }
  
}
export default Weatherapp;
