
const requireAll = r => ({
	...r.keys().reduce((obj, key) => {
		return {
			...obj,
			[key.replace(/(^.*\/|\..*$)/g, "")]: r(key)
		}
	}, {})
})

module.exports = {
	requireAll
}
