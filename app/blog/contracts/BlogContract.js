import { getWeb3 } from "../../common/web3";
import BlogABI from "./abi/Blog.json";

const BLOG_ADDRESS = "0x197d9950c48a00ddeddbd2cddf57e03898597999";
const { web3, web3Events } = getWeb3();

export const Blog = new web3.eth.Contract(BlogABI, BLOG_ADDRESS);
export const BlogEvents = new web3Events.eth.Contract(BlogABI, BLOG_ADDRESS);
