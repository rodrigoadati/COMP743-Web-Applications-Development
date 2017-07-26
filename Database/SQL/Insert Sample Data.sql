
select * from ProductItem


-- Add Data into ProductPlatform
insert into ProductPlatform (PlatformName, PlatformShortname) values ('Playstation 4', 'PS4')
insert into ProductPlatform (PlatformName, PlatformShortname) values ('Xbox One', 'Xbox One')
insert into ProductPlatform (PlatformName, PlatformShortname) values ('Nintendo Switch', 'Switch')
insert into ProductPlatform (PlatformName, PlatformShortname) values ('PC Master Race', 'PC')
insert into ProductPlatform (PlatformName, PlatformShortname) values ('Playstation 3', 'PS3')
insert into ProductPlatform (PlatformName, PlatformShortname) values ('Xbox 360', 'Xbox 360')
insert into ProductPlatform (PlatformName, PlatformShortname) values ('Nintendo Wii', 'Wii')
insert into ProductPlatform (PlatformName, PlatformShortname) values ('Others', 'Others')



-- Add Data into ProductCategory
insert into ProductCategory (CategoryName) values ('Games')
insert into ProductCategory (CategoryName) values ('Consoles')
insert into ProductCategory (CategoryName) values ('Hardware')
insert into ProductCategory (CategoryName) values ('Accessories')

-- Add Data into ProductGenre
insert into ProductGenre (GenreName) values ('Action')
insert into ProductGenre (GenreName) values ('Adventure')
insert into ProductGenre (GenreName) values ('Casual')
insert into ProductGenre (GenreName) values ('Indie')
insert into ProductGenre (GenreName) values ('Massive Multiplayer')
insert into ProductGenre (GenreName) values ('Racing')
insert into ProductGenre (GenreName) values ('RPG')
insert into ProductGenre (GenreName) values ('Simulation')
insert into ProductGenre (GenreName) values ('Sports')
insert into ProductGenre (GenreName) values ('Strategy')

-- Add Data into ProductItem
insert into ProductItem (ItemName, PlatformId, ItemPrice, ItemReleaseDate) values ('Grand Theft Auto V', 1, 55.00, )




