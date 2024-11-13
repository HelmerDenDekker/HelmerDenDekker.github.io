# About the repository pattern

*15-10-2024*

_Status: {Work in progress} {Idea}_  
_Type of post: {Opinion piece} {Guide} {Resource}_

## *Rapid fire thoughts*

Never test the database.

Think about the database as persistence.

The data should be persisted through the repository.

Use the repository pattern to abstract persistence.

For example: about the User Entity, this has the IUserRepository.

This may be implemented by a SqlServerUserRepository, a MongoUserRepository, a InMemoryUserRepository, FileUserRepository, TestFakeUserRepository, etc.


## *Outline*

## Resources
