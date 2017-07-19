export default {
	deepCopy (obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	clearObj (obj) {
		for(let key in obj) {
			if(typeof obj[key] === 'object') {
				obj[key] = [];
			}else {
				obj[key] = '';
			}
		}
		return obj;
	},
	getDate (date) {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	},
	coverObj (obj, obj1) {
		for (let key in obj) {
			obj[key] = obj1[key] == undefined ? obj[key] : obj1[key];
		}
		return obj;
	},
	searchTree (arr, id) {

		return f(arr);

		function f(a) {
			let i = a.length;
			while( i-- ) {
				const d = a[i];
				if(d.id == id) {
					return {arr: a, index: i};
				}else if(d.children && d.children.length != 0) {
					const o  = f(d.children);
					if(o) {
						return o;
					}
				}
			}
		}
	}
}