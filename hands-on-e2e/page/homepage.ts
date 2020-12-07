import {Selector} from 'testcafe';

class Homepage {
    searchField: Selector = Selector('input[name="q"]');
    searchButton: Selector = Selector('input[name="btnK"]');

    async performSearch(t: TestController, searchText: string) {
        await t.typeText(this.searchField, searchText);
        await t.click(this.searchButton);
    }
}

export default new Homepage();
