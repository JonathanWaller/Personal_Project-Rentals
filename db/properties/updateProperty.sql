-- update properties
--     SET property_title =$2, property_location =$3, beds=$4, baths=$5, description=$6, amen_1=$7, amen_2 = $8, amen_3=$9, price=$10
-- WHERE id = $1
-- RETURNING *;
-- update properties
--     SET property_title=$2, address=$3, lat=$4, lng=$5, city=$6, beds=$7, baths=$8, description=$9, amen_1=$10, amen_2 = $11, amen_3=$12, price=$13
-- WHERE id = $1
-- RETURNING *;
update properties
    SET property_title=$2, beds=$3, baths=$4, description=$5, amen_1=$6, amen_2 = $7, amen_3=$8, price=$9
WHERE id = $1
RETURNING *;