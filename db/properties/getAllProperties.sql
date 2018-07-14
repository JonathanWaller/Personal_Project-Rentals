SELECT *
FROM (SELECT image_url, posting_id
    FROM upload_images) tbl1 JOIN (SELECT *
    FROM properties) tbl2 ON tbl1.posting_id = tbl2.id JOIN (SELECT post_id, round(avg(rating),2), count(review)
    FROM reviews
    GROUP BY post_id) tbl3 ON tbl2.id = tbl3.post_id JOIN (SELECT *
    FROM users) tbl4 ON tbl4.userid = tbl2.user_id
ORDER BY id DESC;
