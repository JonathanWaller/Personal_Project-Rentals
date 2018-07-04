insert into test_table
    (image_url)
VALUES
    ($1)
returning *;