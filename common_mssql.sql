/* Create a new Table if it doesn't exist */
IF OBJECT_ID('tablename') IS NULL
BEGIN
    print 'Create tablename table'
    CREATE TABLE tablename
    (
        id int identity NOT NULL,
        name nvarchar(50) NOT NULL,
        createdBy int NOT NULL,
        createddate datetime NOT NULL
    )
END
GO


/* Add a new column to a table if it doesn't exist' */
IF NOT EXISTS (SELECT * FROM syscolumns WHERE id=object_id('tablename') AND name='columnname')
BEGIN
    ALTER TABLE tablename
        Add columnname int NOT NULL DEFAULT 0
END
GO

/* Reset Identity Column - this example will set so that the next row added will have value of 100 */
DBCC CHECKIDENT (tablename, RESEED, 999)
