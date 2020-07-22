import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTempleteProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTempleteProvider;
