insert into reviews
    (review,post_id,user_id, reviewer_id)
VALUES
    ($1, $2, $3, $4)
returning *;