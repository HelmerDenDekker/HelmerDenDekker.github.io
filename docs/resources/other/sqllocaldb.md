# MS SQL Local DB
*12-10-2023*

Status: Work in progress


## Start new instance

Go to command prompt  

Create  an instance
```bat
sqllocaldb create localdbtest1
```
Start an instance
```bat
sqllocaldb start localdbtest1
```

Info about the instance
```bat
sqllocaldb info localdbtest1
```

## Add to Azure Data Studio

Choose (Add) New Connection 
   
In connection details:

| Type                      | Input                  |
|---------------------------|------------------------|
| Connection type           | Microsoft SQL Server   |
| Input Type                | Parameters             |
| Authentication type       | Windows Authentication |
| Database                  | < Default >            |
| Encrypt                   | Mandatory (True)       |
|  Trust server certificate | False                  |
| Server group | < Default >            |

Or use the connection string as input type.

## Resources

[How to connect and use Microsoft SQL Server Express LocalDB](https://www.sqlshack.com/how-to-connect-and-use-microsoft-sql-server-express-localdb/)
[SQL Server Express LocalDB](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver16)