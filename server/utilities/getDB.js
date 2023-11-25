module.exports = function getDB(app) {
    let db;
    const environment = app.get('env');
    const { dbName, host, pass, user } = config.get('db');

    switch (environment) {
        case 'production':
            db = `${host}://${process.env[user]}:${process.env[pass]}@${dbName}.x17rekf.mongodb.net/valet-parking?retryWrites=true&w=majority`;
            break;
        case 'test':
            db = 'mongodb://localhost/valet-parking_test';
            break;
        case 'development':
            db = `${host}://${process.env[user]}:${process.env[pass]}@${dbName}.icd5mka.mongodb.net/valet-parking?retryWrites=true&w=majority`;
            break;
    }

    return { db, environment };
}