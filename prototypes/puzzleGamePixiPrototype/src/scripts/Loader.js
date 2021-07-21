import { LoaderConfig } from "./LoaderConfig";
import { Globals } from "./Globals";

export class Loader {
    //receive the pixi.js loader
    constructor(loader) {
        //make it a property of the custom loader we can call! (additional abstraction)
        this.loader = loader;
        //getting all the resources from the list in LoaderConfig
        this.resources = LoaderConfig;
    }

    preload() {
        //iterating through the list of resources in LoaderConfig
        return new Promise(resolve => {
            for (let key in this.resources) {
                //adding all of the iterated resources to be loaded
                this.loader.add(key, this.resources[key]);
            }
            //loading all of the resources
            this.loader.load((loader, resources) => {
                //setting all resources to global variables
                Globals.resources = resources;

                // console.log("resources are loaded!", resources);
                //fulfills the promise
                resolve();
            });
        });
    }
}