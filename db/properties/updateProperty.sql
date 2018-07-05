update properties
    SET property_title =$2, property_location =$3, beds=$4, baths=$5, description=$6, amen_1=$7, amen_2 = $8, amen_3=$9, price=$10
WHERE id = $1
RETURNING *;