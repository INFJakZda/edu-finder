function formErrorHandler(
  error,
  noResourceMessage,
  addErrorCallback,
  clearErrorsCallback
) {
  if (clearErrorsCallback !== undefined) {
    clearErrorsCallback()
  }

  if (error.response) {
    if (error.response.data) {
      const errors = error.response.data
      for (let error of errors) {
        addErrorCallback({
          propertyName: error.propertyName,
          message: error.errorMessage
        })
      }
    }
  }

  if (error.response.status === 404) {
    addErrorCallback({
      propertyName: null,
      message: noResourceMessage
    })
  }
}

function isFieldIncorrect(errorArray, propertyName) {
  for (let error of errorArray) {
    if (error.propertyName === propertyName) {
      return true
    }
  }

  return false
}

export { formErrorHandler, isFieldIncorrect }
