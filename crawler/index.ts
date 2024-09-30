/***
 * Get all the symbols of the stocks listed on the TSX from the TMX Money website
 * @author: Yuting Xie
 * @date: 2024/09/29
 */

import * as fs from "fs";

type Params = {
  webmaster_id: string;
  token: string;
};

type postBody = {
  rangeCriteria: {};
  fixedCriteria: { exchangeGroups: string[] };
};

async function getStockList(
  webmaster_id: string,
  token: string
): Promise<string[]> {
  let baseUrl = `https://app.quotemedia.com/screener/equity/datatool/filter/CA`;

  let params: Params = {
    webmaster_id: webmaster_id,
    token: token,
  };

  let postBody: postBody = {
    rangeCriteria: {},
    fixedCriteria: { exchangeGroups: ["TSX"] },
  };

  baseUrl += `?webmaster_id=${params.webmaster_id}&token=${params.token}`;

  const res = await fetch(baseUrl, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json;charset=UTF-8",
      origin: "https://money.tmx.com",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
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
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return data["symbols"];
}

async function saveSymbols(symbols: string[]) {
  fs.writeFileSync("symbolList.txt", symbols.join("\n"));
}

async function main() {
  const webmaster_id = "101020";
  const token =
    "b104c8aab268df9c91c6007398e6ce6d47fff79486d3bdaa6cedbd76af1579d8";

  const symbols = await getStockList(webmaster_id, token);

  await saveSymbols(symbols);
}

main().then(() => console.log("Done!"));
