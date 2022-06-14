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

let get_four_facts = new Promise(function (resolve, reject) {
    // gets four random facts about num. Returns an array of strings

    let resp_array = new Array;
    let fact_array = new Array;
    while (resp_array.length < 4) {
        resp_array.push(axios.get(base_url + randNum));
    }
    Promise.all(resp_array)
        .then(respArray => {
            respArray.forEach(item => {
                fact_array.push(item.data);
            })
            resolve(fact_array);
        })
        .catch(err => {
            reject("Rejected!", err);
        });
});

get_four_facts
    .then(facts => {
        facts.forEach(item => create_paragraph(item));
    })
    .catch(err => {
        console.log(err);
    });