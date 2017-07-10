export default {
	deepCopy (obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	clearObj (obj) {
		for(key in obj) {
			if(typeof obj[key] === 'object') {
				obj[key] = [];
			}else {
				obj[key] = '';
			}
		}
	},
	getDate (date) {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	}
}