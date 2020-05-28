//User UserDBStarWars
//passwd 5oS9z4wohZXQaCfF
process.env.USER_SIS = 'UserDBStarWars'
process.env.PASSWD = '5oS9z4wohZXQaCfF'
process.env.CLUSTER = 'cluster0-7lt1z'
process.env.TEST = 'false'

require('./config/server').start();

