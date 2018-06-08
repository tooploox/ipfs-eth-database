import { getWeb3 } from "../../common/web3";
import BlogABI from "./abi/Blog.json";

const BLOG_ADDRESS = "0xf713ca4e1161013afeda584cbe60a937e274647e";
const { web3, web3Events } = getWeb3();

export const Blog = new web3.eth.Contract(BlogABI, BLOG_ADDRESS);
export const BlogEvents = new web3Events.eth.Contract(BlogABI, BLOG_ADDRESS);
