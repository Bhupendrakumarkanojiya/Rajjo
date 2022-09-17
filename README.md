--start app
yarn start
--adding tables
yarn db:migrate

--Apis
GET
http://localhost:5001//api/v1/menu

Search by term:
http://localhost:5001/api/v1/menu/search?term=Rot
http://localhost:5001/api/v1/menu/:id/details  (Replace :id with any idf say 24)
--Ex: http://localhost:5001/api/v1/menu/24/details


POST
(To save menu)
http://localhost:5001/api/v1/menu

Request body:
{
    "name": "Misal Pav"
}

(to save menu image)
Replace :id with 24 
http://localhost:5001/api/v1/menu/:id/image   

Request body:
{
     "imageUrl": "https://picsum.photos/200"
}

(to save menu vedio)
http://localhost:5001/api/v1/menu/:id/vedio

Request body:
{
     "vedioUrl": "https://picsum.photos/200"
}

(to save Menu metadata
http://localhost:5001/api/v1/menu/:id/metadata 

Request Body:
{
    "alias_name": "Kukdu banzare wala",
    "ingrediants": "Chicken miced with mint, Onion and Tomato. garnishd with coriander"
}