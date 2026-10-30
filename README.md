# Weather Dashboard - React

## About the project

This project is my old Weather Dashboard but now using React. Before I did it with HTML, CSS and JavaScript.

The idea is the same, the user searches for a city and can see the weather there. But now I separated the code into different components and used React hooks.

## How to run

1. Install Node.js if you don't have it.
2. Open the project folder in VS Code.
3. Open the terminal and write:

   `npm install`

4. Create a file named `.env.local` and put the API key inside:

   `VITE_OPENWEATHER_API_KEY=your_api_key`

5. After that run:

   `npm run dev`

6. Open the localhost link that appears in the terminal.

The API key is from https://openweathermap.org/api.

## Features

- Search for a city.
- Choose the location if there are cities with the same name.
- See the temperature and weather description.
- See the humidity, wind speed and feels like temperature.
- Show an icon for the weather.
- Show loading while waiting for the result.
- Show an error if something goes wrong.
- The page can also work on smaller screens.

## Components

I divided the project into different components so everything is not in one file.

- **App.jsx:** The main component, it has the states and connects everything together.
- **Header.jsx:** Shows the title of the page.
- **SearchBar.jsx:** Where the user writes the city name.
- **LocationSelect.jsx:** Shows the locations found so the user can choose.
- **WeatherCard.jsx:** Shows the weather information.
- **LoadingSpinner.jsx:** Shows when the data is loading.
- **ErrorMessage.jsx:** Shows an error message if there is a problem.

I also have `weatherApi.js` where I put the functions for getting the data from the API.

## useState, useEffect and props

I used `useState` for the things that can change in the page. For example the city name, the list of locations, the selected location, the weather data and the status.

I used `useEffect` to get the data from the API. I have one for searching the locations and another one for getting the weather of the selected location. I also used cleanup so if the user changes the search, the old request doesn't affect the new result.

For props, I used them to send information between the components. For example, `App` sends the weather data to `WeatherCard` so it can display it. And `SearchBar` gets functions from `App` for the search.

I kept the states in `App` because different components need them, and this way I don't have to pass them through many components.

I also used conditional rendering. So depending on what is happening, the page shows the loading, an error, the locations or the weather.

## Location selection

In my old project I had to deal with cities that have the same name. For example, if we search for a city, sometimes there is more than one result in different countries.

So I used the Geocoding API to get the different locations and let the user choose which one they want.

I kept this part in the React project because otherwise the weather might be for the wrong city.

## Technologies used

- React
- Vite
- JavaScript / JSX
- CSS
- OpenWeather API