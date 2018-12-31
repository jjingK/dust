const fs = require('fs');
const { paths } = require('../config');

function makeData() {
    return [
        ...document.querySelectorAll('.tbl1 > tbody > tr')
    ].map(
        row => {
            const date = row.querySelector('th');
            const [location, fineDust, ultrafineDust, ] = [...row.querySelectorAll('td')];
            const getGrade = function(el) {
                const { className } = el;
                const str2RGB = (str) => {
                    const num = str.split('_').pop();
                    if (num === '1') return '#25aefb';
                    else if (num === '2') return '#92f101';
                    else if (num === '3') return '#fde905';
                    else if (num === '4') return '#fc3037';
                    else return '#f7f7f7';
                }

                return className.replace(/num_color_[0-9]/ig, str2RGB);
            }

            return {
                date: date.innerText,
                location: location.innerText,
                fineDust: fineDust.innerText,
                ultrafineDust: ultrafineDust.innerText,
                fineDustGrade: getGrade(fineDust),
                ultrafineDustGrade: getGrade(ultrafineDust)
            }
        }
    )
}

function makeTemplate(data) {
    if (!data) throw new Error('NOT FOUND DATA');

    // fs.writeFileSync(paths.data, JSON.stringify(data), 'utf8');
    const info = data.reduce((acc, item) => {
        acc.push(
            [
                '<p>',
                `<span>${item.location}</span>`,
                `<span style="background: ${item.fineDustGrade}">${item.fineDust}</span>`,
                `<span style="background: ${item.ultrafineDustGrade}">${item.ultrafineDust}</span>`,
                '</p>'
            ]
                .join('')
        );
        return acc;
    }, []);

    const templateFile = paths.tmp;

    fs.readFile(templateFile, (err, templateData) => {
        templateData = Buffer.from(templateData.toString().replace('{date}', data[0].date), 'utf8');
        templateData = Buffer.from(templateData.toString().replace('{info}', info.join('')), 'utf8');
        fs.writeFileSync(paths.result, templateData);
    });
}

module.exports = {
    makeData,
    makeTemplate
}
