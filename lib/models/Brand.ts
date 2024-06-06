import mongoose from 'mongoose'

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, },
    web: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, },
    phone: { type: String, },
    logo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Brand =
  mongoose.models.Brand || mongoose.model('Brand', BrandSchema)

export default Brand