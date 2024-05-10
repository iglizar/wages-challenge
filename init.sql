CREATE TABLE IF NOT EXISTS "employees" (
    "employeeId" VARCHAR(10) PRIMARY KEY,
    "token" VARCHAR
);

-- Table for storing employee wage data
CREATE TABLE IF NOT EXISTS "employeeWageData" (
    "wageId" SERIAL PRIMARY KEY,
    "employeeId" VARCHAR(10) REFERENCES "employees"("employeeId"),
    "amount" DECIMAL(10, 2) NOT NULL,
    "currencyId" VARCHAR NOT NULL
);

-- Table for storing currencies
CREATE TABLE IF NOT EXISTS "currencies" (
    "currencyId" VARCHAR PRIMARY KEY,
    "currencyName" VARCHAR(50),
    "conversionRate" DECIMAL(10, 4)
);

-- Table for storing wage access requests
CREATE TABLE IF NOT EXISTS "wageAccessRequests" (
    "requestId" SERIAL PRIMARY KEY,
    "employeeId" VARCHAR(10) REFERENCES "employees"("employeeId"),
    "amount" DECIMAL(10, 2),
    "currencyId" VARCHAR REFERENCES "currencies"("currencyId")
);

-- Insert into employees
INSERT INTO "employees" ("employeeId") VALUES ('E01');
INSERT INTO "employees" ("employeeId") VALUES ('E02');
INSERT INTO "employees" ("employeeId") VALUES ('E03');

-- Insert into currencies
INSERT INTO "currencies" ("currencyId", "currencyName", "conversionRate") VALUES ('USD','Dollar', 1.00);
INSERT INTO "currencies" ("currencyId", "currencyName", "conversionRate") VALUES ('ARS','Peso Argentino', 0.001);

-- Insert into employeeWageData
INSERT INTO "employeeWageData" ("employeeId", "amount", "currencyId") 
VALUES ('E01', 1200.00, 'USD');
INSERT INTO "employeeWageData" ("employeeId", "amount", "currencyId") 
VALUES ('E02', 9500.00,  'ARS');
INSERT INTO "employeeWageData" ("employeeId", "amount", "currencyId") 
VALUES ('E03', 800.00, 'USD');

-- Insert into wageAccessRequests
INSERT INTO "wageAccessRequests" ("employeeId", "amount", "currencyId") 
VALUES ('E01', 200.00, 'USD');
INSERT INTO "wageAccessRequests" ("employeeId", "amount", "currencyId") 
VALUES ('E02', 1000.00, 'ARS');
INSERT INTO "wageAccessRequests" ("employeeId", "amount", "currencyId") 
VALUES ('E03', 100.00, 'USD');