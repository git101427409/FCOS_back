
// 移除物件中的空值
exports.removeBlank = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if(!value) {
                delete obj[key]
            }
        }
    }
    return obj
}