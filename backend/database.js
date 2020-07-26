"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongo = require("mongodb");
const Order_1 = require("./models/Order");
const PersonalData_1 = require("./models/PersonalData");
const IceCream_1 = require("./models/IceCream");
const IceType_1 = require("./models/IceType");
const IceContainer_1 = require("./models/IceContainer");
const Topping_1 = require("./models/Topping");
var Database;
(function (Database) {
    let mongoClient;
    let collection;
    /**
     * Establish database connection
     * @param _url
     */
    async function connectToDB(_url) {
        mongoClient = new Mongo.MongoClient(_url, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoClient.connect();
        collection = mongoClient.db("ice_cream_parlor").collection("orders");
        console.log("Database connection", collection != undefined);
    }
    Database.connectToDB = connectToDB;
    /**
     * Get all orders from database
     */
    async function findAll() {
        console.log("findAll");
        let cursor = await collection.find();
        return cursor.toArray();
    }
    Database.findAll = findAll;
    /**
     * Get a specific order from the database
     * @param _query
     */
    async function findOne(_query) {
        let id = _query["id"];
        console.log("searching for _id: " + id);
        let orderPromise = await collection.findOne({ _id: new Mongo.ObjectID(id) });
        return orderPromise;
    }
    Database.findOne = findOne;
    /**
     * Update a specific order from the database
     * @param _query
     */
    async function update(_query) {
        let id = _query["id"];
        let personalData = new PersonalData_1.PersonalData(_query.lastName, _query.firstName, _query.phone, _query.address);
        let iceCream = new IceCream_1.IceCream(getIceBalls(_query), getIceContainer(_query), getTopping(_query.topping));
        let orderToAdd = new Order_1.Order(personalData, iceCream);
        return await collection.replaceOne({ _id: new Mongo.ObjectID(id) }, orderToAdd);
    }
    Database.update = update;
    /**
     * Insert a specific order to the database
     * @param _query
     */
    async function insert(_order) {
        let personalData = new PersonalData_1.PersonalData(_order.lastName, _order.firstName, _order.phone, _order.address);
        let iceCream = new IceCream_1.IceCream(getIceBalls(_order), getIceContainer(_order), getTopping(_order.topping));
        let orderToAdd = new Order_1.Order(personalData, iceCream);
        console.log("insert " + _order.firstName + "'s orderToAdd.");
        return await collection.insertOne(orderToAdd);
    }
    Database.insert = insert;
    /**
     * Remove a specific order from the database
     * @param _query
     */
    async function removeOne(_query) {
        let id = _query["id"];
        let objID = new Mongo.ObjectId(id);
        console.log("remove", id);
        return await collection.deleteOne({ "_id": objID });
    }
    Database.removeOne = removeOne;
    /**
     * Returns an array with all IceTypes of given query
     * @param _order
     */
    function getIceBalls(_order) {
        let iceBalls = [];
        let ball1 = _order.ball1;
        iceBalls = addIceBallToArray(ball1, iceBalls);
        let ball2 = _order.ball2;
        iceBalls = addIceBallToArray(ball2, iceBalls);
        let ball3 = _order.ball3;
        iceBalls = addIceBallToArray(ball3, iceBalls);
        return iceBalls;
    }
    /**
     * Add an IceType to an Array and returns the updated array
     * @param _type
     * @param _array
     */
    function addIceBallToArray(_type, _array) {
        let iceBallType = getIceBallType(_type);
        if (iceBallType != IceType_1.IceType.NOTHING) {
            _array.push(iceBallType);
        }
        return _array;
    }
    /**
     * Determines which enum is taken as IceType
     * @param _type
     */
    function getIceBallType(_type) {
        switch (_type) {
            case "chocolate":
                return IceType_1.IceType.CHOCOLATE;
            case "vanilla":
                return IceType_1.IceType.VANILLA;
            case "mango":
                return IceType_1.IceType.MANGO;
            case "raspberry":
                return IceType_1.IceType.RASPBERRY;
            default:
                return IceType_1.IceType.NOTHING;
        }
    }
    /**
     * Determines which enum is taken as Topping
     * @param _type
     */
    function getTopping(_type) {
        switch (_type) {
            case "chocolatesauce":
                return Topping_1.Topping.CHOCOLATESAUCE;
            case "sprinkles":
                return Topping_1.Topping.SPRINKLES;
            case "cream":
                return Topping_1.Topping.CREAM;
            case "smarties":
                return Topping_1.Topping.SMARTIES;
            default:
                return Topping_1.Topping.NOTHING;
        }
    }
    /**
     * Get the type of IceContainer specified in the query
     * @param _order
     */
    function getIceContainer(_order) {
        if (_order.sundae) {
            let sundaeOption = _order.sundae;
            if (sundaeOption == "on") {
                return IceContainer_1.IceContainer.BOWL;
            }
            else {
                return IceContainer_1.IceContainer.SUNDAE;
            }
        }
        else {
            let container = _order.icecontainer;
            if (container.toUpperCase() == "BOWL") {
                return IceContainer_1.IceContainer.BOWL;
            }
            else {
                return IceContainer_1.IceContainer.SUNDAE;
            }
        }
    }
})(Database = exports.Database || (exports.Database = {}));
//# sourceMappingURL=database.js.map