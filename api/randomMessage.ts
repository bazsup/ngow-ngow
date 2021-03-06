import messages from '../backend/messages'

const Category = {
    MESSAGE: '0',
    PHOTO: '1'
}
var rand = weightedRand({ [Category.MESSAGE]: 0.7, [Category.PHOTO]: 0.3 });


module.exports = (req, res) => {
    const category = rand()
    if (category === Category.MESSAGE) {
        const index = getRandomIntInclusive(0, messages.messages.length - 1)
        res.send({
            type: 'message',
            content: messages.messages[index].content
        });
    } else {
        const index = getRandomIntInclusive(0, messages.photos.length - 1)
        res.send({
            type: 'photo',
            content: messages.photos[index].url
        });
    }
}

function weightedRand(spec) {
    var i, j, table = [];
    for (i in spec) {
        // The constant 10 below should be computed based on the
        // weights in the spec for a correct and optimal table size.
        // E.g. the spec {0:0.999, 1:0.001} will break this impl.
        for (j = 0; j < spec[i] * 10; j++) {
            table.push(i);
        }
    }
    return function () {
        return table[Math.floor(Math.random() * table.length)];
    }
}

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}