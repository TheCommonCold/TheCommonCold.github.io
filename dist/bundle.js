/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var data;\nvar currentlyDisplayed = 0;\nvar maximumToDisplay = 0;\nvar which = \"show all\";\n\nfunction loadData() {\n  var request = new XMLHttpRequest();\n  request.open('GET', 'http://www.splashbase.co/api/v1/images/search?query=tree', true);\n\n  request.onload = function () {\n    if (request.status >= 200 && request.status < 400) {\n      data = JSON.parse(this.response);\n      console.log(data);\n      display();\n    } else {\n      console.log('error');\n    }\n  };\n\n  request.send();\n}\n\nfunction checkForMoreImages() {\n  if (currentlyDisplayed < maximumToDisplay) {\n    $(\"#show-more\").show();\n  } else $(\"#show-more\").hide();\n}\n\nwindow.highlight = function (button) {\n  if ($(button).attr(\"class\") !== \"Highlight\") {\n    $(\"#loader\").show();\n    $(\".Highlight\").removeClass(\"Highlight\");\n    $(button).addClass(\"Highlight\");\n    $(\"#gallery\").empty();\n    currentlyDisplayed = 0;\n    which = $(button).text();\n    $(\"#show-more\").hide();\n    display();\n  }\n};\n\nwindow.showMore = function (button) {\n  $(button).hide();\n  $(\"#show-loader\").show();\n  display();\n};\n\nfunction validateGridLayout(selectedNumbers, bannedNumbers) {\n  var validated = 1;\n  selectedNumbers.sort();\n\n  for (var i = 0; i < selectedNumbers.length; i++) {\n    if (bannedNumbers.includes(selectedNumbers[i])) {\n      console.log(\"repeat\");\n      validated = 0;\n      break;\n    }\n\n    for (var j = 0; j < bannedNumbers.length; j++) {\n      if (bannedNumbers[j] > selectedNumbers[i]) {\n        bannedNumbers[j]--;\n      }\n    }\n  }\n\n  return validated;\n}\n\nfunction generateGridLayout(maxPageFit, pageFit) {\n  var validated = 0;\n\n  while (validated === 0) {\n    var selectedToStreach = [];\n    validated = 1;\n\n    for (i = 0; i < maxPageFit - pageFit; i++) {\n      var selected = Math.floor(Math.random() * pageFit);\n\n      if (!selectedToStreach.includes(selected)) {\n        selectedToStreach.push(selected);\n      } else i--;\n    }\n\n    validated = validateGridLayout(selectedToStreach, [3, 7, 11]);\n    console.log(selectedToStreach);\n  }\n\n  return selectedToStreach;\n}\n\nfunction populateGallery(pageFit, images, selectedNumbers) {\n  var gridElements = [];\n  var imagesContainer = document.createElement(\"div\");\n  imagesContainer.className = \"grid-container\";\n  $(\"#gallery\").append(imagesContainer);\n  $(\"#gallery\").children().last().hide();\n\n  for (i = currentlyDisplayed; i < pageFit + currentlyDisplayed; i++) {\n    var div = document.createElement(\"div\");\n    div.className = \"image animateright\";\n    var img = document.createElement(\"img\");\n    img.src = images[i];\n    div.appendChild(img);\n    div.className += \" col-3\";\n    div.style.animationDuration = (0.3 + (i - currentlyDisplayed) / 50).toString() + 's';\n    gridElements.push(div);\n    imagesContainer.appendChild(gridElements[i - currentlyDisplayed]);\n  }\n\n  for (i = 0; i < selectedNumbers.length; i++) {\n    if (i === 0 && selectedNumbers[i] % 2 !== 0 || i !== 0 && (selectedNumbers[i] - selectedNumbers[i - 1] - 1) % 2 !== 0) {\n      gridElements[selectedNumbers[i] - 1].className += \" mobile-streach\";\n    }\n\n    gridElements[selectedNumbers[i]].className += \" col-6\";\n  }\n\n  if ((pageFit - selectedNumbers[selectedNumbers.length - 1] - 1) % 2 !== 0 && pageFit - selectedNumbers[selectedNumbers.length - 1] - 1 > 0) {\n    gridElements[selectedNumbers[selectedNumbers.length - 1] + 1].className += \" mobile-streach\";\n  }\n}\n\nfunction display() {\n  var images = [];\n  var i;\n\n  for (i = 0; i < data.images.length; i++) {\n    if (which === \"show all\") {\n      images.push(data.images[i].url);\n    } else {\n      if (data.images[i].site === which) {\n        images.push(data.images[i].url);\n      }\n    }\n  }\n\n  maximumToDisplay = images.length;\n  var maxPageFit = 12;\n  var pageFit = 10;\n  var imagesLength = images.length - currentlyDisplayed;\n\n  if (imagesLength < 2) {\n    maxPageFit = 2;\n  } else if (imagesLength < 4) {\n    maxPageFit = 4;\n  } else if (imagesLength < 6) {\n    maxPageFit = 8;\n  }\n\n  if (imagesLength < 10) {\n    pageFit = imagesLength;\n  }\n\n  console.log(maxPageFit, pageFit);\n  selectedNumbers = generateGridLayout(maxPageFit, pageFit);\n  populateGallery(pageFit, images, selectedNumbers);\n  currentlyDisplayed += pageFit;\n  waitForImagesToLoad();\n}\n\nfunction waitForImagesToLoad() {\n  var imagesLoaded = 0;\n  var totalImages = $('img').length;\n  $('img').each(function (idx, img) {\n    $('<img>').on('load', imageLoaded).attr('src', $(img).attr('src'));\n  });\n\n  function imageLoaded() {\n    imagesLoaded++;\n\n    if (imagesLoaded === totalImages) {\n      allImagesLoaded();\n    }\n  }\n\n  function allImagesLoaded() {\n    $(\"#gallery\").children().last().show();\n    $(\"#loader\").hide();\n    $(\"#show-loader\").hide();\n    console.log('ALL IMAGES LOADED');\n    checkForMoreImages();\n  }\n}\n\nloadData();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/scss/index.scss?");

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/index.js ./src/scss/index.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/js/index.js */\"./src/js/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/scss/index.scss */\"./src/scss/index.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/js/index.js_./src/scss/index.scss?");

/***/ })

/******/ });