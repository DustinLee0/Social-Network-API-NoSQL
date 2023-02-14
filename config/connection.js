const { connect, connection } = require('mongoose');

// uri used if deployed
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDb';
connect(connectionString, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})

module.exports= connection;