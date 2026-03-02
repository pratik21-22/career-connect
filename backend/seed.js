const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Job = require('./models/Job');

dotenv.config();

const seedDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        // Clear existing data
        await User.deleteMany({});
        await Job.deleteMany({});
        console.log('Cleared existing data');

        // Create a test recruiter
        const recruiter = await User.create({
            name: 'Raj Recruiter',
            email: 'recruiter@example.com',
            password: 'password123',
            role: 'recruiter',
        });
        console.log('Recruiter created:', recruiter._id);

        // Create sample jobs
        const jobs = [
            {
                title: 'Senior Software Engineer',
                description: 'Looking for a senior engineer with 5+ years of experience in full-stack development. You will work on scalable systems and lead a small team.',
                company: 'TechCorp',
                location: 'Kolkata',
                salary: '15-20 LPA',
                createdBy: recruiter._id,
            },
            {
                title: 'Software Engineer',
                description: 'Build amazing products as a software engineer. Work with React, Node.js, and MongoDB. Fast-paced startup environment.',
                company: 'Startup Co',
                location: 'Kolkata',
                salary: '8-12 LPA',
                createdBy: recruiter._id,
            },
            {
                title: 'Frontend Developer',
                description: 'We need an experienced frontend developer proficient in React and Tailwind CSS. Design and develop responsive UIs.',
                company: 'WebDesign Inc',
                location: 'Bangalore',
                salary: '10-15 LPA',
                createdBy: recruiter._id,
            },
            {
                title: 'Backend Developer',
                description: 'Develop robust APIs using Node.js and Express. Work with MongoDB and PostgreSQL databases. 3+ years experience required.',
                company: 'CloudTech',
                location: 'Bangalore',
                salary: '12-18 LPA',
                createdBy: recruiter._id,
            },
            {
                title: 'Full Stack Developer',
                description: 'Join our team and build full-stack applications. Knowledge of MERN stack is a must. 2+ years experience.',
                company: 'Digital Solutions',
                location: 'Mumbai',
                salary: '10-15 LPA',
                createdBy: recruiter._id,
            },
            {
                title: 'DevOps Engineer',
                description: 'Manage cloud infrastructure on AWS. Experience with Docker, Kubernetes, and CI/CD pipelines required.',
                company: 'Enterprise Systems',
                location: 'Pune',
                salary: '15-22 LPA',
                createdBy: recruiter._id,
            },
            {
                title: 'Data Scientist',
                description: 'Work with machine learning models and data analysis. Python, TensorFlow, and SQL skills required.',
                company: 'Analytics Pro',
                location: 'Hyderabad',
                salary: '12-18 LPA',
                createdBy: recruiter._id,
            },
            {
                title: 'Go Developer',
                description: 'Build microservices in Go. Experience with distributed systems and gRPC is a plus.',
                company: 'MicroServ Tech',
                location: 'Kolkata',
                salary: '18-25 LPA',
                createdBy: recruiter._id,
            },
        ];

        const createdJobs = await Job.insertMany(jobs);
        console.log(`Created ${createdJobs.length} jobs`);

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDB();
