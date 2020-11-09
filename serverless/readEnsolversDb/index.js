const AWS = require("aws-sdk");


AWS.config.update({ region: "us-east-1" });

const getItems = async(folderName) => {
    let items, reqItems;
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    const params = {
        TableName: "Ensolvers",
        Key: {
            type: "item"
        }
    }

    const data = await documentClient.get(params).promise();
    if (!data.Item) throw "User not found";
    console.log(data.Item);
    items = data.Item.items;
    reqItems = items.filter(i => i.folder === folderName);
    console.log(items);
    return reqItems;
}

const deleteItem = async(itemName,folderName) => {
    let row, items;
    row = await scanTable("item");
    console.log("la row es",row)
    items = row.items.filter(i => i.name !== itemName && i.folder !== folderName);
    row.items = items;
    
    await putRow(row);
}


const putRow = async(row) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    const params = {
        TableName: "Ensolvers",
        Item: row

    }

    try {
        const data = await documentClient.put(params).promise();
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
}
const scanTable = async(type) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    var params = {
        TableName: "Ensolvers"
    };

    const row = await documentClient.scan(params).promise();
    return row.Items.find(i => i.type === type);
}

const putItem = async(folderName, item) => {
    let row;

    row = await scanTable("item");
    console.log("La row es ____", row)
    row.items.push({
        name: item,
        folder: folderName
    });

    await putRow(row);
}


exports.handler = async(event) => {
    // TODO implement



    console.log("El evento", event)

    let userName, items, errMessage, req;


    let response = {}
    response.headers = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
    
    req = event;
    if (event.httpMethod === "GET") req = event.queryStringParameters;
    if(event.httpMethod === "POST" || event.httpMethod === "DELETE") req = JSON.parse(event.body);


    try {

        if (req.folderName || req.item) {
            if (event.httpMethod === "GET") {
                
                if (event.resource === "/items") {
                    items = await getItems(req.folderName)
                }
                else {
                    items = "Es un folder";
                }

                response.statusCode = 200
                response.body = JSON.stringify(items)
            }
            else if (event.httpMethod === "POST") {
                
                if (event.resource === "/items") {
                    items = await putItem(req.folderName, req.item)
                }
                else {
                    items = "Es un folder";
                }

            }

            else if (event.httpMethod === "DELETE") {
                if (event.resource === "/items") {
                    items = await deleteItem(req.item,req.folderName)
                }
                else {
                    items = "Es un folder";
                }

            }
        }
        else {
            errMessage = "Need more parameters"
            response.statusCode = 400
            response.body = JSON.stringify(errMessage)
        }

    }
    catch (e) {
        console.log("Algo se rompio", e)
        errMessage = "Resource not found";
        response.statusCode = 400;
        response.body = JSON.stringify(errMessage);
    }
    return response;
};
