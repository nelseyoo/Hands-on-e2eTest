import {Selector, ClientFunction} from 'testcafe';
import homepage from '../page/homepage';

const baseURL = 'https://www.google.com/';
const getURL = ClientFunction(() => window.location.href);
const booksURL = 'https://www.patrickrothfuss.com/content/books.asp';
const searchResultLink =  Selector('a').withText('The Books - Patrick Rothfuss');
const searchResultFirst =  Selector('#rso > div:nth-child(1) > div > div.yuRUbf > a > h3 > span');

// I made a README text file on how to run this test cases, and how it is integrated with their respective manual test cases
// Please check it out if you have any doubts

// This is the feature's name
fixture('Google Homepage Search')
    .page(baseURL);

test
    ('TC-001: User can search with “Google Search”', async (t) => {

    // Step 1: Given I'm on the homepage 
    await t.expect(getURL()).eql(baseURL);
    // Step 2: Perform the google search
    await homepage.performSearch(t, 'The name of the wind');
    // Step 3: Validate my expected result from the search
    await t.expect(searchResultFirst.withText('The Name of the Wind').visible).ok;
    // Step 4: Go to "Patrick Rothfuss - The Books" page
    await t.expect(searchResultLink.visible).ok;
    await t.hover(searchResultLink);
    await t.click(searchResultLink);
    // Verify that im on the correct URL
    await t.expect(getURL()).eql(booksURL);
});

test
    ('TC-002: User can search by using the suggestions', async (t) => {
    // Constants
    const searchSuggestionList =  Selector('#tsf > div:nth-child(2) > div.A8SBwf.emcav > div.UUbT9 > div.aajZCb > ul > li:nth-child(1)');

    // Step 1: Given I'm on the homepage
    await t.expect(getURL()).eql(baseURL);
    // Step 2: Perform the google search
    await t.typeText(homepage.searchField,'The name of the w')
    // Validate that the suggestion list is displayed
    await t.expect(searchSuggestionList.visible).ok;
    // Step 3: Click on the first suggestion
    await t.hover(searchSuggestionList);
    await t.click(searchSuggestionList);
    // Step 4: Validate the results from the search
    await t.expect(searchResultFirst.withText('The Name of the Wind').visible).ok;
    // Step 5: Go to "Patrick Rothfuss - The Books" page
    await t.expect(searchResultLink.visible).ok();
    await t.hover(searchResultLink);
    await t.click(searchResultLink);
    // Verify that im on the correct URL
    await t.expect(getURL()).eql(booksURL);
});

