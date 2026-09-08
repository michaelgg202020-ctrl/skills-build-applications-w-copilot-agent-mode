import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), Workout.deleteMany({})]);

    const [paul, maya] = await User.create([
      { name: 'Paul Octo', email: 'paul@example.com' },
      { name: 'Maya Chen', email: 'maya@example.com' },
    ]);
    const team = await Team.create({ name: 'Mergington Movers', description: 'A friendly school fitness team', memberIds: [paul._id, maya._id] });
    await User.updateMany({ _id: { $in: [paul._id, maya._id] } }, { teamId: team._id });
    await Activity.create([
      { userId: paul._id, type: 'running', durationMinutes: 30, points: 60 },
      { userId: maya._id, type: 'strength', durationMinutes: 25, points: 50 },
    ]);
    await Workout.create({ title: 'Quick Cardio Builder', description: 'A focused session for building endurance.', level: 'beginner', durationMinutes: 20, activityType: 'running' });

    console.log('Database seeding complete');
    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
