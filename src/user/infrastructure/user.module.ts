providers: [
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
  ]
  