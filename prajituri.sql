DROP TYPE IF EXISTS tip_memorie;
DROP TYPE IF EXISTS tip_produse;

CREATE TYPE tip_memorie AS ENUM( 'DDR4', 'DDR5', 'GDDR6', 'GDDR6X', 'Cache','TLC', 'QLC', 'N/A');
CREATE TYPE tip_produse AS ENUM('Procesor', 'SSD', 'Placa Video', 'Placa de Baza', 'Sursa', 'Carcasa', 'Altul');


CREATE TABLE IF NOT EXISTS Componente (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   capcitate_memorie INT ,   --in MB
   tipuri_produs tip_produse DEFAULT 'Altul',
   frecventa INT, --MHz
   tipuri_memorie tip_memorie DEFAULT 'N/A',
   compatibilitate VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   promotie BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   altele text,
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);


INSERT into Componente (nume,descriere,pret, capcitate_memorie, frecventa, tipuri_produs, tipuri_memorie, compatibilitate, promotie, imagine, altele) VALUES 
('Savarină', 'Prăjitură insiropată, cu frișcă', 7.5 , 200, 400, 'cofetarie', 'comuna', '{"faina","lapte","frisca","zahar"}', False, 'aproximativ-savarina.jpg'),
('Procesor AMD Ryzen 7800X3D', 'Procesor AMD Ryzen 7 7800X3D Frecventa 4.2GHz box, compatibilitate AM5, Grafica integrata RADEON GRAPHICS, Suport memorie DDR5 Dual Channel', '1999.99', '104', '4200', 'Procesor', 'Cache', 'AM5', False, 'ryzen7800x3d.jpg', 'Coolerul nu este inclus'  ),



