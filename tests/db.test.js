const connection = require("../src/database/config/connection");
const build = require("../src/database/config/build");
const {getTodos ,getUserId, insertTodo , insertUser, deleteTodo , checkEmail} = require('../src/database/queries');

describe("Test Database Functions", () => {
  beforeEach(()=>build());

  test (" Test get todos " , () =>{
  return getTodos(1).then((result) => {
  const actual = result.rows.length;
  const expected = 3;
  expect(actual).toBe(expected);
  })
  .catch();
})

test (" Test get User Id " , () =>{
  return getUserId(1).then((result) => {
  const actual = result.rows[0].user_name;
  const expected = 'alaa';
  expect(actual).toBe(expected);
  })
  .catch();
})

test (" Test Insert Todo " , () =>{
  return insertTodo(1,"fffffff" ).then(() => {
  expect(1+1).toBe(2);
  })
  .catch();
})

 test (" Test Insert User " , () =>{
  return insertUser("ff","ff@gmail.com","ff" ).then(() => {
  expect(1+1).toBe(2);
  })
  .catch();
})

test (" Test Delete Todo " , () =>{
  return deleteTodo(1,1).then(() => {
  expect(3-1).toBe(2);
  })
  .catch();
})

 test (" Test Check Email " , () =>{
  return checkEmail("alaa@gmail.com").then((result) => {
  const actual = result.rows[0].user_name;
  const expected = 'alaa';
  expect(actual).toBe(expected);
  })
  .catch();
})

afterAll(()=> connection.end());

})


