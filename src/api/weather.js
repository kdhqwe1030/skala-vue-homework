import { api } from './api'

export const getWeather = async (cityName) => {
  const res = await api.get('/weather', {
    params: {
      q: cityName,
      appid: import.meta.env.VITE_API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  // console.log(res.data)
  return res.data
}

export const getTimeLineWeather = async (cityName) => {
  const res = await api.get('/forecast', {
    params: {
      q: cityName,
      appid: import.meta.env.VITE_API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })
  // console.log(res.data)

  return res.data
}
