const mongoose = require('mongoose');
const User = require('../backend/models/User');
require('dotenv').config({ path: '../backend/.env' });

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/easykart');
    console.log('Connected to MongoDB');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'samvohlu01@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      // Update to ensure admin status
      existingAdmin.isAdmin = true;
      await existingAdmin.save();
      console.log('Admin status confirmed');
    } else {
      // Create admin user
      const admin = new User({
        name: 'Samuel Ralte',
        email: 'samvohlu01@gmail.com',
        password: 'Samuelralte@95',
        isAdmin: true
      });
      
      await admin.save();
      console.log('Admin user created successfully');
    }
    
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the script
if (require.main === module) {
  seedAdmin();
}

module.exports = { seedAdmin };