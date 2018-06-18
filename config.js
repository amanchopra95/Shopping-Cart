const config = {
    "BCRYPT_SALT_ROUNDS": 8,
    "DB": {
        "NAME": "shopsampledb",
        "USER": "shopadmin",
        "PASSWORD": "Shoppass1!",
        "HOST": "localhost"
    }
};

config.DEPLOY_CONFIG = process.env.NODE_ENV || 'development';

switch (config.DEPLOY_CONFIG) {

    case 'development': default:
        config.SERVER_URL = 'http://localhost:9898'
        break;
    
    case 'production':
        config.SERVER_URL = ''
        break;

    case 'test':
        config.SERVER_URL = ''
        break;
}

module.exports = config;