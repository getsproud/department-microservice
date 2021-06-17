import Department from '../models/department'

const updateDepartment = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'department',
    i18n: 'DEPARTMENT_UPDATE_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Department.findOneAndUpdate({ _id: query._id }, query, { new: true }).then(department => {
    if (!department) {
      message.i18n = 'DEPARTMENT_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'DEPARTMENT_UPDATE_SUCCESS'
    message.code = 200
    message.data = department

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default updateDepartment
