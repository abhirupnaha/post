import axios from "axios";
import postModel from "../model/post.js";
export default async function syncEvent() {
    try {
        const posts = await postModel.find();
        const response = await axios.get("http://localhost:3005/event");
        const allEvents = response.data;
    }
    catch (error) {
        console.error("error occured while syncing events");
        console.log(error);
    }
}
//# sourceMappingURL=syncEvent.js.map