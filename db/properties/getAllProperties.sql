-- SELECT *
-- FROM (SELECT image_url, post_id
--     FROM upload_images) tbl1 JOIN (SELECT *
--     FROM properties) tbl2 ON tbl1.post_id = tbl2.id JOIN (SELECT post_id, round(avg(rating),2)
--     FROM reviews
--     GROUP BY post_id) tbl3 ON tbl2.id = tbl3.post_id JOIN (SELECT *
--     FROM users) tbl4 ON tbl4.id = tbl2.user_id;
-- SELECT *
-- FROM (SELECT image_url, posting_id
--     FROM upload_images) tbl1 JOIN (SELECT *
--     FROM properties) tbl2 ON tbl1.posting_id = tbl2.id JOIN (SELECT post_id, round(avg(rating),2), count(review)
--     FROM reviews
--     GROUP BY post_id) tbl3 ON tbl2.id = tbl3.post_id JOIN (SELECT *
--     FROM users) tbl4 ON tbl4.userid = tbl2.user_id;
SELECT *
FROM (SELECT image_url, posting_id
    FROM upload_images) tbl1 JOIN (SELECT *
    FROM properties) tbl2 ON tbl1.posting_id = tbl2.id JOIN (SELECT post_id, round(avg(rating),2), count(review)
    FROM reviews
    GROUP BY post_id) tbl3 ON tbl2.id = tbl3.post_id JOIN (SELECT *
    FROM users) tbl4 ON tbl4.userid = tbl2.user_id;
-- IF reviews.post_id OR reviews.rating IS NULL THEN
-- RETURN FALSE;
