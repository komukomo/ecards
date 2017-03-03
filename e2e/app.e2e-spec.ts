import { EcardsPage } from './app.po';

describe('ecards App', () => {
  let page: EcardsPage;

  beforeEach(() => {
    page = new EcardsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
