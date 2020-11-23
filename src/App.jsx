import React, { useState, useEffect } from "react";

import Navigation from "./components/Navigation/Navigation.jsx";
import Weather from "./components/Weather/Weather.jsx";
import WeatherCardList from "./components/WeatherCardList/WeatherCardList.jsx";
import Footer from "./components/Footer/Footer.jsx";

import "./App.css";

const App = () => {
    const [isSearch, setIsSearch] = useState(true);
    const [isCitySaved, setIsCitySaved] = useState(false);
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [cityForecast, setCityForecast] = useState([]);
    const [cities, setCities] = useState([]);
    const [citiesIds, setCitiesIds] = useState([]);

    const searchClicked = () => setIsSearch(true);
    const savedClicked = () => setIsSearch(false);

    useEffect(() => {
        getFromLocalStorage();
    }, []);

    useEffect(() => {
        if (citiesIds.length === 0) {
            setCities([]);
            return;
        }
        /* const url = `http://api.openweathermap.org/data/2.5/group?id=${citiesIds.join(
            ","
        )}&appid=cb6422237271999afa500624f60559a9&units=metric`; */
        const url = `http://api.openweathermap.org/data/2.5/group?id=${citiesIds.join(
            ","
        )}&appid=ffd5b222893afee068a6566732e068d5&units=metric`;
        fetch(url)
            .then((response) => {
                if (response.ok)
                    response.json().then((data) => setCities(data.list));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [citiesIds]);

    const getCurrentWeather = (e) => {
        e.preventDefault();

        /*  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb6422237271999afa500624f60559a9&units=metric`; */
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ffd5b222893afee068a6566732e068d5&units=metric`;
        fetch(url)
            .then((response) => {
                if (response.ok)
                    response.json().then((data) => {
                        setWeather(data);
                        getCityForecast(data.coord.lat, data.coord.lon);
                        checkSaved(data.id);
                    });
                else if (response.status === 404) throw new Error("Wrong city");
                else throw new Error("Some other error " + response.status);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCityForecast = (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=ffd5b222893afee068a6566732e068d5&units=metric`;

        fetch(url).then((response) => {
            response.json().then((data) => {
                setCityForecast(data.daily.splice(1, 6));
            });
        });
    };

    const checkSaved = (id) => {
        const ids = [...citiesIds];
        if (ids.includes(id)) setIsCitySaved(true);
        else setIsCitySaved(false);
    };

    const addCityId = (id) => {
        const ids = [...citiesIds];
        if (ids.includes(id)) {
            setIsCitySaved(false);
            removeCityId(id);
            return;
        }
        ids.push(id);
        setCitiesIds(ids);
        localStorage.setItem("citiesIds", JSON.stringify(ids));
        setIsCitySaved(true);
    };

    const removeCityId = (id) => {
        const ids = [...citiesIds];
        if (!ids.includes(id)) return;
        const index = ids.indexOf(id);
        ids.splice(index, 1);
        setCitiesIds(ids);
        localStorage.setItem("citiesIds", JSON.stringify(ids));
        setIsCitySaved(false);
    };

    const getFromLocalStorage = () => {
        if (localStorage.getItem("citiesIds") === null) return;
        const citiesIdsString = localStorage.getItem("citiesIds");
        const citiesIdsArr = JSON.parse(citiesIdsString);
        setCitiesIds(citiesIdsArr);
    };

    return (
        <>
            <div className="container">
                <Navigation
                    search={searchClicked}
                    saved={savedClicked}
                    isSearch={isSearch}
                />

                {isSearch ? (
                    <Weather
                        setCity={setCity}
                        isCitySaved={isCitySaved}
                        weather={weather}
                        cityForecast={cityForecast}
                        getData={getCurrentWeather}
                        addCityId={addCityId}
                    />
                ) : (
                    <WeatherCardList
                        cities={cities}
                        removeCityId={removeCityId}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default App;
