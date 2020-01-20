-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-01-15 12:44:09.764

-- tables
-- Table: Clients
CREATE TABLE Clients (
    Client_ID int NOT NULL AUTO_INCREMENT,
    First_Name varchar(255) NOT NULL,
    Last_Name varchar(255) NOT NULL,
    Last_Visit_Date varchar(11) NOT NULL,
    BirthDay varchar(11) NOT NULL,
    Favourite_Game varchar(220) NOT NULL,
    CONSTRAINT Clients_pk PRIMARY KEY (Client_ID)
);

-- Table: Components
CREATE TABLE Components (
    component_id int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Type varchar(255) NOT NULL,
    CONSTRAINT Components_pk PRIMARY KEY (component_id)
);

-- Table: Employees
CREATE TABLE Employees (
    employee_id int NOT NULL AUTO_INCREMENT,
    First_Name varchar(255) NOT NULL,
    Last_Name varchar(255) NOT NULL,
    Bonus int NOT NULL,
    BirthDay varchar(11) NOT NULL,
    Contract_type varchar(220) NOT NULL,
    CONSTRAINT Employees_pk PRIMARY KEY (employee_id)
);

-- Table: Handles
CREATE TABLE Handles (
    Employees_employee_id int NOT NULL,
    Sessions_session_id int NOT NULL,
    CONSTRAINT Handles_pk PRIMARY KEY (Employees_employee_id,Sessions_session_id)
);

-- Table: Multicomponents
CREATE TABLE Multicomponents (
    Stations_station_id int NOT NULL,
    Components_component_id int NOT NULL,
    CONSTRAINT Multicomponents_pk PRIMARY KEY (Stations_station_id,Components_component_id)
);

-- Table: Multisoftware
CREATE TABLE Multisoftware (
    Software_soft_id int NOT NULL,
    Stations_station_id int NOT NULL,
    CONSTRAINT Multisoftware_pk PRIMARY KEY (Software_soft_id,Stations_station_id)
);

-- Table: Sessions
CREATE TABLE Sessions (
    session_id int NOT NULL AUTO_INCREMENT,
    S_DATE varchar(250) NOT NULL,
    Hours int NOT NULL,
    Clients_Client_ID int NOT NULL,
    CONSTRAINT Sessions_pk PRIMARY KEY (session_id)
);

-- Table: Software
CREATE TABLE Software (
    soft_id int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Type varchar(255) NOT NULL,
    Serial_key varchar(255) NOT NULL,
    CONSTRAINT Software_pk PRIMARY KEY (soft_id)
);

-- Table: StationUsed
CREATE TABLE StationUsed (
    Sessions_session_id int NOT NULL,
    Stations_station_id int NOT NULL,
    CONSTRAINT StationUsed_pk PRIMARY KEY (Sessions_session_id,Stations_station_id)
);

-- Table: Stations
CREATE TABLE Stations (
    station_id int NOT NULL AUTO_INCREMENT,
    Nr int NOT NULL,
    CONSTRAINT Stations_pk PRIMARY KEY (station_id)
);

-- foreign keys
-- Reference: Handles_Employees (table: Handles)
ALTER TABLE Handles ADD CONSTRAINT Handles_Employees FOREIGN KEY Handles_Employees (Employees_employee_id)
    REFERENCES Employees (employee_id);

-- Reference: Handles_Sessions (table: Handles)
ALTER TABLE Handles ADD CONSTRAINT Handles_Sessions FOREIGN KEY Handles_Sessions (Sessions_session_id)
    REFERENCES Sessions (session_id);

-- Reference: Multicomponents_Components (table: Multicomponents)
ALTER TABLE Multicomponents ADD CONSTRAINT Multicomponents_Components FOREIGN KEY Multicomponents_Components (Components_component_id)
    REFERENCES Components (component_id);

-- Reference: Multicomponents_Stations (table: Multicomponents)
ALTER TABLE Multicomponents ADD CONSTRAINT Multicomponents_Stations FOREIGN KEY Multicomponents_Stations (Stations_station_id)
    REFERENCES Stations (station_id);

-- Reference: Multisoftware_Software (table: Multisoftware)
ALTER TABLE Multisoftware ADD CONSTRAINT Multisoftware_Software FOREIGN KEY Multisoftware_Software (Software_soft_id)
    REFERENCES Software (soft_id);

-- Reference: Multisoftware_Stations (table: Multisoftware)
ALTER TABLE Multisoftware ADD CONSTRAINT Multisoftware_Stations FOREIGN KEY Multisoftware_Stations (Stations_station_id)
    REFERENCES Stations (station_id);

-- Reference: Sessions_Clients (table: Sessions)
ALTER TABLE Sessions ADD CONSTRAINT Sessions_Clients FOREIGN KEY Sessions_Clients (Clients_Client_ID)
    REFERENCES Clients (Client_ID);

-- Reference: StationUsed_Sessions (table: StationUsed)
ALTER TABLE StationUsed ADD CONSTRAINT StationUsed_Sessions FOREIGN KEY StationUsed_Sessions (Sessions_session_id)
    REFERENCES Sessions (session_id);

-- Reference: StationUsed_Stations (table: StationUsed)
ALTER TABLE StationUsed ADD CONSTRAINT StationUsed_Stations FOREIGN KEY StationUsed_Stations (Stations_station_id)
    REFERENCES Stations (station_id);

-- End of file.

