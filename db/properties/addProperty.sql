insert into properties
    (property_title, property_location, beds, baths, description, amen_1,amen_2,amen_3, price)
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *;
