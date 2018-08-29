select round(avg(r.rating),2), p.id
from reviews r INNER JOIN properties p ON r.post_id=p.id
group by p.id;

