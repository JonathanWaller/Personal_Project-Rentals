insert into reviews
    (review,post_id,user_id, reviewer_id, moment, rating)
VALUES
    ($1, $2, $3, $4, $5, $6)
returning *;