create database OuterWilds;
use OuterWilds;

create table console(
idconsole int primary key auto_increment,
nome_console varchar(50),
empresa varchar(50)
);

create table usuario(
idusuario INT primary key auto_increment,
nome varchar(45),
email varchar(50),
senha varchar(50),
dt_nasc datetime,
telefone char(10),
dt_cadastro timestamp,
hrs_Jogo INT,
qtd_conquista int,
fk_idconsole int,
constraint foreign key (fk_idconsole) references console(idconsole)
);
create table postagem(
idpostagem int primary key auto_increment,
FkUsuario_idUsuario int,
titulo varchar(30),
dt_postagem datetime,
Imgpostagem varchar(255),
qtd_curtidas INT,
descricao varchar(200)
);

create table comentario(
idcomentario int,
fk_idusuario int,
fk_idpostagem int,
dt_comentario timestamp,
qtd_curtidas int,
primary key (idcomentario, fk_idusuario, fk_idpostagem),
foreign key (fk_idusuario) references usuario(idusuario),
foreign key (fk_idpostagem) references postagem(idpostagem)
);



--
-- INSERINDO DADOS DE EXEMPLO
--

-- 1. Preenchendo CONSOLE
INSERT INTO console (nome_console, empresa) VALUES 
('PC', 'Steam'),
('PlayStation 5', 'Sony'),
('Xbox Series X', 'Microsoft'),
('Nintendo Switch', 'Nintendo');

-- (PC terá idconsole = 1)
-- (PS5 terá idconsole = 2)
-- (Xbox terá idconsole = 3)
-- (Switch terá idconsole = 4)

-- 2. Preenchendo USUARIO (Com personagens de Outer Wilds!)
INSERT INTO usuario (nome, email, senha, dt_nasc, telefone, dt_cadastro, hrs_Jogo, qtd_conquista, fk_idconsole) VALUES
('Gabriel', 'Gabriel@email.com', '123', '2000-01-01 00:00:00', '1111111111', NOW(), 150, 50, 1), -- ID 1
('Riebeck', 'riebeck@email.com', 'banjo456', '1995-03-10 00:00:00', '2222222222', NOW(), 80, 15, 2), -- ID 2
('Gabbro', 'gabbro@email.com', 'zzz789', '1990-05-20 00:00:00', '3333333333', NOW(), 999, 1, 3), -- ID 3
('Solanum', 'solanum@email.com', 'quantum00', '1980-07-07 00:00:00', '4444444444', NOW(), 10, 5, 1); -- ID 4

-- 3. Preenchendo POSTAGEM (Várias postagens por usuário)
-- (Note que o nome da coluna de data é 'dt_postagem')
INSERT INTO postagem (FkUsuario_idUsuario, titulo, dt_postagem, Imgpostagem, qtd_curtidas, descricao) VALUES
-- Posts do GABRIEL (ID 1)
(1, 'Primeiro Voo!', '2025-11-10 10:00:00', 'url/nave.jpg', 15, 'Acabei de decolar! Espero não bater...'),
(1, 'Isso é normal?', '2025-11-10 10:22:00', 'url/sol_explodindo.jpg', 45, 'Gente, o sol explodiu. Acontece sempre?'),
(1, 'Dark Bramble', '2025-11-11 14:00:00', 'url/peixe_lua.jpg', 80, 'NÃO. ENTRO. MAIS. LÁ. #medo'),
(1, 'Cheguei no Olho!', '2025-11-12 18:00:00', 'url/olho.jpg', 150, 'Pessoal... vocês não vão acreditar.'),

-- Posts do Riebeck (ID 2)
(2, 'Ruínas Nomai', '2025-11-10 11:00:00', 'url/brittle_hollow.jpg', 30, 'A história deles é fascinante! E um pouco triste.'),
(2, 'Meu Banjo', '2025-11-11 16:00:00', 'url/banjo.jpg', 10, 'Tocando umas notas pra relaxar. Alguém ouve?'),

-- Posts do Gabbro (ID 3)
(3, 'Tirando um cochilo', '2025-11-10 10:10:00', 'url/rede.jpg', 5, 'Mais um ciclo, de boa na rede.'),
(3, 'Acho que morri', '2025-11-10 10:23:00', 'url/fantasma.jpg', 25, 'Ah, não. Acordei de novo. Enfim, de volta pra rede.'),
(3, 'Dica do dia', '2025-11-11 11:00:00', 'url/ilha_gabbro.jpg', 50, 'Se o universo vai acabar, aproveite o momento.'),

-- Posts da Solanum (ID 4)
(4, 'Lua Quântica', '2025-11-10 15:00:00', 'url/lua_quantum.jpg', 90, 'Estou em todo lugar. E em lugar nenhum.'),
(4, 'Sexto local?', '2025-11-12 12:00:00', 'url/olho_lua.jpg', 120, 'A lua encontra o Olho. Faz sentido.');


-- 4. Preenchendo COMENTARIO
-- (Lembre-se que os IDs das postagens começam em 1)
INSERT INTO comentario (idcomentario, fk_idusuario, fk_idpostagem, dt_comentario, qtd_curtidas) VALUES
-- Comentários no Post 3 (Dark Bramble, do Hatchling)
(1, 2, 3, '2025-11-11 14:30:00', 10), -- Riebeck (ID 2) comentou no post 3 (do Hatchling)
(1, 3, 3, '2025-11-11 14:35:00', 5), -- Gabbro (ID 3) comentou no post 3 (do Hatchling)

-- Comentários no Post 2 (Sol explodindo, do Hatchling)
(1, 3, 2, '2025-11-10 10:25:00', 20), -- Gabbro (ID 3) comentou no post 2 (do Hatchling)

-- Comentários no Post 10 (Lua Quântica, da Solanum)
(1, 1, 10, '2025-11-10 16:00:00', 15), -- Hatchling (ID 1) comentou no post 10 (da Solanum)
(1, 2, 10, '2025-11-10 16:05:00', 8); -- Riebeck (ID 2) comentou no post 10 (da Solanum)











  -- KPIS
  -- MEDIA DE CURTIDAS DO USUARIO
  select * from postagem;
  select ROUND(avg(qtd_curtidas), 1) from postagem where FkUsuario_idUsuario = 2;
  
  -- POSTAGEM COM MAIS CURTIDAS DO USUARIO
  select * from postagem where FkUsuario_idUsuario = 1 and qtd_curtidas = (select MAX(qtd_curtidas) from postagem where FkUsuario_idUsuario = 1 );
  
  -- TOTAL DE POSTAGEM DO USUARIO
  select COUNT(*) FROM postagem where FkUsuario_idUsuario = 1;
  
  -- TOTAL DE CURTIDAS
  select SUM(qtd_curtidas) FROM postagem where FkUsuario_idUsuario = 1;
  
  select * from postagem;
  
  
  -- GRAFICO LINHA
  -- MEDIA DE CURTIDAS POR DATA
  select avg(qtd_curtidas) as mediacurtida, DATE_FORMAT(dt_postagem, '%Y-%m-%d') as data from postagem where FkUsuario_idUsuario = 1 group by DATE_FORMAT(dt_postagem, '%Y-%m-%d');
   

-- GRAFICO BARRA
select * from postagem;
 select titulo as titulo, qtd_curtidas as qtdcurtidas from postagem where FkUsuario_idUsuario = 1 ;

select * from postagem where FkUsuario_idUsuario = 2;
UPDATE postagem SET qtd_curtidas = 10 where idpostagem = 1;

-- GRAFICO DE DONUTS
-- QUANTIDADE DE POSTAGEM POR USUARIO 
select * from usuario;
select * from postagem;

update postagem set Imgpostagem = 'https://static.vecteezy.com/ti/fotos-gratis/t2/36324708-ai-gerado-cenario-do-uma-tigre-caminhando-dentro-a-floresta-foto.jpg' where idpostagem = 1;


update postagem set Imgpostagem = 'https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15443821/RAM_S2_Ep205.0.0.1505932128.jpg?quality=90&strip=all&crop=7.8125,0,84.375,100' where idpostagem = 2;

-- FAZER POSTAGEM
INSERT INTO postagem (FkUsuario_idUsuario, titulo, dt_postagem, Imgpostagem, qtd_curtidas, descricao) 
VALUES (1, "titulo", "img", "QTd_curtidas", "descricao");

select usuario.nome as nome, COUNT(idPostagem) as qtdpostagens from usuario LEFT JOIN postagem ON idusuario = FkUsuario_idUsuario GROUP BY usuario.nome;

select * from postagem;
delete from postagem where idpostagem > 8;
-- 1. Gabriel: Nave
UPDATE postagem 
SET Imgpostagem = 'https://static.wikia.nocookie.net/outerwilds_gamepedia/images/6/62/Model_ship.png' 
WHERE idPostagem = 1;

UPDATE postagem SET Imgpostagem = 'https://indiegameculture.com/wp-content/uploads/2022/09/outer_wilds_walkthrough.png' WHERE (idpostagem = 1);
UPDATE postagem SET Imgpostagem = 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_500/store/software/switch/70010000038712/5c90aecec1d337a77b96f10ff05f9964f6424e63edd0a9e6428eaef9de19c78e' WHERE (idpostagem = 2);
UPDATE postagem SET Imgpostagem = 'https://images.squarespace-cdn.com/content/v1/5b2cf691506fbed2cdb0c226/1590078721537-EJQYRV30TVUEGN7YM71U/maxresdefault-3.jpg' WHERE (idpostagem = 3);
UPDATE postagem SET Imgpostagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhkMad_bKhusbQ9ZOf6zzuq3SKdVKzHh9zuA&s' WHERE (idpostagem = 4);
UPDATE postagem SET Imgpostagem = 'https://i0.wp.com/waytoomany.games/wp-content/uploads/2019/10/EHnirBWUEAMx4n4.jpg?ssl=1' WHERE (idpostagem = 5);
UPDATE postagem SET Imgpostagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOvDR1lXHMjway2yPuTH0eezLUgv3e3SqWg&s' WHERE (idpostagem = 6);
UPDATE postagem SET Imgpostagem = 'https://i0.wp.com/epiloguegaming.com/wp-content/uploads/2022/03/20220310210647_1.jpg?resize=1024%2C576&ssl=1' WHERE (idpostagem = 7);
UPDATE postagem SET Imgpostagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQ5dLP4QOK9K-zFYZ81Mhc-pK_theKJ8gwg&s' WHERE (idpostagem = 8);
UPDATE postagem SET Imgpostagem = 'https://images.squarespace-cdn.com/content/v1/5b2cf691506fbed2cdb0c226/1590078721537-EJQYRV30TVUEGN7YM71U/maxresdefault-3.jpg' WHERE (idpostagem = 9);
UPDATE postagem SET Imgpostagem = 'https://www.mobiusdigitalgames.com/uploads/4/7/3/2/47328935/ow-shipinterior_orig.png' WHERE (idpostagem = 10);
UPDATE postagem SET Imgpostagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXQOB65UJdXEffdnBR-0G8DDfdZ4hgGyYtg&s' WHERE (idpostagem = 11);