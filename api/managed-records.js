import fetch from '../util/fetch-fill';
import URI from "urijs";

// Your retrieve function plus any additional functions go here.

// #region Requirements  
/**
 *  TODOS: (Requirements)
 * 
 *  |> Each item returned from the `/records` endpoint will have the following:
 *
 *      - **id**: A unique integer
 *      - **color**: One of `"red"`, `"brown"`, `"blue"`, `"yellow"`, or `"green"`
 *      - **disposition**: Either `"open"` or `"closed"`
 *      ! **isPrimary**: Property to be added client-side to returned dataset
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
 *  -//- Additional Notes => See ./README.md
*/
// #endregion

/** // ~~ Construct URI ~~>
 * 
 *  duplicateQueryParameters: false
 *  escapeQuerySpace: true
 *  fragment: null
 *  hostname: "localhost"
 *  password: null
 *  path: null
 *  port: "3000"
 *  preventInvalidHostname: false
 *  protocol: "https"
 *  query: null
 *  urn: null
 *  username: null
*/

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
export const retrieve = (params) => {
  // Records API Resource
  // window.path = "http://localhost:3000/records";

  // NOTE: Again, properties like this would live in a `.config` or `.env` file.
  let URI_RECORDS = new URI({
    protocol: process.env.URI_PROTOCOL || "http",
    hostname: process.env.URI_HOSTNAME || "localhost",
    port:     process.env.URI_PORT     || "3000",
    path:     "/records",
  });

  if (params.color && params.color.length) {
    URI_RECORDS.query(`page=1&limit=${params.limit}&offset=${params.offset}&color=${params.color}`);
  } else {
    URI_RECORDS.query(`page=1&limit=${params.limit}&offset=${params.offset}`);
  }

  console.info('URI_RECORDS: ', URI_RECORDS);
  
  const options = { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // getRecordsPageByPage(progressCallback, options, URI_RECORDS)
  //   .then(allRecords => {
  //     // all planets have been loaded
  //     console.log(allRecords.map(p => p.id))
  //   })
  //   .catch(console.error);
  
  // Init and `await` for Fetch API to access data via `Records` API
  fetch(URI_RECORDS, options)
  .then(res => {
    if (!res.ok) {
      console.warn('ERROR: ', res.statusText);
    }
    console.info('Promise: ', res);
    return res.json();
  })
  .then(data => {
    console.info('Promise Resolved', data);
    
    let params = (new URL(URI_RECORDS)).searchParams;
    let page = params.get('page');
    let limit = params.get('limit');

    const paginatedData = paginateResults(data, { page, limit });

    console.log('Paged Data: ', paginatedData);

    return paginatedData;
  })
  .catch(error => {
    console.error('ERROR: ', error);
  });

}

// function getRecordsPageByPage(progress, options, URI_RECORDS, allRecords = []) {
//   return new Promise((resolve, reject) => fetch(URI_RECORDS, options)
//     .then(resolve => {
//       if (!resolve.ok) {
//         throw `${resolve.status}: ${resolve.statusText}`;
//       }
//       return resolve.json();
//     })
//     .then(data => {
//       console.log('Data: ', data);
//       allRecords = allRecords.concat(data);

//       if (data.next) {
//         progress && progress(allRecords);
//         getRecordsPageByPage(progress, data.next, allRecords)
//           .then(resolve)
//           .catch(reject)
//       } else {
//         resolve(allRecords);
//       }
//     }).catch(reject)
//   );
// }

// function progressCallback(allRecords) {
//   // render progress
//   console.log(`${allRecords.length} loaded`);
// }

// Pagination Helper Function  
// NOTE: This type of function would end up becoming a "utility" that could be imported and used as needed  
function paginateResults(dataset, params) {
  const page = parseInt(params.page);
  const limit = parseInt(params.limit);

  // Set Pagination Index Values
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Mutated Results Object
  const results = {};

  // Evaluate `nextPage` Properties
  if (endIndex < dataset.length) {
    results.nextPage = {
      page: page + 1,
      limit: limit
    }
  }
  // Evaluate `previousPage` Properties
  if (startIndex > 0) {
    results.previousPage = {
      page: page - 1,
      limit: limit
    }
  }

  // results.result = tmpData.slice(startIndex, endIndex);
  results.result = dataset.slice(startIndex, endIndex);

  //Store paginated results to the `response` object
  // res.paginatedResults = results;
  return results;
}

// return retrieve;
// retrieve({ page: 2, colors: ["red", "brown"] });
//retrieve({ limit: 10, offset: 0, colors: ["red", "brown"] });

// export { retrieve };
