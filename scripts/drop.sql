-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-01-15 12:44:09.764

-- foreign keys
ALTER TABLE Handles
    DROP FOREIGN KEY Handles_Employees;

ALTER TABLE Handles
    DROP FOREIGN KEY Handles_Sessions;

ALTER TABLE Multicomponents
    DROP FOREIGN KEY Multicomponents_Components;

ALTER TABLE Multicomponents
    DROP FOREIGN KEY Multicomponents_Stations;

ALTER TABLE Multisoftware
    DROP FOREIGN KEY Multisoftware_Software;

ALTER TABLE Multisoftware
    DROP FOREIGN KEY Multisoftware_Stations;

ALTER TABLE Sessions
    DROP FOREIGN KEY Sessions_Clients;

ALTER TABLE StationUsed
    DROP FOREIGN KEY StationUsed_Sessions;

ALTER TABLE StationUsed
    DROP FOREIGN KEY StationUsed_Stations;

-- tables
DROP TABLE Clients;

DROP TABLE Components;

DROP TABLE Employees;

DROP TABLE Handles;

DROP TABLE Multicomponents;

DROP TABLE Multisoftware;

DROP TABLE Sessions;

DROP TABLE Software;

DROP TABLE StationUsed;

DROP TABLE Stations;

-- End of file.

