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
            decks: [],
            classes: info.classes,
            className: undefined,
            searchName: undefined,
            areCardsVisible: false,
            isDecksMenuVisible: false
		}
	},
	methods: {
		getCards(mana) {
            console.log(mana)
            
            this.areCardsVisible = true
            let url= 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/' + this.className
            if(mana!== undefined){
                url += '?cost='+mana
            }
			fetch( url , options)
			.then(response => response.json())
			.then(response => response.filter(card => card.hasOwnProperty('img') && card.hasOwnProperty('type') && card.type != "Hero" && card.type != "Hero Power"))
			.then(response => {
                this.cards = response
                console.log(response)
            })
			.catch(err => console.error(err));
            this.classes = []
            
		},
        choseClass(className){
            this.className=className
            this.getCards()
        },
        backToClasses(){
            this.areCardsVisible = false
            this.cards = []
            this.deck = []
            this.classes = info.classes
        },
        addCardToDeck(card){
            if(this.deck.length<30)
            {
                let repeat = 0
                for( let i = 0; i < this.deck.length; i++){                     
                    if ( this.deck[i] === card) { 
                        repeat++; 
                    }
                }
                if(repeat<2)
                {
                    this.deck.push(card)
                } 
            } 
            console.log(this.deckCounter()); 
        },
        deckCounter()
        {
            return(this.deck.length + "/30");
        },
        generateName()
        {
            return ("New deck " + (this.decks.length+1))
        },
        saveDeck(name="default"){
            this.getDecks()
            let DeckName = prompt("Please enter deck name",this.generateName());
            name = DeckName;            
            this.decks.push({
                "name": name,
                "deck": this.deck
            })
            localStorage.decks = JSON.stringify(this.decks)
        },
        removeCardFromDeck(card){
            for( let i = 0; i < this.deck.length; i++){                     
                if ( this.deck[i] === card) { 
                    this.deck.splice(i, 1); 
                }
            }
        },
        getDecks(){
            if (localStorage.decks && localStorage.decks!=[]){
                this.decks = JSON.parse(localStorage.decks)
            }         
        },
        showDecksMenu(){
            this.getDecks()
            this.isDecksMenuVisible = true
        },
        closeDecksMenu(){
            this.isDecksMenuVisible = false
            this.decks = []
        },
        loadDeck(deck){
            this.deck=deck.deck
        },
        deleteDeck(deck){
            for( let i = 0; i < this.decks.length; i++){                     
                if ( this.decks[i] === deck) { 
                    this.decks.splice(i, 1); 
                }
            }
            localStorage.decks = JSON.stringify(this.decks)
        },
        search(e){
            e.preventDefault()
            if(this.searchName == null || this.searchName == ""){                
                this.getCards()
            }
            let url= 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/' + this.searchName
            fetch( url , options)
			.then(response => response.json())
            .then(response => function(){
                if(Array.isArray(response))
                    response = response.filter(card => card.hasOwnProperty('img'))
                    return response
            }())
			.then(response => {
                this.cards = response
                console.log(response)
            })
			.catch(err => console.error(err));
        }

	},
	template: `
    <div class="top">
        <img class="top-logo" src="https://d2q63o9r0h0ohi.cloudfront.net/images/npe/header/rose_icon_header-2c41dc61329a7d80e3f277baf149ac1fa7f6ba9b0095cbbec5b39ab21b164bb1c5909a06b6880f75e6d99c15787e4b0f246dd9d78ab8682c3bd5e0f068b0eb63.png">
        <div v-show="areCardsVisible" @click="backToClasses" class="hs-wrapper gold top-button">
            <a class="hs-button gold">
                <span class="hs-border gold">
                    <span class="hs-text gold">
                        Back
                    </span>
                </span>
            </a>
        </div>
        <h1>Hearthstone Deck Builder</h1>
        <div v-show="areCardsVisible" @click="showDecksMenu" class="hs-wrapper gold top-button">
            <a class="hs-button gold">
                <span class="hs-border gold">
                    <span class="hs-text gold">
                        Decks
                    </span>
                </span>
            </a>
        </div>
    </div>
       
    <div v-show="!areCardsVisible" class="heroes">
    <h2>Choose hero class: </h2> 
        <div class="hero-item" v-for="c in classes" @click="choseClass(c.name)">
            <img class="hero-image" v-bind:src="c.img">
            <img class="hero-image2" src="https://d2q63o9r0h0ohi.cloudfront.net/images/deckbuilder/frame_class_portrait_hover-0fe18e7eeb22e9f78e7226fb438e6a8d12b78946b58ae5d735d7869714c62848a7772c8bc424c54063d749bdb6c96d7c83e1617694c5f79b15cf1656651551c7.png">
        </div>
    </div>

    

    <div v-show="areCardsVisible" class="middle">

        <div class= "left-panel">
        <div id="search-bar">
            <div id="mana-point" v-for="n in 11" @click="getCards(n-1)">
                <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/card-gallery/icon_mana_68x68_@2x-b6ecc2a45a3440ac6cba07297306fbb64d9a224bc12a281224a091aaf92a73da2d0036e6eed920f74a957660354bfafe7831fc291aad49867d04b427737c6e3a.png">
                <p>{{n-1}}</p>
            </div>
            <img class="search search-container" src="https://d2q63o9r0h0ohi.cloudfront.net/images/card-gallery/search_left-3cb561cf585e6b6aded5dca35f8c16b3450db50cf6146e8699bd9a12117eede0b0e437db488e0a499755f2a442229c1c633522a26b08138350140aebab05ec31.png">
                <form v-on:submit="search" class="search">
                    <input id="searchInput" v-model="searchName" type="search" placeholder="Search">
                </form>
            <img class="search" src="https://d2q63o9r0h0ohi.cloudfront.net/images/card-gallery/search_right-9e22f78542b7f45c1fbffb80d6fe8f54bdb3bf5ba2972d0d20ce586b86e5b896a79bd9dd811dd0a846253db72c4821bf53aa0f3ea2add1efec8e374e9a62497d.png">
            
            <div id="reset-button" @click="getCards(undefined)" class="hs-wrapper gold">
            <a class="hs-button gold">
                <span class="hs-border gold">
                    <span class="hs-text gold">
                        Reset
                    </span>
                </span>
            </a>
        </div>
        </div>

            <div class="element" v-for="c in cards" @click="addCardToDeck(c)">
                <img v-bind:src="c.img">
            </div>
        </div>

        <div class= "right-panel">
            <div class="deck-menu">
                <div v-for="d in deck" class="list-elem options-on-hover" >
                    <p class="list-elem-cost">{{ d.cost }}</p> 
                    <p class="list-elem-name">{{ d.name }}</p> 
                    <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_left-c1a0e1834e1ff7351c0f929282db3cfb44293b366a4433ffdfc0c097ebd01bbc2951caaf3bd03379be1f30907a58fcaf7c8a1f2ea60805bcec1519e216ee0d54.png">            
                    <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_middle-356a94f18c483c86b6cc02773fda2d345259b428932db41718e7be1873e8a737cd2ae5c58ff7ded8144f81ecb7748f1b1e2e50ad155c993b40d86fa1c3a825ac.png">
                    <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_middle-356a94f18c483c86b6cc02773fda2d345259b428932db41718e7be1873e8a737cd2ae5c58ff7ded8144f81ecb7748f1b1e2e50ad155c993b40d86fa1c3a825ac.png">         
                    <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_middle-356a94f18c483c86b6cc02773fda2d345259b428932db41718e7be1873e8a737cd2ae5c58ff7ded8144f81ecb7748f1b1e2e50ad155c993b40d86fa1c3a825ac.png">         
                    <img src="https://d2q63o9r0h0ohi.cloudfront.net/images/decklist/card_list_right-cc4f9b7f9f64ddf99755527449897fa91a5d699b6aa8f12ad79bfdb04113c49d92a4d7c9c1689b1373459393410b19c29da235465833f5c51f0b026f3737eb2b.png">
                    <img @click="removeCardFromDeck(d)" class="delete-on-hover" src="https://cdn-icons-png.flaticon.com/512/7159/7159094.png">        
                </div>
                <div id="save-button" @click="saveDeck('nazwaDecku')" class="hs-wrapper gold">
                    <a class="hs-button gold">
                        <span class="hs-border gold">
                            <span class="hs-text gold">
                                Save deck
                            </span>
                        </span>
                    </a>
		        </div>

            </div>

        </div>
    </div>

    <div v-show="isDecksMenuVisible" class="window-menu" >
        <div id="window-wrapper">
            <button class="close-button" @click="closeDecksMenu"></button>
            <div class="list">
                <div class="list-elem" id="decks-item" v-for="d in decks" @click="loadDeck(d)">
                    <div class="p-and-button">
                        <p>{{ d.name }}</p> 
                        <button class="delete-button" @click="deleteDeck(d)"></button> 
                    </div>
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
