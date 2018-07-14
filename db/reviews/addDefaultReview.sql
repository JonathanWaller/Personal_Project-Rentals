INSERT INTO reviews
    (review, post_id, user_id, reviewer_id, moment, rating)
VALUES
    ('Great place to stay', $1, $2, $2, NOW(), 5)
returning *;
