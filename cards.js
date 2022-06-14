base_url = "http://deckofcardsapi.com/api/deck/"

let deck_id;
let cards_remaining;

axios.get(base_url + "new/shuffle/?deck_count=1")
    .then(resp => {
        deck_id = resp.data.deck_id;
        cards_remaining = parseInt(resp.data.remaining);
        $('#card_count').append(" " + cards_remaining);
    })
    .catch(err => {
        console.log("Rejected!", err);
    });

function update_remaining(cards) {
    // takes in number, updates page
    $('#card_count').text(`Number of cards remaining: ${cards}`);
}

function display_card(image_url) {
    // takes in img url, updateds page
    if ($('#card').length) {
        $('#card').attr('src', image_url);
    }
    else {
        let card_image = $('<img>').attr('id', 'card').attr('src', image_url);
        $('#card_display').append(card_image);
    }
}

function handle_draw() {
    axios.get(base_url + `${deck_id}/draw/?count=1`)
        .then(resp => {
            cards = resp.data.remaining;
            image = resp.data.cards[0].image;
            update_remaining(cards);
            display_card(image);
        })
        .catch(err => {
            console.log(err);
        });
}

$('#draw').on('click', handle_draw);