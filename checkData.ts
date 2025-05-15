import mongoose from 'mongoose';
import connectDB from './lib/mongodb';
import Ranking from './models/Ranking';

async function checkStoredData() {
  try {
    await connectDB();

    const total = await Ranking.countDocuments();
    const categories = await Ranking.distinct('category');
    const years = await Ranking.distinct('year');
    const sampleOverall = await Ranking.find({ category: 'overall', year: 2024 }).limit(3);

    console.log('📊 Total documents:', total);
    console.log('📂 Categories:', categories);
    console.log('📅 Years:', years);
    console.log('🔍 Sample "overall" 2024 entries:\n', sampleOverall);
  } catch (err) {
    console.error('❌ Error checking DB:', err);
  } finally {
    await mongoose.disconnect();
  }
}

checkStoredData();
