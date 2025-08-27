import User from '../models/users.js';


export const getUsers = async (req, res) => {
    const users = await User.find(); 
    res.json(users)
}

export const getUserinfo = (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(`Fetching user with ID: ${userId}`);
    const user = User.find(u => u.id === userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
}

export const createUser = async (req, res) => {
    console.log('Creating user with data:', req.body);

    const user = new User(req.body);

    const saved = await user.save();
    if (!saved) {
        return res.status(500).json({ message: 'Error saving user' });
    }
    res.status(201).json(saved);
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true});
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
}
