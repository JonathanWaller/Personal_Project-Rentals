select r.id, r.review, r.post_id, r.user_id, r.reviewer_id, r.moment, r.rating, u.user_name, u.user_avatar
from reviews r JOIN users u ON
r.reviewer_id = u.userid;
-- select r.id, r.review, r.post_id, r.user_id, r.reviewer_id, r.moment, r.rating, u.user_name, u.user_avatar
-- from reviews r JOIN users u ON
-- r.reviewer_id = u.userid;