import mongoose, { Schema } from 'mongoose'

const RankingSchema = new Schema({
  insId: { type: String, required: true },         // formerly "Institute ID"
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  score: { type: Number, required: true },         // from "Score"
  rank: { type: Number, required: true },
  TLR: { type: Number },
  RPC: { type: Number },
  GO: { type: Number },
  OI: { type: Number },
  PR: { type: Number },                            // from "Perception"
  pdf: { type: String },                           // from "PDF URL"
  img: { type: String },                           // from "JPG URL"
  year: { type: Number, required: true },
  category: { type: String, required: true }
});


export default mongoose.models.Ranking || mongoose.model('Ranking', RankingSchema)
