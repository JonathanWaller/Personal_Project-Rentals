-- select p.id, p.property_title, p.address, p.lat, p.lng, p.city, p.beds, p.baths, p.description, p.amen_1, p.amen_2, p.amen_3, p.price, p.user_id, u.image_url
-- from properties p JOIN upload_images u ON 
-- p.id = u.post_id;
select p.id, p.property_title, p.address, p.lat, p.lng, p.city, p.beds, p.baths, p.description, p.amen_1, p.amen_2, p.amen_3, p.price, p.user_id, u.image_url, users.user_email, users.user_avatar, users.user_name
from upload_images u JOIN properties p ON
u.post_id = p.id JOIN users ON p.user_id = users.id;