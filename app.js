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
        }
	},
	template: `
    <div class="top">
        <img class="top-logo" src="https://d2q63o9r0h0ohi.cloudfront.net/images/npe/header/rose_icon_header-2c41dc61329a7d80e3f277baf149ac1fa7f6ba9b0095cbbec5b39ab21b164bb1c5909a06b6880f75e6d99c15787e4b0f246dd9d78ab8682c3bd5e0f068b0eb63.png">
        <button class="back-button" v-show="areCardsVisible" @click="backToClasses"> Back </button>
        <h1>Hearthstone Deck Builder</h1>
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
            <div v-for="d in deck" class="list-elem">{{ d.name }}  {{ d.cost }}</div>
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
