CREATE TABLE predios (
	idpredio serial PRIMARY KEY NOT NULL,
	numpre TEXT NOT NULL,
	valor TEXT,
	nombre TEXT NOT NULL,
    depto TEXT,
    municipio TEXT,
    propietarios TEXT,
	created_on TIMESTAMP 
);

CREATE TABLE terrenos (
	id serial PRIMARY KEY NOT NULL,
    idpredio INTEGER NOT NULL UNIQUE,
	area TEXT,
	valorcomer TEXT,
    tipoterre TEXT,
    consdentro TEXT,
	imagen TEXT,
    fuenagua TEXT,
	created_on TIMESTAMP 
);

CREATE TABLE construcciones (
	id serial PRIMARY KEY NOT NULL,
    idpredio INTEGER NOT NULL,
	numpisos TEXT NOT NULL,
	areatotal TEXT,
	tipocons TEXT,
	imagen TEXT,
    direccion TEXT,
	created_on TIMESTAMP 
);

CREATE TABLE propietarios (
	idusuario serial PRIMARY KEY NOT NULL,
	idpredio INTEGER NOT NULL,
    tipoprop TEXT,
	tipodoc TEXT,
	numdoc TEXT NOT NULL UNIQUE,
	nombre TEXT,
    direccion TEXT,
    telefono TEXT,
	imagen TEXT,
    email TEXT,
	created_on TIMESTAMP 
);






