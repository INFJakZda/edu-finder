import { includes, cloneDeep } from 'lodash'

function createMap(attributes, defaultValue) {
  const map = {}
  attributes.forEach(attribute => (map[attribute] = cloneDeep(defaultValue)))
  return map
}

function clearMap(map, resetValue) {
  for (let attribute in map) {
    map[attribute] = cloneDeep(resetValue)
  }
}

function FormErrorHandlerMixin(properties) {
  return {
    data: function() {
      return {
        // list of tracked form properties
        trackedProperties: properties,
        // matches error list to tracked properties
        errorsByProperty: createMap(properties, []),
        // tracks if property is considered valid by remote api
        validProperty: createMap(properties, true),
        // tracks if there were any changes to the values after errors
        dirtyProperty: createMap(properties, false),
        // tracks errors from unmapped properties
        errorsUnmatched: [],
        // tracks last error status code
        errorStatus: null
      }
    },
    methods: {
      errorHandler: function(err) {
        this.resetFormErrorState()

        if (err.response) {
          const response = err.response
          if (response.status) {
            this.errorStatus = response.status
          }

          if (response.data) {
            const errors = response.data
            for (let error of errors) {
              let property = error.propertyName
              if (includes(this.trackedProperties, property)) {
                this.errorsByProperty[property].push(error.errorMessage)
                this.validProperty[property] = false
              } else {
                this.errorsUnmatched.push(error.errorMessage)
              }
            }
          }
        }
      },
      resetFormErrorState: function() {
        clearMap(this.errorsByProperty, [])
        clearMap(this.validProperty, true)
        clearMap(this.dirtyProperty, false)
        this.errorsUnmatched = []
        this.errorStatus = null
        this.errorOccured = false
      },
      isPropertyValid: function(property) {
        return this.validProperty[property]
      },
      isPropertyDirty: function(property) {
        return this.dirtyProperty[property]
      },
      isPropertyInErrorState: function(property) {
        return (
          !this.isPropertyValid(property) && !this.isPropertyDirty(property)
        )
      },
      setPropertyDirty: function(property) {
        if (includes(this.trackedProperties, property)) {
          this.dirtyProperty[property] = true
        }
      }
    },
    computed: {
      errorMessages: function() {
        return Object.values(this.errorsByProperty)
          .reduce(
            (previousMessages, currentMessages) =>
              previousMessages.concat(currentMessages),
            []
          )
          .concat(this.errorsUnmatched)
      },
      errorApiResponse: function() {
        return this.errorStatus !== null
      }
    }
  }
}

export { FormErrorHandlerMixin }
