import Department from '../models/department'

const createDepartment = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'department',
    i18n: 'DEPARTMENT_CREATION_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Department.create(query).then(department => {
    message.i18n = 'DEPARTMENT_CREATION_SUCCESS'
    message.code = 200
    message.data = department

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default createDepartment
