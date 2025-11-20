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


INSERT INTO console (nome_console, empresa) VALUES 
('PC', 'Steam'),
('PlayStation 5', 'Sony'),
('Xbox Series X', 'Microsoft'),
('Nintendo Switch', 'Nintendo');


-- Preenchendo USUARIO
INSERT INTO usuario (nome, email, senha, dt_nasc, telefone, dt_cadastro, hrs_Jogo, qtd_conquista, fk_idconsole) VALUES
('Gabriel', 'Gabriel@email.com', '123', '2000-01-01 00:00:00', '1111111111', NOW(), 150, 50, 1), 
('Riebeck', 'riebeck@email.com', 'banjo456', '1995-03-10 00:00:00', '2222222222', NOW(), 80, 15, 2), 
('Gabbro', 'gabbro@email.com', 'zzz789', '1990-05-20 00:00:00', '3333333333', NOW(), 999, 1, 3), 
('Solanum', 'solanum@email.com', 'quantum00', '1980-07-07 00:00:00', '4444444444', NOW(), 10, 5, 1); 

-- Preenchendo POSTAGEM
INSERT INTO postagem (FkUsuario_idUsuario, titulo, dt_postagem, Imgpostagem, qtd_curtidas, descricao) VALUES

(1, 'Primeiro Voo!', '2025-11-10 10:00:00', 'https://indiegameculture.com/wp-content/uploads/2022/09/outer_wilds_walkthrough.png', 15, 'Acabei de decolar! Espero não bater...'),
(1, 'Isso é normal?', '2025-11-10 10:22:00', 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_500/store/software/switch/70010000038712/5c90aecec1d337a77b96f10ff05f9964f6424e63edd0a9e6428eaef9de19c78e', 45, 'Gente, o sol explodiu. Acontece sempre?'),
(1, 'Dark Bramble', '2025-11-11 14:00:00', 'https://images.squarespace-cdn.com/content/v1/5b2cf691506fbed2cdb0c226/1590078721537-EJQYRV30TVUEGN7YM71U/maxresdefault-3.jpg', 80, 'NÃO. ENTRO. MAIS. LÁ. #medo'),
(1, 'Cheguei no Olho!', '2025-11-12 18:00:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhkMad_bKhusbQ9ZOf6zzuq3SKdVKzHh9zuA&s', 150, 'Pessoal... vocês não vão acreditar.'),

(2, 'Ruínas Nomai', '2025-11-10 11:00:00', 'https://i0.wp.com/waytoomany.games/wp-content/uploads/2019/10/EHnirBWUEAMx4n4.jpg?ssl=1', 30, 'A história deles é fascinante! E um pouco triste.'),
(2, 'Meu Banjo', '2025-11-11 16:00:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOvDR1lXHMjway2yPuTH0eezLUgv3e3SqWg&s', 10, 'Tocando umas notas pra relaxar. Alguém ouve?'),

(3, 'Tirando um cochilo', '2025-11-10 10:10:00', 'https://i0.wp.com/epiloguegaming.com/wp-content/uploads/2022/03/20220310210647_1.jpg?resize=1024%2C576&ssl=1', 5, 'Mais um ciclo, de boa na rede.'),
(3, 'Acho que morri', '2025-11-10 10:23:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQ5dLP4QOK9K-zFYZ81Mhc-pK_theKJ8gwg&s', 25, 'Ah, não. Acordei de novo. Enfim, de volta pra rede.'),
(3, 'Dica do dia', '2025-11-11 11:00:00', 'https://images.squarespace-cdn.com/content/v1/5b2cf691506fbed2cdb0c226/1590078721537-EJQYRV30TVUEGN7YM71U/maxresdefault-3.jpg', 50, 'Se o universo vai acabar, aproveite o momento.'),

(4, 'Lua Quântica', '2025-11-10 15:00:00', 'https://www.mobiusdigitalgames.com/uploads/4/7/3/2/47328935/ow-shipinterior_orig.png', 90, 'Estou em todo lugar. E em lugar nenhum.'),
(4, 'Sexto local?', '2025-11-12 12:00:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXQOB65UJdXEffdnBR-0G8DDfdZ4hgGyYtg&s', 120, 'A lua encontra o Olho. Faz sentido.');


-- 4. Preenchendo COMENTARIO
INSERT INTO comentario (idcomentario, fk_idusuario, fk_idpostagem, dt_comentario, qtd_curtidas) VALUES
(1, 2, 3, '2025-11-11 14:30:00', 10),
(1, 3, 3, '2025-11-11 14:35:00', 5),
(1, 3, 2, '2025-11-10 10:25:00', 20),
(1, 1, 10, '2025-11-10 16:00:00', 15),
(1, 2, 10, '2025-11-10 16:05:00', 8);
