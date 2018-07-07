insert into reviews
    (review,post_id,user_id)
VALUES
    ($1, $2, $3)
returning *;