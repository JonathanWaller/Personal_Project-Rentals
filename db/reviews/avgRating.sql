select avg(rating)
from reviews
where post_id=$1;