$('.js-select').select();
$('.js-tabs').tabs({activeClass:'tabs__panel_active'});
$('.js-summary').summary();
$('.js-amount').amount();
$('.js-item-detail').itemdetail();



(function () {
	let html = '';
	let tree = {tagName:'body', componentNamesList:[], children:[]};

	let scan = function ($e, treeElement) {
		$e.children().each(function () {
			let $child             = $(this);
			let classNamesList     = $child.attr('class') ? $child.attr('class').split(/\s+/) : [];
			let componentNamesList = [];
			for (let className of classNamesList) {
				if (className.indexOf('js-') === 0) {
					componentNamesList.push(className);
				}
			}
			if (componentNamesList.length == 0) {
				scan($child, treeElement);
			} else {
				let newElement = {tagName:$child.prop('tagName').toLowerCase(), componentNamesList, children:[]};
				treeElement.children.push(newElement);
				scan($child, newElement);
			}
		});
	};

	let write = function (e) {
		html += '<div class="ctree__item">';
		html += '<div class="ctree__tag">'+e.tagName;
		if (e.componentNamesList.length > 0) {
			html += ': ';
			for (let componentName of e.componentNamesList) {
				let className, rel;
				let sepIndex = componentName.indexOf('__');
				if (sepIndex == -1) {
					className = 'ctree__component';
					rel       = '';
				} else {
					className = 'ctree__component-part';
					rel       = componentName.substr(0, sepIndex);
				}
				html += `<span class="${className}" data-rel="${rel}">${componentName}</span> `;
			}
		}
		html += '</div>';
		for (let child of e.children) {
			write(child);
		}
		html += '</div><br>';
	};

	scan($('body'), tree);
	write(tree);
	$('.ctree').html(html);

	$('.ctree__component').each(function () {
		let $component = $(this);
		let name       = $component.text();
		let $item      = $component.closest('.ctree__item');
		let $parts     = $item.find(`[data-rel='${name}']`);
		$component
			.mouseenter(function () { $item.addClass('ctree__item_hl');    $parts.addClass('ctree__component-part_hl');    })
			.mouseleave(function () { $item.removeClass('ctree__item_hl'); $parts.removeClass('ctree__component-part_hl'); })
		;
	});
})();
