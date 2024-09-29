"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function getStockList(webmaster_id, token) {
    return __awaiter(this, void 0, void 0, function () {
        var baseUrl, params, postBody, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = "https://app.quotemedia.com/screener/equity/datatool/filter/CA";
                    params = {
                        webmaster_id: webmaster_id,
                        token: token,
                    };
                    postBody = {
                        rangeCriteria: {},
                        fixedCriteria: { exchangeGroups: ["TSX"] },
                    };
                    baseUrl += "?webmaster_id=".concat(params.webmaster_id, "&token=").concat(params.token);
                    return [4 /*yield*/, fetch(baseUrl, {
                            headers: {
                                accept: "application/json, text/plain, */*",
                                "accept-language": "en-US,en;q=0.9",
                                "content-type": "application/json;charset=UTF-8",
                                origin: "https://money.tmx.com",
                                priority: "u=1, i",
                                "sec-ch-ua": '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": '"Windows"',
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "cross-site",
                            },
                            referrer: "https://money.tmx.com/",
                            referrerPolicy: "strict-origin-when-cross-origin",
                            method: "POST",
                            mode: "cors",
                            credentials: "omit",
                            body: JSON.stringify(postBody),
                        })];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("HTTP error! status: ".concat(res.status));
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data["symbols"]];
            }
        });
    });
}
function saveSymbols(symbols) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fs.writeFileSync("symbolList.txt", symbols.join("\n"));
            return [2 /*return*/];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var webmaster_id, token, symbols;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    webmaster_id = "101020";
                    token = "b104c8aab268df9c91c6007398e6ce6d47fff79486d3bdaa6cedbd76af1579d8";
                    return [4 /*yield*/, getStockList(webmaster_id, token)];
                case 1:
                    symbols = _a.sent();
                    return [4 /*yield*/, saveSymbols(symbols)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().then(function () { return console.log("Done!"); });
