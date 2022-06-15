base_url = "http://deckofcardsapi.com/api/deck/"

let deck_id = createDeck();
let cards_remaining = 52;

async function createDeck() {
    // Calls to Deck of Cards API and get new deck ready. Returns deck_id
    try {
        let resp = await axios.get(base_url + "new/shuffle/?deck_count=1");
        update_remaining(cards_remaining);
        return resp.data.deck_id;
    } catch (e) {
        console.log("Rejected!", e);
    }
}

async function handleDraw(deck_id) {
    // handles drawing a card from the Deck of Cards API
    try {
        let resp = await axios.get(base_url + `${deck_id}/draw/?count=1`);
        update_remaining(resp.data.remaining);
        display_card(resp.data.cards[0].image);
    } catch (e) {
        console.log("Rejected!", e);
    }
}

function handleClick() {
    // handles clicking the 'draw a card' button. Checks for deck_id promise resolved before executing handleDraw
    Promise.resolve(deck_id).then(function (deck_id) {
        handleDraw(deck_id);
    });
}

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

$('#draw').on('click', handleClick);