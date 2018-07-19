-- select *
-- from properties
-- where 
-- address LIKE $1;
SELECT *
FROM properties p JOIN upload_images u ON p.id=u.posting_id
WHERE 
ADDRESS LIKE $1;






