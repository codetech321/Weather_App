import React, { useState } from 'react'

const App = () => {
  const [data, setData] = useState(null)
  const [input, setInput] = useState('')

  const getData = async () => {
    const apikey = import.meta.env.VITE_API_KEY

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apikey}&units=metric`
      )
      if (!response.ok) throw new Error('City not found')
      const jsonData = await response.json()
      setData(jsonData)
      setInput('')
    } catch (error) {
      console.error('Error', error)
      setData(null)
      alert('Invalid city or network error')
      setInput('')
    }
  }
  const inputHandler = (e) => {
    setInput(e.target.value)
  }
  return (
    <>
      <div className="bg-gradient-to-b from-purple-700 to-purple-900 w-full max-w-md rounded-2xl p-6 text-white shadow-lg m-auto mt-10">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold">Weather App</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 px-2">
          <input
            value={input}
            onChange={inputHandler}
            type="text"
            placeholder="enter city name"
            className="flex-1 px-4 py-2 rounded-xl border border-white/30 bg-white/20 placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={getData}
            className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 font-semibold transition"
          >
            Search
          </button>
        </div>
        <div>
          {data ? (
            <div className="p-4 rounded-2xl shadow-md w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto mt-6">
              <h2 className="text-2xl font-bold mb-2 text-center">
                {data?.name}
                <p className="text-xl">{data?.sys?.country}</p>
              </h2>
              <div className="flex-1 justify-center items-center mb-4">
                <p className="text-2xl font-semibold">{data?.main?.temp}°C</p>
                <p className="text-xl">Feels Like {data?.main?.feels_like}°C</p>
                <p className="text-xl">Min_Temp {data?.main?.temp_min}</p>
                <p className="text-xl">Max_Temp {data?.main?.temp_max}</p>
                <p className="text-xl">Pressure {data?.main?.pressure} hPa</p>

                <img
                  src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
              </div>
              <p className="text-center mb-2 font-bold">
                {data?.weather[0].description}
              </p>
              <div className="flex-1 justify-between text-sm mt-4 gap-2 font-semibold">
                <p>Wind: {data?.wind?.speed} KM/H</p>
                <p>Visibility: {data?.visibility / 1000} km</p>
                <p>Humidity: {data?.main?.humidity}%</p>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex justify-between mt-5 m-2 font-semibold">
          <p>
            🌅 Sunrise:{' '}
            {data?.sys?.sunrise
              ? new Date(data?.sys?.sunrise * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </p>
          <p>
            🌅 Sunset:{' '}
            {data?.sys?.sunset
              ? new Date(data?.sys?.sunset * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </p>
        </div>
      </div>
    </>
  )
}

export default App
