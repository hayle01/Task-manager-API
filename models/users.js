    import mongoose from 'mongoose';
    import bcrypt from 'bcryptjs';

    const userSchema = new mongoose.Schema({
        name: String,
        email: { type: String, unique: true},
        password: String,
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        profile: String
    })

    // hash password before saving to db
    userSchema.pre('save', async function(next) {
        if(!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    })

    // method to compare password
    userSchema.methods.comparePassword = async function(inputPassword){
        return await bcrypt.compare(inputPassword, this.password)
    }



    const User = mongoose.model('User', userSchema);

    export default User;