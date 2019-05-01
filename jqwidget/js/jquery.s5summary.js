$.widget('s5.summary', {
	_create: function () {
	},
	setDefinition: function ({term, def}) {
		this.element.find(`[data-js-summary-item-def='${term}']`).html(def);
	},
});
