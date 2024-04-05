CREATE TABLE reports(
                      id serial PRIMARY KEY,
                      description VARCHAR ( 255 ) NOT NULL,
                      suggested_title VARCHAR ( 255 ),
                      suggested_category VARCHAR ( 255 ),
                      username VARCHAR ( 255 ) NOT NULL,
                      book_id INT NOT NULL
);

UPDATE book
SET category = 'NON_FICTION'
WHERE id = 5;
