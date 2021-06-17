import Department from '../models/department'

const deleteDepartment = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'department',
    i18n: 'DEPARTMENT_DELETION_FAILURE',
    data: null,
    code: 500,
    stack: null,
    error: null
  }

  Department.findOneAndDelete(query).then(department => {
    if (!department) {
      message.i18n = 'DEPARTMENT_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'DEPARTMENT_DELETION_SUCCESS'
    message.code = 204

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default deleteDepartment
