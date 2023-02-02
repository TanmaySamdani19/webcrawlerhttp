const { normalizeURL } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://domainname/path";
  const actual = normalizeURL(input);
  const expected = "domainname/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://domainname/path/";
  const actual = normalizeURL(input);
  const expected = "domainname/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://DOMAINNAME/path";
  const actual = normalizeURL(input);
  const expected = "domainname/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://domainname/path";
  const actual = normalizeURL(input);
  const expected = "domainname/path";
  expect(actual).toEqual(expected);
});
