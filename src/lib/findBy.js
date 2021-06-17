import Department from '../models/department'

const findAllBy = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'department',
    i18n: 'DEPARTMENT_ERROR',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Department.findOne(query).exec().then(department => {
    message.data = department

    if (!department) {
      message.i18n = 'DEPARTMENT_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'DEPARTMENT_FOUND'
    message.code = 200

    return resolve(message)
  }).catch(err => {
    message.stack = err.stack
    message.error = err.message

    return reject(message)
  })
})

export default findAllBy
