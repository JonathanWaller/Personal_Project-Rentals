update properties
    SET property_title=$2, beds=$3, baths=$4, description=$5, amen_1=$6, amen_2 = $7, amen_3=$8, price=$9
WHERE id = $1
RETURNING *;