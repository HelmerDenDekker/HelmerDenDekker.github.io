# Thoughts EF6 migrations

*3-9-2024*

_Status: Work in progress_  
_Type of post: Resource_

## *Rapid fire thoughts*

In EF Core I have this tool (console program) to do the migrations, either on startup or (as I prefer) while deploying.

Another (older) project uses Entity Framework. How to migrate the database in this case?

## *Outline*

### Guidelines
1. Avoid automatic migrations
2. Use code-based migrations
3. Use either automatic OR code-based

Not all migrations can be performed with automatic migrations. Code-based migrations can do all these migrations. It is recommended to use code-based.

### My configuration

Reading the documentation, AutomaticMigrationsEnabled is a setting that it automatically applies the model changes to the database.

According to the Guidelines, the automatic migrations should be avoided. The automatic migrations cannot handle all model changes, like model property renaming.

The configuration of how to handle migrations is done in the configuration class. This class is a subclass of DbMigrationsConfiguration.

``` csharp
internal sealed class MyContextConfiguration : DbMigrationsConfiguration<MyContext>
{
	public MyContextConfiguration()
	{
		// Disable automatic migrations to avoid unintended schema changes
		AutomaticMigrationsEnabled = false;

		// Set to false to prevent automatic data loss if automatic migrations were enabled
		AutomaticMigrationDataLossAllowed = false;

		// Optional: Set the context key if you have multiple models in the same database
		ContextKey = "NameSpace.MyContext";
	}
}
```

### 1. Use migrate exe

You can migrate code-first with a script exe by EF called migrate.exe. There is a new script available: this is called the ef6 exe (?) found [here](https://github.com/dotnet/ef6/tree/main/src/ef6).

[Octopus and ef-migrations](https://www.4dotnet.nl/kennis/blog-octopus-deploy-and-entity-framework-migrations)

### 2. DbMigrator

Works. I did not find this in the documentation. It was suggested to me by AI, and I had found it on StackOverflow in a bit different context.

``` csharp
public static void ApplyMigrations()
{
    try
    {
        var configuration = new MyContextConfiguration();
        var migrator = new DbMigrator(configuration);

        migrator.Update();
    }
    catch (Exception ex)
    {
        throw new InvalidOperationException("An error occurred while applying migrations.", ex);
    }
}
```


### 3. DB initializer as documented

The official documentation suggests using the [MigrateDatabaseToLatestVersion](https://learn.microsoft.com/en-us/dotnet/api/system.data.entity.migratedatabasetolatestversion-2?view=entity-framework-6.2.0).
Officially it is recommended to use the MigrateDatabaseToLatestVersion initializer. This initializer will use the migrations to update the database to the latest version.

``` csharp
public class MyContext : DbContext
{
	public MyContext()
	{
		// This means on every instance of the context, the database will be updated to the latest version.
		Database.SetInitializer(new MigrateDatabaseToLatestVersion<MyContext, MyContextConfiguration>());
	}
}
```

#### Problems

This initializer presets the migrations to take place, when the next time the database was hit, on that specific point, there are pending migrations.

To solve this "problem" just migrate on every hit, so on any instance of the context, as is what they suggest in the documentation.

Aside from being quite heavy (I do not have numbers to back this up), this is not a good solution. I want the migrations to be done once. Preferably on deployment. Or on startup.

In this application, there are lots of models in one database, on one schema. All of these models have there own configuration class, and I cannot control the migration process of these models. To make matters worse, there are several jobs running, while multiple users are interacting with the application.

So, the migrations run simultaneously. This is causing problems like random ContextKeys appearing in the migrations table, causing the application to crash.

### 4. DB initializer on startup


Why does this not work?

Entity Framework complains I should have automatic migrations enabled, which is something I do not want.




## Resources
[Code based migrations ef tutorial](https://www.entityframeworktutorial.net/code-first/code-based-migration-in-code-first.aspx)
[Code First Migrations in Team Environments](https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/migrations/teams)
[migrate exe by EF](https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/migrations/migrate-exe)
[Octopus and ef-migrations](https://www.4dotnet.nl/kennis/blog-octopus-deploy-and-entity-framework-migrations)

[Tool for EF6 by Chad Golden](https://github.com/chadgolden1/MultiTenantEF6DbMigrator)
[Multitenant ef6 migration by Chad Golden](https://www.chadgolden.com/blog/multi-tenanted-entity-framework-6-migration-deployment)