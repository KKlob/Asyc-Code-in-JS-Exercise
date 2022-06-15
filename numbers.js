base_url = "http://numbersapi.com/"

let randNum = Math.floor(Math.random() * 50);

str = $('#part1 h3').text();
$('#part1 h3').text(str + randNum);

function create_paragraph(text) {
    // Creates a jquery paragraph tag, fills it with text, then appends to the body of index.html
    let $p = $('<p>');
    $p.text(text);
    $('#part1').append($p);
}

function buildPromiseArray() {
    // Builds array of promises to get four random facts. Returns array of promises.
    let promArr = new Array;
    while (promArr.length < 4) {
        promArr.push(axios.get(base_url + randNum));
    }
    return promArr;
}

async function get_four_facts() {
    // Gets four random facts about num. returns an array of strings
    try {
        let promArr = await Promise.all(buildPromiseArray());
        promArr.forEach(item => create_paragraph(item.data));
    } catch (e) {
        console.log("Rejected!", e);
    }
}

get_four_facts();