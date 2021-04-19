// ARRAY ALERT COMPONENT ACTIONS
export const ADD_ALERT = 'ADD_ALERT'

export const REMOVE_BY_ID = 'REMOVE_BY_ID'

export const REMOVE_TOP = 'REMOVE_TOP'

// ALERT SEVERITY 
export const SUCCESS = "success"

export const ERROR = "error"

export const INFO = "info"

// ALERT MESSAGE 

export const removeByKey = (key) => {
  return {
    type: REMOVE_BY_ID,
    pyload: {
      key
    }
  }
}

export const removeTop = () => {
  return {
    type: REMOVE_TOP,
  }
}
// LOGIN AND SINGUP ACTIONS
export const loginSuccess = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: "Successful Login",
      severity: SUCCESS
    }

  }
}

export const loginFailure = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: 'Wrong credentials, try again',
      severity: ERROR
    }
  }
}

export const signUpSuccess = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: "Successful SingUp",
      severity: SUCCESS
    }
  }
}

export const signUpFailure = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: 'Error, Please try again ',
      severity: ERROR
    }
  }
}


// DASHBOARD ACTIONS
export const deleteSuccess = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: 'Delete Success',
      severity: SUCCESS
    }
  }
}

export const deleteFailure = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: 'Delete Error, try again !',
      severity: ERROR
    }
  }
}

export const feedbackSuccess = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: 'Response is sent Successfully',
      severity: INFO
    }
  }
}

export const feedbackFailure = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: 'Error, try again',
      severity: ERROR
    }
  }
}

// PRODUCT

export const sendProductSuccess = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: "Product is sent Successfully",
      severity: INFO
    }
  }
}


export const sendProductFailure = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: "Error, try again",
      severity: ERROR
    }
  }
}

// NOTIFICATION ACTIONS
export const notification = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: 'You have a notification !',
      severity: INFO
    }
  }
}

export const updateSuccess = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: 'Update information Successed',
      severity: SUCCESS
    }
  }
}

export const updateFailure = () => {
  return {
    type: ADD_ALERT,
    pyload: {
      title: 'Error, try again !!',
      severity: ERROR
    }
  }
}