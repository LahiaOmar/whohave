import React from 'react'
import {MenuItem, InputLabel, Select, Input, Checkbox, ListItemText, FormControl, InputAdornment, FormHelperText} from '@material-ui/core'
import {useAxios} from '../useHooks'
import AddIcon from '@material-ui/icons/Add';

function StoresType({formik, showAddNewType}){
  const [types, error, loading, setConfig ] = useAxios({})

  React.useEffect(()=>{
    const baseConfig = {
      url : 'http://localhost:4000/api/storesType/get',
      method : 'POST',
    }
    setConfig(baseConfig)
  }, [])

  const newStoresType = React.useRef()
  const addTypeStore = (e)=>{
    e.preventDefault()
    const isExist = types.filter(({specialty})=>{
      return (specialty == newStoresType.current.value)
    })
    if(isExist.length === 0){
      const config = {
        url : 'http://localhost:4000/api/storesType/add',
        method : 'POST',
        data : {specialty : newStoresType.current.value} 
      }
      setConfig(config)  
    }
	}

  return (
    <>
      <FormControl className="multi-select-form">
        <InputLabel id="store-types">Store Types</InputLabel>
        <Select
          {...formik.getFieldProps('storeTypes')}
          error={
            formik.touched.storeTypes &&
            formik.errors.storeTypes 
            }
          labelId="store-types"
          id="demo-mutiple-checkbox"
          multiple
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
        >
        {types && types.map(({specialty}) => (
          <MenuItem key={specialty} value={specialty}>
            <Checkbox checked={formik.values.storeTypes.indexOf(specialty) > -1} />
            <ListItemText primary={specialty} />
          </MenuItem>
        ))}
      </Select>
      { formik.touched.storeTypes && 
        formik.errors.storeTypes 
      ?<FormHelperText style={{color : 'red'}}>{formik.errors.storeTypes}</FormHelperText>
        : null}	
    </FormControl>
    {
      showAddNewType && 
      <FormControl>
        <InputLabel htmlFor="new-store-type">add new type</InputLabel>
        <Input 
          id="new-store-type"
          inputRef={newStoresType}
          endAdornment={
            <InputAdornment position="end">
              <AddIcon onClick={addTypeStore} style={{cursor : 'pointer'}}/>
            </InputAdornment>
          }/>
      </FormControl>
    }
  </>
  )
}

export default StoresType