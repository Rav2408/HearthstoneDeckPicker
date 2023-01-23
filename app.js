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
			.then(response => response.filter(card => card.hasOwnProperty('img')))
			.then(response => this.cards = response)
			.catch(err => console.error(err));
		}

        
		
	},
	template: `
    <div v-for="c in classes">
        <button @click="getCards(c)">{{ c }}</button>
	</div>
	<div v-for="c in cards">
		<img v-bind:src="c.img">
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
