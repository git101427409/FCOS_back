
// handle success
exports.success = (data = 'unknown') => {
    return {
        'status': 0,
        'msg': 'success',
        data
    }
}
// handle insertMany success
exports.insertManySuccess = (data = 'unknown', repeat) => {
    return {
        'status': 0,
        'msg': 'success. if a certain data\'s value has already been used, it will not be created, reference \'repeat\'.',
        data,
        repeat
    }
}
// handle DB not found
exports.notFound = (data = 'unknown') => {
    return {
        'status': 0,
        'msg': 'DB not found',
        data
    }
}
// handle error
exports.error = (err, errFrom ='unknown') => {
    return {
        'status': 1,
        'msg': 'api error',
        errFrom,
        err
    }
}
