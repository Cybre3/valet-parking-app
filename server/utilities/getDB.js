module.exports = function getDB(app) {
    let db;
    const environment = app.get('env');

    switch (environment) {
        case 'production':
            const { dbName, host, pass, user } = config.get('db');
            db = `${host}://${process.env[user]}:${process.env[pass]}@${dbName}.gg9r8ag.mongodb.net/shalom-ministry?retryWrites=true&w=majority`;
            break;
        case 'test':
            db = 'mongodb://localhost/shalom-ministry_test';
            break;
        case 'development':
            db = 'mongodb://localhost/shalom-ministry';
            break;
    }

    return { db, environment };
}