-- select *
-- from properties;
-- select p.id, p.property_title, p.property_location, p.beds, p.baths, p.description, p.amen_1, p.amen_2, p.amen_3, p.price, i.image_url
-- from properties p JOIN images i ON 
-- p.id = i.post_id;
select p.id, p.property_title, p.property_location, p.beds, p.baths, p.description, p.amen_1, p.amen_2, p.amen_3, p.price, p.user_id, u.image_url
from properties p JOIN upload_images u ON 
p.id = u.post_id;
