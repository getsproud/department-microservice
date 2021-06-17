import Department from '../models/department'

const findAllBy = call => new Promise((resolve, reject) => {
  const { query, options, useResolve } = call

  const message = {
    domain: 'department',
    i18n: 'DEPARTMENTS_ERROR',
    data: [],
    code: 500,
    stack: null,
    error: null
  }

  const opts = {
    page: options.page || 1,
    limit: options.limit || 12,
    pagination: options.pagination || true
  }

  Department.paginate(query, opts).then(departments => {
    message.data = departments

    if (!departments.docs || !departments.docs.length) {
      message.i18n = 'DEPARTMENTS_NOT_FOUND'
      message.code = 404

      return !useResolve ? reject(message) : resolve(message)
    }

    message.i18n = 'DEPARTMENTS_FOUND'
    message.code = 200

    return resolve(message)
  }).catch(err => {
    message.stack = err.stack
    message.error = err.message

    return reject(message)
  })
})

export default findAllBy
