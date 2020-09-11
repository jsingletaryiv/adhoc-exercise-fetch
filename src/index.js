import { retrieve } from '../api/managed-records.js';

// #region Dev Notes
/**
 *  NOTES: Contextualize & Visualize 
 *  -- I didn't see any details on UI/UX but I did notice the `limit` and `offset` options.
 *  -- I'll imagine this exercise being an `offset-based` pagination service to organize results
*/
// #endregion

const getRecords = () => {
  console.log(`managed-records.js successfully imported via index.js`);
  return retrieve({ limit: 10, offset: 0, colors: [] }); 
}

const records = getRecords();
// console.log(records);
// export { getRecords }
