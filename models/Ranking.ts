import mongoose, { Schema } from 'mongoose'

const RankingSchema = new Schema({
  year: Number,
  category: String,
  institution: String,
  name: String,
  city: String,
  state: String,
  rank: Number,
  score: Number,
  TLR: Number,
  RP: Number,
  GO: Number,
  OI: Number,
  PR: Number,
  report: String,
})

export default mongoose.models.Ranking || mongoose.model('Ranking', RankingSchema)
