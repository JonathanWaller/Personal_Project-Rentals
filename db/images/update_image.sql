update images 
set image_url = $2
where id = $1
returning *;