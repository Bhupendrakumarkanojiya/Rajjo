require('./env');

const DEV_PORT = 5001;

const mandatory = name => {
    const value = process.env[name];

    if (value === undefined) {
        const message = `ERROR: Missing required environment variable: ${name}`;
        throw new Error(message);
    }

    return value;
};

exports.logger = {
    enabled: process.env.NODE_ENV !== 'test',
};

exports.express = {
    logFormat: process.env.NODE_ENV === 'development' ? 'dev' : 'combined',
    port: process.env.PORT || DEV_PORT,
    verbose404: !['production', 'staging', 'test'].includes(process.env.TARGET_ENV),
};