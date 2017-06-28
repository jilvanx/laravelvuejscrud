/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ({

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),

/***/ 9:
/***/ (function(module, exports) {

Vue.http.headers.common['X-CSRF-TOKEN'] = $("#token").attr("value");
new Vue({

	el: '#manage-vue',

	data: {
		items: [],
		pagination: {
			total: 0,
			per_page: 2,
			from: 1,
			to: 0,
			current_page: 1
		},

		offset: 4,
		formErros: {},
		formErrosUpdate: {},
		newItem: { 'title': '', 'description': '' },
		fillItem: { 'title': '', 'description': '', 'id': '' }

	},

	computed: {
		isActived: function isActived() {
			return this.pagination.current_page;
		},

		pagesNumber: function pagesNumber() {
			if (!this.pagination.to) {
				return [];
			}

			var from = this.pagination.current_page - this.offset;
			if (from < 1) {
				from = 1;
			}

			var to = from + this.offset * 2;
			if (to >= this.pagination.last_page) {
				to = this.pagination.last_page;
			}

			var pagesArray = [];
			while (from <= to) {
				pagesArray.push(from);
				from++;
			}
			return pagesArray;
		}
	},

	mounted: function mounted() {
		this.getVueItems(this.pagination.current_page);
	},

	methods: {

		changePage: function changePage(page) {
			this.pagination.current_page = page;
			this.getVueItems(page);
		},

		getVueItems: function getVueItems(page) {
			var _this = this;

			this.$http.get('/vueitems?page=' + page).then(function (response) {
				_this.items = response.data.data.data;
				_this.pagination = response.data.pagination;
			});
		},

		createItem: function createItem() {
			var _this2 = this;

			var input = this.newItem;
			this.$http.post('/vueitems', input).then(function (response) {
				_this2.changePage(_this2.pagination.current_page);
				_this2.newItem = { 'title': '', 'description': '' };

				$("#create-item").modal('hide');
				toastr.success('Post Create Successfully!', 'Success Alert', { timeOut: 5000 });
			}, function (response) {
				_this2.formErros = response.data;
			});
		},

		deleteItem: function deleteItem(item) {
			var _this3 = this;

			this.$http.delete('/vueitems/' + item.id).then(function (response) {
				_this3.changePage(_this3.pagination.current_page);
				toastr.success('Post Deleted Successfully!', 'Success Alert', { timeOut: 5000 });
			});
		},

		editItem: function editItem(item) {
			this.fillItem.title = item.title;
			this.fillItem.description = item.description;
			this.fillItem.id = item.id;

			$("#edit-item").modal('show');
		},

		updateItem: function updateItem(id) {
			var _this4 = this;

			var input = this.fillItem;
			this.$http.put('/vueitems/' + id, input).then(function (response) {
				_this4.changePage(_this4.pagination.current_page);
				_this4.newItem = { 'title': '', 'description': '', 'id': '' };

				$("#edit-item").modal('hide');
				toastr.success('Item Updated Successfully!', 'Success Alert', { timeOut: 5000 });
			}, function (response) {
				_this4.formErros = response.data;
			});
		}

	}

});

/***/ })

/******/ });