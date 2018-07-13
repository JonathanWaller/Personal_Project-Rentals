INSERT INTO properties
    (property_title, address, lat, lng, city, beds, baths, description, amen_1,amen_2,amen_3, price, user_id)
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
RETURNING *;
-- BEGIN;
--     insert into properties
--         (property_title, address, lat, lng, city, beds, baths, description, amen_1,amen_2,amen_3, price, user_id)
--     VALUES
--         ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
--     RETURNING id;
-- INSERT 
--     OR
-- ROLLBACK
-- INTO reviews
-- (review, post_id, user_id, reviewer_id, moment, rating)
-- VALUES
-- ('test review', id, 1, 1, '07/11/2018 15:57:27', 5  );
-- COMMIT;




-- ****chinook example
-- BEGIN;
-- INSERT INTO Artist(Name) VALUES('Loose Cannons') RETURNING id;
-- INSERT OR ROLLBACK INTO Album(AlbumId) VALUES(id);
-- COMMIT;
