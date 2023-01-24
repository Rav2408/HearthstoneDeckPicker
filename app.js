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
            classes: info.classes
		}
	},
	methods: {
		getCards(className) {
			fetch('https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/' + className, options)
			.then(response => response.json())
			.then(response => response.filter(card => card.hasOwnProperty('img') && card.hasOwnProperty('type') && card.type != "Hero" && card.type != "Hero Power"))
			.then(response => {
                this.cards = response
                console.log(response)
            })
			.catch(err => console.error(err));
		}

        
		
	},
	template: `
    <div class="container">
            <img class="item" v-for="c in classes" @click="getCards(c.name)" v-bind:src="c.img">
    </div>
    <div class="container">
        <div class="item" v-for="c in cards">
            <img v-bind:src="c.img">
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
		components: {
			karta
		}
	}).mount("#app")
