import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    minlength: 2
  },
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  }
}, { timestamps: true })

schema.plugin(mongoosePaginate)
const Department = model('department', schema)

export default Department
