select ProductName, CategoryName from Product as p
join Category as c on p.CategoryId = c.Id
SELECT  Id, CompanyName FROM [Order] as o
JOIN Shipper as s on o.ShipVia = s.Id
WHERE OrderDate >= '2015-08-09' select * from [Order]
WHERE Id = 10251
select Id, LastName, CompanyName from [Order] as o
JOIN Employee as e on o.EmployeeId = E.Id
JOIN Customer as c on o.CustomerId = C.Id