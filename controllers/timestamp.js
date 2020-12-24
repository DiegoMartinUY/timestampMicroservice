const timestamp = {
    getTimestamp
}

function getTimestamp( param ) {
    if (param && typeof param === 'string') {
        let date = null;
        if (!isNaN(Date.parse(param))) {
            date = new Date(param);
            return { unix: date.getTime(), utc: date.toUTCString() };
        } else if (isNaN(Date.parse(param))) {
            if (param.length === 13) {
                date = new Date(param / 1);
                return { unix: date.getTime(), utc: date.toUTCString() };
            }
            return { error: "Invalid Date" };
        }
    } else {
        return { unix: new Date().getTime(), utc: new Date().toUTCString() };
    }
};

module.exports = timestamp;