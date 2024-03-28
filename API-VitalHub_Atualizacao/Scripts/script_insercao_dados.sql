USE VitalHub;

-- Selecionando todos os endereços
SELECT * FROM dbo.Enderecos;

INSERT INTO
	dbo.Enderecos
VALUES
	(NEWID(), '09510200', 'Rua Niterói', 180, -23.5505, -46.6333);



-- Selecionando todos os tipos de usuários
SELECT * FROM dbo.TiposUsuario;

INSERT INTO dbo.TiposUsuario VALUES (NEWID(), 'Medico'), (NEWID(), 'Paciente');



-- Selecionando todos os usuários
SELECT * FROM dbo.Usuarios;

INSERT INTO
	dbo.Usuarios
VALUES
	(NEWID(), 'ADA71C00-9A15-4C9F-BA63-FAA88B62CA72', 'Lucas Silveira Portal', 'lucas.portal@gmail.com', 'medico123', 'string'),
	(NEWID(), 'ADA71C00-9A15-4C9F-BA63-FAA88B62CA72', 'Carlos Roque', 'carlos.roque@gmail.com', 'medico123', 'string'),
	(NEWID(), '41375149-6A84-4690-ACE8-196700FFB1D1', 'Martin Lorenzo', 'martin_ferreira@gmail.com', 'paciente123', 'string'),
	(NEWID(), '41375149-6A84-4690-ACE8-196700FFB1D1', 'Heitor Paulo Campos', 'heitor-campos80@gmail.com', 'paciente123', 'string');

UPDATE dbo.Usuarios SET senha = '$2y$10$kZROpWHidaGEbQdfvq3SpeVPGiNcpLQHAOcENJbblYV0aAqXoHnYO' WHERE id = 'F63A83C9-35C7-4BDE-940D-5B07303D8F02';


-- Selecionando todas as especialidades
SELECT * FROM dbo.Especialidades;

INSERT INTO
	dbo.Especialidades
VALUES
	(NEWID(), 'Pediatra');



-- Selecionando todos os médicos
SELECT * FROM dbo.Medicos;

INSERT INTO
	dbo.Medicos
VALUES
	('F63A83C9-35C7-4BDE-940D-5B07303D8F02', '910D82CF-404A-4A7A-9B39-E343823842F9', '123456789'),
	('04030137-BA59-42CA-9320-1CD586278B7B', '3FA85F64-5717-4562-B3FC-2C963F66AFA6', '987654321');



-- Selecionando todos os pacientes
SELECT * FROM dbo.Pacientes;

INSERT INTO
	dbo.Pacientes
VALUES
	('E4F4A3B1-5AED-4981-8336-7E7A5440AD1F', '2000-01-01', '391166037', '01318181801', 'A13E687B-D94F-41D4-AC8A-AA1E4216D9CA'),
	('683F4955-7BEF-4154-AA38-F7215AD0DCD9', '2001-02-02', '473972438', '25319361815', 'A13E687B-D94F-41D4-AC8A-AA1E4216D9CA');



-- Selecionando todos os niveis
SELECT * FROM dbo.NiveisPrioridade;

INSERT INTO 
	dbo.NiveisPrioridade
VALUES
	(NEWID(), 0), -- Rotina
	(NEWID(), 1), -- Exame
	(NEWID(), 2); -- Urgencia



-- Selecionando todas as situasões
SELECT * FROM dbo.Situacoes;

INSERT INTO
	dbo.Situacoes
VALUES
	(NEWID(), 'Pendentes'),
	(NEWID(), 'Realizados'),
	(NEWID(), 'Cancelados');



-- Selecionando todas as clínicas
SELECT * FROM dbo.Clinicas;

INSERT INTO
	dbo.Clinicas
VALUES
	(NEWID(), 'Clínica Médica Vida & Saúde', '12345678000190', 'Clínica Médica Vida & Saúde',  'clinica.vidasaude@gmail.com', '083D1642-A7B4-4C08-85C3-095586B585E1')


insert into Consultas values (NEWID(), '3696C8B9-2ACE-4E17-BB62-0EFD3A0D88A1', 'F9F1B786-64D6-4DA2-A249-481D09678611', 
'70BB9BC6-ECB6-4DF2-9334-152104A5EC4E', '849548E4-6821-4DD9-8164-DA7D5A8A36D9', '41F7AF1C-FA6A-4E19-BB20-5F654F4284E6', 2024-03-29,'', '')

UPDATE Consultas SET DataConsulta = 2024-03-29 WHERE ID = '7ECDEAE4-E602-4647-A3AA-A3B2AA639E8B'

insert into Receitas values (NEWID(), '', '')

select * from Situacoes
select * from NiveisPrioridade
select * from Consultas
select * from Receitas
select * from Exames
