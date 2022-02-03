/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./graphql/GraphQLClient.ts":
/*!**********************************!*\
  !*** ./graphql/GraphQLClient.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ \"@apollo/client\");\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client/link/error */ \"@apollo/client/link/error\");\n/* harmony import */ var _apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var apollo_upload_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-upload-client */ \"apollo-upload-client\");\n/* harmony import */ var apollo_upload_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_upload_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _apollo_client_link_ws__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @apollo/client/link/ws */ \"@apollo/client/link/ws\");\n/* harmony import */ var _apollo_client_link_ws__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_link_ws__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _apollo_client_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @apollo/client/utilities */ \"@apollo/client/utilities\");\n/* harmony import */ var _apollo_client_utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_utilities__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utils_api_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/api_client */ \"./utils/api_client.ts\");\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @utils/constants */ \"./utils/constants.ts\");\n\n\n\n\n\n\n\n// TODO: fix this to not be hardcoded to localhost\nconst uploadLink = (0,apollo_upload_client__WEBPACK_IMPORTED_MODULE_2__.createUploadLink)({\n    uri: `${process.env.NEXT_PUBLIC_REACT_APP_SERV_PROTOCOL}${process.env.NEXT_PUBLIC_REACT_APP_SERV_HOSTNAME}/graphql`\n});\n// TODO: only do this during development\nconst errorLink = (0,_apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1__.onError)(({ graphQLErrors , networkError  })=>{\n    if (graphQLErrors) graphQLErrors.forEach(({ message , locations , path  })=>console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)\n    );\n    if (networkError) console.log(`[Network error]: ${networkError}`);\n});\nlet link = _utils_constants__WEBPACK_IMPORTED_MODULE_6__.IS_SERVER ? new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.HttpLink({\n    uri: `${process.env.NEXT_PUBLIC_REACT_APP_WS_PROTOCOL}${process.env.NEXT_PUBLIC_REACT_APP_SERV_HOSTNAME}/graphql`\n}) : new _apollo_client_link_ws__WEBPACK_IMPORTED_MODULE_3__.WebSocketLink({\n    uri: `${process.env.NEXT_PUBLIC_REACT_APP_WS_PROTOCOL}${process.env.NEXT_PUBLIC_REACT_APP_SERV_HOSTNAME}/graphql`,\n    options: {\n        reconnect: true,\n        connectionParams: {\n            Authorization: localStorage.getItem((0,_utils_api_client__WEBPACK_IMPORTED_MODULE_5__.getLocalStorageKey)())\n        }\n    }\n});\nconst splitLink = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.split)(({ query  })=>{\n    const definition = (0,_apollo_client_utilities__WEBPACK_IMPORTED_MODULE_4__.getMainDefinition)(query);\n    return definition.kind === \"OperationDefinition\" && definition.operation === \"subscription\";\n}, link, (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.from)([\n    errorLink,\n    uploadLink\n]));\nlet client = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({\n    link: splitLink,\n    cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.InMemoryCache()\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (client);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ncmFwaHFsL0dyYXBoUUxDbGllbnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQU11QjtBQUM0QjtBQUVJO0FBQ0Q7QUFDTTtBQUNKO0FBQ1o7QUFFNUMsRUFBa0Q7QUFDbEQsS0FBSyxDQUFDVyxVQUFVLEdBQUdMLHNFQUFnQixDQUFDLENBQUM7SUFDbkNNLEdBQUcsS0FBS0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLG1DQUFtQyxHQUFHRixPQUFPLENBQUNDLEdBQUcsQ0FBQ0UsbUNBQW1DLENBQUMsUUFBUTtBQUNwSCxDQUFDO0FBRUQsRUFBd0M7QUFDeEMsS0FBSyxDQUFDQyxTQUFTLEdBQUdaLGtFQUFPLEVBQUUsQ0FBQyxDQUFDYSxhQUFhLEdBQUVDLFlBQVksRUFBQyxDQUFDLEdBQUssQ0FBQztJQUM5RCxFQUFFLEVBQUVELGFBQWEsRUFDZkEsYUFBYSxDQUFDRSxPQUFPLEVBQUUsQ0FBQyxDQUFDQyxPQUFPLEdBQUVDLFNBQVMsR0FBRUMsSUFBSSxFQUFDLENBQUMsR0FDakRDLE9BQU8sQ0FBQ0MsR0FBRyxFQUNSLDBCQUEwQixFQUFFSixPQUFPLENBQUMsWUFBWSxFQUFFQyxTQUFTLENBQUMsUUFBUSxFQUFFQyxJQUFJOztJQUlqRixFQUFFLEVBQUVKLFlBQVksRUFBRUssT0FBTyxDQUFDQyxHQUFHLEVBQUUsaUJBQWlCLEVBQUVOLFlBQVk7QUFDaEUsQ0FBQztBQUVELEdBQUcsQ0FBQ08sSUFBSSxHQUFHaEIsdURBQVMsR0FDaEIsR0FBRyxDQUFDTixvREFBUSxDQUFDLENBQUM7SUFDWlEsR0FBRyxLQUFLQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ2EsaUNBQWlDLEdBQUdkLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRSxtQ0FBbUMsQ0FBQyxRQUFRO0FBQ2xILENBQUMsSUFDRCxHQUFHLENBQUNULGlFQUFhLENBQUMsQ0FBQztJQUNqQkssR0FBRyxLQUFLQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ2EsaUNBQWlDLEdBQUdkLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRSxtQ0FBbUMsQ0FBQyxRQUFRO0lBQ2hIWSxPQUFPLEVBQUUsQ0FBQztRQUNSQyxTQUFTLEVBQUUsSUFBSTtRQUNmQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ2pCQyxhQUFhLEVBQUVDLFlBQVksQ0FBQ0MsT0FBTyxDQUFDeEIscUVBQWtCO1FBQ3hELENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUVMLEtBQUssQ0FBQ3lCLFNBQVMsR0FBRy9CLHFEQUFLLEVBQ3BCLENBQUMsQ0FBQ2dDLEtBQUssRUFBQyxDQUFDLEdBQUssQ0FBQztJQUNkLEtBQUssQ0FBQ0MsVUFBVSxHQUFHNUIsMkVBQWlCLENBQUMyQixLQUFLO0lBQzFDLE1BQU0sQ0FDSkMsVUFBVSxDQUFDQyxJQUFJLEtBQUssQ0FBcUIsd0JBQ3pDRCxVQUFVLENBQUNFLFNBQVMsS0FBSyxDQUFjO0FBRTNDLENBQUMsRUFDRFosSUFBSSxFQUNKeEIsb0RBQUksQ0FBQyxDQUFDZTtJQUFBQSxTQUFTO0lBQUVOLFVBQVU7QUFBQSxDQUFDO0FBRzlCLEdBQUcsQ0FBQzRCLE1BQU0sR0FBRyxHQUFHLENBQUN2Qyx3REFBWSxDQUFDLENBQUM7SUFDN0IwQixJQUFJLEVBQUVRLFNBQVM7SUFDZk0sS0FBSyxFQUFFLEdBQUcsQ0FBQ3ZDLHlEQUFhO0FBQzFCLENBQUM7QUFFRCxpRUFBZXNDLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JvdW50eS1jbGllbnQvLi9ncmFwaHFsL0dyYXBoUUxDbGllbnQudHM/YzU3NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcG9sbG9DbGllbnQsXG4gIEluTWVtb3J5Q2FjaGUsXG4gIGZyb20sXG4gIHNwbGl0LFxuICBIdHRwTGluayxcbn0gZnJvbSBcIkBhcG9sbG8vY2xpZW50XCI7XG5pbXBvcnQgeyBvbkVycm9yIH0gZnJvbSBcIkBhcG9sbG8vY2xpZW50L2xpbmsvZXJyb3JcIjtcbmltcG9ydCB7IHNldENvbnRleHQgfSBmcm9tIFwiQGFwb2xsby9jbGllbnQvbGluay9jb250ZXh0XCI7XG5pbXBvcnQgeyBjcmVhdGVVcGxvYWRMaW5rIH0gZnJvbSBcImFwb2xsby11cGxvYWQtY2xpZW50XCI7XG5pbXBvcnQgeyBXZWJTb2NrZXRMaW5rIH0gZnJvbSBcIkBhcG9sbG8vY2xpZW50L2xpbmsvd3NcIjtcbmltcG9ydCB7IGdldE1haW5EZWZpbml0aW9uIH0gZnJvbSBcIkBhcG9sbG8vY2xpZW50L3V0aWxpdGllc1wiO1xuaW1wb3J0IHsgZ2V0TG9jYWxTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL3V0aWxzL2FwaV9jbGllbnRcIjtcbmltcG9ydCB7IElTX1NFUlZFUiB9IGZyb20gXCJAdXRpbHMvY29uc3RhbnRzXCI7XG5cbi8vIFRPRE86IGZpeCB0aGlzIHRvIG5vdCBiZSBoYXJkY29kZWQgdG8gbG9jYWxob3N0XG5jb25zdCB1cGxvYWRMaW5rID0gY3JlYXRlVXBsb2FkTGluayh7XG4gIHVyaTogYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfUkVBQ1RfQVBQX1NFUlZfUFJPVE9DT0x9JHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19SRUFDVF9BUFBfU0VSVl9IT1NUTkFNRX0vZ3JhcGhxbGAsXG59KTtcblxuLy8gVE9ETzogb25seSBkbyB0aGlzIGR1cmluZyBkZXZlbG9wbWVudFxuY29uc3QgZXJyb3JMaW5rID0gb25FcnJvcigoeyBncmFwaFFMRXJyb3JzLCBuZXR3b3JrRXJyb3IgfSkgPT4ge1xuICBpZiAoZ3JhcGhRTEVycm9ycylcbiAgICBncmFwaFFMRXJyb3JzLmZvckVhY2goKHsgbWVzc2FnZSwgbG9jYXRpb25zLCBwYXRoIH0pID0+XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYFtHcmFwaFFMIGVycm9yXTogTWVzc2FnZTogJHttZXNzYWdlfSwgTG9jYXRpb246ICR7bG9jYXRpb25zfSwgUGF0aDogJHtwYXRofWBcbiAgICAgIClcbiAgICApO1xuXG4gIGlmIChuZXR3b3JrRXJyb3IpIGNvbnNvbGUubG9nKGBbTmV0d29yayBlcnJvcl06ICR7bmV0d29ya0Vycm9yfWApO1xufSk7XG5cbmxldCBsaW5rID0gSVNfU0VSVkVSXG4gID8gbmV3IEh0dHBMaW5rKHtcbiAgICAgIHVyaTogYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfUkVBQ1RfQVBQX1dTX1BST1RPQ09MfSR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfUkVBQ1RfQVBQX1NFUlZfSE9TVE5BTUV9L2dyYXBocWxgLFxuICAgIH0pXG4gIDogbmV3IFdlYlNvY2tldExpbmsoe1xuICAgICAgdXJpOiBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19SRUFDVF9BUFBfV1NfUFJPVE9DT0x9JHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19SRUFDVF9BUFBfU0VSVl9IT1NUTkFNRX0vZ3JhcGhxbGAsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHJlY29ubmVjdDogdHJ1ZSxcbiAgICAgICAgY29ubmVjdGlvblBhcmFtczoge1xuICAgICAgICAgIEF1dGhvcml6YXRpb246IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUtleSgpKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbmNvbnN0IHNwbGl0TGluayA9IHNwbGl0KFxuICAoeyBxdWVyeSB9KSA9PiB7XG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IGdldE1haW5EZWZpbml0aW9uKHF1ZXJ5KTtcbiAgICByZXR1cm4gKFxuICAgICAgZGVmaW5pdGlvbi5raW5kID09PSBcIk9wZXJhdGlvbkRlZmluaXRpb25cIiAmJlxuICAgICAgZGVmaW5pdGlvbi5vcGVyYXRpb24gPT09IFwic3Vic2NyaXB0aW9uXCJcbiAgICApO1xuICB9LFxuICBsaW5rLFxuICBmcm9tKFtlcnJvckxpbmssIHVwbG9hZExpbmtdKVxuKTtcblxubGV0IGNsaWVudCA9IG5ldyBBcG9sbG9DbGllbnQoe1xuICBsaW5rOiBzcGxpdExpbmssXG4gIGNhY2hlOiBuZXcgSW5NZW1vcnlDYWNoZSgpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsaWVudDtcbiJdLCJuYW1lcyI6WyJBcG9sbG9DbGllbnQiLCJJbk1lbW9yeUNhY2hlIiwiZnJvbSIsInNwbGl0IiwiSHR0cExpbmsiLCJvbkVycm9yIiwiY3JlYXRlVXBsb2FkTGluayIsIldlYlNvY2tldExpbmsiLCJnZXRNYWluRGVmaW5pdGlvbiIsImdldExvY2FsU3RvcmFnZUtleSIsIklTX1NFUlZFUiIsInVwbG9hZExpbmsiLCJ1cmkiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfUkVBQ1RfQVBQX1NFUlZfUFJPVE9DT0wiLCJORVhUX1BVQkxJQ19SRUFDVF9BUFBfU0VSVl9IT1NUTkFNRSIsImVycm9yTGluayIsImdyYXBoUUxFcnJvcnMiLCJuZXR3b3JrRXJyb3IiLCJmb3JFYWNoIiwibWVzc2FnZSIsImxvY2F0aW9ucyIsInBhdGgiLCJjb25zb2xlIiwibG9nIiwibGluayIsIk5FWFRfUFVCTElDX1JFQUNUX0FQUF9XU19QUk9UT0NPTCIsIm9wdGlvbnMiLCJyZWNvbm5lY3QiLCJjb25uZWN0aW9uUGFyYW1zIiwiQXV0aG9yaXphdGlvbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzcGxpdExpbmsiLCJxdWVyeSIsImRlZmluaXRpb24iLCJraW5kIiwib3BlcmF0aW9uIiwiY2xpZW50IiwiY2FjaGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./graphql/GraphQLClient.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apollo/client */ \"@apollo/client\");\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _graphql_GraphQLClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @graphql/GraphQLClient */ \"./graphql/GraphQLClient.ts\");\n\n\n\n\n\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.extendTheme)({\n    // mobile\n    sm: \"768px\",\n    // tablet\n    md: \"1024px\",\n    // desktop\n    lg: \"1216px\",\n    // fullhd\n    xl: \"1408px\"\n});\nfunction MyApp({ Component , pageProps  }) {\n    // Use the layout defined at the page level, if available\n    const getLayout = Component.getLayout || ((page)=>page\n    );\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_apollo_client__WEBPACK_IMPORTED_MODULE_2__.ApolloProvider, {\n        client: _graphql_GraphQLClient__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.ChakraProvider, {\n            children: getLayout(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/robo/code/polygon-hack/client/pages/_app.tsx\",\n                lineNumber: 29,\n                columnNumber: 34\n            }, this))\n        }, void 0, false, {\n            fileName: \"/Users/robo/code/polygon-hack/client/pages/_app.tsx\",\n            lineNumber: 29,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/robo/code/polygon-hack/client/pages/_app.tsx\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, this));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUVpQjtBQUNlO0FBQ1o7QUFRbEQsS0FBSyxDQUFDSSxLQUFLLEdBQUdGLDZEQUFXLENBQUMsQ0FBQztJQUN6QixFQUFTO0lBQ1RHLEVBQUUsRUFBRSxDQUFPO0lBQ1gsRUFBUztJQUNUQyxFQUFFLEVBQUUsQ0FBUTtJQUNaLEVBQVU7SUFDVkMsRUFBRSxFQUFFLENBQVE7SUFDWixFQUFTO0lBQ1RDLEVBQUUsRUFBRSxDQUFRO0FBQ2QsQ0FBQztTQUVRQyxLQUFLLENBQUMsQ0FBQyxDQUFDQyxTQUFTLEdBQUVDLFNBQVMsRUFBcUIsQ0FBQyxFQUFFLENBQUM7SUFDNUQsRUFBeUQ7SUFDekQsS0FBSyxDQUFDQyxTQUFTLEdBQUdGLFNBQVMsQ0FBQ0UsU0FBUyxNQUFNQyxJQUFJLEdBQUtBLElBQUk7O0lBQ3hELE1BQU0sNkVBQ0hiLDBEQUFjO1FBQUNjLE1BQU0sRUFBRVgsOERBQWE7OEZBQ2xDRiw0REFBYztzQkFBRVcsU0FBUyw2RUFBRUYsU0FBUzttQkFBS0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7OztBQUd6RCxDQUFDO0FBRUQsaUVBQWVGLEtBQUssRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JvdW50eS1jbGllbnQvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xuaW1wb3J0IHsgQXBvbGxvUHJvdmlkZXIgfSBmcm9tIFwiQGFwb2xsby9jbGllbnRcIjtcbmltcG9ydCB7IENoYWtyYVByb3ZpZGVyLCBleHRlbmRUaGVtZSB9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5pbXBvcnQgR3JhcGhRTENsaWVudCBmcm9tIFwiQGdyYXBocWwvR3JhcGhRTENsaWVudFwiO1xuaW1wb3J0IHsgTmV4dFBhZ2VXaXRoTGF5b3V0IH0gZnJvbSBcInR5cGVzL3R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVCcmVha3BvaW50cyB9IGZyb20gXCJAY2hha3JhLXVpL3RoZW1lLXRvb2xzXCI7XG5cbnR5cGUgQXBwUHJvcHNXaXRoTGF5b3V0ID0gQXBwUHJvcHMgJiB7XG4gIENvbXBvbmVudDogTmV4dFBhZ2VXaXRoTGF5b3V0O1xufTtcblxuY29uc3QgdGhlbWUgPSBleHRlbmRUaGVtZSh7XG4gIC8vIG1vYmlsZVxuICBzbTogXCI3NjhweFwiLFxuICAvLyB0YWJsZXRcbiAgbWQ6IFwiMTAyNHB4XCIsXG4gIC8vIGRlc2t0b3BcbiAgbGc6IFwiMTIxNnB4XCIsXG4gIC8vIGZ1bGxoZFxuICB4bDogXCIxNDA4cHhcIixcbn0pO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzV2l0aExheW91dCkge1xuICAvLyBVc2UgdGhlIGxheW91dCBkZWZpbmVkIGF0IHRoZSBwYWdlIGxldmVsLCBpZiBhdmFpbGFibGVcbiAgY29uc3QgZ2V0TGF5b3V0ID0gQ29tcG9uZW50LmdldExheW91dCB8fCAoKHBhZ2UpID0+IHBhZ2UpO1xuICByZXR1cm4gKFxuICAgIDxBcG9sbG9Qcm92aWRlciBjbGllbnQ9e0dyYXBoUUxDbGllbnR9PlxuICAgICAgPENoYWtyYVByb3ZpZGVyPntnZXRMYXlvdXQoPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPil9PC9DaGFrcmFQcm92aWRlcj5cbiAgICA8L0Fwb2xsb1Byb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJBcG9sbG9Qcm92aWRlciIsIkNoYWtyYVByb3ZpZGVyIiwiZXh0ZW5kVGhlbWUiLCJHcmFwaFFMQ2xpZW50IiwidGhlbWUiLCJzbSIsIm1kIiwibGciLCJ4bCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiZ2V0TGF5b3V0IiwicGFnZSIsImNsaWVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./utils/api_client.ts":
/*!*****************************!*\
  !*** ./utils/api_client.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getLocalStorageKey\": () => (/* binding */ getLocalStorageKey)\n/* harmony export */ });\nfunction getLocalStorageKey() {\n    return `${process.env.REACT_APP_JWT_KEY}-${\"development\"}`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9hcGlfY2xpZW50LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxTQUFTQSxrQkFBa0IsR0FBVyxDQUFDO0lBQzVDLE1BQU0sSUFBSUMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLGlCQUFpQixDQUFDLENBQUMsRUFEM0MsQ0FBYTtBQUViLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib3VudHktY2xpZW50Ly4vdXRpbHMvYXBpX2NsaWVudC50cz84N2NiIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2VLZXkoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3Byb2Nlc3MuZW52LlJFQUNUX0FQUF9KV1RfS0VZfS0ke3Byb2Nlc3MuZW52Lk5PREVfRU5WfWA7XG59XG4iXSwibmFtZXMiOlsiZ2V0TG9jYWxTdG9yYWdlS2V5IiwicHJvY2VzcyIsImVudiIsIlJFQUNUX0FQUF9KV1RfS0VZIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/api_client.ts\n");

/***/ }),

/***/ "./utils/constants.ts":
/*!****************************!*\
  !*** ./utils/constants.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IS_SERVER\": () => (/* binding */ IS_SERVER)\n/* harmony export */ });\nconst IS_SERVER = \"undefined\" === \"undefined\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9jb25zdGFudHMudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLEtBQUssQ0FBQ0EsU0FBUyxHQUFHLENBQWEsZUFBSyxDQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm91bnR5LWNsaWVudC8uL3V0aWxzL2NvbnN0YW50cy50cz9hMzQ4Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBJU19TRVJWRVIgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiO1xuIl0sIm5hbWVzIjpbIklTX1NFUlZFUiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/constants.ts\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client");

/***/ }),

/***/ "@apollo/client/link/error":
/*!********************************************!*\
  !*** external "@apollo/client/link/error" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client/link/error");

/***/ }),

/***/ "@apollo/client/link/ws":
/*!*****************************************!*\
  !*** external "@apollo/client/link/ws" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client/link/ws");

/***/ }),

/***/ "@apollo/client/utilities":
/*!*******************************************!*\
  !*** external "@apollo/client/utilities" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client/utilities");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@chakra-ui/react");

/***/ }),

/***/ "apollo-upload-client":
/*!***************************************!*\
  !*** external "apollo-upload-client" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("apollo-upload-client");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();