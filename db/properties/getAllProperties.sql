-- select p.id, p.property_title, p.address, p.lat, p.lng, p.city, p.beds, p.baths, p.description, p.amen_1, p.amen_2, p.amen_3, p.price, p.user_id, u.image_url, users.user_email, users.user_avatar, users.user_name
-- from upload_images u JOIN properties p ON
-- u.post_id = p.id JOIN users ON p.user_id = users.userid;
-- SELECT *
-- FROM (SELECT image_url, post_id
--     FROM upload_images) tbl1 JOIN (SELECT *
--     FROM properties) tbl2 ON tbl1.post_id = tbl2.id JOIN (SELECT post_id, round(avg(rating),2)
--     FROM reviews
--     GROUP BY post_id) tbl3 ON tbl2.id = tbl3.post_id JOIN (SELECT *
--     FROM users) tbl4 ON tbl4.id = tbl2.user_id;
SELECT *
FROM (SELECT image_url, posting_id
    FROM upload_images) tbl1 JOIN (SELECT *
    FROM properties) tbl2 ON tbl1.posting_id = tbl2.id JOIN (SELECT post_id, round(avg(rating),2)
    FROM reviews
    GROUP BY post_id) tbl3 ON tbl2.id = tbl3.post_id JOIN (SELECT *
    FROM users) tbl4 ON tbl4.userid = tbl2.user_id;
