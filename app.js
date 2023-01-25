const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cd3f4ff372msh3a6877a3ef4516dp17cd59jsn4af4a36a61b4',
		'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
	},
	mode: 'cors'
};

const karta = {
	data() {
		return {
			cards: [],
            deck: [],
            classes: info.classes,
            areCardsVisible: false
		}
	},
	methods: {
		getCards(className) {
            this.areCardsVisible = true
			fetch('https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/' + className, options)
			.then(response => response.json())
			.then(response => response.filter(card => card.hasOwnProperty('img') && card.hasOwnProperty('type') && card.type != "Hero" && card.type != "Hero Power"))
			.then(response => {
                this.cards = response
                console.log(response)
            })
			.catch(err => console.error(err));
            this.classes = []
            
		},
        backToClasses(){
            this.areCardsVisible = false
            this.cards = []
            this.classes = info.classes
        },
        addCardToDeck(card){
            this.deck.push(card)
        },
        saveDeck(name="default"){
            //TODO trzeba zrobić ekran w którym będziemy podawać nazwę deku, może to być mały popup
            //TODO trzeba zrobić ekran do przeglądania nazw istniejących już deków. Po wybraniu nazwy powinien się załadować.
            //TODO walidacje jakiegoś dodawania, liczby kart 30 itp
            //TODO Button do usunięcia karty z decku bo na razie jest to zrobione na luzie
            //TODO dodatkowe ekran z szczegółowym wyświetleniem informacji na temat karty
            console.log(name)
            
            let decks = this.getDecks()
            console.log(decks)
            
            decks.push({
                "name": name,
                "deck": this.deck
            })
            localStorage.decks = JSON.stringify(decks)
        },
        removeCardFromDeck(card){
            for( let i = 0; i < this.deck.length; i++){                     
                if ( this.deck[i] === card) { 
                    this.deck.splice(i, 1); 
                }
            }
        },
        getDecks(){
            let decks =[]
            if (localStorage.decks && localStorage.decks!=[]){
                decks = JSON.parse(localStorage.decks)
            }
            console.log("dek z local storage")
            console.log(decks)
            
            return decks
        }
	},
	template: `
    <div class="top">
        <img class="top-logo" src="https://d2q63o9r0h0ohi.cloudfront.net/images/npe/header/rose_icon_header-2c41dc61329a7d80e3f277baf149ac1fa7f6ba9b0095cbbec5b39ab21b164bb1c5909a06b6880f75e6d99c15787e4b0f246dd9d78ab8682c3bd5e0f068b0eb63.png">
        <button class="back-button" v-show="areCardsVisible" @click="backToClasses"> Back </button>
        <h1>Hearthstone Deck Builder</h1>
        <button class="back-button" v-show="areCardsVisible" @click="backToClasses"> Decks </button>
    </div>
       
    <div v-show="!areCardsVisible" class="heroes">
    <h2>Choose hero class: </h2> 
        <div class="hero-item" v-for="c in classes" @click="getCards(c.name)">
            <img class="hero-image" v-bind:src="c.img">
            <img class="hero-image2" src="https://d2q63o9r0h0ohi.cloudfront.net/images/deckbuilder/frame_class_portrait_hover-0fe18e7eeb22e9f78e7226fb438e6a8d12b78946b58ae5d735d7869714c62848a7772c8bc424c54063d749bdb6c96d7c83e1617694c5f79b15cf1656651551c7.png">
        </div>
    </div>

    

    <div v-show="areCardsVisible" class="middle">
        <div class= "left-panel">
            <div class="element" v-for="c in cards" @click="addCardToDeck(c)">
                <img v-bind:src="c.img">
            </div>
        </div>

        <div class= "right-panel">
            <div class="deck-menu">
                <div v-for="d in deck" class="list-elem" >
                    <p class="list-elem-cost">{{ d.cost }}</p> 
                    <p class="list-elem-name">{{ d.name }}</p> 
                    <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_left-c1a0e1834e1ff7351c0f929282db3cfb44293b366a4433ffdfc0c097ebd01bbc2951caaf3bd03379be1f30907a58fcaf7c8a1f2ea60805bcec1519e216ee0d54.png">            
                    <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_middle-356a94f18c483c86b6cc02773fda2d345259b428932db41718e7be1873e8a737cd2ae5c58ff7ded8144f81ecb7748f1b1e2e50ad155c993b40d86fa1c3a825ac.png">
                    <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_middle-356a94f18c483c86b6cc02773fda2d345259b428932db41718e7be1873e8a737cd2ae5c58ff7ded8144f81ecb7748f1b1e2e50ad155c993b40d86fa1c3a825ac.png">         
                    <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_middle-356a94f18c483c86b6cc02773fda2d345259b428932db41718e7be1873e8a737cd2ae5c58ff7ded8144f81ecb7748f1b1e2e50ad155c993b40d86fa1c3a825ac.png">         
                    <img @click="removeCardFromDeck(d)" src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_right-cc4f9b7f9f64ddf99755527449897fa91a5d699b6aa8f12ad79bfdb04113c49d92a4d7c9c1689b1373459393410b19c29da235465833f5c51f0b026f3737eb2b.png">        
                </div>
                <button @click="saveDeck('nazwaDecku')">Save deck</button>
                <div class="hs-wrapper gold">
                <a class="hs-button gold" href="">
                    <span class="hs-border gold">
                        <span class="hs-text gold">
                            Play Now
                        </span>
                    </span>
                </a>
		    </div>
            </div>

        </div>
    </div>
	`	
}


const app =	Vue.createApp({
		data() {
			return {
				count: 0
			}
		},
        methods:{

        },
		components: {
			karta
		}
	}).mount("#app")
