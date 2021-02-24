import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Martin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 8),
        isAdmin: true
    },
    {
        name: 'John Doe', 
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 8),
    },
    {
        name: 'Jane Doe', 
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 8),
    }
]

export default users;