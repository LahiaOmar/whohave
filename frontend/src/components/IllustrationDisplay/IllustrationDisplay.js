import React from 'react'
import { ILLUSTRATION_TYPES as TYPES } from '../../constants/constants'

import noProducts from './noProducts.svg'
import sendProducts from './sendProduct.svg'

import './style.css'

const IllustrationDisplay = ({ type }) => {
  const [illustration, setIllustration] = React.useState({
    img: '',
    title: ''
  })

  React.useEffect(() => {
    switch (type) {
      case TYPES.NO_PRODUCTS:
        setIllustration({ img: noProducts, title: 'No products for now ... ' })
        break;
      case TYPES.NO_RESPONSES:
        setIllustration({ img: sendProducts, title: 'Waiting for your product requests ...' })
        break;
    }
  }, [])

  return (
    <div className="dashboard-msg">
      <h3>{illustration.title}</h3>
      <div className="dashboard-msg-img">
        <img src={illustration.img} />
      </div>
    </div>
  )
}

export default IllustrationDisplay