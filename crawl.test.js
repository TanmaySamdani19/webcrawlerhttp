const { normalizeURL, getURLsFromHTML } = require("./crawl");
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

test("getURLsFromHTML absolute", () => {
  const inputURL = "https://domainname";
  const inputBody =
    '<html><body><a href="https://domainname/path"><span>DomainName</span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://domainname/path"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://domainname";
  const inputBody =
    '<html><body><a href="/path"><span>DomainName</span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://domainname/path"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://domainname";
  const inputBody =
    '<html><body><a href="/path/one"><span>DomainName></span></a><a href="https://other.com/path/one"><span>DomainName></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://domainname/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const inputURL = "https://domainname";
  const inputBody =
    '<html><body><a href="invalid"><span>Invaid URL></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
