export default (providers: Array<any>) =>
  providers.map((provider) => ({
    provide: provider.name,
    useClass: provider
  }));
