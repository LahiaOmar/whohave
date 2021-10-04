import React from 'react'
import { ILLUSTRATION_TYPES as TYPES } from '../../constants/constants'

import noProducts from './noProducts.svg'
import sendProducts from './sendProduct.svg'

import './style.css'

const IllustrationDisplay = ({ type, style }) => {
  const [illustration, setIllustration] = React.useState(null)

  React.useEffect(() => {
    switch (type) {
      case TYPES.NO_PRODUCTS:
        setIllustration(noProducts)
        break;
      case TYPES.NO_RESPONSES:
        setIllustration(sendProducts)
        break;
      default:
        throw new TypeError(`WRONG ILLUSTRATION NAME : ${type}`)
    }
  }, [])

  if (!illustration) {
    return <p>Loafing illustration</p>
  }
  return (
    <img style={style} src={illustration} />
  )
}

export default IllustrationDisplay