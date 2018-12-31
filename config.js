const path = require('path');

module.exports = {
    URL: 'http://cleanair.seoul.go.kr/air_city.htm?method=measure',
    paths: {
        tmp: path.join(__dirname, 'template.html'),
        result: path.join(__dirname, 'index.html'),
        data: path.join(__dirname, 'dust.json')
    }
}
