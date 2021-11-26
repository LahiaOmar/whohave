import React from 'react'
import { Grid, Menu, MenuItem, MenuList, Paper, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Axios from 'axios'

const CountrySelector = ({ formik }) => {
  // for all countrys fetched from the API
  const [countrys, setCountrys] = React.useState([])
  // city option selected
  const [selectedCity, setSelectedCity] = React.useState(formik.values.city)
  // country option selected
  const [selectedCountry, setSelectedCountry] = React.useState(formik.values.country)
  // unicode of the country
  const [unicodeFlag, setUnicodeFlag] = React.useState(formik.values.unicodeFlag)

  const [citys, setCitys] = React.useState([])

  const fetchCountrys = async () => {
    const options = {
      url: 'https://countriesnow.space/api/v0.1/countries/flag/unicode',
      method: 'GET',
    }
    try {
      const { data } = await Axios(options)
      if (!data.error) {
        setCountrys(data.data)
      }
    }
    catch (ex) {
      console.log("ex country selection", ex)
    }
  }
  const fetchCity = async () => {
    const options = {
      url: 'https://countriesnow.space/api/v0.1/countries/cities',
      method: 'POST',
      data: {
        country: selectedCountry
      }
    }
    try {
      const { data } = await Axios(options)
      if (!data.error) {
        console.log("citys", data)
        setCitys(data.data)
      }
    }
    catch (ex) {
      console.log("err fetch city", ex)
    }
  }

  React.useEffect(() => {
    fetchCountrys()
  }, [])

  React.useEffect(() => {
    if (countrys.length > 0 || selectedCountry.length > 0)
      fetchCity()
  }, [selectedCountry])

  return (
    <>
      <Grid item xs={6}>
        <Autocomplete
          inputValue={formik.values['country']}
          defaultValue={() => {
            if (selectedCountry.length > 0)
              return { name: selectedCountry, unicodeFlag }
            return null
          }}
          onChange={(event, value) => {
            if (value) {
              setSelectedCountry(value.name)
              formik.setFieldValue('country', value.name)
              formik.setFieldValue('unicodeFlag', value.unicodeFlag)
            }
          }}
          getOptionLabel={(option) => {
            return `${option.unicodeFlag} ${option.name}`
          }}
          options={countrys}
          renderOption={(option) => (
            <>
              <span>{option.unicodeFlag}</span>
              <span>{option.name}</span>
            </>
          )}
          renderInput={(params) => {
            return <TextField
              {...params}
              {...formik.getFieldProps('country')}
              label="Choose the country"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password'
              }}
              error={
                formik.touched.country &&
                formik.errors.country
              }
              helperText={
                formik.touched.country &&
                formik.errors.country
              }
            />
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          inputValue={formik.values['city']}
          defaultValue={() => (selectedCity.length > 0 ? selectedCity : null)}
          onChange={(event, value) => {
            if (value) {
              setSelectedCountry(value)
              formik.setFieldValue('city', value)
            }
          }}
          getOptionLabel={(option) => {
            return option
          }}
          options={citys}
          renderOption={(option) => (
            <span>{option}</span>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              {...formik.getFieldProps('city')}
              label="Choose the city"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password'
              }}
              error={
                formik.touched.city &&
                formik.errors.city
              }
              helperText={
                formik.touched.city &&
                formik.errors.city
              }
            />
          )
          }
        />
      </Grid>
    </>
  )
}

export default CountrySelector