-- insert into upload_images
--     (image_url, post_id)
-- VALUES
--     ($1, $2)
-- returning *;
insert into upload_images
    (image_url, posting_id)
VALUES
    ($1, $2)
returning *;



-- insert into upload_images
--     (image_url)
-- VALUES
--     ($1)
-- returning *;