import { Router } from "express"; // Import 'express' and 'Router' from 'express'
import fetchData from "../controller/fetchData";

const router: Router = Router(); // Create a router instance

router.get("/fetchLatestBlock", fetchData.fetchDataChainWise);


export default router;