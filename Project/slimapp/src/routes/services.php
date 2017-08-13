<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
        'determineRouteBeforeAppMiddleware' => true,
        'addContentLengthHeader' => false
    ],
];
$c = new \Slim\Container($configuration);
$GLOBALS['app'] = new \Slim\App($c);

//Executes GET method 
function executeGET($path,$query){
    $GLOBALS['app']->get($path, function(Request $request, Response $response) use ($query)
    {
        $sql = $query;
        
        try{
            //Allows others applications to have access to the webservice
            header("access-control-allow-origin: http://localhost:4200");
            
            //Get DB Object 
            $db = new db();
            //Connect
            $db = $db->connect();

            $stmt = $db->query($sql);

            $result = $stmt->fetchAll(PDO::FETCH_OBJ);

            $db = null;
            
            echo json_encode($result);

        }catch(PDOException $e){
            echo '{"error" : {"text": '.$e->getMessage().'}';
        }
    });
}

//Get Product
executeGET('/products', "SELECT * FROM product LIMIT 4");

//Get All menu
executeGET('/menus', "SELECT * FROM menu");

//Check if user exists
$app->get('/login/{username}&{password}', function(Request $request, Response $response)
{
    $username = $request->getAttribute('username');
    $password = $request->getAttribute('password');

    $sql = "SELECT * FROM user WHERE username='$username' AND password='$password'";
    
    try{
        //Allows others applications to have access to the webservice
        header("access-control-allow-origin: http://localhost:4200");
        
        //Get DB Object 
        $db = new db();
        //Connect
        $db = $db->connect();

        $stmt = $db->query($sql);

        $result = $stmt->fetchall(PDO::FETCH_OBJ);

        $db = null;

        echo json_encode($result);
    }catch(PDOException $e){
        echo '{"error" : {"text": '.$e->getMessage().'}';
    }
});

//Add Customer
//POST method
$app->post('/api/customer/add', function(Request $request, Response $response)
{
    $first_name = $request->getParam('first_name');
    $last_name = $request->getParam('last_name');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $address = $request->getParam('address');
    $city = $request->getParam('city');
    $state = $request->getParam('state');

    $sql = "INSERT INTO customer (first_name,last_name,phone,email,address,city,state) VALUES (:first_name,:last_name,:phone,:email,:address,:city,:state)";
    
    try{
        //Get DB Object 
        $db = new db();
        //Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        //bind each parameter
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':state', $state);

        $stmt->execute();

        echo '{"notice": {"text": "Customer added"}';

    }catch(PDOException $e){
        echo '{"error" : {"text": '.$e->getMessage().'}';
    }
});

//Update customer
//PUT method
$app->put('/api/customer/update/{id}', function(Request $request, Response $response)
{
    $id = $request->getAttribute('id');
    $first_name = $request->getParam('first_name');
    $last_name = $request->getParam('last_name');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $address = $request->getParam('address');
    $city = $request->getParam('city');
    $state = $request->getParam('state');

    $sql = "UPDATE customer SET
                first_name = :first_name,
                last_name = :last_name,
                phone = :phone,
                email = :email,
                address = :address,
                city = :city,
                state = :state
            WHERE id = $id";
    
    
    try{
        //Get DB Object 
        $db = new db();
        //Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        //bind each parameter
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':state', $state);

        $stmt->execute();

        echo '{"notice": {"text": "Customer updated"}';

    }catch(PDOException $e){
        echo '{"error" : {"text": '.$e->getMessage().'}';
    }
});

//Delete Customers
//GET method
$app->delete('/api/customer/delete/{id}', function(Request $request, Response $response)
{
    $id = $request->getAttribute('id');

    $sql = "DELETE FROM customer WHERE id = $id";
    
    try{
        //Get DB Object 
        $db = new db();
        //Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Customer Deleted"}';
    }catch(PDOException $e){
        echo '{"error" : {"text": '.$e->getMessage().'}';
    }
});