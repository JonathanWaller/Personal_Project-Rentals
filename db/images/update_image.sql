update upload_images 
set image_url = $2
where post_id = $1
returning *;