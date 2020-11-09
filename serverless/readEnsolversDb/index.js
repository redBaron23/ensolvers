const AWS = require("aws-sdk");


AWS.config.update({ region: "us-east-1" });




const deleteFolder = async(folderName) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    const params = {
        TableName: "Ensolvers-dev",
        Key: {
            folderName: folderName
        }
    }

    const data = await documentClient.delete(params).promise();
    return data;
}

const getItems = async(folderName) => {
    let items;
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    const params = {
        TableName: "Ensolvers-dev",
        Key: {
            folderName: folderName
        }
    }

    const data = await documentClient.get(params).promise();
    if (!data.Item) throw "Item not found";
    console.log(data.Item.items);
    items = data.Item.items;
    return items;
}

const deleteItem = async(itemName, folderName) => {
    let items, newItems, folder;
    items = await getItems(folderName);

    console.log("la row es", items)

    newItems = items.filter(i => i !== itemName);

    console.log("la row es", newItems)


    folder = {
        folderName: folderName,
        items: newItems
    }
    await createFolder(folder);
}


const createFolder = async(folder) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    const params = {
        TableName: "Ensolvers-dev",
        Item: folder

    }

    try {
        const data = await documentClient.put(params).promise();
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
}

const getFolders = async() => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

    var params = {
        TableName: "Ensolvers-dev"
    };

    const row = await documentClient.scan(params).promise();
    return row.Items.map(i => i.folderName);
}





const createItem = async(folderName, item) => {
    let items, folder;


    items = await getItems(folderName);
    if (!items.includes(item)) items.push(item);

    console.log("Mis iteme", items)
    folder = { folderName: folderName, items: items }

    await createFolder(folder);


}


exports.handler = async(event) => {
    // TODO implement



    console.log("El evento", event)

    let userName, res, errMessage, req;


    let response = {}
    response.headers = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }

    req = event;
    if (event.httpMethod === "GET") req = event //event.queryStringParameters;
    if (event.httpMethod === "POST" || event.httpMethod === "DELETE") req = event //JSON.parse(event.body);


    try {

        if (req.folderName || req.item) {
            if (event.httpMethod === "GET") {

                if (event.resource === "/items") {
                    res = await getItems(req.folderName)
                }
                else {
                    res = await getFolders();
                }

                response.statusCode = 200
                response.body = JSON.stringify(res)
            }
            else if (event.httpMethod === "POST") {

                if (event.resource === "/items") {
                    res = await createItem(req.folderName, req.item)
                }
                else {
                    let folder = {
                        folderName: req.folderName,
                        items: []
                    }
                    res = await createFolder(folder)
                }

            }

            else if (event.httpMethod === "DELETE") {
                if (event.resource === "/items") {
                    res = await deleteItem(req.item, req.folderName)
                }
                else {
                    res = await deleteFolder(req.folderName)
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
