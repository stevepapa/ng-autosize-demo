import { NgAutosizeDemoPage } from './app.po';

describe('ng-autosize-demo App', () => {
  let page: NgAutosizeDemoPage;

  beforeEach(() => {
    page = new NgAutosizeDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
