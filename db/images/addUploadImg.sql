insert into upload_images
    (image_url, posting_id)
VALUES
    ($1, $2)
returning *;
