update properties
    SET property_title =$2, property_location =$3, beds=$4, baths=$5, description=$6, amenities=$7, price=$8
WHERE id = $1
RETURNING *;