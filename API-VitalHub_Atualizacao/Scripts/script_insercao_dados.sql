USE VitalHub_V2;

-- Selecionando todos os endereços
SELECT * FROM dbo.Enderecos;

INSERT INTO
	dbo.Enderecos
VALUES
<<<<<<< HEAD
	(NEWID(), '09510200', 'Rua Niterói', 180,-23.615052, -46.570625, 'São Caetano do Sul' );
=======
	(NEWID(), '09510200', 'Rua Niterói', 180, -23.5505, -46.6333);
>>>>>>> 12fe95ead256a4ecade5bedf564adce7f36680ce



-- Selecionando todos os tipos de usuários
SELECT * FROM dbo.TiposUsuario;

INSERT INTO dbo.TiposUsuario VALUES (NEWID(), 'Medico'), (NEWID(), 'Paciente');



-- Selecionando todos os usuários
SELECT * FROM dbo.Usuarios;

INSERT INTO
	dbo.Usuarios
VALUES
	(NEWID(), '3D98ECF8-CC99-40E8-BDC4-7F1AF1FDC5EF', 'Eduardo Alves', 'eduardo.silva@gmail.com', 'eduardo.silva@gmail.com', 'foto'),
	(NEWID(), '228108C4-8E33-4C2B-AA11-25E3625A1876', 'Gabriel Victor', 'gabriel.victor@gmail.com', 'gabriel.victor@gmail.com', 'foto'),
	(NEWID(), '41375149-6A84-4690-ACE8-196700FFB1D1', 'Martin Lorenzo', 'martin_ferreira@gmail.com', 'paciente123', 'string'),
	(NEWID(), '41375149-6A84-4690-ACE8-196700FFB1D1', 'Heitor Paulo Campos', 'heitor-campos80@gmail.com', 'paciente123', 'string');

UPDATE dbo.Usuarios SET senha = '$2y$10$kZROpWHidaGEbQdfvq3SpeVPGiNcpLQHAOcENJbblYV0aAqXoHnYO' WHERE id = 'F63A83C9-35C7-4BDE-940D-5B07303D8F02';

DELETE *  FROM dbo.Usuarios

-- Selecionando todas as especialidades
SELECT * FROM dbo.Especialidades;

INSERT INTO
	dbo.Especialidades
VALUES
	(NEWID(), 'Pediatra'),
	(NEWID(), 'Cardiologista'),
	(NEWID(), 'Ortopedista')



-- Selecionando todos os médicos
SELECT * FROM dbo.Medicos;

INSERT INTO
	dbo.Medicos
VALUES
	('733EA259-7D3F-4F73-8646-34D794CC0D02',  '123456789','54E782C8-BB9B-4BBB-998C-A5544F4B4604'),
	('236D23E2-5BAC-4E1B-8C51-CF850141BA5C', '987654321','54E782C8-BB9B-4BBB-998C-A5544F4B4604');



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
<<<<<<< HEAD
	(NEWID(), 'Clínica Médica Vida & Saúde', '12345678000190', 'Clínica Médica Vida & Saúde',  'clinica.vidasaude@gmail.com', '54E782C8-BB9B-4BBB-998C-A5544F4B4604')
=======
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
>>>>>>> 12fe95ead256a4ecade5bedf564adce7f36680ce
