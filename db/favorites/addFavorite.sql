insert into favorites
    (image_url, owner_post_id, property_title, beds, baths, description, price, address, city, round, owner_name, owner_avatar, user_id)
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
returning *;