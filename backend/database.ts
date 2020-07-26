import * as Mongo from "mongodb";
import {ParsedUrlQuery} from "querystring";
import {Order} from "./models/Order";
import {PersonalData} from "./models/PersonalData";
import {IceCream} from "./models/IceCream";
import {IceType} from "./models/IceType";
import {IceContainer} from "./models/IceContainer";
import {Topping} from "./models/Topping";


export namespace Database {

    let mongoClient: Mongo.MongoClient;
    let collection: Mongo.Collection;

    export async function connectToDB(_url: string): Promise<void> {
        mongoClient = new Mongo.MongoClient(_url, {useNewUrlParser: true, useUnifiedTopology: true});
        await mongoClient.connect();
        collection = mongoClient.db("ice_cream_parlor").collection("orders");
        console.log("Database connection", collection != undefined);
    }

    export async function findAll(): Promise<Order[]> {
        console.log("findAll");
        let cursor: Mongo.Cursor<Order> = await collection.find();
        return cursor.toArray();
    }

    export async function findOne(_query: ParsedUrlQuery): Promise<Order> {
        let id: string = <string>_query["id"];
        console.log("searching for _id: " + id);
        let orderPromise = await collection.findOne({_id: new Mongo.ObjectID(id)});
        return orderPromise;
    }

    export async function update(_query: ParsedUrlQuery): Promise<Mongo.UpdateWriteOpResult> {
        let id: string = <string>_query["id"];
        let personalData: PersonalData = new PersonalData(<string>_query.lastName, <string>_query.firstName, <string>_query.phone, <string>_query.address);
        let iceCream: IceCream = new IceCream(getIceBalls(_query), getIceContainer(_query), getTopping(<string>_query.topping));
        let orderToAdd: Order = new Order(personalData, iceCream);
        return await collection.replaceOne({_id: new Mongo.ObjectID(id)}, orderToAdd);
    }

    export async function insert(_order: ParsedUrlQuery): Promise<Mongo.InsertOneWriteOpResult<any>> {
        let personalData: PersonalData = new PersonalData(<string>_order.lastName, <string>_order.firstName, <string>_order.phone, <string>_order.address);
        let iceCream: IceCream = new IceCream(getIceBalls(_order), getIceContainer(_order), getTopping(<string>_order.topping));
        let orderToAdd: Order = new Order(personalData, iceCream);
        console.log("insert " + _order.firstName + "'s orderToAdd.");
        return await collection.insertOne(orderToAdd);
    }

    export async function removeOne(_query: ParsedUrlQuery): Promise<Mongo.DeleteWriteOpResultObject> {
        let id: string = <string>_query["id"];
        let objID: Mongo.ObjectId = new Mongo.ObjectId(id);
        console.log("remove", id);
        return await collection.deleteOne({"_id": objID});
    }

    function getIceBalls(_order: ParsedUrlQuery): IceType[] {
        let iceBalls: IceType[] = [];
        let ball1: string = <string>_order.ball1;
        iceBalls = addIceBallToArray(ball1, iceBalls);
        let ball2: string = <string>_order.ball2;
        iceBalls = addIceBallToArray(ball2, iceBalls);
        let ball3: string = <string>_order.ball3;
        iceBalls = addIceBallToArray(ball3, iceBalls);
        return iceBalls;
    }

    function addIceBallToArray(_type: string, _array: IceType[]): IceType[] {
        let iceBallType = getIceBallType(_type);
        if (iceBallType != IceType.NOTHING) {
            _array.push(iceBallType);
        }
        return _array;

    }

    function getIceBallType(_type: string): IceType {
        switch (_type) {
            case "chocolate":
                return IceType.CHOCOLATE;
            case "vanilla":
                return IceType.VANILLA
            case "mango":
                return IceType.MANGO;
            case "raspberry":
                return IceType.RASPBERRY;
            default:
                return IceType.NOTHING;
        }
    }

    function getTopping(_type: string): Topping {
        switch (_type) {
            case "chocolatesauce":
                return Topping.CHOCOLATESAUCE;
            case "sprinkles":
                return Topping.SPRINKLES;
            case "cream":
                return Topping.CREAM;
            case "smarties":
                return Topping.SMARTIES;
            default:
                return Topping.NOTHING;
        }

    }

    function getIceContainer(_order: ParsedUrlQuery): IceContainer {
        if (_order.sundae) {
            let sundaeOption: string = <string>_order.sundae;
            if (sundaeOption == "on") {
                return IceContainer.BOWL;
            } else {
                return IceContainer.SUNDAE;
            }
        } else {
            let container: string = <string>_order.icecontainer;
            if (container.toUpperCase() == "BOWL") {
                return IceContainer.BOWL;
            } else {
                return IceContainer.SUNDAE;
            }
        }
    }
}