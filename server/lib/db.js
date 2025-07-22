import mongoose from 'mongoose';

// function to connect to the mongodb database
export const connectBD = async () => {
    try {

        mongoose.connection.on('connected', ()=> console.log('Connected to MongoDB'));
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);

    } catch (error){
        console.log(error);
        return false   
    }
}