import React from 'react'
import logger from '../../logger'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    logger.http(`FRONTEND - ERROR : ${error} - INFO : ${info}`)
  }

  render() {
    if (this.setState.hasError) {
      return <h1>Something wrong</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary