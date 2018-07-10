-- select *
-- from reviews;
select r.id, r.review, r.post_id, r.user_id, r.reviewer_id, r.moment, u.user_name, u.user_avatar
from reviews r JOIN users u ON
r.reviewer_id = u.id;