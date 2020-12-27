const controller = {
    getTimestamp,
    getData
}

function getData(req) {
    const ip = Object.values(
        require('os').networkInterfaces()).reduce(
            (r, list) => r.concat(
                list.reduce(
                    (rr, i) => rr.concat(
                        i.family === 'IPv4' && !i.internal && i.address || []
                    ), [])
            ), []
        )[0];
    const software = req.headers["user-agent"];
    const language = req.headers['accept-language'];
    console.log(req,language)
    return {
        ipadress: ip,
        language: language,
        software: software
    }
}

function getTimestamp(param) {
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

module.exports = controller;