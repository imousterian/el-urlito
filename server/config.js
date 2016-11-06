module.exports = {
    mongodb:{
        MONGODB_URI: 'mongodb://localhost/urls',
        options: {
            server:{
                auto_reconnect: true,
                socketOptions:{
                    connectTimeoutMS:360000,
                    keepAlive:360000,
                    socketTimeoutMS:360000
                }
            }
        }
    }
}