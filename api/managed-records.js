import fetch from '../util/fetch-fill';
// import URI from "urijs";

// Your retrieve function plus any additional functions go here.

// #region Requirements  
/**
 *  TODOS: (Requirements)
 *
 *  |> The `/records` endpoint accepts the following options, sent as query string parameters on the request URL:
 *      - **limit**: The number of items to be returned
 *      - **offset**: The index of the first item to be returned
 *      - **color[]**: Which color to be included in the result set. May be included multiple times, once for each color. If omitted, all colors will be returned.
 *
 *  |> Create a utility function for the`retrieve` function and the API methods.
 *  |> Use the provided URI library to construct the request URL.
 *  |> Get data from the `/records` endpoint using the Fetch API. Process pages of 10 items at a time. Note that the `/records` endpoint may return more than 10 items per request.
 *  |> The `retrieve` function accepts an `options` object and should support the following keys:
 *      - **page** - Specifies which page to retrieve from the `/records` endpoint. If omitted, fetch page 1.
 *      - **colors** - An array of colors to retrieve from the `/records` endpoint. If omitted, fetch all colors.
 *
 *  |> You can assume standard HTTP status codes on the response. If a request is unsuccessful, output a simple error message via `console.log()` and recover.
 *  |> Upon a successful API response, transform the fetched payload into an object containing the following keys:
 *      - **ids**: An array containing the ids of all items returned from the request.
 *      - **open**: An array containing all of the items returned from the request that have a `disposition` value of `"open"`. Add a fourth key to each item called `isPrimary` indicating whether or not the item contains a primary color (red, blue, or yellow).
 *      - **closedPrimaryCount**: The total number of items returned from the request that have a `disposition` value of `"closed"` and contain a primary color.
 *      - **previousPage**: The page number for the previous page of results, or `null` if this is the first page.
 *      - **nextPage**: The page number for the next page of results, or `null` if this is the last page.
 *
 *  |> Return a promise from `retrieve` that resolves with the transformed data.
 *
 *  - Additional Notes => See ./README.md
*/
// #endregion

/** Records API
 *
 *   @summary  Retrieve data from `records API`
 *
 *   @type     'GET'
 *   @method   /records
 *
 *   @param    limit integer || 100
 *   @param    offset integer || 0
 *   @param    colorFilters array[obj]
 *
 *   @returns  array[obj] <= 100
 *
 *   @example  '/records?limit=2&offset=0&color[]=brown&color[]=green'
*/
const retrieve = (limit, offset, color) => {
  // Records API Resource
  // window.path = "http://localhost:3000/records";
  
  // NOTE: Again, properties like this would live in a `.config` or `.env` file.
  const BASE_URI = process.env.BASE_URI || "http://localhost:3000";
  
  // Init Fetch API to access data via `Records` API
  fetch(BASE_URI + "/records", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "limit" : limit,
      "offset": offset,
      "color" : color
    })
  })
  .then(res => {
    console.log('Promise complete: ', res);
    return res.json();
  })
  .then(data => {
    console.log(data);
    return data;
  })
  .catch(error => console.error('ERROR: ', error));

  // return retrieve;
  // retrieve({ page: 2, colors: ["red", "brown"] });
}
export { retrieve }
// module.exports = retrieve;
