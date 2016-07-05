

function Node(next, prev, key, value) {
	"use strict";
	this.next = next;
	this.prev = prev;
	this.key = key;
	this.value = value;
}

function LRUCache() {
	"use strict";
	this.caches = {};
	this.head = null;
	this.MAX_LENGTH = 10;
}

LRUCache.prototype.set = function (key, value) {
	if (this.isFull()) {
		this.deleteLast();
	}

	var node = new Node(this.head, null, key, value);
	if (this.head) this.head.prev = node;
	this.head = node;

	this.caches[key] = node;
};

LRUCache.prototype.get = function (key) {
	"use strict";
	var node = this.caches[key];
	// 无此节点
	if(!node) return undefined;




	this.delete(node);
	this.moveToHead(node);

	//返回值
	return node.value;
};

LRUCache.prototype.deleteLast = function() {
	"use strict";
	var node = this.head;
	while (!node.next) {
		node = node.next;
	}
	this.delete(node);
};

LRUCache.prototype.moveToHead = function(node) {
	"use strict";

	// 修改node指针, 准备放到头
	node.next = this.head;
	node.prev = null;

	// 修改头的指针
	this.head.prev = node;

	// 放到头
	this.head = node;
};

LRUCache.prototype.delete = function(node) {
	"use strict";

	// 删除这个元素 (修改相邻元素指针)
	if (node.prev) node.prev.next = node.next;
	if (node.next) node.next.prev = node.prev;
	return node;
};

LRUCache.prototype.isFull = function() {
	"use strict";
	return this.caches.length >= this.MAX_LENGTH;
};

/**
 * @param {Function} keyGen function to generate keys
 * @param {Function} func function that you wanna to cache
 */

function memoize(func, keyGen) {
	var caches = new LRUCache();
	memoize.caches = caches; // interface for testing

	return function() {
		if(keyGen) {
			var key = keyGen.apply(this, arguments);
		} else {
			var key = arguments[0];
		}

		var cache = caches.get(key);
		if(cache) {
			// console.log('hit!');
			return cache;
		} else {
			var value = func.apply(this, arguments);
			caches.set(key, value);
			return value;
		}
	}
};

module.exports = memoize;

var i = 0;

function identity(n) {
	i = i + 1;
	return n;
}


// some test code
// memoizedIdentity = memoize(identity);
// console.log(memoizedIdentity(1));
// console.log(memoizedIdentity(1));
// console.log(memoizedIdentity(2));
// console.log(memoizedIdentity(2));